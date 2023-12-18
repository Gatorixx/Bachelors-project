
let arraySelect;
let sortingType;
let stopFlag;

document.addEventListener("DOMContentLoaded", function() 
{
    document.getElementById("stopButton").disabled = true; //Vypnutí tlačítka stop

    var buttons = document.querySelectorAll(".arrayButton"); //Vybrání všech buttonu pro počáteční pole
    buttons.forEach(function(button) //Každému je přidám listener
    {
      button.addEventListener("click", function() 
      {

        buttons.forEach(function(btn) //Všem je odstraněno required, a třída clicked a buttonNotSelected
        {
          btn.classList.remove("clicked");
          btn.classList.remove("buttonNotSelected");
          btn.removeAttribute("required");
        });
        
        this.classList.add("clicked"); //přidá clicked jen na jedno tlačítko
        arraySelect = this.id; //Do proměnné je uloženo id vybraného tlačítka
      });
    });

    var buttons2 = document.querySelectorAll(".sortingTypeC");
    buttons2.forEach(function(button) 
    {
      button.addEventListener("click", function() 
      {

        buttons2.forEach(function(btn) 
        {
          btn.classList.remove("clicked");
          btn.classList.remove("buttonNotSelected");
          btn.removeAttribute("required");
        });
        
        this.classList.add("clicked"); //přidá clicked jen na jeden button
        sortingType = this.id;
      });
    });
  

    var checkboxes = document.querySelectorAll(".checkbox"); //Obsluha checkboxů
    checkboxes.forEach(function(checkbox) 
    {
        checkbox.addEventListener("change", function() // Při změně provede=>
        {
            var atLeastOneChecked = Array.from(checkboxes).some(function(checkbox) //Je alespoň jeden zaškrtnut? => true
            {
                return checkbox.checked;
            });

            checkboxes.forEach(function(checkbox)  //všem check boxům je odebrán required
            {
                checkbox.removeAttribute("required");
            });

            if (!atLeastOneChecked) //V případě kdy není vybrán žádný, je všem přidán required
            {
                checkboxes.forEach(function(checkbox) 
                {
                    checkbox.setAttribute("required", "required");
                });
            }
        });
    });

    document.getElementById("resetButton").addEventListener("click", () => //Resetování formuláře
    {
        document.getElementById("comparisonForm").reset();
        checkboxesReset();
        buttonsReset();
    })

    document.getElementById("comparisonForm").addEventListener("submit", function(event) 
    {
        event.preventDefault(); //zamezí resetu stránky
        var numberOfElements = document.getElementById("numberOfElements").value;
        firstAlgo = true;

        //Kontrola čísla
        var pattern = /\b(?:[1-9]\d{3,6}|[1-9]\d{6}|[1-8]\d{7}|9[0-8]\d{6}|9{2}[0-8]\d{5}|99{3}[0-8]\d{4}|999{4}[0-8]\d{3}|9999{5}[0-8]\d{2}|99999{6}[0-8]\d|9999999)\b/;

        if (!pattern.test(numberOfElements)) //špatné číslo
        {
            return;
        }

        if(arraySelect == null) //Není vybráno počáteční pole
        {
            var buttons = document.querySelectorAll(".arrayButton");
            buttons.forEach(function(btn) 
            {
            btn.classList.add("buttonNotSelected");
            });

            return;
        }

        if(sortingType == null) //Není vybrán způsob řazení
        {
            var buttons = document.querySelectorAll(".sortingTypeC");
            buttons.forEach(function(btn) 
            {
            btn.classList.add("buttonNotSelected");
            });

            return;
        }

        var algorithms = [];
        let i = 0;
        checkboxes.forEach(function(checkbox) //ID vybraných algoritmu je dáno do pole
        {
            if(checkbox.checked)
            {
                algorithms[i++] = checkbox.id;
            }
        });


        var finalArray = []; //Hlavní pole

        arrayChoice(arraySelect, numberOfElements, finalArray); //Generování vybraného pole

        runChoice(algorithms, finalArray); //Vybrání způsobu generace a generace samotných workerů
    });
});

function checkboxesReset() //Reset check boxů
{
    var checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(function(checkbox) 
    {
        checkbox.setAttribute("required", "");
    });
}

function buttonsReset() //Reset tlačítek
{
    var buttons = document.querySelectorAll(".arrayButton, .sortingTypeC");

    buttons.forEach(function(btn) 
    {
        btn.classList.remove("clicked");
        btn.classList.remove("buttonNotSelected");
        btn.setAttribute("required", "");
    });

    arraySelect = null;
    sortingType = null;
}

function arrayChoice(algo, length, array) //Jednoduchý switch pro vybrání generace pole
{
    switch(algo)
    {
        case "Náhodné" :
            randomArr(length, array);
            break;
        case "Téměř seřazené" :
            nearlySortedArr(length, array);
            break;
        case "Sestupné" :
            descendingArr(length, array);
            break;
        case "Několik unikátních" :
            fewUniqueArr(length, array);
            break;
    }
}

function randomArr(length, array) // náhodné pole
{
    for (var i = 0; i < length; i++) 
    {
        var randomNumber = Math.floor(Math.random() * length);
        array.push(randomNumber);
    }
}

function nearlySortedArr(length, array) //Téměř seřazené pole
{
    for (var i = 0; i < length; i++) 
    {
        var randomNumber = i + Math.floor(Math.random() * 10) - 5;
        array.push(randomNumber);
    }
}

function fewUniqueArr(length, array) //Pole s několika unikátními čísly
{

    var uniqueValuesCount = Math.floor(length/3); //počet unikátních prvků
    var uniqueNumbers = [];

    for (var i = 0; i < uniqueValuesCount; i++) //Vytvoření unikátních hodnot
    {
        var uniqueNumber = Math.floor(Math.random() * length);
        uniqueNumbers.push(uniqueNumber);
    }
    
    for (var j = 0; j < length; j++) //Náhodné vybirání unikátních hodnot a vkládání je do pole
    {
        var randomNumber = Math.floor(Math.random() * uniqueValuesCount);
        array.push(uniqueNumbers[randomNumber]);
    }
}

function descendingArr(length, array) //Sestupné pole
{
    for (var i = parseInt(length); i >= 1; i--) 
    {
        array.push(i);
    }
}

function algorithmWorkers(algorithm, array, array_selection, sort_type) 
{
    return new Promise((resolve, reject) => 
    {
        const worker = new Worker("javaScript/AlgorithmWorkers.js"); //Vytvoření workera
        worker.postMessage({algorithm, array}); //pošlu jméno algoritmu a pole workeru

        document.getElementById("stopButton").addEventListener("click", stopSorting); //Přidám listener tlačítku stop


        let elements = //Přípava kontentu pro logovací systém
        [
            Object.assign(document.createElement("p"), {innerHTML: algorithm}),
            Object.assign(document.createElement("p"), {innerHTML: array.length}),
            Object.assign(document.createElement("p"), {innerHTML: array_selection}),
            Object.assign(document.createElement("p"), {innerHTML: sort_type}),
            Object.assign(document.createElement("p"), {})
        ];

        let parentIDs = ["algorithmID", "numberOfElementsID", "arrayTypeID", "sortTypeID", "timeID"];

        elements.forEach(function(element, j) 
        {
            document.getElementById(parentIDs[j]).appendChild(element); //Vložení informací na stránku
        });


        function stopSorting() //Funkce pro zrušení
        {
            elements[4].innerHTML = "ZRUŠENO"; //Zrušení času
            elements.forEach(function(element) //Zabarvení na červenou
            {
                element.style.color = "red";
            });

            stopFlag = true; //Flag pro sekvenční spouštění
            resolve(); //Uvolnění promise
            worker.terminate(); //Ukončení workera
            document.getElementById("stopButton").removeEventListener("click", stopSorting); //Odstranění listeneru pro tlačítko stop
        };

        function workerMessage(msg) //Zpráva od workera
        {
            var data = msg.data;
            elements[4].innerHTML =  data[1].toFixed(5).toString().padStart(5, " ") + " sekund"; //Výpis času

            if(data[0])
            {
                document.getElementById("stopButton").removeEventListener("click", stopSorting); //Odstranění listeneru pro tlačítko stop
                elements.forEach(function(element) //Obarvení když je sort hotov
                {
                    element.style.color = "#73e4ff";
                });
                resolve();
                worker.terminate(); //Ukončení workera
            }
        }


        worker.onmessage = workerMessage;  //Zpráva workera => funkce workerMessage

        worker.onerror = function(error) //v případě chyby
        {
            reject(error);
            worker.terminate();
        };
    });
}

async function runChoice(algo, array) //Funkce vytvářející workery a pouštící je sekvenčně/paralelně
{
    const array_selection = arraySelect; //při překliknutí tlačítka se nesmí měnit 
    const sort_type = sortingType;

    try 
    {
        document.getElementById("startButton").disabled = true;
        document.getElementById("stopButton").disabled = false;
        
        if(sortingType == "Paralelní")
        {
            const algorithmPromises = algo.map(algorithm => algorithmWorkers(algorithm, array, array_selection, sort_type));
       
            await Promise.all(algorithmPromises); //Pouštím a čekám na všechny puštěné algoritmy
        }
        else
        {
            for (const algorithm of algo) 
            {
                if(stopFlag) break; //Když dám stop, zruším všechny ostatní algoritmy
                await algorithmWorkers(algorithm, array, array_selection, sort_type); //
            }
            stopFlag = false;
        }
        
        document.getElementById("stopButton").disabled = true;
        document.getElementById("startButton").disabled = false;
    } 
    catch (error) 
    {
        console.error(error);
    }
}

