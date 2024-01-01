async function waitForUserInput() 
{
    return new Promise(resolve => 
    {
        let stepButton = document.getElementById("step"); //Proměnné pro tlačítka
        let playButton = document.getElementById("play");
        let slider = document.getElementById("slider");
        let randomButton = document.getElementById("random");
        let descendingButton = document.getElementById("descending");

        stepButton.addEventListener("click", stepHandle);
        playButton.addEventListener("click", playHandle);
        slider.addEventListener("mouseup",  sliderHandle);
        randomButton.addEventListener("click", randomButtonHandle);
        descendingButton.addEventListener("click", descendingButtonHandle);

        if(!play_flag)
        {
            buttons();
            slider.disabled = false;
        } 

        const rightArrow = event =>
        {
            if (event.key === "ArrowRight") 
            {
                stepButton.click();
            }
        };


        if(play_flag)
        {
            cleanHandlers();
            resolve();
        }
        else
        {
            document.addEventListener("keydown", rightArrow);
        }

        function stepHandle()
        {
            
            buttons("step");
            slider.disabled = true;
            cleanHandlers();
            resolve();
        }

        function playHandle()
        {
            play();
            cleanHandlers();
            resolve();
        }

        function sliderHandle()
        { 
            dataChange_flag = true;
            play_flag = false;
            cleanHandlers();
            resolve();
        }

        function randomButtonHandle()
        {
            dataChange_flag = true;
            play_flag = false;
            cleanHandlers();
            resolve();
        }

        function descendingButtonHandle()
        {
            dataChange_flag = true;
            play_flag = false;
            cleanHandlers();
            resolve();
        }

        function cleanHandlers()
        {
            document.removeEventListener("keydown", rightArrow);

            stepButton.removeEventListener("click", stepHandle);
            playButton.removeEventListener("click", playHandle);

            slider.removeEventListener("input",  sliderHandle);
            randomButton.removeEventListener("click", randomButtonHandle);
            descendingButton.removeEventListener("click", descendingButtonHandle);

        }
    });
}

async function setColour(prom, prom2, colour) 
{
    let color = colour || "red";
    svg.selectAll("rect[fill='red']").attr("fill", "teal");
    svg.select("#bar" + prom).attr("fill", color);
    if(prom2 !== undefined) svg.select("#bar" + prom2).attr("fill", color);
    if(play_flag) {await new Promise(r => setTimeout(r, 800));}
}

function play()
{
    let slider = document.getElementById("slider");
    slider.disabled = true;
    play_flag = true;
    buttons("play");
}

function stop()
{
    let slider = document.getElementById("slider");
    slider.disabled = false;
    buttons();
    play_flag = false;
}

function sortStav()
{
    return sort_flag;
}


function writeText(option)
{
    document.getElementById("graph_text").innerHTML = option;
}

function buttons(option) 
{
    const buttonOptions = 
    {
        "default": 
        {
            disabled: [],
            enabled: ["random", "descending", "step", "stop", "play"]
        },
        "step": 
        {
            disabled: ["random", "descending", "step", "stop", "play"],
            enabled: []
        },
        "play": 
        {
            disabled: ["random", "descending", "step", "play"],
            enabled: ["stop"]
        },
        "finished": 
        {
            disabled: ["step", "stop", "play"],
            enabled: ["random", "descending"]
        },
        
    };

    const option_ = buttonOptions[option] || buttonOptions['default'];

    option_.disabled.forEach(button => 
        {
        document.getElementById(button).setAttribute("disabled", "");
    });

    option_.enabled.forEach(button => {
        document.getElementById(button).removeAttribute("disabled");
    });
}

let pseudoNumber;
const colours = 
{
    "LR": "rgb(104, 1, 1)", // Light Red
    "DR": "rgb(56, 0, 0)"   // Dark Red
};

function pseudoColours(...steps) 
    {
        for (let i = 0; i <= pseudoNumber; i++) 
        {
            document.getElementById("pseudo" + i).style.backgroundColor = "rgb(46, 46, 46)";
        } 
        for (let i = 0; i < steps.length; i += 2) 
        {
            const element = document.getElementById("pseudo" + steps[i]);
            element.style.backgroundColor = colours[steps[i + 1]];
        }
    }

async function swap_bars(i ,j)
{   
    let first_bar = svg.select("#bar" + j); 
    let second_bar = svg.select("#bar" + i);
    let first_text = svg.select("#text" + j);
    let second_text = svg.select("#text" + i);
    
    temp_bar_x = first_bar.attr("x");
    temp_bar_id = first_bar.attr("id");
    temp_text_x = first_text.attr("x");
    temp_text_id = first_text.attr("id");

    first_bar
        .transition()
        .duration(1000)
        .ease(d3.easePolyInOut.exponent(2))
        .attr("x", second_bar.attr("x"))
        .attr("id", second_bar.attr("id"))
        
    
    first_text
        .transition()
        .duration(1000)
        .ease(d3.easePolyInOut.exponent(2))
        .attr("x", second_text.attr("x"))
        .attr("id", second_text.attr("id"))

    second_bar
        .transition()
        .duration(1000)
        .ease(d3.easePolyInOut.exponent(2))
        .attr("x", temp_bar_x)
        .attr("id", temp_bar_id)

    await second_text
        .transition()
        .duration(1000)
        .ease(d3.easePolyInOut.exponent(2))
        .attr("x", temp_text_x)
        .attr("id", temp_text_id)
        .end();
}