window.addEventListener('load', function () 
{
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            binaryinsertionsort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            binaryinsertionsort(); 
        }
    });

    svg.append("image") //Přidání šipek pro binární vyhledávání
    .attr("href", "images/svgright.svg")
    .attr("height", document.getElementById("chart").offsetHeight * 0.09)
    .attr("y", document.getElementById("chart").offsetHeight * 0.9)
    .attr("id", "right")
    .attr("class", "invisible")

    svg.append("image")
    .attr("href", "images/svgleft.svg")
    .attr("height", document.getElementById("chart").offsetHeight * 0.09)
    .attr("y", document.getElementById("chart").offsetHeight * 0.9)
    .attr("id", "left")
    .attr("class", "invisible")


    svg.append("image")
    .attr("href", "images/svgmid.svg")
    .attr("height", document.getElementById("chart").offsetHeight * 0.09)
    .attr("y", document.getElementById("chart").offsetHeight * 0.9)
    .attr("id", "mid")
    .attr("class", "invisible")

    svg.selectAll("image").attr("width", parseInt(svg.select("#bar0").attr("width") / 2)); //Prvotní nastavení velikosti šipek
})

window.addEventListener('keydown', function(event) //Přidání listeneru na šipku doprava
{
    if (event.key === "ArrowRight" && !sortStav()) 
    {
        binaryinsertionsort();
    }
});

window.addEventListener('resize', function(event) //Změna velikosti šipek při změně velikosti okna
{
    stop(); //Zastavení sortu

    if(data.length > 10) {updateArrows();} //uprava velikosti sipek, pokud je více prvků
    else //normal velikost sipek
    {
        svg.selectAll("image")
        .attr("width", parseInt(svg.select("#bar0").attr("width") / 2))
    }

    svg.selectAll("image")
        .attr("y", document.getElementById("chart").offsetHeight * 0.9) 
});


let i = 1;; //proměné binaryinsertionsortu
let j = 0;
let temp = 0;

let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data/slider

let left = 0; //Proměnná levé šipky
let right = 0; //Proměnná pravé šipky
let mid = 0; //Proměnná prostřední šipky

let scale = 6 / 8; //Scale pro velikost šipek

function reset() //Reset dat
{
    i = 1;
    j = 0;
    temp = 0;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    let slider = document.getElementById("slider");
    slider.disabled = false;

    left = 0;
    right = 0;
    mid = 0;

    svg.select("#right").attr("class","invisible"); //Zneviditelnění šipek
    svg.select("#left").attr("class","invisible");
    svg.select("#mid").attr("class","invisible");

    document.getElementById("var1").textContent = "i = Nedefinováno"; //Obnovení všech proměnných
    document.getElementById("var2").textContent = "j = Nedefinováno";
    document.getElementById("var3").textContent = "left = Nedefinováno";
    document.getElementById("var4").textContent = "right = Nedefinováno";
    document.getElementById("var5").textContent = "mid = Nedefinováno";
    document.getElementById("var6").textContent = "temp = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}


async function binaryinsertionsort() 
{
    if(data.length > 10) {updateArrows();} //uprava velikosti sipek, pokud je více prvků
    else //Normalní velikost sipek
    {
        svg.selectAll("image")
        .attr("width", parseInt(svg.select("#bar0").attr("width") / 2));  
    }
    dataChange_flag = false; //Data zatím nejsou změněna
    sort_flag = true; //Začalo řazení
    
    writeText("První sloupec označíme jako seřazený.");
    pseudoColours("0","LR");
    await setColour(0, undefined, "OrangeRed"); //barvení prvního prvku
    await waitForUserInput(); if(dataChange_flag) return;

    for (i = 1; i < data.length; i++)
    {
        temp = data[i];
        writeText("Vybereme první neseřazený sloupec <b style='color: orange'>#" + i + "</b>.");
        pseudoColours("0","DR","1","LR","2","LR");
        writeVar("i", "temp");
        await setColour(i, undefined, "red");
        await waitForUserInput(); if(dataChange_flag) return;

        await leftAndRightArrow();
        await waitForUserInput(); if(dataChange_flag) return;

        while(left <= right)
        {
            midArrow();
            if(play_flag) {await new Promise(r => setTimeout(r, 800));}
            await waitForUserInput(); if(dataChange_flag) return;
            
            if(temp < data[mid])
            {
                changingRight();
                writeText("Porovnáme A[mid] <b style='color: purple'>" + data[mid] + "</b> s hodnotou vybraného sloupce <b style='color: red'>" + temp + "</b>. Hodnota vybraného sloupce byla menší, přesunuli jsme pravou hranici.");
                pseudoColours("0","DR","1","DR","5","DR","7","LR","8","LR");
            }
            else
            {
                writeText("Jelikož hodnota vybraného sloupce nebyla menší než A[mid], přesunuli jsme levou hranici.");
                left = mid + 1;
                svg.select("#left").attr("x", svg.select("#bar" + left).attr("x"));
                pseudoColours("0","DR","1","DR","5","DR","9","LR","10","LR");
            }
            writeVar("left", "right");
            if(play_flag) {await new Promise(r => setTimeout(r, 800));}
            await waitForUserInput(); if(dataChange_flag) return;
        }

        writeText("<b style='color: #3333ff'>left</b> > <b style='color: red'>right</b>. To znamená, že jsme našli místo, kde sloupec patří.");
        pseudoColours("0","DR","1","DR","11","LR");
        await waitForUserInput(); if(dataChange_flag) return;

        for(j = i - 1; j >= left; j--)
        {
            writeText("Sloupec postupně přesouváme na své místo")
            pseudoColours("0","DR","1","DR","12","LR","13","LR");
            writeVar("j");
            await swap_bars(j, j + 1);
            [data[j], data[j + 1]] = [data[j + 1], data[j]];
            await waitForUserInput(); if(dataChange_flag) return;
        }
        writeVar("j");
        writeText("Sloupec je na správném místě.");
        pseudoColours("0","DR","1","DR","14","LR");
        svg.select("#right").attr("class","invisible");
        svg.select("#left").attr("class","invisible");
        svg.select("#mid").attr("class","invisible");
        svg.selectAll("rect[fill='red']").attr("fill", "OrangeRed");
        if(play_flag) {await new Promise(r => setTimeout(r, 800));}
        await waitForUserInput(); if(dataChange_flag) return;
    }
    pseudoColours("15","LR","16","LR")
    writeText("Graf je nyní seřazen.");
    writeVar("i");
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");
    
    let slider = document.getElementById("slider");
    slider.disabled = false;
}

function leftAndRightArrow()
{
        left = 0;
        right = i - 1;

        svg.select("#left").attr("x", svg.select("#bar0").attr("x")).attr("width", parseInt(svg.select("#bar0").attr("width") / 2)).attr("class","visible");
        let temp = parseInt(svg.select("#bar" + String(right)).attr("x"));
        let temp2 = parseInt(svg.select("#bar0").attr("width") / 2);
        let temp3 = temp + temp2;
        svg.select("#right").attr("x", temp3).attr("width", parseInt(svg.select("#bar0").attr("width") / 2)).attr("class","visible");

        writeText("Do proměnné <b style='color: blue'>left</b> uložíme 0 a do proměnné <b style='color: red'>right</b> uložíme " + (i - 1) + ". Tím označíme první a poslední sloupec seřazené části.");
        pseudoColours("0","DR","1","DR","3","LR","4","LR");
        writeVar("left", "right");
}

function midArrow()
{
    mid = Math.floor((left + right) / 2);
    let temp = parseInt(svg.select("#bar" + mid).attr("x")); //určení středové šipky
    let temp2 = parseInt(svg.select("#bar0").attr("width") / 4);
    let temp3 = temp + temp2;
    svg.select("#mid").attr("x", temp3).attr("width", parseInt(svg.select("#bar0").attr("width") / 2)).attr("class","visible");
    writeText("Určíme střed pomocí (left&nbsp;+&nbsp;right)&nbsp;/&nbsp;2. Číslo zaokrouhlujeme dolů. mid&nbsp;=&nbsp;<b style='color: purple'>" + mid + "</b>");
    writeVar("mid");
    pseudoColours("0","DR","1","DR","5","LR","6","LR");
}

function changingRight()
{
    right = mid - 1;
    if(right < 0) //šipka je před prvním barem
    {
        let temp = parseInt(svg.select("#bar0").attr("x"));
        let temp2 = parseInt(svg.select("#bar0").attr("width") / 2);
        let temp3 = temp - temp2;
        svg.select("#right").attr("x", temp3);
    }
    else //pravá šipka je postrčena o šířku poloviny sloupce
    {
        let temp4 = parseInt(svg.select("#bar" + String(right)).attr("x"));
        let temp5 = parseInt(svg.select("#bar0").attr("width") / 2);
        let temp6 = temp4 + temp5;
        svg.select("#right").attr("x", temp6);
    }
    writeVar("right");
}

function writeVar(...variables) 
{
    const varMap = 
    {
        'i': () => document.getElementById("var1").textContent = "i = " + i,
        'j': () => document.getElementById("var2").textContent = "j = " + j,
        'temp': () => document.getElementById("var3").textContent = "temp = " + temp,
        'left': () => document.getElementById("var4").textContent = "left = " + left,
        'right': () => document.getElementById("var5").textContent = "right = " + right,
        'mid': () => document.getElementById("var6").textContent = "mid = " + mid
    };

variables.forEach(variable => 
    {
        if (varMap[variable]) 
        {
            varMap[variable]();
        }
    });
}

function updateArrows()
{
    svg.selectAll("image")
    .attr("width", parseInt(svg.select("#bar0").attr("width") / 2))
    .attr("height", parseInt(svg.select("#mid").attr("width") / scale));
}
