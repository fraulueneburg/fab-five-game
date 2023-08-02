let timeMaxInitial = 8;
let timeMax = timeMaxInitial;
let time = timeMax;
let rounds = 1;
let roundsMax = 20;
let score = 0;
let wins = 0;
let rightAnswer;
let gameover = false;

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
let body = document.body;
let btnStart = document.querySelector(".btn-start");
let btnQuestion = document.querySelector(".btn-question");
let btnExamples = document.querySelector(".btn-example");
let btnColorMode = document.querySelector(".btn-color-mode");
let btnDrawCard = document.querySelector(".btn-draw-card");
let btnNextRound = document.querySelector(".btn-next-round");
let timeWrapper = document.querySelector(".time .num");
let scoreWrapper = document.querySelector(".wins .num");
let roundsWrapper = document.querySelector(".rounds h2");
let cards = document.querySelectorAll(".cards .card");
let currentCard = document.querySelector(".card.current");
let currentCardBack = document.querySelector(".card.current .back .content");

let fabFiveItems = document.querySelectorAll(".fab-five-items li a");
let modal = document.querySelector(".modal");
let modalText = document.querySelector(".modal .text");
let btnWhat = document.querySelector(".btn-what");
let btnCloseModal = document.querySelectorAll(".close");

timeWrapper.innerHTML = time;

btnExamples.onclick = () => {
  showExamples();
};
btnStart.onclick = () => {
  startGame();
};
btnQuestion.onclick = () => {
  showInstructions();
};
btnDrawCard.onclick = () => {
  drawCard();
};

for (let i = 0; i < btnCloseModal.length; i++) {
  btnCloseModal[i].onclick = () => {
    closeModal();
  };
}

// ----- START GAME -----

function startGame() {
  body.classList.toggle("game-started");
  btnQuestion.classList.remove("hidden");
  btnStart.innerHTML = "Resume Game";
}

function showInstructions() {
  btnExamples.classList.remove("hidden");
  document.querySelector(".intro-text").classList.remove("hidden");
  document.querySelector(".example-text").classList.add("hidden");
  body.classList.toggle("game-started");
}

function showExamples() {
  document.querySelector(".intro-text").classList.add("hidden");
  document.querySelector(".example-text").classList.remove("hidden");
  btnExamples.classList.add("hidden");
}

function drawCard() {
  body.classList.toggle("round-started");

  // draw a random card
  const randomCardNum = Math.floor(Math.random() * cardDeck.length);
  const chosenCard = cardDeck[randomCardNum];

  // randomize order of the two items
  let randomOneOrZero = Math.floor(Math.random() * 2);
  let randomOneOrZero2;
  randomOneOrZero == 0 ? (randomOneOrZero2 = 1) : (randomOneOrZero2 = 0);

  // define two items + solution
  let obj1 = chosenCard.items[randomOneOrZero];
  let obj2 = chosenCard.items[randomOneOrZero2];
  rightAnswer = chosenCard.solution[0];
  btnDrawCard.classList.add("hidden");

  // fill card
  currentCardBack.innerHTML = `
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj1.color.cssColor};"><use href="#${obj1.name}"></svg>
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj2.color.cssColor};"><use href="#${obj2.name}"></svg>
        `;

  btnWhat.onclick = () => {
    explainSolution();
  };

  function explainSolution() {
    modal.classList.add("modal-what");
    let explanation;
    if (
      (rightAnswer.shape == obj1.shape &&
        rightAnswer.color.alias == obj1.color.alias) ||
      (rightAnswer.shape == obj2.shape &&
        rightAnswer.color.alias == obj2.color.alias)
    ) {
      explanation = `
                    <div class="images">
                        <svg height="100" width="100" aria-hidden="true" style="color: ${rightAnswer.color.cssColor};"><use href="#${rightAnswer.name}"></svg>
                    </div>
                    <p>The ${rightAnswer.shape} is the right answer because it is <strong>shown in its original color</strong> on the card.<p>
                `;
    } else {
      explanation = `
                    <div class="images">
                        <svg height="100" width="100" aria-hidden="true" style="color: ${obj1.color.cssColor};"><use href="#${obj1.name}"></svg>
                        <svg height="100" width="100" aria-hidden="true" style="color: ${obj2.color.cssColor};"><use href="#${obj2.name}"></svg>→
                        <svg height="100" width="100" aria-hidden="true" style="color: ${rightAnswer.color.cssColor};"><use href="#${rightAnswer.name}"></svg>
                    </div>
                    <p><strong>None of the objects</strong> on the card are shown in their <strong>original color</strong>.</p><p>Hence, ${rightAnswer.shape} is the right answer because it is the only item whose <strong>shape <em>and</em> color cannot</strong> be found on the card.<p>
                `;
    }
    modalText.innerHTML = explanation;
  }

  // start css shuffle animation (1s), after 1s show random card
  // check solution on click
  // start backwards counter
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.animation = "";
    cards[i].style.animationPlayState = "running";
  }
  setTimeout(() => {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.animation = "none";
      cards[i].style.animationPlayState = "paused";
    }
    currentCard.classList.add("flipped");
    for (let i = 0; i < fabFiveItems.length; i++) {
      fabFiveItems[i].onclick = () => {
        checkSolution(fabFiveItems[i]);
        clearInterval(countBackwards);
        time = timeMax;
      };
    }
  }, 1000);
  clearTimeout();

  // if time is up
  const countBackwards = setInterval(function () {
    if (time > 0) {
      timeWrapper.innerHTML = time;
      time--;
    } else {
      rounds < roundsMax
        ? (btnNextRound.innerHTML = "Next Round")
        : (btnNextRound.innerHTML = "See Score");
      randomEncouragementNum = Math.floor(
        Math.random() * encouragementsArr.length
      );
      timeWrapper.innerHTML = time;
      btnWhat.innerHTML = `See answer`;
      modalText.innerHTML = `<h3>Oh no! The time is up!</h3><p>But don’t worry.<br>${encouragementsArr[randomEncouragementNum]}</p>`;
      modal.classList.add("modal-timeup");
      modal.classList.remove("hidden");
      body.style.overflowY = "hidden";
      clearInterval(countBackwards);
      time = timeMax;
    }
  }, 1000);
}


// ----- CHECK SOLUTION -----

function checkSolution(clickedElement) {
  let clickedAnswer = clickedElement.getAttribute("ffname");

  rounds < roundsMax
    ? (btnNextRound.innerHTML = "Next Round")
    : (btnNextRound.innerHTML = "See Score");

  if (clickedAnswer == rightAnswer.name) {
    let response;
    const randomComplimentNum = Math.floor(
      Math.random() * complimentsArr.length
    );
    score++;
    wins++;
    scoreWrapper.innerHTML = `${score}`;
    modal.classList.add("modal-right");
    if (wins == 3 && rounds != roundsMax) {
      modal.classList.add("modal-levelup");
      timeMax = timeMax - 2;
      response = `<p>That was the right answer.</p><p>Wow. You’re good at this.<br>Let’s make this a little more challenging and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`;
    } else if (wins == 8 && rounds != roundsMax) {
      modal.classList.add("modal-levelup");
      timeMax = timeMax - 2;
      response = `<p>That was exactly right.</p><p>You’re a natural.<br>Let’s make this just a little more challenging and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`;
    } else if (wins == 15 && rounds != roundsMax) {
      modal.classList.add("modal-levelup");
      timeMax = timeMax - 1;
      response = `<p>Really impressive.</p><p>Your brain is unstoppable!<br>To keep things interesting, let’s level up one last time and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`;
    } else {
      btnWhat.innerHTML = `See why`;
      response = `<p>That was the right answer.</p>`;
    }
    modalText.innerHTML =
      `<h3>${complimentsArr[randomComplimentNum]}!</h3>` + response;
  } else {
    modal.classList.add("modal-wrong");
    const randomPityNum = Math.floor(Math.random() * pityArr.length);
    modalText.innerHTML = `<h3>${pityArr[randomPityNum]}</h3><p>The right answer is ${rightAnswer.shape}.</p>`;
    btnWhat.innerHTML = `Wait – what?`;
  }
  modal.classList.remove("hidden");
  body.style.overflowY = "hidden";
}


// ----- CLOSE MODAL -----

function closeModal() {
  body.style.overflowY = "";
  modal.className = "modal hidden";

  // remove click event from items
  for (let i = 0; i < fabFiveItems.length; i++) {
    fabFiveItems[i].onclick = () => {};
  }

  // reset card
  currentCard.classList.remove("flipped");
  setTimeout(() => {
    btnDrawCard.classList.remove("hidden");
  }, 450);

  // if not/if gameover
  if (!gameover) {
    body.classList.toggle("round-started");
    rounds == roundsMax - 1
      ? (btnDrawCard.innerHTML = "Draw final card")
      : (btnDrawCard.innerHTML = "Draw new card");
    rounds++;
  } else {
    // open gameover modal after close
    modal.className = "modal modal-gameover";
    const randomComplimentNum = Math.floor(
      Math.random() * complimentsArr.length
    );
    let textVeryGood = `<h3>${complimentsArr[randomComplimentNum]}!</h3><p>That was one of a kind!<br>You won <span class="highlighted">${wins} out of ${rounds} rounds.</strong></p><small>Give yourself a pat on the back. You may also want to take a screenshot of this so you can brag about it at your highschool reunion. (Take that, fifth grade math teacher!)</<small>`;
    let textGood = `<h3>Congratulations!</h3><p>You won <span class="highlighted">${wins} out of ${rounds} rounds.</span><br>Want to play again and try to top this score?</p>`;
    wins >= roundsMax * 0.72
      ? (modalText.innerHTML = textVeryGood)
      : (modalText.innerHTML = textGood);

    // reset game
    btnStart.innerHTML = "Start Game";
    timeMax = timeMaxInitial;
    rounds = 0;
    wins = 0;
    score = 0;
    scoreWrapper.innerHTML = `${score}`;
    btnDrawCard.innerHTML = "Draw card";
    gameover = false;
  }

  // reset time
  time = timeMax;
  timeWrapper.innerHTML = time;

  // update rounds
  if (rounds == roundsMax) {
    roundsWrapper.innerHTML = `FINAL ROUND!`;
    gameover = true;
  } else if (rounds >= 10) {
    roundsWrapper.innerHTML = `Round ${rounds}`;
  } else {
    roundsWrapper.innerHTML = `Round 0${rounds}`;
  }
}


// ----- COLORS AND ITEMS -----

// first set colors
let colorsLightArr = [
  {
    name: "color01",
    alias: "red",
    cssColor: "var(--item01-color)",
  },
  {
    name: "color02",
    alias: "green",
    cssColor: "var(--item02-color)",
  },
  {
    name: "color03",
    alias: "blue",
    cssColor: "var(--item03-color)",
  },
  {
    name: "color04",
    alias: "white",
    cssColor: "var(--item04-color)",
  },
  {
    name: "color05",
    alias: "grey",
    cssColor: "var(--item05-color)",
  },
];

// first set items
let itemsLightArr = [
  {
    name: "item01",
    shape: "chair",
    color: colorsLightArr[0],
    originalColor: colorsLightArr[0],
  },
  {
    name: "item02",
    shape: "bottle",
    color: colorsLightArr[1],
    originalColor: colorsLightArr[1],
  },
  {
    name: "item03",
    shape: "book",
    color: colorsLightArr[2],
    originalColor: colorsLightArr[2],
  },
  {
    name: "item04",
    shape: "ghost",
    color: colorsLightArr[3],
    originalColor: colorsLightArr[3],
  },
  {
    name: "item05",
    shape: "mouse",
    color: colorsLightArr[4],
    originalColor: colorsLightArr[4],
  },
];

// second set colors
let colorsDarkArr = [
  {
    name: "color01",
    alias: "pink",
    cssColor: "var(--item01-color)",
  },
  {
    name: "color02",
    alias: "neongreen",
    cssColor: "var(--item02-color)",
  },
  {
    name: "color03",
    alias: "cyan",
    cssColor: "var(--item03-color)",
  },
  {
    name: "color04",
    alias: "yellow",
    cssColor: "var(--item04-color)",
  },
  {
    name: "color05",
    alias: "purple",
    cssColor: "var(--item05-color)",
  },
];

// second set items
let itemsDarkArr = [
  {
    name: "item01",
    shape: "chair",
    color: colorsDarkArr[0],
    originalColor: colorsDarkArr[0],
  },
  {
    name: "item02",
    shape: "bottle",
    color: colorsDarkArr[1],
    originalColor: colorsDarkArr[1],
  },
  {
    name: "item03",
    shape: "book",
    color: colorsDarkArr[2],
    originalColor: colorsDarkArr[2],
  },
  {
    name: "item04",
    shape: "ghost",
    color: colorsDarkArr[3],
    originalColor: colorsDarkArr[3],
  },
  {
    name: "item05",
    shape: "mouse",
    color: colorsDarkArr[4],
    originalColor: colorsDarkArr[4],
  },
];


// ----- MESSAGES ARRS -----

const complimentsArr = [
  "Woah. Very good",
  "Excellent",
  "Brilliant",
  "Marvellous",
  "Extraordinary",
  "Terrific",
  "Fantastic",
  "Amazing",
  "You genius, you",
  "Awesome",
  "Good job",
  "Unbelievable",
  "Incredible",
  "Spectacular",
  "Remarkable",
  "Fabulous",
  "Phenomenal",
  "Sensational",
  "Gorgeous",
  "Impressive",
  "Outstanding",
  "Magnificent",
  "Splendid",
  "Good work",
  "Phenomenal",
  "Superb",
  "You superhuman, you",
  "OMG",
  "Wowza",
  "Absolutely stunning",
  "Sweet",
];
const pityArr = [
  "Oh no!",
  "Oh nooooo!",
  "Nope.",
  "Too bad!",
  "Almost. Almost.",
  "Quel malheur!",
  "Bummer",
  "Oooh, that was close!",
  "You were sooo close!",
  "Aaaargh, next time.",
  "Sorryyy …",
  "So sorry …",
  "Apologies.",
  "Pardon.",
  "Uh-oh.",
  "Sad but true:",
];
const encouragementsArr = [
  "Rome wasn’t built in a day.",
  "It happens to the best of us.",
  "You’ll be quicker next round.",
  "We still believe in you.",
  "We know this is tough, but you’re tougher.",
  "You got this!",
  "The next round will be your round.",
  "In the middle of difficulty lies opportunity.",
  "Your are stronger than you think.",
  "Optimism is the faith that leads to success.",
  "We believe in you. And unicorns. But mostly you.",
  "True champions, like the sun, cannot be eclipsed for long.",
  "We’ve seen slower people play this game.",
  "The ability to triumph begins with you. Always.",
  "A champion is defined not by their wins but by how they recover when they fall.",
  "This difficult time is just a stepping stone along the path to something better.",
  "Things are going to start looking up soon.",
  "It doesn’t matter how slow you go as long as you don’t stop.",
  "Faith can move mountains.",
  "This, too, shall pass.",
  "One day, you’ll look back on this period in your life and be so glad that you never gave up.",
  "Confidence is the most beautiful thing you can wear.",
  "The only time you run out of chances is when you stop taking them.",
  "Every round may not be a good round, but there’s something good in every round.",
  "You grow through what you go through.",
  "Sometimes you win, sometimes you learn.",
  "Success doesn’t come from what you do occasionally. It comes from what you do consistently.",
  "Every accomplishment starts with the decision to try.",
  "Sometimes you win, sometimes you learn.",
  "The best view comes after the hardest climb.",
  "It doesn’t matter how far down you fall as long as you can still look up and see the stars.",
];


// ----- CREATE CARD DECK -----

let cardDeck = [];
class Card {
  constructor(firstItem, secondItem, solution) {
    this.firstItem = firstItem;
    this.secondItem = secondItem;
    this.solution = solution;
  }
  createCard() {
    return {
      items: [this.firstItem, this.secondItem],
      solution: this.solution,
    };
  }
}

function createCardDeck(items, colors) {
  // create array of false items (20 total)
  // - loop through items, make a deep copy
  let falseItems = [];
  for (let i = 0; i < items.length; i++) {
    let trueItems = JSON.parse(JSON.stringify(items));
    let newItem = trueItems[i];
    for (let j = 0; j < colors.length; j++) {
      // - loop through colours
      if (items[i].color !== colors[j]) {
        // - create new item only if colour isn’t the original one
        let newItemFalseColor = JSON.parse(JSON.stringify(newItem));
        newItemFalseColor.color = colors[j];
        falseItems.push(newItemFalseColor); // - push item to falseItems array
      }
    }
  }
  // first set of cards: pairs of 1 true + 1 false item
  // - loop through true items, make a deep copy
  for (let i = 0; i < items.length; i++) {
    let trueItemsList = JSON.parse(JSON.stringify(items));
    let falseItemsList = JSON.parse(JSON.stringify(falseItems));
    let item01 = trueItemsList[i];
    let solution = [item01];

    // - loop through false items
    for (let j = 0; j < falseItemsList.length; j++) {
      let item02 = falseItemsList[j];

      // - if unique combination (neither same item nor same color) create card + push to deck
      if (
        item01.shape !== item02.shape &&
        item01.color.alias !== item02.color.alias
      ) {
        let newCard = new Card(item01, item02, solution);
        cardDeck.push(newCard.createCard());
      }
    }
  }
  // second set of cards: pairs of 2 false items
  // - loop through false items, make a deep copy
  for (let i = 0; i < falseItems.length; i++) {
    let falseItemsList = JSON.parse(JSON.stringify(falseItems));
    let item01 = falseItemsList[i];

    for (let j = 0; j < falseItems.length; j++) {
      let item02 = falseItemsList[j];
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
        let solution = [];
        for (let k = 0; k < items.length; k++) {
          if (
            items[k].shape !== item01.shape &&
            items[k].shape !== item02.shape &&
            items[k].color.alias !== item01.color.alias &&
            items[k].color.alias !== item02.color.alias
          ) {
            solution.push(items[k]);
          }
        }
        let newCard = new Card(item01, item02, solution);
        cardDeck.push(newCard.createCard());
      }
    }
  }
  // remove duplicate combinations (i.e. BOOK red + BOTTLE white / BOTTLE white + BOOK red)
  // (using snake case for readability)
  for (let l = 0; l < cardDeck.length - 1; l++) {
    let card1_item1 = cardDeck[l].items[0];
    let card1_item2 = cardDeck[l].items[1];
    let card1_solution = cardDeck[l].solution[0];

    for (let m = cardDeck.length - 1; m > l; m--) {
      let card2_item1 = cardDeck[m].items[0];
      let card2_item2 = cardDeck[m].items[1];
      let card2_solution = cardDeck[m].solution[0];

      if (
        card1_item1.shape == card2_item2.shape &&
        card1_item1.color.alias == card2_item2.color.alias &&
        card2_item1.shape == card1_item2.shape &&
        card2_item1.color.alias == card1_item2.color.alias &&
        card1_solution.shape == card2_solution.shape &&
        card1_solution.color.name == card2_solution.color.name
      ) {
        cardDeck.splice(m, 1);
      }
    }
  }
  // console.log(`TRUE ITEMS:`);
  // console.log(items);
  // console.log(`FALSE ITEMS:`);
  // console.log(falseItems);
}

// create card deck depending on color mode
if (prefersDarkScheme.matches) {
  cardDeck = [];
  document.documentElement.classList.add('dark-theme');
  createCardDeck(itemsDarkArr, colorsDarkArr);
} else {
  cardDeck = [];
  document.documentElement.classList.add('light-theme');
  createCardDeck(itemsLightArr, colorsLightArr);
}

// change color mode on button click
btnColorMode.addEventListener("click", function () {
  if (document.documentElement.classList.contains('dark-theme')) {
    cardDeck = [];
    createCardDeck(itemsLightArr, colorsLightArr);
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
  } else {
    cardDeck = [];
    createCardDeck(itemsDarkArr, colorsDarkArr);
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  }
});


// ----- SHUFFLE CARDS -----

// Fisher Yates Algorithm
function shuffleCards(cardsArr) {
    if (!cardsArr) {
        return undefined;
    } else {
        for (let i = cardsArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cardsArr[i];
        cardsArr[i] = cardsArr[j];
        cardsArr[j] = temp;
        }
        return cardsArr;
    }
}

// console.log(`UNSHUFFLED CARD DECK:`);
// console.log(cardDeck);
// for (let i=0; i < cardDeck.length; i++) {
//     console.log(`#${i+1}: ${cardDeck[i].items[0].shape.toUpperCase()} ${cardDeck[i].items[0].color.alias} + ${cardDeck[i].items[1].shape.toUpperCase()} ${cardDeck[i].items[1].color.alias} => ${cardDeck[i].solution[0].shape}`); // ${cardDeck[i].solution[0].shape}
// }

shuffleCards(cardDeck);

// console.log(`SHUFFLED CARD DECK:`);
// for (let i=0; i < cardDeck.length; i++) {
//     console.log(`#${i+1}: ${cardDeck[i].items[0].shape.toUpperCase()} ${cardDeck[i].items[0].color.alias} + ${cardDeck[i].items[1].shape.toUpperCase()} ${cardDeck[i].items[1].color.alias} => ${cardDeck[i].solution[0].shape}`); // ${cardDeck[i].solution[0].shape}
// }
