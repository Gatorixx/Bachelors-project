<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Časové porovnání</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Časové porovnání">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="192x192" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/buttons.css">
    <link rel="stylesheet" type="text/css" href="css/timecomparison.css">

    <script src="javaScript/ChooseAlgo.js"></script>
    <script src="javaScript/TimeComparison.js"></script>
    <script src="javaScript/Menu.js"></script>
</head>
<body>
    <?php require_once("header.php")?>
    <main>
        <div class="wrapper">
            <div class="wrapperForm">
                <form action="" id="comparisonForm">
                    <div class="elementsNumber">
                        <label for="numberOfElements">Počet elementů:</label>
                        <input type="text" title="Vyplňte číslo od 1000 do 9999999" id="numberOfElements" pattern="\b(?:[1-9]\d{3,6}|[1-9]\d{6}|[1-8]\d{7}|9[0-8]\d{6}|9{2}[0-8]\d{5}|99{3}[0-8]\d{4}|999{4}[0-8]\d{3}|9999{5}[0-8]\d{2}|99999{6}[0-8]\d|9999999)\b" required>
                    </div>
                    <div class="arrayType">
                        <button type="button" id="Náhodné" class="arrayButton" required>Náhodné</button>
                        <button type="button" id="Téměř seřazené" class="arrayButton" required>Téměř seřazené</button>
                        <button type="button" id="Sestupné" class="arrayButton" required>Sestupné</button>
                        <button type="button" id="Několik unikátních" class="arrayButton" required>Několik unikátních</button>
                    </div>
                    <div class="algorithms">

                                <input type="checkbox" id="Shellovo řazení" class="checkbox" value="shell" required>
                                <label for="Shellovo řazení">Shellovo řazení</label>

                                <input type="checkbox" id="Řazení slučováním" class="checkbox" value="merge" required>
                                <label for="Řazení slučováním">Řazení slučováním</label>

                                <input type="checkbox" id="Řazení haldou" class="checkbox" value="heap" required>
                                <label for="Řazení haldou">Řazení haldou</label>

                                <input type="checkbox" id="Rychlé řazení" class="checkbox" value="quick" required>
                                <label for="Rychlé řazení">Rychlé řazení</label>
                            
                                <input type="checkbox" id="Řazení vkládáním" class="checkbox" value="insertion" required>
                                <label for="Řazení vkládáním">Řazení vkládáním</label>
                            
                                <input type="checkbox" id="Řazení binárním vkládáním" class="checkbox" value="binaryinsertion" required>
                                <label for="Řazení binárním vkládáním">Řazení binárním vkládáním</label>
                            
                                <input type="checkbox" id="Řazení výběrem" class="checkbox" value="selection" required>
                                <label for="Řazení výběrem">Řazení výběrem</label>

                                <input type="checkbox" id="Řazení přetřásáním" class="checkbox" value="shaker" required>
                                <label for="Řazení přetřásáním">Řazení přetřásáním</label>
                            
                                <input type="checkbox" id="Bublinkové řazení" class="checkbox" value="bubble" required>
                                <label for="Bublinkové řazení">Bublinkové řazení</label>
                                
                    </div>
                    <div>
                        <button type="button" id="Sekvenční" class="sortingTypeC" required>Sekvenční řazení</button>
                        <button type="button" id="Paralelní" class="sortingTypeC" required>Paralelní řazení</button>
                    </div>
                    <div class="startStopButtons">
                        <button type="submit" id="startButton" class="btnStart">Start</button>
                        <button type="button" id="stopButton" class="btnStop">Stop</button>
                        <button type="button" id="resetButton" class="btnReset">Reset formuláře</button>
                    </div>
                </form>
            </div>
            <div class="logClass">
                    <div class="logTopText">
                        <p>Algoritmus | Počet elementů | Typ pole | Typ řazení | Čas</p>
                    </div>
                    <div id="logID">
                        <div id="algorithmID"></div>
                        <div id="numberOfElementsID"></div>
                        <div id="arrayTypeID"></div>
                        <div id="sortTypeID"></div>
                        <div id="timeID"></div>
                    </div>

            </div>    
            <div class="textUnder">
                    <h2>
                        Sekvenční a paralelní řazení
                    </h2>
                    <p>
                        Sekvenční řazení spouští zvolené algoritmy postupně, jeden za druhým.
                        Zatím co paralelní řazení pustí všechny zvolené algoritmy najednou. V závislosti na hardwaru uživatele 
                        se může čas při paralelním řazení mírně lišit. Celkový čas dokončení všech algoritmů, však bude menší.
                    </p>
                    <p>
                        Výpočty jsou prováděny lokálně pomocí javascriptu. Proto se výsledky mohou na 
                        různých zařízeních lišit.
                    </p>    
            </div> 
        </div>     
    </main>
    <?php require_once("footer.php")?>
</body>
</html>