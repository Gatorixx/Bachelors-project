<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Řazení výběrem</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Řazení výběrem">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="100x100" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/sorting.css">
    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/slider.css">
    
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="javaScript/BarChart.js"></script>
    <script src="javaScript/Logic.js"></script>
    <script src="javaScript/Selectionsort.js"></script>
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
                        <p id="pseudo0"><b>procedure</b> SelectionSort(A)</p>
                        <p id="pseudo1">&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> i &larr; 0 <b>to</b> A.length - 2 <b>do</b></p>
                        <p id="pseudo2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min &larr; i</p>
                        <p id="pseudo3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> j &larr; i + 1 <b>to</b> A.length - 1 <b>do</b></p>
                        <p id="pseudo4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>if</b> A[j] &lt; A[min] <b>then</b></p>
                        <p id="pseudo5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min &larr; j</p>
                        <p id="pseudo6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                        <p id="pseudo7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swap(A[i], A[min])</p>
                        <p id="pseudo8">&nbsp;&nbsp;&nbsp;&nbsp;end for</p>
                        <p id="pseudo9">end procedure</p>
                    </div>
                    <div class="descriptionText">
                        <p id="graph_text">K ovládání grafu použijte tlačítka nebo pro step šipku v pravo.</p>
                    </div>
                    <div class="variablesText">
                            <p>PROMĚNNÉ</p>
                            <p id="var1">i = Nedefinováno</p>
                            <p id="var2">j = Nedefinováno</p>
                            <p id="var3">min = Nedefinováno</p>
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
                            Řazení výběrem (Selection sort) může být brán jako opak řazení vkládáním. Místo hledání správného místa pro vybraný element
                                hledá správný element pro předem vybrané místo. Narozdíl od řazení vkládáním má však menší a konstatní počet
                                přesunů. I přes jeho jednoduchost není příliš výkonný a jeho využití nalezneme
                                u menších datových sad.
                        </p>
                        <p>    
                            Stejně jako řazení vkládáním i řazení výběrem rozděluje pole na dvě podpole: seřazené
                                a neseřazené. Poté algoritmus prochází opakovaně neseřazené pole a hledá nejmenší element,
                                který pak vymění s prvním elementem neseřazeného pole tak dlouho, dokud není pole seřazeno.
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
                                    O(n<sup>2</sup>)
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