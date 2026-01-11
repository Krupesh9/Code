const objects = [
    {
        name: "Coin",
        emoji: "🪙",
        type: "sink",
        explanation: "Coins are usually made of metal (like zinc or copper), which is much denser than water."
    },
    {
        name: "Leaf",
        emoji: "🍃",
        type: "float",
        explanation: "Leaves are light and have a large surface area. Their structure traps air, making them less dense than water."
    },
    {
        name: "Plastic Spoon",
        emoji: "🥄",
        type: "float",
        explanation: "Most plastic spoons are made of materials like polystyrene or polypropylene, which are often less dense than water or shaped to trap air."
    },
    {
        name: "Grape",
        emoji: "🍇",
        type: "sink",
        explanation: "Grapes are mostly water and sugar. The dissolved sugar makes them slightly denser than pure water, so they sink!"
    },
    {
        name: "Lego Brick",
        emoji: "🧱",
        type: "float",
        explanation: "Lego bricks are made of ABS plastic. While the plastic itself is slightly denser than water, the shape traps air bubbles, causing it to float."
    },
    {
        name: "Rock",
        emoji: "🪨",
        type: "sink",
        explanation: "Rocks are solid and made of heavy minerals packed tightly together. High density makes them sink like a stone!"
    },
    {
        name: "Apple",
        emoji: "🍎",
        type: "float",
        explanation: "Apples contain a lot of air inside them (about 25% of their volume is air!). This makes their overall density lower than water."
    },
    {
        name: "Sponge",
        emoji: "🧽",
        type: "float",
        explanation: "Dry sponges are full of air pockets, making them very light. Even when wet, they can float until they are completely saturated and heavy."
    },
    {
        name: "Key",
        emoji: "🔑",
        type: "sink",
        explanation: "Keys are made of solid metal (brass or steel). Metal packs a lot of mass into a small space (high density)."
    },
    {
        name: "Rubber Duck",
        emoji: "🦆",
        type: "float",
        explanation: "Rubber ducks are hollow and filled with air. This makes them much lighter than the water they displace."
    }
];

let currentObjectIndex = 0;
let score = 0;
let isAnimating = false;

// DOM Elements
const objectDisplay = document.getElementById('game-object');
const objectName = document.getElementById('object-name');
const btnSink = document.getElementById('btn-sink');
const btnFloat = document.getElementById('btn-float');
const btnNext = document.getElementById('btn-next');
const predictionPanel = document.getElementById('prediction-panel');
const resultPanel = document.getElementById('result-panel');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const explanationText = document.getElementById('explanation-text');
const scoreDisplay = document.getElementById('score');

// Shuffle objects array to randomize game order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    shuffleArray(objects);
    currentObjectIndex = 0;
    score = 0;
    updateScore();
    loadObject();
}

function loadObject() {
    // Check if we've gone through all objects
    if (currentObjectIndex >= objects.length) {
        endGame();
        return;
    }

    const obj = objects[currentObjectIndex];

    // Reset visual state
    objectDisplay.textContent = obj.emoji;
    objectDisplay.className = 'object-display'; // Remove animation classes
    objectDisplay.style.top = '20px'; // Reset position

    // Update text
    objectName.textContent = obj.name;

    // Reset panels
    predictionPanel.classList.remove('hidden');
    resultPanel.classList.add('hidden');

    isAnimating = false;
}

function handlePrediction(prediction) {
    if (isAnimating) return;
    isAnimating = true;

    const obj = objects[currentObjectIndex];
    const isCorrect = (prediction === obj.type);

    // Play animation
    if (obj.type === 'sink') {
        objectDisplay.classList.add('animate-sink');
    } else {
        objectDisplay.classList.add('animate-float');
    }

    // Determine result text color
    const resultColor = isCorrect ? '#4ade80' : '#f43f5e'; // Green or Red

    setTimeout(() => {
        // Show result after animation starts
        predictionPanel.classList.add('hidden');
        resultPanel.classList.remove('hidden');

        resultTitle.textContent = isCorrect ? "Correct! 🎉" : "Oops! 😅";
        resultTitle.style.color = resultColor;

        if (isCorrect) {
            score += 10;
            resultMessage.textContent = `You got it! A ${obj.name.toLowerCase()} does ${obj.type}.`;
        } else {
            resultMessage.textContent = `Not quite. A ${obj.name.toLowerCase()} actually ${obj.type}s.`;
        }

        explanationText.textContent = obj.explanation;
        updateScore();

    }, 1500); // Wait for animation to mostly finish
}

function nextRound() {
    currentObjectIndex++;
    loadObject();
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function endGame() {
    predictionPanel.classList.add('hidden');
    resultPanel.classList.remove('hidden');

    resultTitle.textContent = "Game Over! 🏆";
    resultTitle.style.color = '#fbbf24';

    resultMessage.textContent = `You finished with a score of ${score}!`;
    explanationText.textContent = "Great job engaging with the scientific method! Want to play again?";

    btnNext.textContent = "Play Again 🔄";
    btnNext.onclick = () => {
        btnNext.textContent = "Next Object ➡️";
        btnNext.onclick = nextRound;
        initGame();
    };
}

// Event Listeners
btnSink.addEventListener('click', () => handlePrediction('sink'));
btnFloat.addEventListener('click', () => handlePrediction('float'));
btnNext.addEventListener('click', nextRound);

// Start the game
initGame();
