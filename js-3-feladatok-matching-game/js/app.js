'use strict';


const cols = 5
let matrix = [[], []];
let pairsCount = 0;
let startClickDone;
let evenCard;
let firstCardElement;
let firstCardValue;
//const range = [...Array(cols).keys()] // cards are coded by [0, 1, 2,...,cols-1]

function shuffle(array) { // this shuffles also the actual input array (due to some shallow copy issue), not only the return array!!
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// Random range:
function randomizer() {
            console.log("I am randomizer")
    matrix[0] = shuffle([...Array(cols).keys()]);
    matrix[1] = shuffle([...Array(cols).keys()]);
}

function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  };

function initState() {
    startClickDone = false
    evenCard = true
    const matrixElement = document.getElementById("matrix")
    for (let i = 0; i < cols; i++) {
        const cardElement = document.createElement("DIV");
        cardElement.className = "card upperRow";
        setAttributes(cardElement, {"data-cell": `${i}`, "data-row": "0"});
        const cardBack = document.createElement("IMG");
        cardBack.className = "backSide";
        setAttributes(cardBack, {"src": "./img/background.jpg", "alt": "Gabriel Pacheco"});
        const cardFront = document.createElement("IMG");
        cardFront.className = "frontSide";
        setAttributes(cardFront, {"src": `./img/image${matrix[0][i]}.jpg`, "alt": "Gabriel Pacheco"});
        cardElement.append(cardFront, cardBack);
        matrixElement.appendChild(cardElement);
    }
    for (let i = 0; i < cols; i++) {
        const cardElement = document.createElement("DIV");
        cardElement.className = "card underRow";
        setAttributes(cardElement, {"data-cell": `${i}`, "data-row": "1"});
        const cardBack = document.createElement("IMG");
        cardBack.className = "backSide";
        setAttributes(cardBack, {"src": "./img/background.jpg", "alt": "Gabriel Pacheco"});
        const cardFront = document.createElement("IMG");
        cardFront.className = "frontSide";
        setAttributes(cardFront, {"src": `./img/image${matrix[1][i]}.jpg`, "alt": "Gabriel Pacheco"});
        cardElement.append(cardFront, cardBack);
        matrixElement.appendChild(cardElement);
    }
}

// const startTimer = () =>  -->számláló - első klikkre indul 

const addClickListener = () => { // click figyelő, minden kártyához kattintásesemény-figyelőt ad
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.addEventListener('click', handleClick));
}

const addClickListenerToInactive = () => {
    const cards = document.querySelectorAll(".card:not(.active)");
    console.log(cards)
    cards.forEach(card => card.addEventListener('click', handleClick));
}

const modifyCardAndRow = (element, rowStr) => {
    element.classList.add("active");
    let cardsInRow
    if (rowStr==="0") {cardsInRow=document.querySelectorAll("div[data-row='0']")}
    if (rowStr==="1") {cardsInRow=document.querySelectorAll("div[data-row='1']")}
    cardsInRow.forEach(card => card.removeEventListener('click', handleClick));
}

const prepareNextTurn = (cardElement) => {
    firstCardElement.classList.remove("active");
    cardElement.classList.remove("active");
    addClickListenerToInactive() 
}

const newGame = () => { 
    document.getElementById("matrix").innerHTML = '';
    startGame();
}

const setMessage = (message) =>
    document.querySelector(".message").textContent = message;

const endGame = () => {
    setMessage('All pairs are found! Congratulation!'); // add function and html element
    setTimeout(newGame, 5000)
}

const handleClick = (event) => {
    if (!startClickDone) {
//      startTimer(); // set/start timer!;
        startClickDone=true}
    const cardElement = event.target.parentNode
               console.log(cardElement)
    const rowStr = cardElement.dataset.row;
            console.log(rowStr)
    const row = parseInt(rowStr, 10);
    const cell = parseInt(cardElement.dataset.cell, 10);
    modifyCardAndRow(cardElement, rowStr);
    evenCard = !evenCard
    if (!evenCard) {
        firstCardElement = cardElement
        firstCardValue = matrix[row][cell]
    } else {
        if (firstCardValue===matrix[row][cell]) {
            pairsCount += 1;
            if (pairsCount===5) {endGame()}
             else {addClickListenerToInactive ()}
        } else {
            setTimeout(() => prepareNextTurn(cardElement), 1000)
        }
    } console.log(pairsCount)
}

const startGame = () => {
    pairsCount = 0;
    setMessage('');
    randomizer();
    initState();
    addClickListener();
}

startGame();


