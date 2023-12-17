window.addEventListener('load', function () 
{
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click",reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () => 
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            bubblesort();
        }
    });
    document.getElementById("play").addEventListener("click", () => 
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            bubblesort();
        }
    });
})

window.addEventListener('resize', function(event) //Pokud se mění velikost grafu, zastaví sort
{
        stop();
});

window.addEventListener('keydown', function(event) //Přidání listeneru na šipku doprava
{
    if (event.key === "ArrowRight" && !sortStav()) 
    {
      bubblesort();
    }
});


let i = 0; //proměné bubblesortu
let j = 0;

let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data/slider

function reset() //Reset dat
{
    i = 0;
    j = 0;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    document.getElementById("var1").textContent = "i = Nedefinováno"; //Obnovení všech proměnných
    document.getElementById("var2").textContent = "j = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}


async function bubblesort() 
{
    dataChange_flag = false; //Data zatím nejsou změněna
    sort_flag = true;  //Začalo řazení
    
    for(i = 0; i < data.length - 1; i++)
    {
        if(i == 0) {pseudoColours("0","LR","1","LR","2","LR","3","LR");}
        else {pseudoColours("0","DR","1","LR","2","LR","3","LR");}
        for (j = 0; j < data.length - i - 1; j++) 
        {
            writeText("Vybereme dva sloupce k porovnání.");
            writeVar();
            if(!(j == 0))pseudoColours("0","DR","1","DR","2","LR","3","LR");
            await setColour(j, j + 1);
            await waitForUserInput(); if(dataChange_flag) return;
            if (data[j] > data[j + 1]) 
            {
                writeText("Hodnota <b style='color: red'>" + data[j] + "</b> je větší než <b style='color: red'>" + data[j + 1] + "</b>. Proto sloupce jsme vyměnili.");
                writeVar();
                pseudoColours("0","DR","1","DR","2","DR","3","DR","4","LR")

                await swap_bars(j, j + 1);
                [data[j], data[j + 1]] = [data[j + 1], data[j]];

                await waitForUserInput(); if(dataChange_flag) return;
            }
            else
            {
                pseudoColours("0","DR","1","DR","2","DR","3","LR")
                writeText("Hodnota <b style='color: red'>" + data[j] + "</b> není větší než <b style='color: red'>" + data[j + 1] + "</b>. Sloupce zůstávají na svém místě.");
                writeVar();
                await waitForUserInput(); if(dataChange_flag) return;
            }
        }
        if(i <= data.length)
        {
            writeText("Sloupec <b style='color: orange'>#" + (data.length - i - 1) + "</b> označíme jako seřazený.");
            writeVar();
            pseudoColours("0","DR","1","DR","5","LR");
            svg.selectAll("rect[fill='red']").attr("fill", "teal");
            svg.select("#bar" + String(data.length - i - 1)).attr("fill","orange");
            if(play_flag) {await new Promise(r => setTimeout(r, 800));}
            await waitForUserInput(); if(dataChange_flag) return;
        }
    }
    writeText("Graf je nyní seřazen.");
    writeVar();
    pseudoColours("6","LR","7","LR");
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");
}

function writeVar()
{
    document.getElementById("var1").textContent = "i = " + i;
    document.getElementById("var2").textContent = "j = " + j;
}