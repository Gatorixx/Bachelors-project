<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Řazení slučováním</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Řazení slučováním">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="100x100" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/sorting.css">
    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="javaScript/BarChart.js"></script>
    <script src="javaScript/Logic.js"></script>
    <script src="javaScript/Mergesort.js"></script>
    <script src="javaScript/Slider.js"></script>
    <script src="javaScript/ChooseAlgo.js"></script>

    <script src="javaScript/Menu.js"></script>
</head>
<body>
    <?php require_once("header.php")?>
    <main>
        <div class="sortingPage">
            <div class="outerGrid">
                <div class="lista">
                    <div class="buttonsCSS">
                        <button id="random">Náhodná data</button>
                        <button id="descending">Sestupná data</button>
                        <button id="step" >KROK</button>
                        <button id="stop">STOP</button>
                        <button id="play">PLAY</button>
                    </div>
                    <div class="sliderCSS">
                        <div class="valueCenter">
                        <div class="sliderValue">
                        <p id="value"></p>
                        </div>
                        </div>
                        <input type="range" min="5" max="25" value="10" id="slider">
                    </div>
                </div>
                <div class="grafPlocha">
                    <div id="chart" >

                    </div>
                </div>
                <div class="textfield">
                        <div class="pseudoText"> 
                            <p id="pseudo0"> <b>procedure</b> IterativeMergesort(A)</p>
                            <p id="pseudo1">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> size &larr; 1 <b>to</b> A.length - 1 <b>step</b> size * 2 <b>do</b></p>
                            <p id="pseudo2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> left &larr; 0 <b>to</b> A.length - 2 <b>step</b> size * 2 <b>do</b></p>
                            <p id="pseudo3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mid &larr; min(left + size - 1, A.length - 1)</p>
                            <p id="pseudo4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; right &larr; min(left + 2 * size - 1, A.length - 1)</p>
                            <p id="pseudo5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Merge(A, left, mid, right)</p>
                            <p id="pseudo6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo7">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo8">end procedure</p> 
                            <p id="pseudo9"> <b>procedure</b> Merge(A, l, m, r)</p>
                            <p id="pseudo10">&nbsp;&nbsp;&nbsp;&nbsp;LeftN = m - l + 1</p>
                            <p id="pseudo11">&nbsp;&nbsp;&nbsp;&nbsp;RightN = r - m</p>
                            <p id="pseudo12">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> i &larr; 0 <b>to</b> LeftN - 1 <b>do</b></p>
                            <p id="pseudo13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L[i] &larr; A[l + i]</p>
                            <p id="pseudo14">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo15">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> j &larr; 0 <b>to</b> RightN - 1 <b>do</b></p>
                            <p id="pseudo16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R[j] &larr; A[m + 1 + j]</p>
                            <p id="pseudo17">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo18">&nbsp;&nbsp;&nbsp;&nbsp;i &larr; 0, j &larr; 0, k &larr; l</p>
                            <p id="pseudo19">&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> i < LeftN &and; j < RightN <b>do</b></p>
                            <p id="pseudo20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> L[i] <= R[j] <b>then</b></p>
                            <p id="pseudo21">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A[k] &larr; L[i], i &larr; i + 1</p>
                            <p id="pseudo22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>else</b></p>
                            <p id="pseudo23">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A[k] &larr; R[j], j &larr; j + 1</p>
                            <p id="pseudo24">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k &larr; k + 1</p>
                            <p id="pseudo25">&nbsp;&nbsp;&nbsp;&nbsp;end while</p>
                            <p id="pseudo26">&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> i < LeftN <b>do</b></p>
                            <p id="pseudo27">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A[k] &larr; L[i], i &larr; i + 1, k &larr; k + 1</p></p>
                            <p id="pseudo28">&nbsp;&nbsp;&nbsp;&nbsp;end while</p>
                            <p id="pseudo29">&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> j < RightN <b>do</b></p>
                            <p id="pseudo30">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A[k] &larr; R[j], j &larr; j + 1, k &larr; k + 1</p></p>
                            <p id="pseudo31">&nbsp;&nbsp;&nbsp;&nbsp;end while</p>
                            <p id="pseudo32">end procedure</p>
                        </div>
                        <div class="descriptionText">
                            <p id="graph_text">K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.</p>
                        </div>
                        <div class="variablesText">
                            <p>PROMĚNNÉ</p>
                            <p id="var1">size = Nedefinováno</p>
                            <p id="var2">left = Nedefinováno</p>
                            <p id="var3">mid = Nedefinováno</p>
                            <p id="var4">right = Nedefinováno</p>
                            <p id="var5">i = Nedefinováno</p>
                            <p id="var6">j = Nedefinováno</p>
                            <p id="var7">k = Nedefinováno</p>
                            <p id="var8">LeftN = Nedefinováno</p>
                            <p id="var9">RightN = Nedefinováno</p>
                        </div>
                </div>
            </div>
            <div class="textPartOuter">
                <div class="textPart">
                    <div class="text">
                        <h2>
                            Popis
                        </h2>
                        <p>
                            Řazení slučováním (Merge sort) je jeden z velice efektivních algoritmů a i přes to, že je již více než 70 let starý, je stále populární. 
                                Tento algoritmus jako spousta jiných pracuje s metodou rozděl a panuj. Rozděluje tak pole na menší úseky, které seřadí a následně
                                skládá zpět dohromady. Jelikož tento algoritmus zajišťuje konstatní časovou náročnost, je velice výhodný pro veliké datové sety.
                        </p>
                        <p>    
                            Postup řazení slučováním se v jeho rekurzivní a iterativní verzi může malinko lišit, pro přehlednost byla však zvolena druhá možnost.
                                Algoritmus v tomto případě začne nejmenšími možnými úseky, tedy úseky o velikosti dvou elementů. Tyto úseky jsou vždy rozděleny
                                na levou a pravou část. Postupně pak algoritmus porovnává elementy z levé a pravé části a řadí je postupně do společné části ve 
                                správném pořadí. Po dokončení porovnávání celého pole se velikost úseků vždy zdvojnásobí. 
                        </p>
                    </div>
                    <div class="complexity">
                        <h2>
                            Složitost
                        </h2>
                        <div class="complexityTable">
                            <div class="case">
                                <p class="complexityText">
                                    Průměrný případ
                                </p>
                                <p class="complexityNumber">
                                    O(n × log n)
                                </p>
                            </div>
                            <div class="emptyDiv"></div>
                            <div class="case">
                                <p class="complexityText">
                                    Nejlepší případ
                                </p>
                                <p class="complexityNumber">
                                    O(n × log n)
                                </p>
                            </div>
                            <div class="case">
                                <p class="complexityText">
                                    Nejhorší případ
                                </p>
                                <p class="complexityNumber">
                                    O(n × log n)
                                </p>
                            </div>
                            <div class="case">
                                <p class="complexityText">
                                    Paměťová složitost
                                </p>
                                <p class="complexityNumber">
                                    O(log n)
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>
    <?php require_once("footer.php")?>
</body>
</html>