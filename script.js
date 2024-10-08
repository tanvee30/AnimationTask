
// Element data for first 4 elements
const elementsData = [
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, group: 1 },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.0026, group: 18 },
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, group: 1 },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.0122, group: 2 },
    { symbol: 'C', name: 'carbon', atomicNumber: 12, atomicMass: 12, group: 12 }
];

// DOM elements
const periodicTable = document.getElementById('periodic-table');
const atomicNumberDisplay = document.getElementById('atomic-number');
const atomicMassDisplay = document.getElementById('atomic-mass');
const groupNumberDisplay = document.getElementById('group-number');
const resultBox = document.getElementById('result-box');
const resultMessage = document.getElementById('result-message');
const nextHintBtn = document.getElementById('next-hint');
const playAgainBtn = document.getElementById('play-again');
const scoreDisplay = document.getElementById('score');
const lifelinesDisplay = document.getElementById('lifelines');

let currentElement = null;
let score = 0;
let lifelines = 3;

// Function to create the periodic table
function createPeriodicTable() {
    elementsData.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.innerHTML = `<strong>${element.symbol}</strong><br>${element.name}`;
        elementDiv.addEventListener('click', () => handleElementClick(element));
        periodicTable.appendChild(elementDiv);
    });
}

// Function to handle when an element is clicked
function handleElementClick(element) {
    if (lifelines === 0) return; // Game over, no further clicks allowed

    if (element === currentElement) {
        resultMessage.textContent = 'Correct!';
        resultBox.classList.remove('hidden');
        resultBox.classList.add('correct');
        nextHintBtn.classList.remove('hidden');
        score++;
        scoreDisplay.textContent = score;
    } else {
        resultMessage.textContent = 'Wrong! Try again!';
        resultBox.classList.remove('hidden');
        resultBox.classList.remove('correct');
        resultBox.classList.add('wrong');
        nextHintBtn.classList.remove('hidden');
        lifelines--;
        lifelinesDisplay.textContent = lifelines;
        if (lifelines === 0) {
            gameOver();
        }
    }
}

// Function to generate a random question
function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * elementsData.length);
    currentElement = elementsData[randomIndex];

    atomicNumberDisplay.textContent = currentElement.atomicNumber;
    atomicMassDisplay.textContent = currentElement.atomicMass;
    groupNumberDisplay.textContent = currentElement.group;

    resultBox.classList.add('hidden');  // Hide the result box for the next round
}

// Retry functionality for next hint
nextHintBtn.addEventListener('click', () => {
    nextHintBtn.classList.add('hidden');
    generateQuestion();
});

// Game over logic
function gameOver() {
    resultMessage.textContent = 'Game Over! Your score: ' + score;
    resultBox.classList.remove('hidden');
    playAgainBtn.classList.remove('hidden');
    nextHintBtn.classList.add('hidden');
}

// Restart game functionality
playAgainBtn.addEventListener('click', () => {
    score = 0;
    lifelines = 3;
    scoreDisplay.textContent = score;
    lifelinesDisplay.textContent = lifelines;
    playAgainBtn.classList.add('hidden');
    generateQuestion();
});

// Initialize the game
createPeriodicTable();
generateQuestion();
