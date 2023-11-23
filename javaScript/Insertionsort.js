window.addEventListener('load', function () 
{
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () => 
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            insertionsort();
        }
    });
    document.getElementById("play").addEventListener("click", () => 
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            insertionsort();
        }
    });
})

window.addEventListener('resize', function(event)
    {
        stop();
    });

window.addEventListener('keydown', function(event)  //Přidání listeneru na šipku doprava
{
    if (event.key === "ArrowRight" && !sortStav())
    {
        insertionsort();
    }
});

let i = 1; //proměnné insertionsortu
let j = 0;
let temp = 0;

let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměnná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data

function reset()
{
    i = 1;
    j = 0;
    temp = 0;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    document.getElementById("var1").textContent = "i = Nedefinováno"; //Obnovení všech proměnných
    document.getElementById("var2").textContent = "j = Nedefinováno";
    document.getElementById("var3").textContent = "temp = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}


async function insertionsort() 
{
    dataChange_flag = false; //Data zatím nejsou změněna
    sort_flag = true; //Začalo řazení
    
    pseudoColours("0","LR");
    writeText("První sloupec označíme jako seřazený.");
    await setColour(0, undefined, "OrangeRed"); //barvení prvního prvku
    await waitForUserInput(); if(dataChange_flag) return;
    for (i = 1; i < data.length; i++)
    { 
        pseudoColours("0","DR","1","LR","2","LR","3","LR","4","LR");
        temp = data[i]; 
        j = i - 1; 
        writeText("Vybereme první neseřazený sloupec <b style='color: orange'>#" + i + "</b>.");
        writeVar();
        await setColour(i, undefined, "red");
        await waitForUserInput(); if(dataChange_flag) return;

        while (j >= 0 && data[j] > temp)
        { 
            writeText("Hodnota vybraného sloupce <b style='color: red'>" + temp + "</b> byla menší než <b style='color: red'>" + data[j] + "</b>. Sloupce jsme vyměnili.");
            pseudoColours("0","DR","1","DR","4","DR","5","LR","6","LR");
            await swap_bars(j,  j + 1);
            [data[j], data[j + 1]] = [data[j + 1], data[j]];
            j = j - 1; 
            writeVar();
            await waitForUserInput(); if(dataChange_flag) return;
        }
        if(!(data[j] > temp))
        {
            writeText("Hodnota vybraného sloupce <b style='color: red'>" + temp + "</b> nebyla menší než <b style='color: red'>" + data[j] + "</b>. Sloupec je tedy na správném místě a označíme ho jako seřazený.");
            pseudoColours("0","DR","1","DR","7","LR");
        }
        if(j < 0)
        {
            writeText("Sloupec již nemůžeme s ničím porovnat. Sloupec je tedy na správném místě a označíme ho jako seřazený.");
            pseudoColours("0","DR","1","DR","7","LR");
        }
        svg.selectAll("rect[fill='red']").attr("fill", "OrangeRed");
        if(play_flag) {await new Promise(r => setTimeout(r, 800));}
        await waitForUserInput(); if(dataChange_flag) return;
    } 
    writeText("Graf je nyní seřazen.");
    pseudoColours("8","LR","9","LR");
    writeVar();
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");
}

function writeVar()
{
    document.getElementById("var1").textContent = "i = " + i;
    document.getElementById("var2").textContent = "j = " + j;
    document.getElementById("var3").textContent = "temp = " + temp;
}