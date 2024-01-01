window.addEventListener('load', function () 
{
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            quicksort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            quicksort();
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
        quicksort();
    }
});


var i = 0; //Proměnné quicksortu
var j = 0;
var pivot = 0;
var stack = [];
var topVar = -1;
var h;
var l = 0;
var p = 0;

var firstPartition = true; //Pomocná proměnná

var play_flag = false; //proměná pro tlačítko play
var sort_flag = false; //proměnná určující stav sortu (už probíhá/ ještě neprobíhá)

var dataChange_flag = false; //proměnná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data

function reset()
{
    i = 0;
    j = 0;
    pivot = 0;
    stack.fill(0);
    topVar = -1;
    h = (data.length - 1);
    l = 0;
    p = 0;

    firstPartition = true;

    play_flag = false;
    sort_flag = false;

    buttons(); //Obnovení všech tlačítek
    pseudoColours(); //Odbarvení pseudokodu

    let slider = document.getElementById("slider");
    slider.disabled = false;

    document.getElementById("var1").textContent = "top = Nedefinováno"; //Obnovení všech proměnných
    document.getElementById("var2").textContent = "l = Nedefinováno";
    document.getElementById("var3").textContent = "h = Nedefinováno";
    document.getElementById("var4").textContent = "p = Nedefinováno";
    document.getElementById("var5").textContent = "pivot = Nedefinováno";
    document.getElementById("var6").textContent = "i = Nedefinováno";
    document.getElementById("var7").textContent = "j = Nedefinováno";

    writeText("K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.");
}

    
async function quicksort()
{
    //top = -1 je v konstruktoru a resetu
    dataChange_flag = false;
    sort_flag = true; 

    stack[++topVar] = 0; //První zarážky
    stack[++topVar] = data.length - 1;

    while (topVar >= 0) 
    {
        h = stack[topVar--]; //uložím zarážky do h a l
        l = stack[topVar--];

        p = await partition(l, h);
        if(dataChange_flag) return; //po změně dat musím vyskočit úplně
        writeVar("p");
        writeText("Pivot označíme jako seřazený");
        pseudoColours("0","DR","4","DR","7","LR");
        svg.selectAll("rect[fill='blue']").attr("fill", "teal");
        await setColour(p, undefined, "orange");
        await waitForUserInput(); if(dataChange_flag) return;

        let left, right;
        if (p - 1 > l) //Levá strana od pivota
        {
            stack[++topVar] = l;
            stack[++topVar] = p - 1;
            left = true;
        }
        else //přidáno na označení samostatného sloupce jako seřazený
        {
            svg.select("#bar" + l).attr("fill", "orange");
        }

        if (p + 1 < h) //Pravá strana od pivota
        {
            stack[++topVar] = p + 1;
            stack[++topVar] = h;
            right = true;
        }
        else //přidáno na označení samostatného sloupce jako seřazený
        {
            svg.select("#bar" + h).attr("fill", "orange");
        }

        if(left == true && right == true)
        {
            writeText("Vytvoříme dva úseky na obou stranách pivota.");
            pseudoColours("0","DR","4","DR","8","LR","9","LR","10","LR","11","LR","12","LR","13","LR");
        }
        else if(left == true)
        {
            writeText("Vytvoříme úsek nalevo od pivota.");
            pseudoColours("0","DR","4","DR","8","LR","9","LR","10","LR");
        }
        else if(right == true)
        {
            writeText("Vytvoříme úsek napravo od pivota.");
            pseudoColours("0","DR","4","DR","11","LR","12","LR","13","LR");
        }
        else
        {
            writeText("Kolem tohoto pivota nebyly vytvořeny žádné úseky.");
        }
        writeVar("top");
        await waitForUserInput(); if(dataChange_flag) return;
    }
    writeText("Graf je nyní seřazen.");
    pseudoColours("14","LR","15","LR");
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");

    let slider = document.getElementById("slider");
    slider.disabled = false;
}

async function partition(low, high)
{
    pivot = data[high]; //Pivot je poslední element
    i = low - 1; //levá zarážka jakoby
    writeVar("l", "h", "pivot","i", "top");
    await setColour(high, undefined, "blue");
    writeText("Jako pivot označíme poslední prvek sekce.");
    if(firstPartition == true) //Přidaný krok
    {
        pseudoColours("0","LR","1","LR","2","LR","3","LR","4","LR","5","LR","6","LR","7","LR","16","LR","17","LR","18","LR");
    }
    else
    {
        pseudoColours("0","DR","4","LR","5","LR","6","LR","7","LR","16","LR","17","LR","18","LR");
    }
    
    writeVar("pivot");
    await waitForUserInput(); if(dataChange_flag) return;

    
    for (j = low; j <= high - 1; j++) 
    {
        writeVar("j")
        await setColour(j, undefined, "red");
        writeText("Vybereme sloupec k porovnání s pivotem.");
        pseudoColours("0","DR","4","DR","7","DR","16","DR","19","LR","20","LR");
        firstPartition = false;
        await waitForUserInput(); if(dataChange_flag) return;
        if (data[j] <= pivot) //Menší než pivot
        {
            i++;
            writeVar("i");
            writeText("Hodnota sloupce <b style='color: red'>" + data[j] + "</b> byla menší nebo rovna hodnotě pivota <b style='color: red'>" + pivot + "</b>. Sloupec jsme zařadili doleva.");
            pseudoColours("0","DR","4","DR","7","DR","16","DR","19","DR","20","DR","21","LR","22","LR");
            if(i != j) //Když není třeba neswapovat, kvuli await zdržení
            {
                await swap_bars(i, j);
                [data[i], data[j]] = [data[j], data[i]];
            }
            await waitForUserInput(); if(dataChange_flag) return;
        }
        else //Přidaný krok
        {
            writeText("Hodnota sloupce <b style='color: red'>" + data[j] + "</b> byla větší než hodnota pivota <b style='color: red'>" + pivot + "</b>. Sloupec zůstává na svém místě.");
            pseudoColours("0","DR","4","DR","7","DR","16","DR","19","DR","20","LR");
            await waitForUserInput(); if(dataChange_flag) return;
        }
        //stop
    }
    writeVar("j");

    if(i+1 == high) //Přidaný krok
    {
        writeText("Pivot je již na svém místě.")
        pseudoColours("0","DR","4","DR","7","DR","16","DR","23","LR","24","LR","25","LR","26","LR");
        await waitForUserInput(); if(dataChange_flag) return;
        return i + 1;
    }

    writeText("Označíme první sloupec v řadě, který je větší než pivot.");
    pseudoColours("4","DR","7","DR","16","DR","23","LR");
    await setColour(i + 1, undefined, "red");
    await waitForUserInput(); if(dataChange_flag) return;

    writeText("Vyměnili jsme pivot a označený sloupec.");
    pseudoColours("0","DR","4","DR","7","DR","16","DR","24","LR","25","LR","26","LR");
    await swap_bars(i + 1, high);
    [data[i + 1], data[high]] = [data[high], data[i + 1]];
    await waitForUserInput(); if(dataChange_flag) return;

    return i + 1;
}

function writeVar(...variables) 
{
    const varMap = 
    {
        "top": () => document.getElementById("var1").textContent = "top = " + topVar,
        "l": () => document.getElementById("var2").textContent = "l = " + l,
        "h": () => document.getElementById("var3").textContent = "h = " + h,
        "p": () => document.getElementById("var4").textContent = "p = " + p,
        "pivot": () => document.getElementById("var5").textContent = "pivot = " + pivot,
        "i": () => document.getElementById("var6").textContent = "i = " + i,
        "j": () => document.getElementById("var7").textContent = "j = " + j
    };

    variables.forEach(variable => 
        {
        if (varMap[variable]) 
        {
            varMap[variable]();
        }
    });
}
