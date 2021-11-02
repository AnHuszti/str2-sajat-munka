'use strick';

let stepCount = 0;
let cols = 3;
let rows = 3;
let matrix = [];
let mark ='X';

const initState = () => {
    matrix = new Array(cols);
    for (let i=0; i<cols; i++) {
        matrix[i] = new Array(rows).fill(null);}
}

const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const deleteSigns = () => {
    const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.textContent = " ")
}

const increaseCounter = () => stepCount += 1;

const modifyCell = (element) => {
    element.textContent = mark;
    element.removeEventListener('click', handleClick);
} 

const setMark = () => mark = (mark === "X" ? "0" : "X");



const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    setMark();
    changeMatrixValue(event.target);
    checkWinner()
}

const addClickListener = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener('click', handleClick))
}

const removeAllClickListeners = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.removeEventListener('click', handleClick))
}

const checkValues = (array) => array.map(row => {
   if (row.every(item => item == '0')  ||  row.every(item => item == 'X')) {
       return true
   } else { return false }        
}) .indexOf(true) !== -1;

const checkColumnValues = () => 
        checkValues(matrix.map((array, i) => 
        array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
        checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])
    ]);

const checkWinner = () => {
    console.log(checkColumnValues(), checkDiagonalValues());
    if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues() == true ) {
        endGame();
    }
}

const setMessage = (message) =>
    document.querySelector(".message").textContent = message;


const startGame = () => {
    initState();
    addClickListener();
    newGame();
} 

const endGame = () => {
   setMessage('The Winner is Player ' + (mark === 'X' ? 'O' : 'X') + '.');
   removeAllClickListeners();
}

const newGame = () => {
    document.querySelector("button").addEventListener('click', () => {
        initState(),
        addClickListener(),
        deleteSigns(),
        setMessage('Playing...'),
        setMark()
    })
}

startGame();