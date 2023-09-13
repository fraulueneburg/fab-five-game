btnStart.addEventListener('click', () => startGame())
btnExamples.addEventListener('click', () => showExamples())
btnQuestion.addEventListener('click', () => showInstructions())
btnDrawCard.addEventListener('click', () => drawCard())

for (let i = 0; i < btnCloseModal.length; i++) {
	btnCloseModal[i].addEventListener('click', () => closeModal())
}

// ----- START GAME -----

function startGame() {
	body.classList.toggle('game-started')
	btnQuestion.parentElement.classList.remove('hidden')
	btnStart.innerHTML = 'Resume Game'
}

function showInstructions() {
	btnExamples.classList.remove('hidden')
	document.querySelector('.intro-text').classList.remove('hidden')
	document.querySelector('.example-text').classList.add('hidden')
	body.classList.toggle('game-started')
}

function showExamples() {
	document.querySelector('.intro-text').classList.add('hidden')
	document.querySelector('.example-text').classList.remove('hidden')
	btnExamples.classList.add('hidden')
}

function drawCard() {
	body.classList.toggle('round-started')

	// draw a random card
	const chosenCard = pickRandomArrItem(cardDeck)

	// randomize order of the two items
	let randomOneOrZero = Math.floor(Math.random() * 2)
	let randomOneOrZero2 = 1 - randomOneOrZero

	// define two items + solution
	let obj1 = chosenCard.items[randomOneOrZero]
	let obj2 = chosenCard.items[randomOneOrZero2]
	rightAnswer = chosenCard.solution[0]
	btnDrawCard.classList.add('hidden')

	// fill card
	currentCardBack.innerHTML = `
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj1.color.cssColor};"><use href="#${obj1.name}"></svg>
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj2.color.cssColor};"><use href="#${obj2.name}"></svg>
        `

	btnWhat.addEventListener('click', () => explainSolution())

	function explainSolution() {
		modal.classList.add('modal-what')
		let explanation
		const solutionIsOriginalColor =
			(rightAnswer.shape === obj1.shape && rightAnswer.color.alias === obj1.color.alias) ||
			(rightAnswer.shape === obj2.shape && rightAnswer.color.alias === obj2.color.alias)

		if (solutionIsOriginalColor) {
			explanation = `
                    <div class="images">
                        <svg height="100" width="100" aria-hidden="true" style="color: ${rightAnswer.color.cssColor};">
                          <use href="#${rightAnswer.name}">
                        </svg>
                    </div>
                    <p>The ${rightAnswer.shape} is the right answer because it is <strong>shown in its original color</strong> on the card.<p>
                `
		} else {
			explanation = `
                    <div class="images">
                        <svg height="100" width="100" aria-hidden="true" style="color: ${obj1.color.cssColor};">
                          <use href="#${obj1.name}">
                        </svg>
                        <svg height="100" width="100" aria-hidden="true" style="color: ${obj2.color.cssColor};">
                          <use href="#${obj2.name}">
                        </svg>→
                        <svg height="100" width="100" aria-hidden="true" style="color: ${rightAnswer.color.cssColor};">
                          <use href="#${rightAnswer.name}">
                        </svg>
                    </div>
                    <p><strong>None of the objects</strong> on the card are shown in their <strong>original color</strong>.</p><p>Hence, ${rightAnswer.shape} is the right answer because it is the only item whose <strong>shape <em>and</em> color cannot</strong> be found on the card.<p>
                `
		}
		modalText.innerHTML = explanation
	}

	// if time is up
	const countBackwardsInterval = setInterval(() => {
		if (time > 0) {
			timeWrapper.innerHTML = time
			time--
		} else {
			rounds < roundsMax ? (btnNextRound.innerHTML = 'Next Round') : (btnNextRound.innerHTML = 'See Score')
			const randomCheesyQuote = pickRandomArrItem(cheesyQuotesArr)
			timeWrapper.innerHTML = time
			btnWhat.innerHTML = `See answer`
			modalText.innerHTML = `<h3>Oh no! The time is up!</h3><p>But don’t worry.<br>${randomCheesyQuote}</p>`
			modal.classList.add('modal-timeup')
			modal.classList.remove('hidden')
			body.style.overflowY = 'hidden'
			clearInterval(countBackwardsInterval)
			time = timeMax
		}
	}, 1000)

	function startShuffleAnimation() {
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.animation = ''
			cards[i].style.animationPlayState = 'running'
		}
	}

	function stopShuffleAnimationAndDrawCard() {
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.animation = 'none'
			cards[i].style.animationPlayState = 'paused'
		}
		currentCard.classList.add('flipped')

		for (let i = 0; i < fabFiveItems.length; i++) {
			fabFiveItems[i].onclick = () => {
				checkSolution(fabFiveItems[i])
				clearInterval(countBackwardsInterval)
				time = timeMax
			}
		}
	}

	startShuffleAnimation()

	if (prefersReducedMotion) {
		setTimeout(() => {
			stopShuffleAnimationAndDrawCard()
		}, 250)
	} else {
		setTimeout(() => {
			stopShuffleAnimationAndDrawCard()
		}, 1000)
	}
}

// ----- CHECK SOLUTION -----

function checkSolution(clickedElement) {
	let clickedAnswer = clickedElement.getAttribute('data-ffname')

	rounds < roundsMax ? (btnNextRound.innerHTML = 'Next Round') : (btnNextRound.innerHTML = 'See Score')

	if (clickedAnswer === rightAnswer.name) {
		let response
		const randomCompliment = pickRandomArrItem(complimentsArr)
		score++
		wins++
		scoreWrapper.innerHTML = `${score}`
		modal.classList.add('modal-right')
		if (wins === 3 && rounds !== roundsMax) {
			modal.classList.add('modal-levelup')
			timeMax = timeMax - 2
			response = `<p>That was the right answer.</p><p>Wow. You’re good at this.<br>Let’s make this a little more challenging and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`
		} else if (wins === 8 && rounds !== roundsMax) {
			modal.classList.add('modal-levelup')
			timeMax = timeMax - 2
			response = `<p>That was exactly right.</p><p>You’re a natural.<br>Let’s make this just a little more challenging and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`
		} else if (wins === 15 && rounds !== roundsMax) {
			modal.classList.add('modal-levelup')
			timeMax = timeMax - 1
			response = `<p>Really impressive.</p><p>Your brain is unstoppable!<br>To keep things interesting, let’s level up one last time and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`
		} else {
			btnWhat.innerHTML = `See why`
			response = `<p>That was the right answer.</p>`
		}
		modalText.innerHTML = `<h3>${randomCompliment}!</h3>` + response
	} else {
		modal.classList.add('modal-wrong')
		const randomPityWords = pickRandomArrItem(pityArr)
		modalText.innerHTML = `<h3>${randomPityWords}</h3><p>The right answer is ${rightAnswer.shape}.</p>`
		btnWhat.innerHTML = `Wait – what?`
	}
	modal.classList.remove('hidden')
	body.style.overflowY = 'hidden'
}

// ----- CLOSE MODAL -----

function closeModal() {
	body.style.overflowY = ''
	modal.className = 'modal hidden'

	// remove click event from items
	for (let i = 0; i < fabFiveItems.length; i++) {
		fabFiveItems[i].onclick = () => {}
	}

	// reset card
	currentCard.classList.remove('flipped')
	setTimeout(() => {
		btnDrawCard.classList.remove('hidden')
	}, 450)

	// if not/if gameover
	if (!gameover) {
		body.classList.toggle('round-started')
		rounds === roundsMax - 1 ? (btnDrawCard.innerHTML = 'Draw final card') : (btnDrawCard.innerHTML = 'Draw new card')
		rounds++
	} else {
		// open gameover modal after close
		modal.className = 'modal modal-gameover'
		const randomCompliment = pickRandomArrItem(complimentsArr)
		let textVeryGood = `<h3>${randomCompliment}!</h3><p>That was one of a kind!<br>You won <span class="highlighted">${wins} out of ${rounds} rounds.</strong></p><small>Give yourself a pat on the back. You may also want to take a screenshot of this so you can brag about it at your highschool reunion. (Take that, fifth grade math teacher!)</<small>`
		let textGood = `<h3>Congratulations!</h3><p>You won <span class="highlighted">${wins} out of ${rounds} rounds.</span><br>Want to play again and try to top this score?</p>`
		wins >= roundsMax * 0.72 ? (modalText.innerHTML = textVeryGood) : (modalText.innerHTML = textGood)

		// reset game
		btnStart.innerHTML = 'Start Game'
		timeMax = timeMaxInitial
		rounds = 0
		wins = 0
		score = 0
		scoreWrapper.innerHTML = `${score}`
		btnDrawCard.innerHTML = 'Draw card'
		gameover = false
	}

	// reset time
	time = timeMax
	timeWrapper.innerHTML = time

	// update rounds
	if (rounds === roundsMax) {
		roundsWrapper.innerHTML = `FINAL ROUND!`
		gameover = true
	} else if (rounds >= 10) {
		roundsWrapper.innerHTML = `Round ${rounds}`
	} else {
		roundsWrapper.innerHTML = `Round 0${rounds}`
	}
}

// ----- CREATE CARD DECK -----

let cardDeck = []
class Card {
	constructor(firstItem, secondItem, solution) {
		this.firstItem = firstItem
		this.secondItem = secondItem
		this.solution = solution
	}
	createCard() {
		return {
			items: [this.firstItem, this.secondItem],
			solution: this.solution,
		}
	}
}

function createCardDeck(items, colors) {
	// create array of false items (20 total)
	// - loop through items, make a deep copy
	let falseItems = []
	for (let i = 0; i < items.length; i++) {
		let trueItems = JSON.parse(JSON.stringify(items))
		let newItem = trueItems[i]
		for (let j = 0; j < colors.length; j++) {
			// - loop through colours
			if (items[i].color !== colors[j]) {
				// - create new item only if colour isn’t the original one
				let newItemFalseColor = JSON.parse(JSON.stringify(newItem))
				newItemFalseColor.color = colors[j]
				falseItems.push(newItemFalseColor) // - push item to falseItems array
			}
		}
	}
	// first set of cards: pairs of 1 true + 1 false item
	// - loop through true items, make a deep copy
	for (let i = 0; i < items.length; i++) {
		let trueItemsList = JSON.parse(JSON.stringify(items))
		let falseItemsList = JSON.parse(JSON.stringify(falseItems))
		let item01 = trueItemsList[i]
		let solution = [item01]

		// - loop through false items
		for (let j = 0; j < falseItemsList.length; j++) {
			let item02 = falseItemsList[j]

			// - if unique combination (neither same item nor same color) create card + push to deck
			if (item01.shape !== item02.shape && item01.color.alias !== item02.color.alias) {
				let newCard = new Card(item01, item02, solution)
				cardDeck.push(newCard.createCard())
			}
		}
	}
	// second set of cards: pairs of 2 false items
	// - loop through false items, make a deep copy
	for (let i = 0; i < falseItems.length; i++) {
		let falseItemsList = JSON.parse(JSON.stringify(falseItems))
		let item01 = falseItemsList[i]

		for (let j = 0; j < falseItems.length; j++) {
			let item02 = falseItemsList[j]
			// - check for unique combination (neither same item nor same color)
			// - make sure no item has original color of other item
			if (
				item01.shape !== item02.shape &&
				item01.color.alias !== item02.color.alias &&
				item01.color.alias !== item02.originalColor.alias &&
				item02.color.alias !== item01.originalColor.alias
			) {
				// find + log solution:
				// - loop through items + find the one whose shape or color is not on the card
				let solution = []
				for (let k = 0; k < items.length; k++) {
					if (
						items[k].shape !== item01.shape &&
						items[k].shape !== item02.shape &&
						items[k].color.alias !== item01.color.alias &&
						items[k].color.alias !== item02.color.alias
					) {
						solution.push(items[k])
					}
				}
				let newCard = new Card(item01, item02, solution)
				cardDeck.push(newCard.createCard())
			}
		}
	}
	// remove duplicate combinations (i.e. BOOK red + BOTTLE white / BOTTLE white + BOOK red)
	// (using snake case for readability)
	for (let l = 0; l < cardDeck.length - 1; l++) {
		let card1_item1 = cardDeck[l].items[0]
		let card1_item2 = cardDeck[l].items[1]
		let card1_solution = cardDeck[l].solution[0]

		for (let m = cardDeck.length - 1; m > l; m--) {
			let card2_item1 = cardDeck[m].items[0]
			let card2_item2 = cardDeck[m].items[1]
			let card2_solution = cardDeck[m].solution[0]

			if (
				card1_item1.shape === card2_item2.shape &&
				card1_item1.color.alias === card2_item2.color.alias &&
				card2_item1.shape === card1_item2.shape &&
				card2_item1.color.alias === card1_item2.color.alias &&
				card1_solution.shape === card2_solution.shape &&
				card1_solution.color.alias === card2_solution.color.alias
			) {
				cardDeck.splice(m, 1)
			}
		}
	}
}

// create card deck depending on color mode
if (prefersDarkScheme.matches) {
	cardDeck = []
	document.documentElement.classList.add('dark-theme')
	createCardDeck(itemsDarkArr, colorsArr)
} else {
	cardDeck = []
	document.documentElement.classList.add('light-theme')
	createCardDeck(itemsLightArr, colorsArr)
}

// change color mode on button click
btnColorMode.addEventListener('click', () => {
	if (document.documentElement.classList.contains('dark-theme')) {
		cardDeck = []
		createCardDeck(itemsLightArr, colorsArr)
		document.documentElement.classList.add('light-theme')
		document.documentElement.classList.remove('dark-theme')
	} else {
		cardDeck = []
		createCardDeck(itemsDarkArr, colorsArr)
		document.documentElement.classList.add('dark-theme')
		document.documentElement.classList.remove('light-theme')
	}
})

// ----- SHUFFLE CARDS -----

// Fisher Yates Algorithm
function shuffleCards(cardsArr) {
	if (!cardsArr) {
		return undefined
	} else {
		for (let i = cardsArr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const temp = cardsArr[i]
			cardsArr[i] = cardsArr[j]
			cardsArr[j] = temp
		}
		return cardsArr
	}
}

shuffleCards(cardDeck)
