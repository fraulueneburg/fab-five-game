let timeMaxInitial = 8
let timeMax = timeMaxInitial
let time = timeMax
let rounds = 1
let roundsMax = 20
let score = 0
let wins = 0
let rightAnswer
let gameover = false

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const prefersReducedMotion =
	window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
	window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true

let body = document.body
let btnStart = document.querySelector('.btn-start')
let btnQuestion = document.querySelector('.btn-question')
let btnExamples = document.querySelector('.btn-example')
let btnColorMode = document.querySelector('.btn-color-mode')
let btnDrawCard = document.querySelector('.btn-draw-card')
let btnNextRound = document.querySelector('.btn-next-round')
let timeWrapper = document.querySelector('.time .num')
let scoreWrapper = document.querySelector('.wins .num')
let roundsWrapper = document.querySelector('.rounds h2')
let cards = document.querySelectorAll('.cards .card')
let currentCard = document.querySelector('.card.current')
let currentCardBack = document.querySelector('.card.current .back .content')

let fabFiveItems = document.querySelectorAll('.fab-five-items li a')
let modal = document.querySelector('.modal')
let modalText = document.querySelector('.modal .text')
let btnWhat = document.querySelector('.btn-what')
let btnCloseModal = document.querySelectorAll('.close')

timeWrapper.innerHTML = time

function pickRandomArrItem(arr) {
	const randomNumber = Math.floor(Math.random() * arr.length)
	return arr[randomNumber]
}
