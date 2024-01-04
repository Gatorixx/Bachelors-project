<!DOCTYPE html>
<html lang="en">
<head>
    <title>Uživatelská příručka</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edukační web aplikace pro základy algoritmizace | Uživatelská příručka">
    <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    <link rel="shortcut icon" sizes="192x192" href="images/favicon.png">
    <link rel="apple-touch-icon" href="images/favicon.png">

    <link rel="stylesheet" type="text/css" href="css/basicPage.css">

    <script src="javaScript/Menu.js"></script>
    <script src="javaScript/ChooseAlgo.js"></script>
</head>
<body>
    <?php require_once("header.php")?>
    <main class="userManual">
        <h1>
            Uživatelská příručka
        </h1>
        <p>
            Tato uživatelská příručka slouží jako podrobný návod k používání aplikace, navigace v ní a vysvětlení dodatečných
            prvků aplikace, jako je například využití barev a jejich význam v aplikaci.
        </p>
        <h3>
            Podporovaná zařízení
        </h3>
        <p>
            Aplikace byla vyvinuta především pro desktopová zařízení, jelikož na zařízeních s menším rozlišením obrazovky
            by uživatel nemohl plně využít všech funkcí aplikace. Proto aplikace pro tyto zařízení není zcela přizpůsobena. 
        </p>
        <p>
            Pro správné fungování aplikace musí mít uživatel na svém zařízení povolený JavaScript. Bez JavaScriptu nejsou uživateli 
            k dispozici žádné interaktivní funkce obsluhující aplikaci.
        </p>
        <h3>
            Zvolené algoritmy
        </h3>
        <p>
            Algoritmy dostupné v této webové aplikaci byly vybrány na základě výuky předmětu základy algoritmizace vyučovaném na 
            univerzitě ČVUT na fakultě FJFI. Byly vybrány převážně algoritmy, jež se často používají pro seznámení studentů s 
            problematikou řadicích algoritmů a dále algoritmy často využívané v praxi. Algoritmy, které běžně využívají rekurzi 
            jsou zde představeny pouze v jejich iterativní verzi. Důvodem použití iterativních verzí těchto algoritmů je předhlednost 
            při vybarvování jednotlivých řádků pseudokódu. Při použití rekurze by bylo pro uživatele nepřehledné, v jaké rekurzi se program právě nachází.
        </p>
        <h3>
            Ovládání aplikace
        </h3>
        <p>
            Hlavním ovládacím prvkem aplikace je vyskakovací menu v levém horním rohu obrazovky. Je reprezentováno třemi vodorovnými čarami a 
            po rozkliknutí zobrazí uživateli všechny podstránky na které může vstoupit. Další ovládací prvky jednotlivých podstránek budou popsány níže.
        </p>
        <h2>
            Vizualizační část
        </h2>
        <p>
            Vizualizační částí aplikace je myšleno devět podstránek samostatných algoritmů. Každá ze stránek se tak plně věnuje jednomu z algoritmů. 
            Součástí těchto stránek je panel tlačítek, sloupcový graf, panel pseudokódu, panel popisu kroků, panel proměnných, popis a složitost algoritmu.

        </p>
        <h3>
            Panel tlačítek
        </h3>
        <p>
            Panel tlačítek slouží k ovládání sloupcového grafu a tedy i zahájení animační sekvence. Panel obsahuje posuvník a pět tlačítek. 
        </p>
        <p>
            <b>Posuvník</b> slouží k nastavení počtu sloupců grafu. Tuto hodnotu lze nastavit mezi 5 a 25 sloupci, přičemž základní hodnota při načtení stránky
            je 10 sloupců.
        </p>
        <p>
            <b>Tlačítka „Náhodná data“ a „Sestupná data“</b> slouží k nastavení dat sloupcového grafu. Náhodné data jsou genovány funkcí <i>Math.random()</i> a 
            vytváří hodnoty od 0 do 25. Sestupná data jsou odvozeny od hodnoty nastavené na posuvníku, jež určí nejvyšší hodnotu grafu.
        </p>
        <p>
            <b>Tlačítka „Krok“, „Start“ a „Stop“</b> slouží k ovládání animační sekvence. Tlačítko „Krok“ tedy provede jen část algoritmu a dále čeká na 
            uživatelské pokyny. Tlačítko „Start“ spouští animaci bez čekání na uživatelské pokyny v jednotlivých krocích. Animace pak pokračuje 
            dokud uživatel tuto sekvenci nezastaví pomocí tlačítka „Stop“ nebo algoritmus nedokončí řazení.
        </p>
        <h3>
            Sloupcový graf
        </h3>
        <p>
            Sloupcový graf slouží pouze k vizualizaci a se samotným grafem tak uživatel nemůže přímo interagovat. Každý sloupec grafu 
            obsahuje číselnou hondotu ve své horní části. Základní barva sloupců  je tyrkysová, avšak v průběhu animací se uživatel může setkat s několika 
            jinými barvami:
        </p>
        <p class="colouredRect">
            <b style='color: red;font-size: 30px'>■</b> - Aktivní sloupec
        </p>
        <p class="colouredRect">
            <b style='color: OrangeRed;font-size: 30px'>■</b> - Seřazené podpole
        </p>
        <p class="colouredRect">
            <b style='color: Orange;font-size: 30px'>■</b> - Seřazený sloupec na správném místě
        </p>
        <p class="colouredRect">
            <b style='color: Blue;font-size: 30px'>■</b> - Označení sloupce se kterým se nadále pracuje, ale není právě teď aktivní
        </p>
        <p class="colouredRect">
            <b style='color: darkslateblue;font-size: 30px'>■</b> - Levé podpole pro řazení slučováním
        </p>
        <p class="colouredRect">
            <b style='color: purple;font-size: 30px'>■</b> - Pravé podpole pro řazení slučováním
        </p>
        <p>
            Speciálním případem jsou pak šipky na podstránce řazení birnárním vkládáním. Levá šipka je zde reprezentována modrou, pravá červenou a prostřední 
            fialovou barvou.
        </p>
        <h3>
            Panel pseudokódu
        </h3>
        <p>
            Panel pseudokódu obsahuje celý pseudokód jednotlivých algoritmů. Pole podle standartu začíná v nule. V případě for cyklů, pokud není specifikováno jinak, 
            se hodnota proměnné zvedá či snižuje o hodnotu 1. Podmínka těchto cyklů se vždy předpokládá <= nebo >=. 
            Při vybarvování pseudokódu jsou použity dvě barvy:   
        </p>
        <p class="colouredRect">
            <b style='color: rgb(56, 0, 0);font-size: 30px'>■</b> - Označení cyklů, ve kterých se program stále nachází (např. for cykly)
        </p>
        <p class="colouredRect">
            <b style='color: rgb(104, 1, 1);font-size: 30px'>■</b> - Řádky pseudokódu, které proběhly v daném kroku
        </p>
        <h3>
            Panel popisu kroků
        </h3>
        <p>
            Tento panel obsahuje textový popis jednotlivých kroků algoritmu. Tento popis uživateli poskytuje prodrobnosti o tom, co se v daném kroku stalo a 
            popřípadě proč se tomu stalo. I zde jsou v některých situacích použity barvy. Pro hodnotu sloupce je použita červená barva a pro pořadí sloupce je použita 
            žlutá barva společně se znakem „#“ pro jednoznačné rozlišení. Výjimkou jsou pak barvy použity na podstránce řazení binárním vkládáním, které referují hodnoty jednotlivých šipek.
        </p>
        <h3>
            Panel proměnných
        </h3>
        <p>
            Panel proměnných zobrazuje aktuální hodnotu všech proměnných použitých v daném algoritmu. Při načtení stránky a po resetování dat jsou hodnoty vždy nastaveny jako nedefinovány. 
            V okamžiku, kdy je proměnné poprvé přiřazena hodnota, je tato hodnota obratem zobrazena v panelu proměnných. 
        </p>
        <h3>
            Popis a složitost
        </h3>
        <p>
            Součástí podstránek je i krátký popis algoritmu s jednoduchým popsáním jeho fungování a jeho časová a paměťová složitost. Pro časovou složitost 
            jsou zmíněny tři případy: průměrný, nejlepší a nejhorší případ.
        </p>
        <h2>
            Porovnávací část
        </h2>
        <p>
            Podstránka pro časové porovnání je rozdělena na dvě sekce. Formulář pro nastavení počátečních podmínek řazení a záznamová část pro výsledky těchto řazení.
        </p>
        <h3>
            Formulář pro časové porovnání algoritmů
        </h3>
        <p>
            Tento formulář může být pomyslně rozdělen do pěti částí: Textové pole, tlačítka počátečních podmínky pole, výběr algoritmů, tlačítka typu řazení a ovládací tlačítka. 
        </p>
        <p>
            <b>Textové pole</b> umožňuje uživateli zvolit počet elementů v poli. Číslo může být zadáno mezi hodnotou 1000 a 9999999.
        </p>
        <p>
            <b>Tlačítka počátečních podmínek pole</b> umožňují uživateli vybrat počáteční podmínky pro pole, které následně vybrané řadicí algoritmy budou seřazovat. 
            Konkrétně se zde nacházejí čtyři tlačítka:
        </p>
        <p>
            <b>Náhodné</b> - Pole s náhodnými elementy vytvořené pomocí funkce <i>Math.random()</i>.
        </p>
        <p>
            <b>Téměř seřazené</b> - Pole obsahující téměř všechny elementy ve vzestupném pořadí, až na několik elementů posunuté o <b>k</b> hodnotu mimo svou 
            správnou pozici.
        </p>
        <p>
            <b>Sestupné</b> - Pole obsahující všechny elementy v sestupném (obráceném) pořadí. 
        </p>
        <p>
            <b>Několik unikátních</b> - Pole obsahující pouze určitý počet unikátních elementů v poli. To znamená, že většina elementů v poli je stejná. 
            (Např. pole: [1, 3, 1, 2, 2, 3, 4, 4, 1, 2] obsahuje pouze 4 unikátní elementy.)
        </p>
        <p>
            <b>Výběr algoritmů</b> umožňuje uživateli zvolit algoritmy pro následné porovnání rychlosti. Počet vybraných algoritmů není omezen a uživatel 
            tak může zaškrtnout všechna pole. Vždy však musí být zaškrtnuto alespoň jedno.
        </p>
        <p>
            <b>Tlačítka typu řazení</b> nabízí uživateli provádět řazení buďto sekvenčně nebo paralelně. Sekvenční řazení pouští zvolené algoritmy jeden 
            po druhém. Při paralelním řazení probíhá řazení všech algoritmů najednou. Celkový čas řazení při spuštění více algoritmů bude při paralelním 
            řazení rychlejší.

            Výpočty jsou prováděny lokálně pomocí JavaScriptu. V závislosti na hardwaru uživatele se může čas výpočtu lišit, zejména při paralelním řazení.
        </p>
        <p>
            <b>Ovládací tlačítka</b> slouží k zahájení, popřípadně ukončení, porovnávací sekvence a k resetu formuláře. V případě zmáčknutí tlačítka „Stop“ jsou 
            všechny stále probíhající algoritmy přerušeny.
        </p>
        <h3>
            Záznamová část
        </h3>
        <p>
            Záznamová část slouží k uchování výsledků z jednotlivých měření. Zapsané výsledky vždy obsahují všechny počáteční podmínky zadané uživatelem. V pořadí
            : název algoritmu, počet elementů, počáteční podmínky pole, typ řazení a naměřený čas.
        </p>
    </main>
    <?php require_once("footer.php")?>
</body>
</html>