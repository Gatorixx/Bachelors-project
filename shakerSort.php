<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Řazení přetřásáním</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Řazení přetřásáním">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="100x100" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/sorting.css">
    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="javaScript/BarChart.js"></script>
    <script src="javaScript/Logic.js"></script>
    <script src="javaScript/Shakersort.js"></script>
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
                    <p id="pseudo0"><b>procedure</b> ShakerSort(A)</p>
                    <p id="pseudo1">&nbsp;&nbsp;&nbsp;&nbsp;start &larr; 0; end &larr; A.length - 1; swapped &larr; true</p>
                    <p id="pseudo2">&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> swapped <b>do</b></p>
                    <p id="pseudo3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped &larr; false</p>
                    <p id="pseudo4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> i &larr; start <b>to</b> end - 1 <b>do</b></p>
                    <p id="pseudo5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> A[i] &gt; A[i+1] <b>then</b></p>
                    <p id="pseudo6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(A[i+1], A[i])</p>
                    <p id="pseudo7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped &larr; true</p>
                    <p id="pseudo8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                    <p id="pseudo9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> swapped = false <b>then</b></p>
                    <p id="pseudo10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break</p>
                    <p id="pseudo11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped &larr; false</p>
                    <p id="pseudo12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end &larr; end - 1</p>
                    <p id="pseudo13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> j &larr; end - 1 <b>downto</b> start</p>
                    <p id="pseudo14">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> A[j] &gt; A[j+1] <b>then</b></p>
                    <p id="pseudo15">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(A[j+1], A[j])</p>
                    <p id="pseudo16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped &larr; true</p>
                    <p id="pseudo17">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                    <p id="pseudo18">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;start &larr; start + 1</p>
                    <p id="pseudo19">&nbsp;&nbsp;&nbsp;&nbsp;end while</p>
                    <p id="pseudo20">end procedure</p>

                    </div>
                    <div class="descriptionText">
                        <p id="graph_text">K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.</p>
                    </div>
                    <div class="variablesText">
                        <p>PROMĚNNÉ</p>
                        <p id="var1">i = Nedefinováno</p>
                        <p id="var2">j = Nedefinováno</p>
                        <p id="var3">start = Nedefinováno</p>
                        <p id="var4">end = Nedefinováno</p>
                        <p id="var5">swapped = Nedefinováno</p>
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
                            Řazení přetřísáním (Shaker sort) je optimalizovanou verzí bublinkového řazení, kdy narozdíl od něj
                                prochází pole oběma směry. Ačkoliv však procházení oběma směry může zlepšit výkon algoritmu,
                                je tento algoritmus zřídka použit v praxi. Je však výborným příkladem obousměrného řadicího algoritmu.
                        </p>
                        <p>    
                            Algoritmus začíná procházet pole zleva doprava a porovnává sousední elementy. Pokud jsou ve špatném pořadí,
                                vymění je. Poté co algoritmus dosáhne konec pole, začne ho procházet opačným směrem. Každým průchodem tam a zpět
                                algoritmus dostane dva elementy na oba konce, které pak lze považovat za seřazené. V tomto příkladě algoritmus navíc obsahuje
                                proměnnou swapped, která v případě, že se žádný element nevymění, přeruší algoritmus.
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
                                    O(n<sup>2</sup>)
                                </p>
                            </div>
                            <div class="emptyDiv"></div>
                            <div class="case">
                                <p class="complexityText">
                                    Nejlepší případ
                                </p>
                                <p class="complexityNumber">
                                    O(n)
                                </p>
                            </div>
                            <div class="case">
                                <p class="complexityText">
                                    Nejhorší případ
                                </p>
                                <p class="complexityNumber">
                                    O(n<sup>2</sup>)
                                </p>
                            </div>
                            <div class="case">
                                <p class="complexityText">
                                    Paměťová složitost
                                </p>
                                <p class="complexityNumber">
                                    O(1)
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