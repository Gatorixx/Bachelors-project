<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Rychlé řazení</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Rychlé řazení">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="100x100" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/sorting.css">
    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="javaScript/Slider.js"></script>
    <script src="javaScript/BarChart.js"></script>
    <script src="javaScript/Logic.js"></script>
    <script src="javaScript/QuickSort.js"></script>
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
                            <p id="pseudo0"> <b>procedure</b> IterativeQuicksort(A)</p>
                            <p id="pseudo1">&nbsp;&nbsp;&nbsp;&nbsp;top &larr; -1</p>
                            <p id="pseudo2">&nbsp;&nbsp;&nbsp;&nbsp;stack[++top] &larr; 0</p>
                            <p id="pseudo3">&nbsp;&nbsp;&nbsp;&nbsp;stack[++top] &larr; A.length - 1</p>
                            <p id="pseudo4">&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> top &gt; &equals; 0 <b>do</b></p>
                            <p id="pseudo5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;h &larr; stack[top--]</p>
                            <p id="pseudo6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l &larr; stack[top--]</p>
                            <p id="pseudo7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p &larr; partition(A, l, h)</p>
                            <p id="pseudo8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> &larr; p - 1 &gt; l <b>then</b></p>
                            <p id="pseudo9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack[++top]  &larr; l </p>
                            <p id="pseudo10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack[++top]  &larr; p - 1 </p>
                            <p id="pseudo11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> &larr; p + 1 &lt; h <b>do</b></p>
                            <p id="pseudo12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack[++top]  &larr; p + 1 </p>
                            <p id="pseudo13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stack[++top]  &larr; h </p>
                            <p id="pseudo14">&nbsp;&nbsp;&nbsp;&nbsp;end while</p>
                            <p id="pseudo15">end procedure</p>

                            <p id="pseudo16"> <b>procedure</b> Partition(A, l, h)</p>
                            <p id="pseudo17">&nbsp;&nbsp;&nbsp;&nbsp;pivot &larr; A[h]</p>
                            <p id="pseudo18">&nbsp;&nbsp;&nbsp;&nbsp;i &larr; l - 1</p>
                            <p id="pseudo19">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> j &larr; l <b>to</b> h - 1 <b>do</b></p>
                            <p id="pseudo20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> A[j] &lt; &equals; pivot <b>then</b></p>
                            <p id="pseudo21">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i++</p>
                            <p id="pseudo22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(A[i], A[j])</p>
                            <p id="pseudo23">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo24">&nbsp;&nbsp;&nbsp;&nbsp;swap(A[h], A[i + 1])</p>
                            <p id="pseudo25">&nbsp;&nbsp;&nbsp;&nbsp;return i + 1</p>
                            <p id="pseudo26">end procedure</p>

                        </div>
                        <div class="descriptionText">
                            <p id="graph_text">K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.</p>
                        </div>
                        <div class="variablesText">
                            <p>PROMĚNNÉ</p>
                            <p id="var1">top = Nedefinováno</p>
                            <p id="var2">l = Nedefinováno</p>
                            <p id="var3">h = Nedefinováno</p>
                            <p id="var4">p = Nedefinováno</p>
                            <p id="var5">pivot = Nedefinováno</p>
                            <p id="var6">i = Nedefinováno</p>
                            <p id="var7">j = Nedefinováno</p>
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
                            Rychlé řazení (Quick sort) je dnes pravděpodobně nejpoužívanější řadicí algoritmus. Algoritmus využívá metody
                                rozděl a panuj. V tomto případě však nejsou jednotlivé úseky rozděleny rovnoměrně, jelikož jsou rozděleny 
                                na základě pivota. Pivot je jedním z elementů pole, který může být vybrán podle různých pravidel (první, poslední, náhodný atd.).
                                Pro jednoduchost se tento příklad drží vyběru posledního elementu v poli.
                        </p>
                        <p>    
                            Algoritmus jako první krok určí pivot, což je v tomto případě poslední element. Následně prochází celé pole, element po elementu
                                a všechny elementy menší než pivot zařadí vlevo. Poté stačí pivot vyměnit s prvním větším elementem a označit pivot jako seřazený.
                                Tento krok může vytvořit dva nové úseky po stranách pivota. Pro tyto úseky však bude platit naprosto stejný postup. Pokud na straně od seřazeného
                                pivota zůstane pouze jeden element, automaticky ho označíme jako seřazený. 
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
                                    O(n<sup>2</sup>)
                                </p>
                            </div>
                            <div class="case">
                                <p class="complexityText">
                                    Paměťová složitost
                                </p>
                                <p class="complexityNumber">
                                    O(n × log n)
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