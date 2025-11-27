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
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') handleInput();
});

// Touch & Swipe Handling
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchStartY = e.changedTouches[0].screenY;
    // Also trigger tap immediately if not swiping? 
    // Let's allow tap to flip, but swipe gives direction control
    handleInput();
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 30) { // Swipe threshold
        if (diff > 0) {
            // Swipe Up -> Gravity Up (-1)
            player.gravityDir = -1;
        } else {
            // Swipe Down -> Gravity Down (1)
            player.gravityDir = 1;
        }
        player.vy = 0;
    }
}

// Game Loop
// Game Loop
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    stopMusic();
    playSadMusic();
}

function startGame() {
    initGame();
    stopMusic();
    startMusic();
}

function gameLoop(timestamp) {
    if (!gameRunning) return;

    const dt = Math.min((timestamp - lastTime) / 1000, 0.1); // Clamp dt to 0.1s
    lastTime = timestamp;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Player
    player.update(dt);

    // Check Bounds (Lava)
    if (player.y < LAVA_HEIGHT || player.y + player.height > canvas.height - LAVA_HEIGHT) {
        gameOver();
        return;
    }

    // Update Platforms
    platforms.forEach(p => p.update(dt));

    // Check Collisions
    platforms.forEach(p => {
        if (
            player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y
        ) {
            // Collision detected!
            // Determine side of collision
            const overlapX = (player.width + p.width) / 2 - Math.abs((player.x + player.width / 2) - (p.x + p.width / 2));
            const overlapY = (player.height + p.height) / 2 - Math.abs((player.y + player.height / 2) - (p.y + p.height / 2));

            if (overlapY < overlapX) {
                // Vertical collision
                if (player.vy > 0 && player.y < p.y) {
                    // Landing on top
                    player.y = p.y - player.height;
                    player.vy = 0;
                } else if (player.vy < 0 && player.y > p.y) {
                    // Hitting bottom
                    player.y = p.y + p.height;
                    player.vy = 0;
                }
            }
        }
    });

    if (!gameRunning) return;

    // Draw Lava
    ctx.fillStyle = '#ff3333';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff3333';
    ctx.fillRect(0, 0, canvas.width, LAVA_HEIGHT);
    ctx.fillRect(0, canvas.height - LAVA_HEIGHT, canvas.width, LAVA_HEIGHT);
    ctx.shadowBlur = 0;

    player.draw();
    platforms.forEach(p => p.draw());

    // Score
    scoreTimer += dt;
    score = scoreTimer;
    scoreDisplay.innerText = `Time: ${Math.floor(score)}s`;

    requestAnimationFrame(gameLoop);
}

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

function playSadMusic() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') audioContext.resume();

    // Stop happy music
    musicOscs.forEach(o => o.stop());
    musicOscs = [];

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'triangle';
    // Sad minor chord arpeggio (slow)
    const notes = [196.00, 155.56, 130.81]; // G3, Eb3, C3 (Cm descending)
    let i = 0;

    function playSadNote() {
        if (i >= notes.length) {
            // Drone
            const drone = audioContext.createOscillator();
            const dGain = audioContext.createGain();
            drone.type = 'sine';
            drone.frequency.value = 65.41; // C2
            dGain.gain.value = 0.1;
            drone.connect(dGain);
            dGain.connect(audioContext.destination);
            drone.start();
            dGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
            drone.stop(audioContext.currentTime + 3);
            return;
        }

        const now = audioContext.currentTime;
        const o = audioContext.createOscillator();
        const g = audioContext.createGain();
        o.type = 'sine';
        o.frequency.value = notes[i];
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.1, now + 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        o.connect(g);
        g.connect(audioContext.destination);
        o.start(now);
        o.stop(now + 1.5);

        i++;
        setTimeout(playSadNote, 800);
    }
    playSadNote();
}

function stopMusic() {
    musicOscs.forEach(o => o.stop());
    musicOscs = [];
}

// Event Listeners
// Event Listeners
startBtn.addEventListener('click', startGame);
startBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startGame(); }, { passive: false });

restartBtn.addEventListener('click', startGame);
restartBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startGame(); }, { passive: false });

// Initial resize
resize();
