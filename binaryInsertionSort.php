<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Řazení binárním vkládáním</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Řazení binárním vkládáním">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="100x100" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/sorting.css">
    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    <link rel="stylesheet" type="text/css" href="css/binary.css">
    
    <script src="javaScript/ChooseAlgo.js"></script>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="javaScript/BarChart.js"></script>
    <script src="javaScript/Logic.js"></script>
    <script src="javaScript/BinaryInsertionSort.js"></script>
    <script src="javaScript/Slider.js"></script>
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
                        <p id="pseudo0"><b>procedure</b> BinaryInsertionSort(A)</p>
                        <p id="pseudo1">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> i &larr; 1 <b>to</b> A.length - 1 <b>do</b></p>
                        <p id="pseudo2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp &larr; A[i]</p>
                        <p id="pseudo3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left &larr; 0</p>
                        <p id="pseudo4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right &larr; i - 1</p>
                        <p id="pseudo5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>while</b> left &le; right <b>do</b></p>
                        <p id="pseudo6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mid &larr; &lfloor;(left + right) / 2&rfloor;</p>
                        <p id="pseudo7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> temp &lt; A[mid] <b>then</b></p>
                        <p id="pseudo8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right &larr; mid - 1</p>
                        <p id="pseudo9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>else</b></p>
                        <p id="pseudo10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left &larr; mid + 1</p>
                        <p id="pseudo11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end while</p>
                        <p id="pseudo12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> j &larr; i - 1 <b>downto</b> left <b>do</b></p>
                        <p id="pseudo13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(A[j+1], A[j])</p>
                        <p id="pseudo14">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                        <p id="pseudo15">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                        <p id="pseudo16">end procedure</p>
                    </div>
                    <div class="descriptionText">
                        <p id="graph_text">K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.</p>
                    </div>
                    <div class="variablesText">
                        <p>PROMĚNNÉ</p>
                        <p id="var1">i = Nedefinováno</p>
                        <p id="var2">j = Nedefinováno</p>
                        <p id="var3">temp = Nedefinováno</p>
                        <p id="var4">left = Nedefinováno</p>
                        <p id="var5">right = Nedefinováno</p>
                        <p id="var6">mid = Nedefinováno</p>          
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
                            Řazení binárním vkládáním (Binary insertion sort) je optimalizovanou verzí klasického řazení vkládáním.
                            Tato optimalizace spočívá ve způsobu hledání správné pozice pro element, který se algoritmus 
                            chystá vložit do seřazeného podpole.
                        </p>
                        <p>    
                            Stejně jako řazení vkládáním i tento algoritmus rozděluje pole na dvě podpole: seřazené a 
                            neseřazené. První element pole je automaticky brán jako seřazený. V každém cyklu pak algoritmus 
                            vybírá vždy první element neseřazeného pole. Narozdíl od řazení vkládáním, algoritmus postupně neporovnává
                            elementy v poli, ale používá k nalezení správné pozice binární vyhledávání. To využívá metodu rozděl a panuj.
                            Seřazené pole tedy rozdějí na dvě poloviny a díky porovnání středu s elementem, který chce vložit zjistí, do 
                            které poloviny pole patří. Opakováním této sekvence pak určí správné místo, na které element vložit. Tímto způsobem
                            je možné drasticky snížit počet porovnání.
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
                                    O(1) or O(log n)
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