function scrollMenu() //funkce volaná v headru při kliknutí
{
  document.getElementById("dropdown").classList.toggle("show"); //kliknutím se přidá třída show která ukáže menu
}

window.onclick = function(event) //po kniknutí mimo menu se menu zavře
{
  if (!event.target.matches('.img')) 
  {
    document.getElementById("dropdown").classList.remove("show");
  }
}