//Have the burger menu show and hide the contact panel
var burgerMenu = document.querySelector( " .menu-burger " );
var mainMenu = document.querySelector("#main-menu");

burgerMenu.addEventListener("click", toggleMenu);

function toggleMenu() {
  mainMenu.classList.toggle("show");
}




//Randomise the decorations
var colourClasses = ["neon-pink","neon-yellow","neon-blue","neon-green","neon-purple","neon-orange"];
var decorations = document.querySelectorAll(".decoration");
decorations.forEach(randomiseDecoration);

function randomiseDecoration(decoration){
  //shift the horizontal placement
  var randomOffset = 0;
  randomOffset = Math.floor(Math.random() * 100);
  decoration.style.left = randomOffset + 'vw';

  //randomly assign the colour class
  var randomColour = 0;
  randomColour = Math.floor(Math.random() * 6);
  decoration.classList.add(colourClasses[randomColour]);

  //set the decoration height to the parent section's height
  var parentSection = decoration.parentElement.parentElement;
  decoration.style.height = (parentSection.offsetHeight) + "px";

  //randomise the width
  var randomWidth = 0;
  randomWidth = (Math.floor(Math.random() * 10) + 20);
  decoration.style.width = randomWidth + 'vw';

  //console.log(randomOffset, colourClasses[randomColour]);
}
