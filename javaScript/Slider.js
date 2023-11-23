window.addEventListener('load', function () //listener slideru
{
  document.getElementById("slider").addEventListener("input", showSliderValue, false);
  document.getElementById("slider").addEventListener("mouseup", sliderChangeValue);
  document.getElementById("slider").addEventListener("keydown", function(event) //Nutnost vypnout šipky pro slider, při označení slideru mohl uživatel udělat krok a zároveň změnit hodnotu
  {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") 
    {
        event.preventDefault();
    }
  });
  showSliderValue();
})

function showSliderValue() //funkce ukazující hodnotu slideru
{ 
  var rangeSlider = document.getElementById("slider");
  var rangeBullet = document.getElementById("value");
  rangeBullet.innerHTML = rangeSlider.value;
}

function sliderChangeValue()
{
    if(typeOfData == 1)
    {
      update_graph(1);
    }
    else
    {
      update_graph(2);
    }
    reset(); //Reset dat
}