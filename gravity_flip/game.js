const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game State
let gameRunning = false;
let score = 0;
let lastTime = 0;
let scoreTimer = 0;

// UI Elements
const scoreDisplay = document.getElementById('score-display');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreSpan = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Game Constants
const GRAVITY_FORCE = 1500; // Pixels per second squared
const FLIP_FORCE = 0; // Immediate velocity change? No, just gravity flip.
const PLAYER_SIZE = 30;
const LAVA_HEIGHT = 40;
const PLATFORM_HEIGHT = 20;

// Entities
const player = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    gravityDir: 1, // 1 for down, -1 for up
    color: '#fff',

    reset: function () {
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height / 2 - this.height / 2;
        this.vy = 0;
        this.gravityDir = 1;
    },

    update: function (dt) {
        // Apply gravity
        this.vy += GRAVITY_FORCE * this.gravityDir * dt;
        this.y += this.vy * dt;

        // Clamp velocity? Maybe not needed for simple physics
    },

    draw: function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Eyes
        ctx.fillStyle = '#000';
        const eyeOffset = this.gravityDir === 1 ? 5 : 15; // Shift eyes based on gravity
        ctx.fillRect(this.x + 5, this.y + (this.gravityDir === 1 ? 20 : 5), 5, 5);
        ctx.fillRect(this.x + 20, this.y + (this.gravityDir === 1 ? 20 : 5), 5, 5);
    }
};

let platforms = [];

class Platform {
    constructor(x, y, width, height, isTop) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isTop = isTop;
        this.lifeTime = 0;
        this.maxLife = 3 + Math.random() * 2; // Random lifetime between 3-5s
        this.shrinking = false;
    }

    update(dt) {
        this.lifeTime += dt;

        // Shrink mechanic
        if (this.lifeTime > this.maxLife - 1) { // Shrink in last second
            this.width -= 100 * dt; // Shrink speed
        }

        if (this.width <= 0) {
            this.respawn();
        }
    }

    respawn() {
        this.width = 100 + Math.random() * 100;
        this.lifeTime = 0;
        this.maxLife = 2 + Math.random() * 3;
        // Move to a random x position
        this.x = Math.random() * (canvas.width - this.width);
    }

    draw() {
        ctx.fillStyle = '#33ff33';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#33ff33';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

// Input Handling
function handleInput() {
    if (!gameRunning) return;
    player.gravityDir *= -1;
    player.vy = 0; // Optional: Reset vertical velocity on flip for snappier control
}

window.addEventListener('mousedown', handleInput);
window.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    handleInput();
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') handleInput();
});

// Game Loop
function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    if (!gameRunning) player.reset();
}
window.addEventListener('resize', resize);

function initGame() {
    resize();
    player.reset();
    platforms = [
        new Platform(canvas.width / 2 - 75, LAVA_HEIGHT + 10, 150, PLATFORM_HEIGHT, true), // Top platform
        new Platform(canvas.width / 2 - 75, canvas.height - LAVA_HEIGHT - 10 - PLATFORM_HEIGHT, 150, PLATFORM_HEIGHT, false) // Bottom platform
    ];
    score = 0;
    scoreTimer = 0;
    gameRunning = true;
    lastTime = performance.now();

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    scoreDisplay.innerText = 'Time: 0s';

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    finalScoreSpan.innerText = Math.floor(score);
    gameOverScreen.classList.remove('hidden');
}

function gameLoop(timestamp) {
    if (!gameRunning) return;

    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Update Score
    scoreTimer += dt;
    if (scoreTimer >= 1) {
        score++;
        scoreTimer = 0;
        scoreDisplay.innerText = `Time: ${score}s`;
    }

    // Update Entities
    player.update(dt);
    platforms.forEach(p => p.update(dt));

    // Collision Detection

    // 1. Lava (Screen boundaries adjusted for lava height)
    if (player.y < LAVA_HEIGHT || player.y + player.height > canvas.height - LAVA_HEIGHT) {
        gameOver();
        return;
    }

    // 2. Platforms
    let onPlatform = false;
    platforms.forEach(p => {
        // AABB Collision
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y) {

            // Collision resolution
            // If moving down (gravityDir 1) and hitting top of bottom platform
            if (player.gravityDir === 1 && player.y + player.height > p.y && player.vy > 0) {
                player.y = p.y - player.height;
                player.vy = 0;
                onPlatform = true;
            }
            // If moving up (gravityDir -1) and hitting bottom of top platform
            else if (player.gravityDir === -1 && player.y < p.y + p.height && player.vy < 0) {
                player.y = p.y + p.height;
                player.vy = 0;
                onPlatform = true;
            }
        }
    });

    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Lava
    ctx.fillStyle = '#ff3333';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff3333';
    ctx.fillRect(0, 0, canvas.width, LAVA_HEIGHT); // Top Lava
    ctx.fillRect(0, canvas.height - LAVA_HEIGHT, canvas.width, LAVA_HEIGHT); // Bottom Lava
    ctx.shadowBlur = 0;

    // Draw Platforms
    platforms.forEach(p => p.draw());

    // Draw Player
    player.draw();

    requestAnimationFrame(gameLoop);
}


// Initial Setup
startBtn.addEventListener('click', () => {
    initGame();
    startMusic();
});
restartBtn.addEventListener('click', () => {
    initGame();
    startMusic();
});
resize();

// ============= LAVA ANIMATION =============
let lavaOffset = 0;

function drawAnimatedLava(y, height) {
    // Create animated lava effect
    const gradient = ctx.createLinearGradient(0, y, 0, y + height);
    gradient.addColorStop(0, '#ff6600');
    gradient.addColorStop(0.5, '#ff3333');
    gradient.addColorStop(1, '#cc0000');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, canvas.width, height);

    // Add bubbles/waves
    ctx.fillStyle = 'rgba(255, 100, 0, 0.5)';
    for (let i = 0; i < 5; i++) {
        const x = (i * canvas.width / 5 + lavaOffset * 50) % canvas.width;
        const bubbleY = y + height / 2 + Math.sin(lavaOffset * 2 + i) * 10;
        ctx.beginPath();
        ctx.arc(x, bubbleY, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    lavaOffset += 0.02;
}

// Update the draw section in gameLoop
const originalGameLoop = gameLoop;
gameLoop = function (timestamp) {
    if (!gameRunning) return;

    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Update Score
    scoreTimer += dt;
    if (scoreTimer >= 1) {
        score++;
        scoreTimer = 0;
        scoreDisplay.innerText = `Time: ${score}s`;
    }

    // Update Entities
    player.update(dt);
    platforms.forEach(p => p.update(dt));

    // Collision Detection
    if (player.y < LAVA_HEIGHT || player.y + player.height > canvas.height - LAVA_HEIGHT) {
        gameOver();
        stopMusic();
        return;
    }

    let onPlatform = false;
    platforms.forEach(p => {
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y) {

            if (player.gravityDir === 1 && player.y + player.height > p.y && player.vy > 0) {
                player.y = p.y - player.height;
                player.vy = 0;
                onPlatform = true;
            }
            else if (player.gravityDir === -1 && player.y < p.y + p.height && player.vy < 0) {
                player.y = p.y + p.height;
                player.vy = 0;
                onPlatform = true;
            }
        }
    });

    // Draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Animated Lava
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff3333';
    drawAnimatedLava(0, LAVA_HEIGHT); // Top
    drawAnimatedLava(canvas.height - LAVA_HEIGHT, LAVA_HEIGHT); // Bottom
    ctx.shadowBlur = 0;

    // Draw Platforms
    platforms.forEach(p => p.draw());

    // Draw Player
    player.draw();

    requestAnimationFrame(gameLoop);
};

// ============= INTENSE MUSIC =============
let audioContext, musicOscs = [];

function startMusic() {
    if (musicOscs.length > 0) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00]; // C4-G4
    const pattern = [0, 2, 4, 2, 1, 3, 4, 0];
    let noteIndex = 0;

    function playNote() {
        if (musicOscs.length === 0) return;

        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.value = notes[pattern[noteIndex]];

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now);
        osc.stop(now + 0.2);

        noteIndex = (noteIndex + 1) % pattern.length;
        setTimeout(playNote, 200);
    }

    // Bass
    const bass = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bass.type = 'triangle';
    bass.frequency.value = 130.81; // C3
    bassGain.gain.value = 0.04;
    bass.connect(bassGain);
    bassGain.connect(audioContext.destination);
    bass.start();

    musicOscs.push(bass);
    playNote();
}

function stopMusic() {
    musicOscs.forEach(o => o.stop());
    musicOscs = [];
}

