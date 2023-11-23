window.addEventListener('load', function () 
{
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            shakersort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            shakersort();
        }
    });
})

window.addEventListener('resize', stop);

window.addEventListener('keydown', function(event) //Přidání listeneru na šipku doprava
{
    if (event.key === "ArrowRight" && !sortStav()) 
    {
        shakersort();
    }
});


let i = -1; //proměné shakersortu
let j = 0;
let end;
let start = 0;
let swapped = true;

let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data

function reset()
{
    i = -1;
    j = 0;
    end = data.length - 1;
    start = 0;
    swapped = true;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    document.getElementById("var1").textContent = "i = Nedefinováno";
    document.getElementById("var2").textContent = "j = Nedefinováno";
    document.getElementById("var3").textContent = "start = Nedefinováno";
    document.getElementById("var4").textContent = "end = Nedefinováno";
    document.getElementById("var5").textContent = "swapped = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}


async function shakersort() 
{ 
    dataChange_flag = false;
    sort_flag = true;
    swapped = true;

    end = data.length - 1;

    pseudoColours("0","LR","1","LR","2","LR","3","LR","4","LR","5","LR");
    while (swapped) 
    {
        if(!(i == -1)) pseudoColours("0","DR","2","LR","3","LR","4","LR","5","LR");
        swapped = false;
        for (i = start; i < end; ++i) //bubble sort
        {
            writeText("Vybereme dva sloupce.");
            writeVar("i", "start", "end", "swapped");
            if(!(i == start)) pseudoColours("0","DR","2","DR","4","LR","5","LR");
            await setColour(i, i + 1);
            await waitForUserInput(); if(dataChange_flag) return;
            if (data[i] > data[i + 1]) 
            {
                writeText("Hodnota <b style='color: red'>" + data[i] + "</b> byla větší než <b style='color: red'>" + data[i + 1] + "</b>. Sloupce jsme vyměnili.");
                pseudoColours("0","DR","2","DR","4","DR","5","DR","6","LR","7","LR");
                swapped = true;
                writeVar("i", "start", "end", "swapped");
                await swap_bars(i, i + 1);
                [data[i], data[i + 1]] = [data[i + 1], data[i]];
            }
            else
            {
                pseudoColours("0","DR","2","DR","4","DR","5","LR");
                writeText("Hodnota <b style='color: red'>" + data[i] + "</b> nebyla větší než <b style='color: red'>" + data[i + 1] + "</b>. Sloupce zůstávají na svém místě.");
            }
            await waitForUserInput(); if(dataChange_flag) return;
        }
        
        if (swapped == false) //nic není swappnuto, graf je seřazen
        {
            writeVar("i", "start", "end", "swapped");
            writeText("Graf je nyní seřazen.");
            pseudoColours("0","DR","2","DR","8","LR","9","LR","10","LR");
            play_flag = false;
            buttons("finished");
            svg.selectAll("rect").attr("fill", "orange");
            return;
        }

        swapped = false;

        end = end - 1;
        
        writeVar("i", "start", "end", "swapped");
        writeText("Sloupec <b style='color: orange'>#" + (end + 1) + "</b> označíme jako seřazený.");
        pseudoColours("0","DR","2","DR","8","LR","11","LR","12","LR");
        await setColour((end + 1), undefined, "orange");
        await waitForUserInput(); if(dataChange_flag) return;
        for (j = end - 1; j >= start; j--) 
        {
            writeText("Vybereme dva sloupce.");
            writeVar("j");
            pseudoColours("0","DR","2","DR","13","LR","14","LR");
            await setColour(j, j + 1);
            await waitForUserInput(); if(dataChange_flag) return;
            if (data[j] > data[j + 1]) 
            {
                writeText("Hodnota <b style='color: red'>" + data[j] +"</b> nebyla menší než <b style='color: red'>" +  data[j+1] + "</b>. Sloupce jsme vyměnili.");
                pseudoColours("0","DR","2","DR","13","DR","14","DR","15","LR","16","LR");
                await swap_bars(j, j + 1);
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                swapped = true;
                writeVar("i", "start", "end", "swapped");
            }
            else
            {
                pseudoColours("0","DR","2","DR","13","DR","14","LR");
                writeText("Hodnota <b style='color: red'>" + data[j] + "</b> byla menší než <b style='color: red'>" + data[j + 1] + "</b>. Sloupce zůstávají na svém místě.");
            }
            writeVar("swapped");
            await waitForUserInput(); if(dataChange_flag) return;
        }
        writeVar("j", "swapped");
        writeText("Sloupec <b style='color: orange'>#" + (start) + "</b> označíme jako seřazený."); 
        pseudoColours("0","DR","2","DR","17","LR","18","LR");
        start = start + 1;
        writeVar("i", "start", "end", "swapped");
        await setColour(start - 1, undefined, "orange");
        await waitForUserInput(); if(dataChange_flag) return;
    }
    writeVar("i", "j", "start", "end", "swapped");
    writeText("Graf je nyní seřazen.");
    pseudoColours("19","LR","20","LR");
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
        "start": () => document.getElementById("var3").textContent = "start = " + start,
        "end": () => document.getElementById("var4").textContent = "end = " + end,
        "swapped": () => document.getElementById("var5").textContent = "swapped = " + swapped,
    };

    variables.forEach(variable => 
        {
        if (varMap[variable]) 
        {
            varMap[variable]();
        }
    });
}
