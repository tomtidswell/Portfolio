//fetch the DOM items
var burgerMenu = document.querySelector( " .menu-burger " );
var mainMenu = document.querySelector("#main-menu");
var headerBand = document.getElementById("header-band");
var mainMenuLinks = document.querySelectorAll("#main-menu a");


//Set events
burgerMenu.addEventListener("click", toggleMenu);
window.addEventListener('resize', retriggerHeight);
document.addEventListener('scroll', transHeading);
// This one hides the menu after a link is clicked
mainMenuLinks.forEach(function(menuLink) {
  menuLink.addEventListener("click", toggleMenu);
});


//for the burger menu to show and hide the contact panel
function toggleMenu() {
  mainMenu.classList.toggle("show");
  burgerMenu.classList.toggle("burger-white");
}

//Randomise the decorations
var neonClasses = ["neon-pink","neon-yellow","neon-blue","neon-green","neon-purple","neon-orange"];
var greyscaleClasses = ["grey-mid","grey-light","grey-dark","grey-extradark"];
var decorations = document.querySelectorAll(".decoration");

function randomiseDecoration(decoration){

  //randomly assign the colour class
  var randomColour = 0;
  //identify which colour type to apply to the item
  if (decoration.classList.contains("greyscale")) {
    // add a grey class to the item
    randomColour = Math.floor(Math.random() * 4);
    decoration.classList.add(greyscaleClasses[randomColour]);
  }else {
    // add a neon colour to the item
    randomColour = Math.floor(Math.random() * 6);
    decoration.classList.add(neonClasses[randomColour]);
  }

  //shift the horizontal placement
  var randomOffset = 0;
  randomOffset = Math.floor(Math.random() * 100);
  decoration.style.left = randomOffset + 'vw';

  //randomise the width
  var randomWidth = 0;
  randomWidth = (Math.floor(Math.random() * 20) + 20);
  decoration.style.width = randomWidth + 'vw';

  //finally set the height
  setHeight(decoration);
}


// retrigger for when there is a page adjustment
function retriggerHeight(){
  decorations.forEach(setHeight);
}

// individual item adjustment
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

//On DOM load
document.addEventListener("DOMContentLoaded", function(){
  // Update scroll position for first time
  transHeading();
});

//on font load
document.fonts.onloadingdone = function () {
   // there was an issue with document sizing due to a delay with font rendering, 
   // so I included this check for external fonts before rendering the decoration randomisation
   decorations.forEach(randomiseDecoration);
};
