//Have the burger menu show and hide the contact panel
var burgerMenu = document.querySelector( " .menu-burger " );
var mainMenu = document.querySelector("#main-menu");

burgerMenu.addEventListener("click", toggleMenu);
//console.log(mainMenu);

function toggleMenu() {
  mainMenu.classList.toggle("show");
}
