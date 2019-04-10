//Have the burger menu show and hide the contact panel
var burgerMenu = document.querySelector( " .menu-burger " );
var mainMenu = document.querySelector("#main-menu");
var headerBand = document.getElementById("header-band")

//Set events
burgerMenu.addEventListener("click", toggleMenu);
window.addEventListener('resize', retriggerHeight);
document.addEventListener('scroll', transHeading);

function toggleMenu() {
  mainMenu.classList.toggle("show");
}

//Randomise the decorations
var colourClasses = ["neon-pink","neon-yellow","neon-blue","neon-green","neon-purple","neon-orange"];
var decorations = document.querySelectorAll(".decoration");

function randomiseDecoration(decoration){
  //shift the horizontal placement
  var randomOffset = 0;
  randomOffset = Math.floor(Math.random() * 100);
  decoration.style.left = randomOffset + 'vw';

  //randomly assign the colour class
  var randomColour = 0;
  randomColour = Math.floor(Math.random() * 6);
  decoration.classList.add(colourClasses[randomColour]);

  //randomise the width
  var randomWidth = 0;
  randomWidth = (Math.floor(Math.random() * 10) + 20);
  decoration.style.width = randomWidth + 'vw';

  //set the height
  setHeight(decoration);
}
decorations.forEach(randomiseDecoration);


function retriggerHeight(){
  decorations.forEach(setHeight);
}

function setHeight(decoration){
  //set the decoration height to the parent section's height
  var parentSection = decoration.parentElement;
  decoration.style.height = (parentSection.offsetHeight) + "px";
}


// Change the heading based on scroll position
function transHeading() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    headerBand.classList.add("scrolled");
  } else {
    headerBand.classList.remove("scrolled");
  }
}
// Update scroll position for first time
transHeading();
