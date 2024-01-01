window.addEventListener('load', function () 
{
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            shellsort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {         
            play();
            shellsort();
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
        shellsort();
    }
});


let i = 0; //proměné shellsortu
let j = 0;
let gap = 1;
let swapped = false;

let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data

function reset()
{
    i = 1;
    j = 0;
    gap = 1;
    swapped = false;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    let slider = document.getElementById("slider");
    slider.disabled = false;

    document.getElementById("var1").textContent = "i = Nedefinováno";
    document.getElementById("var2").textContent = "j = Nedefinováno";
    document.getElementById("var3").textContent = "gap = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}


async function shellsort() 
{
    dataChange_flag = false;
    sort_flag = true;

    gap = Math.floor(data.length/2);
    pseudoColours("0","LR","1","LR","2","LR","3","LR","4","LR","5","LR");
    while (gap > 0)
    {
        if (gap != Math.floor(data.length/2)) pseudoColours("0","DR","2","LR","3","LR","4","LR","5","LR");
        for(i = gap; i < data.length; i++)
        {
            writeText("Vybereme dvojici s mezerou rovnou <b style='color: red'>" + gap + "</b> k porovnání.");
            if(i != gap) { pseudoColours("0","DR","2","DR","3","LR","4","LR","5","LR");}
            j = i;
            writeVar();
            await setColour(j - gap, j);
            await waitForUserInput(); if(dataChange_flag) return;
            while(j >= gap && data[j - gap] > data[j])
            {
                
                if(j != i) //Přidaná část
                {
                    writeText("Vybereme zpětně dva sloupce.");
                    pseudoColours("0","DR","2","DR","3","DR","5","LR");
                    await setColour(j - gap, j);
                    await waitForUserInput(); if(dataChange_flag) return;
                }
                writeText("Hodnota levého sloupce <b style='color: red'>" + data[j - gap] + "</b> byla větší než hodnota pravého sloupce <b style='color: red'>" + data[j] + "</b>. Sloupce jsme vyměnili.");
                pseudoColours("0","DR","2","DR","3","DR","5","DR","6","LR","7","LR");
                j = j - gap;
                writeVar();
                await swap_bars(j, j + gap); //Pozměněno na +, jelikož vypisuju nejdříve proměnnou
                [data[j + gap], data[j]] = [data[j], data[j + gap]];
                swapped = true;
                if(j >= gap) await waitForUserInput(); if(dataChange_flag) return; //V případě kdy opakovaně vybírám sloupec, musím počkat
            }
            if(j >= gap && swapped) //Přidaná část. První podmínka platí, druhá ne. Musíme tedy označit sloupce a říct že se nemění
            {
                writeText("Vybereme zpětně dva sloupce.");
                pseudoColours("0","DR","2","DR","3","DR","5","LR");
                await setColour(j - gap, j);
                await waitForUserInput(); if(dataChange_flag) return;
                swapped = false; //aby jsme mohli projít následujícím textem
            }

            if(!swapped) //Přidaná část, pokud jsme prvky nevyměnily
            {
                writeText("Hodnota levého sloupce <b style='color: red'>" + data[j - gap] + "</b> nebyla větší než hodnota pravého <b style='color: red'>" + data[j] + "</b>. Sloupce zůstávají na svém místě.");
                pseudoColours("0","DR","2","DR","3","DR","8","LR");
            }
            swapped = false;
            await waitForUserInput(); if(dataChange_flag) return;
        }
        writeText("Došli jsme na konec grafu. Přepočítali jsme gap.");
        pseudoColours("0","DR","2","DR","9","LR","10","LR");
        gap = Math.floor(gap/2);
        writeVar();
        await setColour();
        await waitForUserInput(); if(dataChange_flag) return;
    }
    writeText("Graf je nyní seřazen.");
    pseudoColours("11","LR","12","LR");
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");

    let slider = document.getElementById("slider");
    slider.disabled = false;
}

function writeVar()
{
    document.getElementById("var1").textContent = "i = " + i;
    document.getElementById("var2").textContent = "j = " + j;
    document.getElementById("var3").textContent = "gap = " + gap;
}