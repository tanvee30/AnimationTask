

// Element data for first 4 elements
const elementsData = [
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, group: 1 },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.0026, group: 18 },
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, group: 1 },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.0122, group: 2 },
    { symbol: 'B', name: 'Boron', atomicNumber: 6, atomicMass: 10.81, group: 13 },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.011, group: 14 },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 6, atomicMass: 14.007, group:15  },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 6, atomicMass: 15.999, group: 16 },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 6, atomicMass: 18.984, group: 17 },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass:20.180 , group: 18 },
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 23.0, group: 1 },
    { symbol: 'Mg', name: 'Magnesuim', atomicNumber: 12, atomicMass: 24.304, group: 2 }
    
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
        const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Random colors
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        // Particle class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 5 + 5; 
                this.color = getRandomColor();
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2; 
            }
        
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
        
                
                if (Math.random() < 0.01) {
                    this.color = getRandomColor();
                }
        
                
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }



        
        // Create particles
        const particles = [];
        for (let i = 0; i < 100; i++) { 
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }




        
        // Animations
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles); 

        }
        
        
        animateParticles();

        elementDiv.classList.add('element');
        
        elementDiv.innerHTML = `<strong>${element.symbol}</strong><br>${element.name}`;
        elementDiv.addEventListener('click', () => ElementClick(element, elementDiv));
        periodicTable.appendChild(elementDiv);
    });
}

// Function when an element is clicked
function ElementClick(element, elementDiv) {
    if (lifelines === 0) return;

    

    if (element === currentElement) {
        resultMessage.textContent = 'Correct!';
        showResultBox('correct');
        score++;
        updateScoreDisplay();
    } else {
        resultMessage.textContent = 'Wrong! Try again!';
        showResultBox('wrong');
        lifelines--;
        lifelinesDisplay.textContent = lifelines;
        if (lifelines === 0) {
            gameOver();
        }
    }
}



//Function to show results
function showResultBox(type) {
    resultBox.classList.remove('hidden');
    resultBox.classList.add(type);
    
    
    
    nextHintBtn.classList.remove('hidden');
}

// Function to update the score 
function updateScoreDisplay() {
    scoreDisplay.textContent = score;
    
}



// Function to generate a random question
function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * elementsData.length);
    currentElement = elementsData[randomIndex];

    atomicNumberDisplay.textContent = currentElement.atomicNumber;
    atomicMassDisplay.textContent = currentElement.atomicMass;
    groupNumberDisplay.textContent = currentElement.group;

   
   
    resultBox.classList.add('hidden')
}

// Retry functiona for next hint
nextHintBtn.addEventListener('click', () => {
    nextHintBtn.classList.add('hidden');
    generateQuestion();
});

function gameOver() {
    resultMessage.textContent = 'Game Over! Your score: ' + score;
    resultBox.classList.remove('hidden');  
    playAgainBtn.classList.remove('hidden');  
    nextHintBtn.classList.add('hidden');  
}


// Restart game 
playAgainBtn.addEventListener('click', () => {
    score = 0;
    lifelines = 3;
    scoreDisplay.textContent = score;
    lifelinesDisplay.textContent = lifelines;
    playAgainBtn.classList.add('hidden');  
    resultBox.classList.add('hidden');  
    generateQuestion();  
});


// Start the game
createPeriodicTable();
generateQuestion();
