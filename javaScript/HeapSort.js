window.addEventListener('load', function () 
{
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            heapsort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            heapsort();
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
        heapsort();
    }
});



let i = 0;                                 //proměnné heapsortu
let j = 0;                                 
let index = 0;                            
let k = 0;                                 
let l = 0;                                 

let play_flag = false;                         //proměná pro tlačítko play
let sort_flag = false;                        //proměnná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false;                   //proměná pro návrat ze sortu pokud byly resetnuta data

function reset()
{
    i = 0;
    j = 0;
    index = 0;
    k = 0;
    l = 0;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu      

    document.getElementById("var1").textContent = "i = Nedefinováno"; //Obnovení všech proměnných
    document.getElementById("var2").textContent = "j = Nedefinováno";
    document.getElementById("var3").textContent = "index = Nedefinováno";
    document.getElementById("var4").textContent = "k = Nedefinováno";
    document.getElementById("var5").textContent = "l = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}


async function heapsort() 
{
    dataChange_flag = false; //Data zatím nejsou změněna           
    sort_flag = true; //Začalo řazení

    await maxHeap();
    if(dataChange_flag) return;

    pseudoColours("0","DR","22","LR","23","LR","24","LR");
    writeVar("k");
    writeText("Všichni potomci jsou nyní menší než jejich rodiče. Máme tedy tzv. Max-Heap.");
    setColour();
    await waitForUserInput(); if(dataChange_flag) return;
    for (i = data.length - 1; i > 0; i--)
    {
        pseudoColours("0","DR","2","LR");
        writeText("První sloupec má nyní největší hodnotu z neseřazených sloupců.");
        writeVar("i");
        await setColour(0, undefined, "red");
        await waitForUserInput(); if(dataChange_flag) return;

        pseudoColours("0","DR","2","DR","3","LR","4","LR");
        writeText("První sloupec jsme vyměnili s posledním neseřazeným sloupcem a označili ho jako seřazený.");
        j = 0; //přesunuto výše kvuli výpisu
        writeVar("j");
        await swap_bars(0, i);
        [data[0], data[i]] = [data[i], data[0]];
        
        setColour(i, undefined, "orange");
        await waitForUserInput(); if(dataChange_flag) return;


        writeText("Nyní potřebujeme znovu vytvořit Max-Heap.");
        await waitForUserInput(); if(dataChange_flag) return;

        do
        {
            index = (2 * j + 1);
            writeVar("index");
            if((index < i - 1))
            {
                pseudoColours("0","DR","2","DR","5","LR","6","LR","7","LR");
                writeText("Vybereme levého potomka <b style='color: orange'> #" + index + "</b> a pravého potomka <b style='color: orange'> #" + (index + 1) + "</b> k porovnání.");
                await setColour (index, index + 1);
                await waitForUserInput(); if(dataChange_flag) return; 
            }
            else //odbarvit
            {
                await setColour();
            }

            if (index < (i - 1) && data[index] < data[index + 1])
            {
                pseudoColours("0","DR","2","DR","5","DR","7","DR","8","LR");
                writeText("Hodnota levého potomka <b style='color: red'> " + data[index] + "</b> byla menší než hodnota pravého potomka <b style='color: red'> " + data[(index + 1)] + "</b> a hodnota indexu <b style='color: red'> " + index + "</b> byla menší než i - 1 = <b style='color: red'> " + (i - 1) + "</b>. Zvětšili jsme index.");
                await setColour (index, index + 1);     
                index++;
                writeVar("index");
                await waitForUserInput(); if(dataChange_flag) return; 
            }
            else //přidaná část kvuli textu
            {
                if(index < (i - 1))
                {
                    writeText("Hodnota levého potomka <b style='color: red'> " + data[index] + "</b> byla větší než hodnota pravého potomka <b style='color: red'> " + data[(index + 1)] + "</b>. Index jsme nezvětšili.");     
                }
                else
                {
                    pseudoColours("0","DR","2","DR","5","LR","6","LR","7","LR");
                    writeText("Index <b style='color: red'>" + index + "</b> byl větší než i - 1 =<b style='color: red'> " + (i - 1) + "</b>. Index jsme nezvětšili.");
                }
                await waitForUserInput(); if(dataChange_flag) return; 
            }

            if(index < i)
            {
            pseudoColours("0","DR","2","DR","5","DR","9","LR");
            writeText("Vybereme potomka <b style='color: orange'> #" + index + "</b> a rodiče <b style='color: orange'> #" + j + "</b> k porovnání.");
            await setColour (index, j);
            await waitForUserInput(); if(dataChange_flag) return; 
            }

            if ( index < i && data[j] < data[index]) //Potomek je větší než rodič
            {
                pseudoColours("0","DR","2","DR","5","DR","9","DR","10","LR","11","LR");
                writeText("Potomek <b style='color: red'>" + data[index] + "</b> byl větší než rodič <b style='color: red'>" + data[j] + "</b>. Vyměnili jsme sloupce a proměnné j přiřadili hodnotu indexu.");
                await swap_bars(j, index);
                [data[j], data[index]] = [data[index], data[j]];
                j = index; //A1
                writeVar("j");
                await waitForUserInput(); if(dataChange_flag) return; 
            }
            else //přidaná část kvuli textu / Potomek není větší
            {
                if(index < i)
                {
                    pseudoColours("0","DR","2","DR","5","DR","11","LR","12","LR");
                    writeText("Rodič <b style='color: red'>"+ data[j] + "</b> byl větší než největší potomek <b style='color: red'>" + data[index] + "</b>. Sloupce zůstávají na svém místě. Proměnné j jsme přiřadili hodnotu indexu.");
                }
                else
                {
                    pseudoColours("0","DR","2","DR","5","DR","9","LR","11","LR");
                    writeText("Index byl větší nebo roven i. Sloupce zůstávají na svém místě. Proměnné j jsme přiřadili hodnotu indexu.");
                }
                j = index; //A1
                writeVar("j");
                await waitForUserInput(); if(dataChange_flag) return; 
            }
                
            //j = index;  kvuli výpisu hodnoty se rozdvojí výše viz A1

        } while (index < i);

        writeText("Nyní máme opět Max-Heap.");
        setColour();
        await waitForUserInput(); if(dataChange_flag) return; 
    }
    pseudoColours("13","LR","14","LR");
    writeVar("i");
    writeText("Graf je nyní seřazen.");
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");
}

async function maxHeap()
{ 
    for(k = 1; k < data.length; k++)
    {
        if(k == 1)
        {
            pseudoColours("0","LR","1","LR","15","LR","16","LR","17","LR");
            writeText("Vybereme první dvojici rodiče <b style='color: orange'> #" + (Math.floor((k - 1) / 2)) + "</b> a potomka<b style='color: orange'> #"  + k + "</b> k porovnání.");
        }
        else
        {
            pseudoColours("0","DR","1","DR","15","DR","16","LR", "17","LR");
            writeText("Vybereme další dvojici rodiče <b style='color: orange'> #" + (Math.floor((k - 1) / 2)) + "</b> a potomka<b style='color: orange'> #"  + k + "</b> k porovnání.");
        }
        writeVar("k");
        await setColour (k, (Math.floor((k - 1) / 2)));
        await waitForUserInput(); if(dataChange_flag) return;
        if (data[k] > data[Math.floor((k - 1) / 2)]) //potomek je větší než rodič
        {
            l = k;
            writeVar("l");
            let swapped = false; //když opakovaně přesouvám, musím barvu selectovat zde
            while (data[l] > data[Math.floor((l - 1) / 2)])
            {          
                if(swapped) //přidaný krok
                {
                    pseudoColours("0","DR","1","DR","15","DR","16","DR", "17","DR","19","LR");
                    writeText("Posuneme se směrem ke kořeni stromu a vybereme další dvojici<b style='color: orange'> #" + (Math.floor((l - 1) / 2)) + "</b> a <b style='color: orange'> #"  + l + "</b> k porovnání.");
                    await setColour (l, (Math.floor((l - 1) / 2)));
                    await waitForUserInput(); if(dataChange_flag) return; 
                }
                else
                {
                    pseudoColours("0","DR","1","DR","15","DR","16","DR", "17","DR","18","LR","19","LR","20","LR","21","LR");
                }
                if(swapped) pseudoColours("0","DR","1","DR","15","DR","16","DR", "17","DR","19","DR","20","LR","21","LR");
                writeText("Potomek <b style='color: red'>" + data[l] + "</b> byl větší než rodič <b style='color: red'>" + data[(Math.floor((l - 1) / 2))] + "</b>. Sloupce jsme vyměnili.");
                
                await swap_bars(l, Math.floor((l - 1) / 2));
                [data[l], data[Math.floor((l - 1) / 2)]] = [data[Math.floor((l - 1) / 2)], data[l]];
                l = (Math.floor((l - 1) / 2));
                writeVar("l");
                swapped = true;
                await waitForUserInput(); if(dataChange_flag) return;
            }
            if(l == 0) //zpráva pokud jsme dojeli ke kořenu
            {
                if(k == 9) continue;
                pseudoColours("0","DR","1","DR","15","DR","16","DR","17","DR","22","LR");
                writeText("Porovnávali jsme kořen. Proto budeme pokračovat další dvojicí potomka a rodiče.");
                writeVar("l");
                await waitForUserInput(); if(dataChange_flag) return; 
            }
            else //Dodatek výběru barvy a zprávy, pro přehlednost. 
            {
                pseudoColours("0","DR","1","DR","15","DR","16","DR","17","DR","22","LR");
                writeText("Potomek není větší než rodič. Sloupce zůstavají na svém místě a budeme pokračovat další dvojicí.");
                writeVar("l");
                await setColour (l, (Math.floor((l - 1) / 2)));
                await waitForUserInput(); if(dataChange_flag) return; 
            }
        }
        else //Přidaný krok
        {
            pseudoColours("0","DR","1","DR","15","DR","16","DR", "17", "LR");
            writeText("Potomek není větší než rodič. Sloupce zůstavají na svém místě.");
            await waitForUserInput(); if(dataChange_flag) return; 
        }
    }
}

function writeVar(...variables) 
{
    const varMap = 
    {
        'i': () => document.getElementById("var1").textContent = "i = " + i,
        'j': () => document.getElementById("var2").textContent = "j = " + j,
        'index': () => document.getElementById("var3").textContent = "index = " + index,
        'k': () => document.getElementById("var4").textContent = "k = " + k,
        'l': () => document.getElementById("var5").textContent = "l = " + l
    };

    variables.forEach(variable => 
        {
        if (varMap[variable]) 
        {
            varMap[variable]();
        }
    });
}

