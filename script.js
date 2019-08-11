
// CONSTANTS

const neonClasses = ['neon-pink','neon-yellow','neon-blue','neon-green','neon-purple','neon-orange']
const greyscaleClasses = ['grey-mid','grey-light','grey-dark','grey-extradark']

let decorations = null
let title = null
let subtitle = null
let sections = null
let bodyEl = null
let headerBand = null
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


  // add the snapping behaviour to the body and sections
  // we need to do this thanks to some weird behaviour in chrome where it stops working after a page ajustment
  applySnapping()
  
}


function applySnapping(){
  bodyEl.classList.add('snap-parent')
  sections.forEach(section => section.classList.add('snap'))
}


// Change the heading based on scroll position
function transHeading() {
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  if (document.documentElement.scrollTop > viewHeight) {
    headerBand.classList.add('scrolled')
  } else {
    headerBand.classList.remove('scrolled')
    addTitleOffset(document.documentElement.scrollTop / 2)
  }
}

function addTitleOffset(offset){
  console.log(offset, title)
  title.style.transform = `translateY(${offset}px)`
  subtitle.style.transform = `translateY(${offset}px)`
  console.log(title.style.transform)
}

function populatePortfolio(portfolioId){
  portfolioElem.forEach(el => {
    const thisElClass = [...el.classList].filter(item => item !== 'portfolio-item').toString()
    switch (thisElClass) {
      case 'portfolio-name':
        el.innerHTML = portfolioContent[portfolioId].name
        break
      case 'portfolio-subtitle':
        el.innerHTML = portfolioContent[portfolioId].subtitle
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
      case 'portfolio-tech':
        el.innerHTML = portfolioContent[portfolioId].tech
        break
      case 'portfolio-image':
        el.src = portfolioContent[portfolioId].screen
        break
    }
  })
  setActivePortfolioLink(portfolioId)
}

function setActivePortfolioLink(id) {
  portfolioLinkEl.forEach((item, index) => {
    item.classList.remove('active')
    if (index === id) item.classList.add('active')
  })
}

function buildPortfolioLinks() {
  portfolioLinks.innerHTML = ''
  portfolioContent.forEach((item, index) => {
    const el = document.createElement('a')
    el.classList.add('portfolio-switch')
    el.innerText = item.name
    el.addEventListener('click', ()=>populatePortfolio(index))
    portfolioLinks.appendChild(el)
    portfolioLinkEl.push(el)
  })
  setActivePortfolioLink(0)
}


function domLoaded(){
  //fetch the DOM items
  headerBand = document.getElementById('header-band')
  title = document.querySelector('h1.title')
  subtitle = document.querySelector('div.subtitle')
  portfolioLinks = document.getElementById('section-five-links')
  decorations = document.querySelectorAll('.decoration')
  portfolioElem = [...document.querySelectorAll('.portfolio-item')]
  bodyEl = document.querySelector('body')
  sections = [...document.querySelectorAll('section')]

  //add the loaded class to the body
  bodyEl.classList.add('loaded')
  
  //Set events
  //on font load - there was an issue with document sizing due to a delay with font rendering, so I included this check for external fonts before rendering the decoration randomisation
  document.fonts.onloadingdone = ()=>{
    decorations.forEach(randomiseDecoration)

    const title = document.querySelector('.title')
    window.onscroll = function () {
      checkVisible(title)
    }

    function checkVisible(elm) {
      var rect = elm.getBoundingClientRect()
      // console.log(rect.top)
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
    }
    checkVisible(title)

  }
  document.addEventListener('scroll', transHeading)



  // Update scroll position for first time
  transHeading()
  // set up the portfolio section
  populatePortfolio(0)
  buildPortfolioLinks()
}

//On DOM load
document.addEventListener('DOMContentLoaded', domLoaded)


const portfolioContent = [
  {
    name: 'picoBank',
    subtitle: 'A modern bank app with analytics.',
    description: 'App with customer spending analysis with interactive charts. Capability includes: ‘instant’ messaging, linking accounts, transactions and analysis. Also demonstrates complex database seeding, with random transactions, bills and salary payments',
    tech: 'React, Flask, Python, PostgreSQL',
    siteLink: 'https://picobank-app.herokuapp.com/',
    githubLink: 'https://github.com/tomtidswell/sei-picobank',
    screen: './img/picobank.png'
  },
  {
    name: 'Pacman',
    subtitle: 'The classic arcade game built in JavaScript.',
    description: 'My first attempt at a game with complex logic. The ghosts all think independently, and have different strategy for getting to pacman. To top it off, it has a gloriously retro 80s vibe.',
    tech: 'JavaScript',
    siteLink: 'https://tomtidswell.github.io/sei-pacman/',
    githubLink: 'https://github.com/tomtidswell/sei-pacman',
    screen: './img/pacman.png'
  },
  {
    name: 'Buddle!',
    subtitle: 'A social event finding app.',
    description: 'Connect with other users, and attend their events by subscribing to their listings. Includes user registration, authentication and industry standard security measures.',
    tech: 'React, JavaScript, Node.js, MongoDB, Express',
    siteLink: 'https://buddle-sst.herokuapp.com/',
    githubLink: 'https://github.com/tomtidswell/sei-buddle',
    screen: ''
  },
  {
    name: 'JavaDrip',
    subtitle: 'Start your morning the right way, every day.',
    description: 'Morning routine app designed to provide a morning briefing of travel info and what to wear (computed from weather data), based on location.',
    tech: 'React, JavaScript, Node.js, MongoDB, Express',
    siteLink: 'https://tomtidswell.github.io/sei-javadrip/',
    githubLink: 'https://github.com/tomtidswell/sei-javadrip',
    screen: ''
  },
  {
    name: 'Rock, paper, scissors',
    subtitle: 'Even more fun with lizard and spock too.',
    description: 'Either play the computer, or watch the computer play its self. I used this game as an opportunity to try out some 3D transitions to immerse the player into the game.'  ,
    tech: 'JavaScript',
    siteLink: '',
    githubLink: '',
    screen: ''
  },
  {
    name: 'PlantSwap',
    subtitle: 'Plant swapping social network.',
    description: 'Want to trade plants with like minded people? This is the app for you!'  ,
    tech: 'React, JavaScript, Node.js, MongoDB, Express',
    siteLink: 'https://plantswaps.herokuapp.com/',
    githubLink: '',
    screen: ''
  },
  {
    name: 'Memory Game',
    subtitle: 'Interactive card game.',
    description: 'This game was originally part of my General Assembly coursework. I enhanced the functionality: its now randomised and will track your score.',
    tech: 'Javascript',
    siteLink: 'memorygame/index.html',
    githubLink: '',
    screen: ''
  }
]
