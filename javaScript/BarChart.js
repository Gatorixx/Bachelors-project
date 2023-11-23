let data = [];            //globální proměnná data
let typeOfData = 1;       //globální proměnná typu generovaných dat pro slider
let binaryFlag;           //globální promměná pro označení binary insertion sortu
let mergeFlag;            //globální promměná pro označení merge sortu
let recHeight;            //globální pomocná proměná pro merge sort



window.addEventListener('load', function () //při načtení stránky
{
  if(window.location.pathname.includes("binaryInsertionSort")) binaryFlag = true; //Stránka binary sortu
  if(window.location.pathname.includes("mergeSort")) mergeFlag = true; //Stránka merge sortu

  data = update_data(1);        //update(vytvoření) dat při načtení stránky
  createSVG();                  //Vytvoření svg, barů a textů
  update_graph(1);              //update pro animaci při načtení stránky

  document.getElementById("random").addEventListener("click", () => //generování náhodných dat
  {
    update_graph(1);
    typeOfData = 1;
  });
  document.getElementById("descending").addEventListener("click",() => //generování sestupných dat
  {
    update_graph(2);
    typeOfData = 2;
  });
})

window.addEventListener('resize', function(event) //změna velikosti barů při změně velikosti stránky
{
  updateScale();
});

function updateScale()
{
  let w = document.getElementById("chart").offsetWidth;
  let h = document.getElementById("chart").offsetHeight;
 
  if(mergeFlag)                               //Merge sort
  {
    h = h/2;
    recHeight = h;
  }

  if(binaryFlag)                             //Binary insertion sort
  {
    h = h * 0.9;
    X.range([w * 0.08,w * 0.9]);
  }
  else
  {
    X.range([0,w]);
    
  }
  Y.range([20, h]);
  

  sortElementsById("rect");                 //Seřazení dom elementů podle id
  sortElementsById("text");                 //Seřazení dom elementů podle id

  let rectangles = svg.selectAll("rect");   //Výběr barů
  rectangles                                //Změna atributů
      .attr("x", function(d,i){
        return X(i);
      })
      .attr("y", function(d){
        return h - Y(d);
      })
      .attr("width", X.bandwidth())
      .attr("height", function(d) {
        return Y(d);
      })
  
  let text = svg.selectAll("text")        //Výběr textů barů
  text                                    //Změna atributů
    .attr("x", function(d,i){
      return X(i) + X.bandwidth() / 2;
    })
    .attr("y", function(d){
      return h - Y(d) + 16;
    });
}

function sortElementsById(elementType) //Seřazení dom elementů podle id
{
  let nodes = document.querySelectorAll(elementType); 

  let sortedNodes = Array.from(nodes).sort((a, b) => 
  {
    let aId = parseInt(a.getAttribute("id").match(/\d+/));
    let bId = parseInt(b.getAttribute("id").match(/\d+/));
    return aId - bId;
  });

  sortedNodes.forEach(node => document.querySelector("svg").appendChild(node)); //Append zpět všechny elementy
}

function update_graph(i)
{
  let height = document.getElementById("chart").offsetHeight;

  if(binaryFlag)                                //Binary insertion sort
  {
    height = height*0.9;
  }
  if(mergeFlag)                                 //Merge sort
  {
    height = height*0.5;
  }

  data = update_data(i);                        //Změna dat

  X.domain(d3.range(data.length))
  Y.domain([0, d3.max(data)])

  let rectangles = svg.selectAll("rect")        //Vybrání barů
  rectangles
    .data(data)
    .join("rect")
    .attr("fill" ,"teal")
    .attr("id", function(d,i)
    {
      return "bar" + i;
    })
    .transition()
    .duration(1000)
      .attr("x", function(d,i){
        return X(i);
      })
      .attr("y", function(d){
        return height - Y(d);
      })
      .attr("width", X.bandwidth())
      .attr("height", function(d) {
        return Y(d);
      })
      
  let text = svg.selectAll("text")        //Vybrání textů barů
  text
    .data(data)
    .join("text")
    .attr("id", function(d,i){
      return "text" + i;
    })
    .transition()
    .duration(1000)
    .text(function(d) {
      return d;
    })
    .attr("x", function(d,i){
      return X(i) + X.bandwidth() / 2;
    })
    .attr("y", function(d){
      return height - Y(d) + 16;
    });
}

function update_data(i)
{
  let tmp = [];
  switch(i)
  {
    case 1: //Náhodné data
      for (let i = 1; i <= slider.value; i++)
      {
        tmp.push(Math.floor(Math.random() * 25));
      }
      break;
    case 2: //Sestupné data
      for (let i = slider.value; i >= 1; i--)
      {
        tmp.push(i);
      }
      break;
  }
  return tmp;
}

function createSVG()
{
  let width = document.getElementById("chart").offsetWidth;
  let height = document.getElementById("chart").offsetHeight;

  if(mergeFlag)                               //Merge sort
  {
    height = height*0.5;
    recHeight = height;
  }
  if(binaryFlag)                            //Binary insertion sort
  {
    X = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([width * 0.08,width * 0.9])
        .paddingInner(0.05);
    Y = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([20, height * 0.9]);
  }
  else
  {

  //ordinal scale
  X = d3.scaleBand()
            .domain(d3.range(data.length))  //input domain
            .range([0,width])               //
            .paddingInner(0.05);            //5% padding mezi sloupci

  Y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([20, height]);
  }
  
  svg = d3.select("#chart")                 //přidání svg
  .append("svg")                            //grafický objekt svg
  .attr("height", height)
  .attr("width", width)
 

  svg.selectAll("rect")                   //přidání barů
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d,i){
        return X(i);
      })
      .attr("y", function(d){
        return height - Y(d);
      })
      .attr("width", X.bandwidth())
      .attr("height", function(d) {
        return Y(d);
      })
      .attr("fill" ,"teal")
      .attr("id",function(d,i){
        return "bar" + i;
      });

  let text = svg.selectAll("text")        //přidání textů barů
  text
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("x", function(d,i){
      return X(i) + X.bandwidth() / 2;
    })
    .attr("y", function(d){
      return height - Y(d) + 16;       
    })
    .attr("id",function(d,i){
      return "text" + i;
    });
}