// Module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Common = Matter.Common;

// Game State
let engine, render, runner;
let gameMode = 24; // Default target
let currentBlocks = 0;
let gameActive = false;
let gameWon = false;
let blocks = [];
let ground;

// UI Elements
const startScreen = document.getElementById('start-screen');
const gameHud = document.getElementById('game-hud');
const gameOverScreen = document.getElementById('game-over-screen');
const blockCountDisplay = document.getElementById('block-count');
const resultTitle = document.getElementById('result-title');
const resultMsg = document.getElementById('result-msg');
const nextPreview = document.getElementById('next-preview');

// Audio Context
let audioCtx;

// Initialize Game Engine
function initEngine() {
    engine = Engine.create();
    // Moon gravity (approx 1/6th of Earth)
    engine.gravity.y = 0.3; // Slightly higher than real moon for better gameplay feel
    engine.enableSleeping = true;

    render = Render.create({
        element: document.getElementById('game-container'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    // Create Ground
    ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 20, window.innerWidth, 60, {
        isStatic: true,
        render: { fillStyle: '#444' },
        label: 'ground'
    });
    Composite.add(engine.world, ground);

    // Mouse/Touch Control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Run
    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    // Collision Event for Loss Condition
    Events.on(engine, 'afterUpdate', checkGameState);
}

// Start Game with selected mode
function startGame(mode) {
    gameMode = mode;
    currentBlocks = 0;
    gameActive = true;
    gameWon = false;
    blocks = [];

    // Reset World
    Composite.clear(engine.world);
    Engine.clear(engine);
    Composite.add(engine.world, [ground]); // Re-add ground

    // Re-add mouse constraint
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Update UI
    startScreen.classList.add('hidden');
    gameHud.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    updateHUD();

    // Init Audio
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function resetGame() {
    startGame(gameMode);
}

function retryGame() {
    startGame(gameMode);
}

function showMenu() {
    gameActive = false;
    startScreen.classList.remove('hidden');
    gameHud.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Clear blocks
    Composite.clear(engine.world);
    Composite.add(engine.world, [ground]);
}

// Spawning Logic
function spawnShape(x, y) {
    if (!gameActive || currentBlocks >= gameMode) return;

    // Safety check: Don't spawn if mouse is over UI
    if (y < 80) return;

    const size = Common.random(40, 60);
    const color = Common.choose(['#ff0080', '#00f3ff', '#ffd700', '#33ff33', '#ff6b6b']);

    let body;
    const type = Common.choose(['rectangle', 'circle', 'triangle', 'polygon']);

    switch (type) {
        case 'rectangle':
            body = Bodies.rectangle(x, y, size, size, {
                render: { fillStyle: color, strokeStyle: '#fff', lineWidth: 2 }
            });
            break;
        case 'circle':
            body = Bodies.circle(x, y, size / 2, {
                render: { fillStyle: color, strokeStyle: '#fff', lineWidth: 2 }
            });
            break;
        case 'triangle':
            body = Bodies.polygon(x, y, 3, size / 1.5, {
                render: { fillStyle: color, strokeStyle: '#fff', lineWidth: 2 }
            });
            break;
        case 'polygon':
            body = Bodies.polygon(x, y, 5, size / 2, {
                render: { fillStyle: color, strokeStyle: '#fff', lineWidth: 2 }
            });
            break;
    }

    if (body) {
        body.restitution = 0.3; // Bounciness
        body.friction = 0.8;    // Grip
        Composite.add(engine.world, body);
        blocks.push(body);
        currentBlocks++;
        updateHUD();
        playPopSound();

        if (currentBlocks === gameMode) {
            // Check for win after delay
            setTimeout(() => {
                if (gameActive && !gameWon) checkWinCondition();
            }, 3000);
        }
    }
}

// Input Handling
window.addEventListener('mousedown', (e) => {
    // Only spawn if clicking on canvas and not dragging
    // For simplicity in this version, click = spawn at mouse pos
    // But we need to avoid spawning when clicking buttons
    if (e.target.tagName !== 'BUTTON') {
        spawnShape(e.clientX, e.clientY);
    }
});

window.addEventListener('touchstart', (e) => {
    if (e.target.tagName !== 'BUTTON') {
        e.preventDefault(); // Prevent scrolling
        const touch = e.touches[0];
        spawnShape(touch.clientX, touch.clientY);
    }
}, { passive: false });

// Game Logic
function checkGameState() {
    if (!gameActive) return;

    // Check if any block fell off screen
    blocks.forEach(block => {
        if (block.position.y > window.innerHeight + 100) {
            gameOver(false);
        }
    });
}

function checkWinCondition() {
    // If we haven't lost yet and have all blocks
    if (gameActive) {
        gameOver(true);
    }
}

function gameOver(win) {
    gameActive = false;
    gameWon = win;

    gameHud.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    if (win) {
        resultTitle.innerText = "MISSION ACCOMPLISHED!";
        resultTitle.style.color = "#33ff33";
        resultMsg.innerText = `You successfully stacked ${gameMode} blocks!`;
        playWinSound();
        fireConfetti();
    } else {
        resultTitle.innerText = "TOWER CRASHED!";
        resultTitle.style.color = "#ff0080";
        resultMsg.innerText = `You stacked ${currentBlocks} blocks before the crash.`;
        playLoseSound();
    }
}

function updateHUD() {
    blockCountDisplay.innerText = `${currentBlocks} / ${gameMode}`;
    // Random color for next preview
    nextPreview.style.backgroundColor = Common.choose(['#ff0080', '#00f3ff', '#ffd700', '#33ff33']);
}

// Audio
function playPopSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(Common.random(200, 600), audioCtx.currentTime);
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playWinSound() {
    if (!audioCtx) return;
    // Simple arpeggio
    [440, 554, 659, 880].forEach((freq, i) => {
        setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.value = freq;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        }, i * 100);
    });
}

function playLoseSound() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.5);
    osc.type = 'sawtooth';
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
}

function fireConfetti() {
    // Simple particle effect using Matter.js bodies for confetti
    for (let i = 0; i < 50; i++) {
        const confetti = Bodies.circle(
            window.innerWidth / 2,
            window.innerHeight + 50,
            5,
            {
                render: { fillStyle: Common.choose(['#f00', '#0f0', '#00f', '#ff0']) },
                force: { x: Common.random(-0.05, 0.05), y: Common.random(-0.05, -0.1) }
            }
        );
        Composite.add(engine.world, confetti);
    }
}

// Resize Handler
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    Matter.Body.setPosition(ground, {
        x: window.innerWidth / 2,
        y: window.innerHeight + 20
    });
});

// Init on Load
window.addEventListener('load', initEngine);
