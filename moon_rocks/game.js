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
// Low gravity for Moon simulation (1/6 of Earth gravity)
engine.gravity.y = 0.16; // Default is 1
// Enable sleeping for better stability and performance
engine.enableSleeping = true;

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

// 3D Effect: Enhanced with better shadows and highlights
Events.on(render, 'beforeRender', function () {
    const ctx = render.context;
    rocks.forEach(rock => {
        if (rock.render.visible === false) return;

        ctx.beginPath();
        const vertices = rock.vertices;

        // Draw deeper shadow for more 3D effect
        const shadowOffset = 8;
        ctx.moveTo(vertices[0].x + shadowOffset, vertices[0].y + shadowOffset);
        for (let j = 1; j < vertices.length; j++) {
            ctx.lineTo(vertices[j].x + shadowOffset, vertices[j].y + shadowOffset);
        }
        ctx.closePath();

        // Darker, softer shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fill();

        // Add highlight on top-left for 3D depth
        ctx.beginPath();
        const highlightOffset = -2;
        ctx.moveTo(vertices[0].x + highlightOffset, vertices[0].y + highlightOffset);
        for (let j = 1; j < vertices.length; j++) {
            ctx.lineTo(vertices[j].x + highlightOffset, vertices[j].y + highlightOffset);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
    });
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

    // Generate a polygon with more variation
    const rock = Bodies.polygon(x, y, sides, size, {
        density: 0.05, // Heavy
        friction: 0.8, // High friction
        frictionAir: 0.05, // High air resistance
        restitution: 0.1, // Low bounciness
        render: {
            fillStyle: Common.choose(['#7f8c8d', '#95a5a6', '#bdc3c7', '#636e72']),
            strokeStyle: '#2c3e50',
            lineWidth: 3  // Thicker outline for 3D effect
        },
        // Custom properties
        hasLanded: false,
        stableFrames: 0  // Track how many frames rock has been stable
    });

    return rock;
}

// Detect collisions to mark rocks as "landed"
Events.on(engine, 'collisionStart', function (event) {
    const pairs = event.pairs;
    pairs.forEach(pair => {
        if (rocks.includes(pair.bodyA)) pair.bodyA.hasLanded = true;
        if (rocks.includes(pair.bodyB)) pair.bodyB.hasLanded = true;
    });
});

// Spawn rock on click, but only if not dragging
function handleSpawn(position) {
    const bodies = Composite.allBodies(engine.world);
    const clickedBody = Matter.Query.point(bodies, position)[0];

    if (!clickedBody || clickedBody === ground) {
        const spawnX = position.x;
        const spawnY = -50; // Spawn ABOVE the screen to fall in

        const newRock = createRock(spawnX, spawnY);
        rocks.push(newRock);
        Composite.add(engine.world, newRock);

        // Start music on first interaction
        if (musicOscs.length === 0) startMusic();
    }
}

Events.on(mouseConstraint, 'mousedown', function (event) {
    handleSpawn(event.mouse.position);
});

// Add touch support for spawning
render.canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = render.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const position = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
    handleSpawn(position);
}, { passive: false });

// Update score loop with better stability detection
Events.on(engine, 'afterUpdate', function () {
    let maxHeight = 0;

    rocks.forEach(rock => {
        // Check if rock is moving slowly (stable)
        const isStable = rock.speed < 0.5;

        // Track stable frames
        if (isStable && rock.hasLanded) {
            rock.stableFrames = (rock.stableFrames || 0) + 1;
        } else {
            rock.stableFrames = 0;
        }

        // Only count rocks that have been stable for at least 30 frames (~0.5 seconds)
        if (rock.hasLanded && rock.stableFrames > 30) {
            // Calculate height from ground
            const height = window.innerHeight - rock.bounds.min.y - 30;
            if (height > maxHeight) {
                maxHeight = height;
            }
        }
    });

    // Convert pixels to "meters" (arbitrary scale: 50px = 1m)
    const meters = Math.max(0, (maxHeight / 50).toFixed(1));
    scoreElement.innerText = `Current Height: ${meters}m / ${WIN_HEIGHT}m`;

    // Only declare win if rocks have been stably at height for a moment
    if (!gameWon && parseFloat(meters) >= WIN_HEIGHT) {
        // Double-check that we have stable rocks
        const hasStableRocks = rocks.some(r => r.stableFrames > 30);
        if (hasStableRocks) {
            gameWon = true;
            scoreElement.style.color = '#4ade80';
            scoreElement.innerText = `GOAL REACHED! ${meters}m`;

            // Confetti effect
            setTimeout(() => {
                alert(`Mission Accomplished! You reached ${meters}m!`);
            }, 500);
        }
    }
});

// Handle window resize
function resize() {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;

    // Reposition ground
    Matter.Body.setPosition(ground, {
        x: window.innerWidth / 2,
        y: window.innerHeight
    });

    // Resize ground
    Composite.remove(engine.world, ground);

    const newGround = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, {
        isStatic: true,
        render: {
            fillStyle: '#333'
        },
        friction: 1.0
    });

    Composite.add(engine.world, newGround);
}

window.addEventListener('resize', resize);

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

// Initialize
resize();

// Auto-start music on first interaction
document.addEventListener('click', () => {
    if (musicOscs.length === 0) startMusic();
}, { once: true });
