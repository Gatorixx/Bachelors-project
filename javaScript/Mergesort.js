window.addEventListener('load', function () 
{
    document.getElementById("random").addEventListener("click", reset); //Reset proměnných
    document.getElementById("descending").addEventListener("click", reset); //Reset proměnných
    document.getElementById("step").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            mergesort();
        }
    });
    document.getElementById("play").addEventListener("click", () =>
    {
        if(!sortStav()) //Pokud není sort v běhu, zavolá ho
        {
            play();
            mergesort();
        }
    });
})

window.addEventListener('resize', () =>
{
    stop();     
});

window.addEventListener('keydown', function(event) //Přidání listeneru na šipku doprava
{
    if (event.key === "ArrowRight" && !sortStav()) 
    {
        mergesort();
    }
});


let size = 0; //Proměnné mergesortu
let left = 0;
let right = 0;
let mid = 0;
let i = 0;
let j = 0;
let k = 0;
let leftArray = 0;
let rightArray = 0;

let temp = new Array(data.length); //Pomocné proměnné pro uchování dat o barech
let temp2 = new Array(data.length);

let firstSize; //Pomocná proměnná pro pseudokod


let play_flag = false; //proměná pro tlačítko play
let sort_flag = false; //proměnná určující stav sortu (už probíhá/ ještě neprobíhá)

let dataChange_flag = false; //proměnná pro návrat ze sortu pokud byly resetnuta data pomocí náhodná data/sestupná data

function reset() //Reset dat
{
    size = 0;
    left = 0;
    right = 0;
    mid = 0;
    i = 0;
    j = 0;
    k = 0;

    leftArray = 0;
    rightArray = 0;

    temp.fill(0);
    temp2.fill(0);

    play_flag = false;
    sort_flag = false;

    buttons();
    pseudoColours();
}

async function mergesort() 
{
    dataChange_flag = false;
    sort_flag = true; 
    for (size = 1; size <= data.length - 1; size = 2 * size) 
    {
        firstSize = true;
        for (left = 0; left < data.length - 1; left += 2 * size) 
        {
            mid = Math.min(left + size - 1, data.length - 1);

            right = Math.min(left + (2 * size) - 1, data.length - 1);
            await merge(left, mid, right);
            if(dataChange_flag) return; //když se mění data musíme vyskočit úplně
        }  
        if(right < data.length - 1 && size == 1) //Pomocný krok = označení sloupců při lichém počtu
        {
            for(let z = right + 1; z <= data.length - 1; z++)
            {
                svg.select("#bar" + z).attr("fill", "darkgrey");
            }
            writeText("Díky lichému počtu sloupců, budou některé sloupce řazeny až v následujících cyklech.");
            pseudoColours("0","DR","1","DR","2","DR","5","DR");
            if(play_flag) {await new Promise(r => setTimeout(r, 800));} //čekání po vybarvení sloupcu
            await waitForUserInput(); if(dataChange_flag) return;
        }
        writeVar();
    }

    writeText("Graf je nyní seřazen.");
    pseudoColours("6","LR","7","LR","8","LR");
    writeVar();
    play_flag = false;
    buttons("finished");
    svg.selectAll("rect").attr("fill", "orange");
}

async function  merge(l , m , r) 
{
    leftArray = m - l + 1;
    rightArray = r - m;

    for(let z = l, y = 0; z <= r; z++, y++) //do pole temp uloží x parametr barů a textů
    {
        temp[y] = [svg.select("#bar" + z).attr("x"), svg.select("#text" + z).attr("x")];
    }

    let L = Array(leftArray);
    let R = Array(rightArray);

    for (i = 0; i < leftArray; i++) //Do L uložíme levou polovinu k porovnání
    {
        L[i] = [data[l + i], l + i];  //uložení dat a čísla baru
        svg.select("#bar" + String(l + i)).attr("fill", "darkslateblue");
    }

    for (j = 0; j < rightArray; j++) //Do R uložíme pravou polovinu k porovnání.
    {
        R[j] = [data[m + 1 + j], m + 1 + j]; //uložení dat a čísla baru
        svg.select("#bar" + String(m + 1 + j)).attr("fill", "purple");
    }
    if(play_flag) {await new Promise(r => setTimeout(r, 800));} //počkat po barvení


    i = 0;
    j = 0;
    k = l;
    let pocitadlo = 0
    writeText("Uložíme data vybraných sloupců do polí L a R.");
    if(size == 1 && left == 0)
    {
        pseudoColours("0","LR","1","LR","2","LR","3","LR","4","LR","5","LR","9","LR","10","LR","11","LR","12","LR","13","LR","14","LR","15","LR","16","LR","17","LR","18","LR");
        firstSize = false;
    }
    else if(firstSize)
    {
        pseudoColours("0","DR","1","LR","2","LR","3","LR","4","LR","5","LR","9","LR","10","LR","11","LR","12","LR","13","LR","14","LR","15","LR","16","LR","17","LR","18","LR");
        firstSize = false;
    }
    else
    {
        pseudoColours("0","DR","1","DR","2","LR","3","LR","4","LR","5","LR","9","LR","10","LR","11","LR","12","LR","13","LR","14","LR","15","LR","16","LR","17","LR","18","LR");
    }
    writeVar();
    await waitForUserInput(); if(dataChange_flag) return;

    while (i < leftArray && j < rightArray) 
    {
        writeVar();
        if(k != l) await waitForUserInput(); if(dataChange_flag) return;
        writeText("Vybereme sloupce k porovnání.");
        pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","19","LR","20","LR");
        await setColour(l + i, l + j + size)
        await waitForUserInput(); if(dataChange_flag) return;

        if (L[i][0] <= R[j][0]) 
        {
            data[k] = L[i][0];
            temp2[pocitadlo] = [svg.select("#bar" + L[i][1]), svg.select("#text" + L[i][1])]; //Uložení baru a textu
            writeText("Hodnota levého sloupce <b style='color: red'>" + L[i][0] + "</b> byla menší nebo rovna hodnotě pravého sloupce <b style='color: red'>" + R[j][0] + "</b>. Levý sloupec jsme zařadili dolů.");
            pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","19","DR","20","DR","21","LR","24","LR");
            await swap_barsMerge(L[i][1], pocitadlo);
            i++;
        } 
        else 
        {
            data[k] = R[j][0];
            temp2[pocitadlo] = [svg.select("#bar" + R[j][1]), svg.select("#text" + R[j][1])]; //Uložení baru a textu
            writeText("Hodnota levého sloupce <b style='color: red'>" + L[i][0] + "</b> byla větší než hodnota pravého sloupce <b style='color: red'>" + R[j][0] + "</b>. Pravý sloupec jsme zařadili dolů.");
            pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","19","DR","22","LR","23","LR","24","LR");
            await swap_barsMerge(R[j][1], pocitadlo);
            j++;
        }
        k++;
        pocitadlo++

    }

    writeVar();
    if(k != l) await waitForUserInput(); if(dataChange_flag) return;
    let prvni= true;
    let LeftTemp;

    while (i < leftArray) 
    {
        data[k] = L[i][0];
        writeText("Postupně přesuneme všechny zbylé sloupce z pole L");
        if (prvni) //Podmínka navíc kvůli barvení pseudokodu
        {
            pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","25","LR","26","LR","27","LR");
            prvni = false;
        } 
        else pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","26","LR","27","LR");
        await setColour(l + i, undefined, "red");
        temp2[pocitadlo] = [svg.select("#bar" + L[i][1]), svg.select("#text" + L[i][1])]
        await swap_barsMerge(L[i][1], pocitadlo);
        i++;
        k++;
        pocitadlo++;
        LeftTemp = true;
        writeVar();
        await waitForUserInput(); if(dataChange_flag) return;
    }

    while (j < rightArray) 
    {
        data[k] = R[j][0];
        writeText("Postupně přesuneme všechny zbylé sloupce z pole R");
        if (prvni)  //Podmínka navíc kvůli barvení pseudokodu
        {
            pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","25","LR","29","LR","30","LR");
            prvni = false;
        } 
        else pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","29","LR","30","LR");
        await setColour(l + j + size, undefined, "red");
        temp2[pocitadlo] = [svg.select("#bar" + R[j][1]), svg.select("#text" + R[j][1])]
        await swap_barsMerge(R[j][1], pocitadlo);
        j++;
        k++;
        pocitadlo++
        writeVar();
        await waitForUserInput(); if(dataChange_flag) return;
    }


    for(let z = l, y = 0; z <= r; z++, y++) //Změna id barů a textů
    {
        temp2[y][0].attr("id", "bar" + z);
        temp2[y][1].attr("id", "text" + z);
    }    

    let animationPromises = []; //Pole pro animace

    svg.selectAll("rect[fill='red']").attr("fill", "teal"); //odbarvení všech barů
    for (let z = 0; z < leftArray + rightArray; z++) //projetí všech barů, které je nutné zvednout nahoru
    {
        let bar = temp2[z][0];
        let text = temp2[z][1];

        let barTransition = bar
            .transition()
            .duration(1000)
            .ease(d3.easePolyInOut.exponent(2))
            .attr("y", (parseFloat(bar.attr("y")) - recHeight))
            .end();

        let textTransition = text
            .transition()
            .duration(1000)
            .ease(d3.easePolyInOut.exponent(2))
            .attr("y", (parseFloat(text.attr("y")) - recHeight))
            .end();

        animationPromises.push(barTransition, textTransition);
    }

    writeText("Sloupce jsou seřazené, přesuneme je zpět nahoru.");
    if (LeftTemp) pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","28","LR","32","LR");
    else pseudoColours("0","DR","1","DR","2","DR","5","DR","9","DR","31","LR","32","LR");
    await Promise.all(animationPromises); //puštění všech animací najednou 
    await waitForUserInput(); if(dataChange_flag) return;
}

function writeVar() 
{
    document.getElementById("var1").textContent = "size = " + size,
    document.getElementById("var2").textContent = "left = " + left,
    document.getElementById("var3").textContent = "mid = " + mid,
    document.getElementById("var4").textContent = "right = " + right,
    document.getElementById("var5").textContent = "i = " + i,
    document.getElementById("var6").textContent = "j = " + j,
    document.getElementById("var7").textContent = "k = " + k,
    document.getElementById("var8").textContent = "LeftN = " + leftArray,
    document.getElementById("var9").textContent = "RightN = " + rightArray
}

async function swap_barsMerge(k, p)
{   
    let bar = svg.select("#bar" + k); 
    let text = svg.select("#text" + k);

    bar
        .transition()
        .duration(1000)
        .ease(d3.easePolyInOut.exponent(2))
        .attr("x", temp[p][0])
        .attr("y", (parseFloat(bar.attr("y")) + recHeight))

    await text
        .transition()
        .duration(1000)
        .ease(d3.easePolyInOut.exponent(2))
        .attr("x", temp[p][1])
        .attr("y", (parseFloat(text.attr("y")) + recHeight))
        .end();
}

