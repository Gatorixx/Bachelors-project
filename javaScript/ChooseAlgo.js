window.addEventListener('load', () => 
{
    const url = window.location.pathname;

    let urlNames = 
    {
        "frontPage": () => updatePage("block", "", undefined),
        "bubbleSort": () => updatePage("none", "‣ Bublinkové řazení", 7),
        "insertionSort": () => updatePage("none", "‣ Řazení vkládáním", 9),
        "binaryInsertionSort": () => updatePage("none", "‣ Řazení binárním vkládáním", 16),
        "selectionSort": () => updatePage("none", "‣ Řazení výběrem", 9),
        "shakerSort": () => updatePage("none", "‣ Řazení přetřásáním", 20),
        "shellSort": () => updatePage("none", "‣ Shellovo řazení", 12),
        "heapSort": () => updatePage("none", "‣ Řazení haldou", 24),
        "mergeSort": () => updatePage("none", "‣ Řazení slučováním", 32),
        "quickSort": () => updatePage("none", "‣ Rychlé řazení", 26),
        "timeComparison": () => updatePage("none", "‣ Časové porovnání", undefined),
        "userManual": () => updatePage("block", "‣ Uživatelská příručka", undefined)
    }

    function updatePage(style_, header_text, pseudo_number)
    {
        this.document.getElementById("arrowID").style.display = style_;
        this.document.getElementById("chosen").innerText = header_text;
        pseudoNumber = pseudo_number;
    }

    Object.keys(urlNames).forEach(key => 
    {
        if (url.includes(key)) 
        {
            urlNames[key]();
        }
    });
})
