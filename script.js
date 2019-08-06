
// CONSTANTS

const neonClasses = ['neon-pink','neon-yellow','neon-blue','neon-green','neon-purple','neon-orange']
const greyscaleClasses = ['grey-mid','grey-light','grey-dark','grey-extradark']
const decorations = document.querySelectorAll('.decoration')

let burgerMenu = null
let mainMenu = null
let headerBand = null
let mainMenuLinks = null
let portfolioLinks = null
const portfolioLinkEl = []
let portfolioElem = []


// FUNCTIONS

//Randomise the decorations
function randomiseDecoration(decoration){
  //randomly assign the colour class
  //identify which colour type to apply to the item
  decoration.classList.contains('greyscale') ? 
    // add a grey class to the item
    decoration.classList.add(greyscaleClasses[Math.floor(Math.random() * 4)]) :
    // add a neon colour to the item
    decoration.classList.add(neonClasses[Math.floor(Math.random() * 6)])

  //shift the horizontal placement
  decoration.style.left = `${Math.floor(Math.random() * 50)}vw`

  //randomise the width
  decoration.style.width = `${Math.floor(Math.random() * 20) + 20}vw`

  //make the movement seem more random
  decoration.style.animationDuration = `${Math.floor(Math.random() * 30) + 30}s`
  decoration.style.animationDirection = Math.random() > 0.5 ? 'alternate' : 'alternate-reverse'

  //finally set the height
  setHeight(decoration)
}


// retrigger for when there is a page adjustment
function retriggerHeight(){
  decorations.forEach(setHeight)
}

// individual item adjustment
function setHeight(decoration){
  //set the decoration height to the parent section's height
  var parentSection = decoration.parentElement
  decoration.style.height = `${parentSection.offsetHeight}px`
}


// Change the heading based on scroll position
function transHeading() {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    headerBand.classList.add('scrolled')
  } else {
    headerBand.classList.remove('scrolled')
  }
}

//for the burger menu to show and hide the contact panel
function toggleMenu() {
  mainMenu.classList.toggle('show')
  burgerMenu.classList.toggle('burger-white')
}

function populatePortfolio(portfolioId){
  portfolioElem.forEach(el => {
    const thisElClass = [...el.classList].filter(item => item !== 'portfolio-item').toString()
    switch (thisElClass) {
      case 'portfolio-name':
        el.innerHTML = portfolioContent[portfolioId].name
        break
      case 'portfolio-title':
        el.innerHTML = portfolioContent[portfolioId].title
        break
      case 'portfolio-siteLink':
        el.href = portfolioContent[portfolioId].siteLink
        break
      case 'portfolio-githubLink':
        el.href = portfolioContent[portfolioId].githubLink
        break
      case 'portfolio-description':
        el.innerHTML = portfolioContent[portfolioId].description
        break
    }
  })
  setActivePortfolioLink(portfolioId)
}

function setActivePortfolioLink(id) {
  console.log(portfolioLinkEl, id)
  
  portfolioLinkEl.forEach((item, index) => {
    item.classList.remove('active')
    if (index === id) item.classList.add('active')
  })
}

function buildPortfolioLinks() {
  portfolioLinks.innerHTML = ''
  portfolioContent.forEach((item, index) => {
    const el = document.createElement('a')
    el.innerText = item.name
    el.addEventListener('click', ()=>populatePortfolio(index))
    portfolioLinks.appendChild(el)
    portfolioLinkEl.push(el)
  })
  setActivePortfolioLink(0)
}


function init(){
  //fetch the DOM items
  burgerMenu = document.querySelector('.menu-burger')
  mainMenu = document.querySelector('#main-menu')
  headerBand = document.getElementById('header-band')
  mainMenuLinks = document.querySelectorAll('#main-menu a')
  portfolioLinks = document.getElementById('section-five-links')
  portfolioElem = [...document.querySelectorAll('.portfolio-item')]

  //on font load
  document.fonts.onloadingdone = function () {
    // there was an issue with document sizing due to a delay with font rendering,
    // so I included this check for external fonts before rendering the decoration randomisation
    decorations.forEach(randomiseDecoration)
  }

  //Set events
  burgerMenu.addEventListener('click', toggleMenu)
  window.addEventListener('resize', retriggerHeight)
  document.addEventListener('scroll', transHeading)
  // This one hides the menu after a link is clicked
  mainMenuLinks.forEach(function (menuLink) {
    menuLink.addEventListener('click', toggleMenu)
  })
  // Update scroll position for first time
  transHeading()
  // set up the portfolio section
  populatePortfolio(0)
  buildPortfolioLinks()
}

//On DOM load
document.addEventListener('DOMContentLoaded', init)



const portfolioContent = [
  {
    name: 'picoBank',
    title: 'A modern bank app with analytics.',
    description: 'u nocturna ut se exhibere mutuatur is. Ima instar ero tribuo infixa vim sae. Missae obvium nullas p.',
    siteLink: 'https://picobank-app.herokuapp.com/',
    githubLink: 'https://tomtidswell.github.io/'
  },
  {
    name: 'Pacman',
    title: 'The classic arcade game built in JavaScript.',
    description: 'Dem his quam ipsi boni. Dubium altera cau duo nihilo summam lumini nia humano. Se jactantur id distinguo im videantur ut. Scriptumrmulta ac.',
    siteLink: 'https://tomtidswell.github.io/sei-pacman/',
    githubLink: ''
  },
  {
    name: 'Buddle!',
    title: 'A social event finding app.',
    description: 'Ego regi fuit dici imo ego esto mea. Ubi sum attigi qui sponte sacras. Detrahere veritates meo hic tantundem explorant tangantur ita faciendam.',
    siteLink: 'https://buddle-sst.herokuapp.com/',
    githubLink: ''
  },
  {
    name: 'JavaDrip',
    title: 'Start your morning the right way, every day.',
    description: 'Du nocturna ut se exhibere mutuatur is. Ima instar ero tribuo infixa vim sae. Missae obvium nullas pileos aut ibidem pro fateri agi hic.',
    siteLink: 'https://tomtidswell.github.io/sei-javadrip/',
    githubLink: ''
  },
  {
    name: 'Memory Game',
    title: 'Interactive card game.',
    description: 'This game was originally part of my General Assembly coursework. I enhanced the functionality: its now randomised and will track your score.'  ,
    siteLink: 'memorygame/index.html',
    githubLink: ''
  },
  {
    name: 'Personal website',
    title: 'My portfolio v1.',
    description: 'The site began life as a tutorial then quickly transformed into my new portfolio. It demonstrates a responsive layout which switches based on screen width.',
    siteLink: 'ga-task-1.html',
    githubLink: ''
  },
  {
    name: 'Personal Blog',
    title: 'A blog page. Experimentation with transitions.',
    description: 'It includes some experimentation with transitions and jQuery, and started life as a tutorial without those elements.',
    siteLink: 'ga-task-2.html',
    githubLink: ''
  }
]
