// Module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Vertices = Matter.Vertices,
    Common = Matter.Common;

// Create engine
const engine = Engine.create();
// Low gravity for Moon simulation
engine.gravity.y = 0.16; // Earth is 1.0, Moon is ~0.165

// Create renderer
const render = Render.create({
    element: document.getElementById('game-container'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent' // Let CSS background show through
    }
});

// Create ground
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, {
    isStatic: true,
    render: {
        fillStyle: '#333'
    },
    friction: 1.0
});

Composite.add(engine.world, ground);

// Add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Run the renderer
Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Game state
let rocks = [];
const scoreElement = document.getElementById('score');
let gameWon = false;
const WIN_HEIGHT = 15; // 15 meters goal

// Function to create a jagged rock
function createRock(x, y) {
    const size = Common.random(40, 80);
    const sides = Math.round(Common.random(5, 8));

    // Generate a polygon
    const rock = Bodies.polygon(x, y, sides, size, {
        density: 0.05, // Heavy
        friction: 0.8, // High friction
        frictionAir: 0.05, // High air resistance
        restitution: 0.1, // Low bounciness
        render: {
            fillStyle: Common.choose(['#555', '#666', '#777', '#888', '#4a4a4a']),
            strokeStyle: '#222',
            lineWidth: 2
        }
    });

    // Make it look a bit more random/jagged by scaling vertices slightly? 
    // Matter.js polygons are regular. To make them jagged, we'd need custom vertices.
    // Let's stick to polygons for now as "jagged stones" approximation, 
    // or we could perturb the vertices if we really wanted to.
    // For a simple "jagged" look, a random polygon is usually "rock-like" enough compared to a square.

    return rock;
}

// Spawn rock on click, but only if not dragging
Events.on(mouseConstraint, 'mousedown', function (event) {
    // Check if we clicked on an existing body
    const mousePosition = event.mouse.position;
    const bodies = Composite.allBodies(engine.world);
    const clickedBody = Matter.Query.point(bodies, mousePosition)[0];

    if (!clickedBody || clickedBody === ground) {
        // Spawn a new rock at the top at the x position of the mouse
        // But constrain Y to be near top
        const spawnX = mousePosition.x;
        const spawnY = 50; // Spawn at top

        const newRock = createRock(spawnX, spawnY);
        rocks.push(newRock);
        Composite.add(engine.world, newRock);
    }
});

// Update score loop
Events.on(engine, 'afterUpdate', function () {
    let maxHeight = 0;

    rocks.forEach(rock => {
        // Calculate height from ground
        // Ground y is window.innerHeight
        // Height is distance from ground
        const height = window.innerHeight - rock.position.y - 30; // approximate
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Convert pixels to "meters" (arbitrary scale)
    // Convert pixels to "meters" (arbitrary scale)
    const meters = Math.max(0, (maxHeight / 50).toFixed(1));
    scoreElement.innerText = `Current Height: ${meters}m / ${WIN_HEIGHT}m`;

    if (!gameWon && parseFloat(meters) >= WIN_HEIGHT) {
        gameWon = true;
        scoreElement.style.color = '#4ade80';
        scoreElement.innerText = `GOAL REACHED! ${meters}m`;

        // Confetti effect or simple alert
        setTimeout(() => {
            alert(`Mission Accomplished! You reached ${meters}m!`);
        }, 500);
    }
});

// Handle window resize
window.addEventListener('resize', function () {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;

    // Reposition ground
    Matter.Body.setPosition(ground, {
        x: window.innerWidth / 2,
        y: window.innerHeight
    });

    // Resize ground
    // Matter.js doesn't have a simple resize for bodies, usually better to replace it
    // But for a static rectangle, we can try scaling or just recreating.
    // Recreating is safer.
    Composite.remove(engine.world, ground);

    const newGround = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, {
        isStatic: true,
        render: {
            fillStyle: '#333'
        },
        friction: 1.0
    });

    Composite.add(engine.world, newGround);
});

// ============= MOON AMBIENT MUSIC =============
let audioContext, musicOscs = [];

function startMusic() {
    if (musicOscs.length > 0) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [130.81, 146.83, 164.81, 196.00]; // C3-G3 (low, spacey)
    const pattern = [0, 2, 1, 3, 2, 0];
    let noteIndex = 0;

    function playNote() {
        if (musicOscs.length === 0) return;

        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = notes[pattern[noteIndex]];

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now);
        osc.stop(now + 1.5);

        noteIndex = (noteIndex + 1) % pattern.length;
        setTimeout(playNote, 1200);
    }

    // Deep pad
    const pad = audioContext.createOscillator();
    const padGain = audioContext.createGain();
    pad.type = 'sine';
    pad.frequency.value = 65.41; // C2
    padGain.gain.value = 0.015;
    pad.connect(padGain);
    padGain.connect(audioContext.destination);
    pad.start();

    musicOscs.push(pad);
    playNote();
}

// Auto-start music on first interaction
document.addEventListener('click', () => {
    if (musicOscs.length === 0) startMusic();
}, { once: true });
