window.addEventListener('load', function () 
{
    document.getElementById("random").addEventListener("click", () => {reset()}); //Reset proměnných
    document.getElementById("descending").addEventListener("click", () => {reset()}); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            selectionsort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            selectionsort();
        }
    });
})

window.addEventListener('resize', function(event)
    {
        stop();
    });

window.addEventListener('keydown', function(event) //Přidání listeneru na šipku doprava
{
    if (event.key === "ArrowRight" && !sortStav()) 
    {
      selectionsort();
    }
});

let i = 0; //proměné selectionsortu
let j = 0;
let min = 0;

let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data

function reset()
{
    i = 0;
    j = 0;
    min = 0;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    document.getElementById("var1").textContent = "i = Nedefinováno";
    document.getElementById("var2").textContent = "j = Nedefinováno";
    document.getElementById("var3").textContent = "min = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}

    
async function selectionsort() 
{
    dataChange_flag = false;
    sort_flag = true;

    for (i = 0; i < data.length - 1; i++)
    {
        min = i;
        writeText("Sloupec <b style='color: orange'>#" + i + "</b> označíme jako minimum");
        writeVar("i", "min");
        if(i == 0) //Přidaná část kvůli pseudokodu
        {
            pseudoColours("0","LR","1","LR","2","LR");
        }
        else 
        {
            pseudoColours("0","DR","1","LR","2","LR");
        }
        await setColour(i, undefined, "blue");
        await waitForUserInput(); if(dataChange_flag) return;
        for (j = i + 1; j < data.length; j++)
        {
            writeText("Vybereme sloupec <b style='color: orange'>#" + j + "</b> k porovnání.");
            writeVar("j","min");
            pseudoColours("0","DR","1","DR","3","LR","4","LR");
            await setColour(j, undefined);
            await waitForUserInput(); if(dataChange_flag) return;
            if (data[j] < data[min])
            {
                writeText("Protože byla hodnota sloupce <b style='color: red'>" + data[j] + "</b> menší než hodnota předchozího minima <b style='color: red'>" + data[min] + "</b>. Sloupec  <b style='color: orange'>#"+ j + "</b> jsme označili za nové minimum.");
                min = j;
                svg.selectAll("rect[fill='blue']").attr("fill", "teal"); //Odbarvím předchozí min
                setColour(min, undefined, "blue")   
                writeVar("j","min");
                pseudoColours("0","DR","1","DR","3","DR","4","DR","5","LR");
                if(play_flag) {await new Promise(r => setTimeout(r, 800));}
                await waitForUserInput(); if(dataChange_flag) return;
            }
            else //Přidaná část
            {
                writeText("Hodnota sloupce <b style='color: red'>"+ data[j] + "</b> nebyla menší než hodnota minima <b style='color: red'>" + data[min] + "</b> . Minimum zůstává stejné.");
                pseudoColours("0","DR","1","DR","3","DR","4","LR");
                await waitForUserInput(); if(dataChange_flag) return;
            }
        }
        writeVar("j","min");
        writeText("Minimum nyní označíme za celkové minimum.");
        pseudoColours("0","DR","1","DR","6","LR");
        await setColour(min, undefined, "orange")
        await waitForUserInput(); if(dataChange_flag) return;

        writeText("Vyměnili jsme minimum a první neseřazený sloupec <b style='color: orange'>#" + i + "</b>.");
        pseudoColours("0","DR","1","DR","7","LR");
        if(i != min)
        {
            await swap_bars(i, min);
        [data[i], data[min]] = [data[min], data[i]];
        }
        await waitForUserInput(); if(dataChange_flag) return;
    }
    writeVar("i");
    writeText("Graf je nyní seřazen.");
    pseudoColours("8","LR","9","LR");
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");
}

function writeVar(...variables) 
{
    const varMap = 
    {
        "i": () => document.getElementById("var1").textContent = "i = " + i,
        "j": () => document.getElementById("var2").textContent = "j = " + j,
        "min": () => document.getElementById("var3").textContent = "min = " + min
    };

    variables.forEach(variable => 
        {
        if (varMap[variable]) 
        {
            varMap[variable]();
        }
    });
}