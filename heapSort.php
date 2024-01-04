<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Řazení haldou</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Řazení haldou">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="100x100" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/sorting.css">
    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="javaScript/BarChart.js"></script>
    <script src="javaScript/Logic.js"></script>
    <script src="javaScript/HeapSort.js"></script>
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
                            <p id="pseudo0"> <b>procedure</b> Heapsort(A)</p>
                            <p id="pseudo1">&nbsp;&nbsp;&nbsp;&nbsp;MaxHeap(A)</p>
                            <p id="pseudo2">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> i &larr; A.length - 1 <b>downto</b> 1 <b>do</b></p>
                            <p id="pseudo3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; swap(A[0], A[i])</p>
                            <p id="pseudo4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; j &larr; 0</p>
                            <p id="pseudo5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>do</b></p>
                            <p id="pseudo6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index &larr; 2 * j + 1</p>
                            <p id="pseudo7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> index &lt; (i - 1) &and; A[index] &lt; A[index + 1] <b>then</b></p>
                            <p id="pseudo8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index &larr; index + 1</p>
                            <p id="pseudo9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> index &lt; i &and; A[j] &lt; A[index] <b>then</b></p>
                            <p id="pseudo10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(A[j], A[index])</p>
                            <p id="pseudo11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j &larr; index</p>
                            <p id="pseudo12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> index &lt; i <b>do</b></p>
                            <p id="pseudo13">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo14">end procedure</p>    
                            <p id="pseudo15"> <b>procedure</b> MaxHeap(A)</p>   
                            <p id="pseudo16">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> k &larr; 1 <b>to</b> A.length - 1 <b>do</b></p>
                            <p id="pseudo17">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> A[k] &gt; A[&lfloor;(k - 1) / 2&rfloor;] <b>then</b></p>
                            <p id="pseudo18">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; l &larr; k</p>                                         
                            <p id="pseudo19">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>while</b> A[l] &gt; A[&lfloor;(l - 1) / 2&rfloor;] <b>do</b></p>  
                            <p id="pseudo20">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; swap(A[l], A[&lfloor;(l - 1)/ 2&rfloor;])</p>  
                            <p id="pseudo21">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; l &larr; &lfloor;(l - 1) / 2&rfloor;</p> 
                            <p id="pseudo22">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; end while</p> 
                            <p id="pseudo23">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                            <p id="pseudo24">end procedure</p>
                        </div>
                        <div class="descriptionText">
                            <p id="graph_text">K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.</p>
                        </div>
                        <div class="variablesText">
                            <p>PROMĚNNÉ</p>
                            <p id="var1">i = Nedefinováno</p>
                            <p id="var2">j = Nedefinováno</p>
                            <p id="var3">index = Nedefinováno</p>
                            <p id="var4">k = Nedefinováno</p>
                            <p id="var5">l = Nedefinováno</p>
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
                            Řazení haldou (Heap sort) je velice efektivní algoritmus, který k řazení využívá haldu. Halda je speciální
                            datová struktura, kterou můžeme nazvat binárním stromem. Pro účely algoritmu je však potřeba halda,
                                jejíž kořen je největší element v poli a všichni rodiče splňují podmínku, že jejich potomci jsou menší jim samým.
                            Taková halda se pak může nazvat maximální dle anglického Max-Heap.
                        </p>
                        <p>    
                            Základ algoritmu tedy spočívá ve vytvoření maximální haldy, o kterou se stará procedura MaxHeap. Jelikož kořen haldy vždy
                                tvoří největší element v poli, algoritmus ho vymění s posledním elementem v poli. Poté už algoritmus jen
                                využívá informace získané z maximální haldy k jejímu znovu sestavení.
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