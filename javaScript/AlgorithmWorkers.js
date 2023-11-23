let finished = false;               //Globální proměnná stavu řazení hotový/nehotový
let startTime;                      //Globální prommená čas započnutí řazení
let endTime;                        //Globální proměnná čas ukončení před počítáním času
let elapsedTime = 0;                //Globální promměná uběhlý čas
let sendTime;                       //Globální promměná čas od posledního poslání zprávy


function mergeSortTP(array)
{
    let newArray = array.slice(); //Vytvoření shallow kopie
    startTime = performance.now();
    sendTime = performance.now(); 

    for (let size = 1; size <= array.length - 1; size = 2 * size) 
    {
        for (let left = 0; left < array.length - 1; left += 2 * size) 
        {
            let mid = Math.min(left + size - 1, array.length - 1);

            let right = Math.min(left + 2 * size - 1, array.length - 1);

            merge(newArray, left, mid, right);
        }
    }

    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000; //uběhlý čas v sekundách
    sendMessage(); //Poslání poslední zprávy
}

function merge(array , l , m , r) 
{
    let i, j, k;
    let LeftN = m - l + 1;
    let RightN = r - m;

    let L = Array(LeftN).fill(0);
    let R = Array(RightN).fill(0);

    for (i = 0; i < LeftN; i++)
        L[i] = array[l + i];
    for (j = 0; j < RightN; j++)
        R[j] = array[m + 1 + j];

    i = 0;
    j = 0;
    k = l;

    while (i < LeftN && j < RightN) 
    {
        if (L[i] <= R[j]) 
        {
            array[k] = L[i];
            i++;
        } 
        else 
        {
            array[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < LeftN) 
    {
        array[k] = L[i];
        i++;
        k++;
    }

    while (j < RightN) 
    {
        array[k] = R[j];
        j++;
        k++;
    }
    
    messageToSend();
}


function quickSortTP(array)
{
    let newArray = array.slice(); //Vytvoření shallow kopie
    startTime = performance.now();
    sendTime = performance.now();

    let stack = new Array(array.length); 
    let top = -1; 

    stack[++top] = 0; 
    stack[++top] = array.length - 1; 

    while (top >= 0) 
    { 

        let h = stack[top--]; 
        let l = stack[top--]; 

        let p = partition(newArray, l, h); 

        if (p - 1 > l) 
        { 
            stack[++top] = l; 
            stack[++top] = p - 1; 
        } 

        if (p + 1 < h) 
        { 
            stack[++top] = p + 1; 
            stack[++top] = h; 
        } 
    } 
    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage(); //Poslání poslední zprávy
} 


function partition(array, l, h) 
{ 
    let pivot = array[h]; 
    let i = (l - 1); 

    for (let j = l; j <= h - 1; j++) 
    { 
        if (array[j] <= pivot) 
        { 
            i++; 
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        } 
    } 

    let temp = array[i + 1];
    array[i + 1] = array[h];
    array[h] = temp;

    messageToSend();

    return i + 1; 
} 

function heapSortTP(array)
{
    let newArray = array.slice(); //Vytvoření shallow kopie
    startTime = performance.now();
    sendTime = performance.now();

    maxHeap(newArray);

    for (let i = array.length - 1; i > 0; i--)
    {
        let j = 0;
        let temp = newArray[0];
        newArray[0] = newArray[i];
        newArray[i] = temp;

        do
        {
            var index = (2 * j + 1);
            if (newArray[index] < newArray[index + 1] && index < (i - 1))
            {
                index++;
            }

            if (newArray[j] < newArray[index] && index < i)
            {
                let temp = newArray[j];
                newArray[j] = newArray[index];
                newArray[index] = temp;
            }
            j = index;

        } while (index < i);

        messageToSend();
    }

    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
}

function maxHeap(array)
{ 
    for(let k = 1; k < array.length; k++)
    {
        if (array[k] > array[Math.floor((k - 1) / 2)]) //potomek je větší než rodič
        {
            let l = k;
            while (array[l] > array[Math.floor((l - 1) / 2)]) //swapuji dokud je rodič menší
            {          
                let temp = array[l];
                array[l] = array[Math.floor((l - 1) / 2)];
                array[Math.floor((l - 1) / 2)] = temp;

                l = (Math.floor((l - 1) / 2));
            }
        }
    }
}

function shellSortTP(array)
{
    let newArray = array.slice();
    startTime = performance.now();
    sendTime = performance.now();

    let gap = Math.floor(array.length/2);
    while (gap > 0)
    {
        for(let i = gap; i < array.length; i++)
        {
            let j = i;
            while(j >= gap && newArray[j - gap] > newArray[j])
            {
                let temp = newArray[j - gap];
                newArray[j - gap] = newArray[j];
                newArray[j] = temp;
                j = j - gap;
            }
        }
        gap = Math.floor(gap/2);

        messageToSend();
    }

    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
}


function cocktailTP(array)
{
    let newArray = array.slice(); //Vytvoření shallow kopie
    startTime = performance.now();
    sendTime = performance.now();

    let swapped = true;
    let start = 0;
    let end = array.length - 1;

    while (swapped)
    {
        swapped = false;
        for (let i = start; i < end; i++) 
        {
            if (newArray[i] > newArray[i + 1]) 
            {
                let temp = newArray[i];
                newArray[i] = newArray[i+1];
                newArray[i+1] = temp;

                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;

        end--;

        for (let j = end - 1; j >= start; j--) 
        {
            if (newArray[j] > newArray[j + 1]) 
            {
                let temp = newArray[j+1];
                newArray[j+1] = newArray[j];
                newArray[j] = temp;
                swapped = true;
            }
        }

        start++;

        messageToSend();
    }


    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
}

function selectionSortTP(array)
{
    let newArray = array.slice();
    startTime = performance.now();
    sendTime = performance.now();

    for (let i = 0; i < array.length - 1; i++)
    {
        let min = i;

        for (let j = i + 1; j < array.length; j++)
        {
            if (newArray[j] < newArray[min])
            {
                min = j;
            }
        }
        let temp = newArray[i];
        newArray[i] = newArray[min];
        newArray[min] = temp;

        messageToSend();
    }
    
    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
}

function binaryInsertionSortTP(array)
{
    let newArray = array.slice();
    startTime = performance.now();
    sendTime = performance.now();
        
    for (let i = 1; i < array.length; i++)
    {
        let temp = newArray[i];
        let left = 0;
        let right = i - 1;

        while(left <= right)
        {
            let mid = Math.floor((left + right) / 2);
            
            if(temp < newArray[mid])
            {
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }
         let j;
        for(j = i - 1; j >= left; j--)
        {
            let temp2 = newArray[j+1];
            newArray[j+1] = newArray[j];
            newArray[j] = temp2;

        }

        newArray[j+1] = temp;
        
        messageToSend();     
    }

    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
}

function insertionSortTP(array)
{
    let newArray = array.slice();
    startTime = performance.now();
    sendTime = performance.now();
      
    for (let i = 1; i < array.length; i++) 
    {  
        let key = newArray[i];  
        let j = i - 1;  

        while (j >= 0 && newArray[j] > key) 
        {  
            newArray[j + 1] = newArray[j];  
            j = j - 1;  
        }  
        newArray[j + 1] = key;  

        messageToSend();
    }  
    
    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
} 

function bubbleSortTP(array)
{
    let newArray = array.slice();
    startTime = performance.now();
    sendTime = performance.now();

    for (let i = 0; i < array.length - 1; i++) 
    { 
        for (let j = 0; j < (array.length - i - 1); j++) 
        { 
            if (newArray[j] > newArray[j + 1]) 
            { 
                let temp = newArray[j+1];
                newArray[j+1] = newArray[j];
                newArray[j] = temp;
            } 
        } 
        messageToSend();
    }

    finished = true;
    endTime = performance.now();
    elapsedTime = (endTime - startTime) / 1000;
    sendMessage();
}

function sendMessage() //poslání zprávy zpět se stavem sortu a časem
{
    postMessage([finished, elapsedTime]);
}

function messageToSend()
{
    endTime = performance.now();
    let lastMessageTime = (endTime - sendTime);

    if(lastMessageTime > 500) //posílání zprávy jen každou půl sekundu
    {
        sendTime = performance.now();
        elapsedTime = (endTime - startTime) / 1000;
        sendMessage();
    } 
}

self.onmessage = function(event) 
{
    const {algorithm, array} = event.data; //převzetí dat ze zprávy workerovi

    switch (algorithm) //spuštění algoritmu
    {
        case "Řazení vkládáním":     
            insertionSortTP(array); 
            break;
        case "Řazení binárním vkládáním":         
            binaryInsertionSortTP(array); 
            break;
        case "Řazení výběrem":       
            selectionSortTP(array); 
            break;
        case "Bublinkové řazení":      
            bubbleSortTP(array); 
            break;
        case "Řazení přetřásáním":   
            cocktailTP(array); 
            break;
        case "Shellovo řazení":       
            shellSortTP(array); 
            break;
        case "Řazení haldou":        
            heapSortTP(array); 
            break;
        case "Rychlé řazení":    
            quickSortTP(array); 
            break;
        case "Řazení slučováním":      
            mergeSortTP(array); 
            break;
    }
}