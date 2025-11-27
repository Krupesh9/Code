// Rain Protector - Rewritten with improved physics
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let gameRunning = false;
let score = 0;
let inkLevel = 300;
const MAX_INK = 300;
const INK_REGEN = 35;
const INK_COST = 0.25;

// Entities
let protectedObject = null;
let raindrops = [];
let barriers = [];
let particles = [];

// Drawing
let isDrawing = false;
let lastDrawPos = null;

// Wind
let windForce = 0;

// Random emoji for protected object
const EMOJIS = ['🌸', '🚗', '⭐', '🎁', '🏠', '🎈', '🍎', '🎯'];
let currentEmoji = '🌸';

// UI Elements
const scoreDisplay = document.getElementById('score-display');
const inkBar = document.getElementById('ink-bar');
const windIndicator = document.getElementById('wind-indicator');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreSpan = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Resize canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Protected Object
class ProtectedObject {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 80;
        this.radius = 30;
    }

    draw() {
        ctx.font = '60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentEmoji, this.x, this.y);
    }

    checkCollision(raindrop) {
        const dx = raindrop.x - this.x;
        const dy = raindrop.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (this.radius + raindrop.radius);
    }
}

// Raindrop
class Raindrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.radius = 4;
        this.vy = 3 + Math.random() * 2;
        this.vx = windForce;
        this.active = true;
    }

    update() {
        this.vy += 0.15; // Gravity
        this.vx = windForce * 0.5;

        this.x += this.vx;
        this.y += this.vy;

        // Check barrier collisions
        for (let barrier of barriers) {
            if (this.checkBarrierCollision(barrier)) {
                this.active = false;
                createSplashParticles(this.x, this.y);
                return;
            }
        }

        // Check if off screen
        if (this.y > canvas.height + 50 || this.x < -50 || this.x > canvas.width + 50) {
            this.active = false;
        }
    }

    checkBarrierCollision(barrier) {
        // Point to line segment distance
        const dx = barrier.x2 - barrier.x1;
        const dy = barrier.y2 - barrier.y1;
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length === 0) return false;

        const t = Math.max(0, Math.min(1, ((this.x - barrier.x1) * dx + (this.y - barrier.y1) * dy) / (length * length)));
        const projX = barrier.x1 + t * dx;
        const projY = barrier.y1 + t * dy;

        const dist = Math.sqrt((this.x - projX) ** 2 + (this.y - projY) ** 2);

        return dist < (this.radius + barrier.thickness / 2);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4da6ff';
        ctx.fill();
    }
}

// Barrier (drawn line)
class Barrier {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.thickness = 20;
        this.lifetime = 15000; // 15 seconds
        this.createdAt = Date.now();
    }

    isExpired() {
        return Date.now() - this.createdAt > this.lifetime;
    }

    draw() {
        const age = Date.now() - this.createdAt;
        const alpha = Math.max(0.3, 1 - (age / this.lifetime));

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

// Particle (splash effect)
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4 - 2;
        this.life = 1.0;
        this.decay = 0.02;
        this.size = Math.random() * 3 + 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.life -= this.decay;
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = '#4da6ff';
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.globalAlpha = 1.0;
    }
}

function createSplashParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y));
    }
}

// Wind system
function updateWind() {
    if (!gameRunning) return;

    const newWind = (Math.random() - 0.5) * 3;
    windForce = newWind;

    let text = 'Calm';
    if (newWind < -0.5) text = '<< WIND LEFT';
    else if (newWind > 0.5) text = 'WIND RIGHT >>';

    windIndicator.textContent = `Wind: ${text}`;
}

// Drawing system
function startDrawing(e) {
    if (!gameRunning) return;
    isDrawing = true;
    lastDrawPos = getMousePos(e);
}

function stopDrawing() {
    isDrawing = false;
    lastDrawPos = null;
}

function draw(e) {
    if (!gameRunning || !isDrawing || inkLevel <= 0) return;

    const currentPos = getMousePos(e);
    if (!lastDrawPos) {
        lastDrawPos = currentPos;
        return;
    }

    const dx = currentPos.x - lastDrawPos.x;
    const dy = currentPos.y - lastDrawPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
        const cost = distance * INK_COST;

        if (inkLevel >= cost) {
            inkLevel -= cost;
            barriers.push(new Barrier(lastDrawPos.x, lastDrawPos.y, currentPos.x, currentPos.y));
            lastDrawPos = currentPos;
        } else {
            stopDrawing();
        }
    }
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); }, { passive: false });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });
canvas.addEventListener('touchend', stopDrawing);

// Game loop
let lastTime = 0;
let rainSpawnTimer = 0;
let windChangeTimer = 0;

function gameLoop(timestamp) {
    if (!gameRunning) return;

    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Update score
    score += dt;
    scoreDisplay.textContent = `Time: ${Math.floor(score)}s`;

    // Regenerate ink
    if (inkLevel < MAX_INK) {
        inkLevel = Math.min(MAX_INK, inkLevel + INK_REGEN * dt);
    }
    inkBar.style.width = `${(inkLevel / MAX_INK) * 100}%`;

    // Spawn rain (Dynamic Intensity)
    rainSpawnTimer += dt;
    // Spawn rate increases with score (time), and fluctuates slightly
    const baseSpawnRate = Math.max(0.04, 0.12 - (score / 300));
    const currentSpawnRate = baseSpawnRate + (Math.sin(score / 5) * 0.02); // Waves of rain

    if (rainSpawnTimer > currentSpawnRate) {
        raindrops.push(new Raindrop());
        rainSpawnTimer = 0;
    }

    // Change wind
    windChangeTimer += dt;
    if (windChangeTimer > 4) { // Change every 4 seconds
        updateWind();
        windChangeTimer = 0;
    }

    // Update raindrops
    for (let i = raindrops.length - 1; i >= 0; i--) {
        raindrops[i].update();

        if (!raindrops[i].active) {
            raindrops.splice(i, 1);
            continue;
        }

        // Check collision with protected object
        if (protectedObject.checkCollision(raindrops[i])) {
            gameOver();
            return;
        }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Remove expired barriers
    barriers = barriers.filter(b => !b.isExpired());

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw barriers
    barriers.forEach(b => b.draw());

    // Draw raindrops
    raindrops.forEach(r => r.draw());

    // Draw particles
    particles.forEach(p => p.draw());

    // Draw protected object
    protectedObject.draw();

    requestAnimationFrame(gameLoop);
}

function startGame() {
    // Pick random emoji
    currentEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    // Reset state
    gameRunning = true;
    score = 0;
    inkLevel = MAX_INK;
    raindrops = [];
    barriers = [];
    particles = [];
    windForce = 0;

    // Create protected object
    protectedObject = new ProtectedObject();

    // Hide/show screens
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Start loop
    lastTime = performance.now();
    rainSpawnTimer = 0;
    windChangeTimer = 0;
    updateWind();

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    finalScoreSpan.textContent = Math.floor(score);
    gameOverScreen.classList.remove('hidden');
    stopMusic();
    playSadMusic();
}

// ============= RAIN AMBIENT MUSIC =============
let audioContext, musicOscs = [];

function startMusic() {
    if (musicOscs.length > 0) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [220.00, 246.94, 261.63, 293.66, 329.63]; // A3-E4
    const pattern = [0, 2, 1, 3, 2, 4, 3, 1];
    let noteIndex = 0;

    function playNote() {
        if (musicOscs.length === 0) return;

        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = notes[pattern[noteIndex]];

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now);
        osc.stop(now + 0.7);

        noteIndex = (noteIndex + 1) % pattern.length;
        setTimeout(playNote, 600);
    }

    // Ambient pad
    const pad = audioContext.createOscillator();
    const padGain = audioContext.createGain();
    pad.type = 'sine';
    pad.frequency.value = 110; // A2
    padGain.gain.value = 0.02;
    pad.connect(padGain);
    padGain.connect(audioContext.destination);
    pad.start();

    musicOscs.push(pad);
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

// Button handlers
startBtn.addEventListener('click', () => {
    startGame();
    startMusic();
});
restartBtn.addEventListener('click', () => {
    startGame();
    startMusic();
});
