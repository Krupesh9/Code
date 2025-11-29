const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔'];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class RememberMeGame {
    constructor() {
        this.currentLevel = 1;
        this.playerCount = 1;
        this.difficulty = 'basic';
        this.scores = { p1: 0, p2: 0 };
        this.currentTurn = 1;
        this.cards = [];
        this.flippedCards = [];
        this.isLocked = false;
        this.matchesFound = 0;
        this.totalPairs = 0;

        this.music = new GameMusic('playful');

        this.initElements();
        this.attachListeners();
    }

    initElements() {
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen')
        };
        this.grid = document.getElementById('cards-grid');
        this.scoreEls = {
            p1: document.getElementById('score-p1'),
            p2: document.getElementById('score-p2')
        };
        this.scoreBoxes = {
            p1: document.querySelector('.score-box.p1'),
            p2: document.querySelector('.score-box.p2')
        };
        this.levelDisplay = document.getElementById('level-display');
        this.modal = document.getElementById('game-over-modal');
        this.winnerText = document.getElementById('winner-text');
    }

    attachListeners() {
        // Player selection
        document.querySelectorAll('.player-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.player-btn').forEach(b => b.classList.remove('selected'));
                const target = e.currentTarget;
                target.classList.add('selected');
                this.playerCount = parseInt(target.dataset.players);
            });
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
                const target = e.currentTarget;
                target.classList.add('selected');
                this.difficulty = target.dataset.difficulty;
            });
        });

        // Start button
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());

        // Play again
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.startGame();
        });

        // Music toggle
        const musicBtn = document.getElementById('music-toggle');
        musicBtn.addEventListener('click', () => {
            if (this.music.isPlaying) {
                this.music.stop();
                musicBtn.textContent = '🔇';
            } else {
                this.music.play();
                musicBtn.textContent = '🎵';
            }
        });
    }

    startGame() {
        this.currentLevel = 1;
        this.scores = { p1: 0, p2: 0 };
        this.currentTurn = 1;
        this.updateScoreUI();

        // Show/Hide P2 score based on mode
        if (this.playerCount === 1) {
            this.scoreBoxes.p2.classList.add('hidden');
            this.scoreBoxes.p1.querySelector('.label').textContent = 'Score';
        } else {
            this.scoreBoxes.p2.classList.remove('hidden');
            this.scoreBoxes.p1.querySelector('.label').textContent = 'Player 1';
        }

        this.switchScreen('game');
        this.music.play();
        this.startLevel();
    }

    startLevel() {
        this.levelDisplay.textContent = this.currentLevel;
        this.matchesFound = 0;
        this.flippedCards = [];
        this.isLocked = true; // Lock interaction during preview

        // Determine number of pairs based on level
        // Level 1: 2 pairs (4 cards)
        // Level 2: 3 pairs (6 cards)
        // ...
        // Cap at 10 pairs (20 cards)
        const pairsCount = Math.min(2 + (this.currentLevel - 1), 10);
        this.totalPairs = pairsCount;

        // Select content
        const allContent = [...emojis, ...alphabet];
        const selectedContent = [];

        // Determine items per card based on difficulty
        let itemsPerCard = 1;
        if (this.difficulty === 'advance') {
            // Start with 2, increase every 3 levels
            itemsPerCard = 2 + Math.floor((this.currentLevel - 1) / 3);
        }

        // Randomly select unique items for pairs
        while (selectedContent.length < pairsCount) {
            let compositeItem = '';
            for (let k = 0; k < itemsPerCard; k++) {
                compositeItem += allContent[Math.floor(Math.random() * allContent.length)];
            }

            // Ensure uniqueness
            if (!selectedContent.includes(compositeItem)) {
                selectedContent.push(compositeItem);
            }
        }

        // Create pairs
        const gameItems = [...selectedContent, ...selectedContent];

        // Shuffle
        for (let i = gameItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gameItems[i], gameItems[j]] = [gameItems[j], gameItems[i]];
        }

        // Render cards
        this.renderCards(gameItems);

        // Preview animation
        setTimeout(() => {
            // Flip all cards to show content
            document.querySelectorAll('.card').forEach(card => card.classList.add('flipped'));

            // Wait then hide
            setTimeout(() => {
                document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
                this.isLocked = false;
            }, 2000 + (this.currentLevel * 500)); // Longer preview for higher levels
        }, 500);
    }

    renderCards(items) {
        this.grid.innerHTML = '';

        // Adjust grid columns based on item count
        // We want consistent tile sizes across levels
        const count = items.length;
        let cols = 2; // Default for 4 items (2x2)
        if (count >= 6) cols = 3; // 6 items (3x2)
        if (count >= 8) cols = 4; // 8 items (4x2)
        if (count >= 12) cols = 4; // 12 items (4x3)
        if (count >= 16) cols = 4; // 16 items (4x4)
        if (count >= 20) cols = 5; // 20 items (5x4)

        // Calculate rows needed
        const rows = Math.ceil(items.length / cols);

        // Store grid dimensions for resizing
        this.gridCols = cols;
        this.gridRows = rows;
        this.grid.style.aspectRatio = `${cols} / ${rows}`;

        // Initial resize
        this.resizeGrid();

        // Add resize listener if not already added
        if (!this.resizeListenerAdded) {
            window.addEventListener('resize', () => this.resizeGrid());
            this.resizeListenerAdded = true;
        }

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index;
            card.dataset.value = item;

            // Add difficulty class to card for CSS styling
            card.classList.add(this.difficulty);

            card.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${item}</div>
            `;

            card.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent double firing on some devices
                this.handleCardClick(card);
            });
            card.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent default touch behavior (scrolling/zoom)
                this.handleCardClick(card);
            }, { passive: false });

            this.grid.appendChild(card);
        });
    }

    handleCardClick(card) {
        if (this.isLocked ||
            card.classList.contains('flipped') ||
            card.classList.contains('matched')) return;

        // Flip card
        card.classList.add('flipped');
        this.flippedCards.push(card);

        // Play flip sound (simulated with music helper if we had one, or just visual for now)

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isLocked = true;
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.value === card2.dataset.value;

        if (match) {
            this.handleMatch(card1, card2);
        } else {
            this.handleMismatch(card1, card2);
        }
    }

    handleMatch(card1, card2) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.flippedCards = [];
            this.isLocked = false;

            // Update score
            this.scores[`p${this.currentTurn}`] += 10;
            this.updateScoreUI();

            // Trigger confetti on the active score box
            const activeScoreBox = this.scoreBoxes[`p${this.currentTurn}`];
            this.triggerConfetti(activeScoreBox);
            this.matchesFound++;

            if (this.matchesFound === this.totalPairs) {
                this.levelComplete();
            }
        }, 500);
    }

    triggerConfetti(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = centerX + 'px';
            confetti.style.top = centerY + 'px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F43'][Math.floor(Math.random() * 4)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            document.body.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            const tx = Math.cos(angle) * 100;
            const ty = Math.sin(angle) * 100 - 100; // Upwards bias

            const animation = confetti.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    handleMismatch(card1, card2) {
        this.playMismatchSound();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            this.flippedCards = [];
            this.isLocked = false;

            if (this.playerCount === 2) {
                this.switchTurn();
            }
        }, 1000);
    }

    playMismatchSound() {
        if (this.music && this.music.audioContext) {
            const now = this.music.audioContext.currentTime;
            // Play a dissonant "wrong" sound
            this.music.playNote(150, now, 0.2, 'sawtooth', 0.1);
            this.music.playNote(100, now + 0.1, 0.4, 'sawtooth', 0.1);
        }
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === 1 ? 2 : 1;
        this.scoreBoxes.p1.classList.toggle('active-turn');
        this.scoreBoxes.p2.classList.toggle('active-turn');
    }

    updateScoreUI() {
        this.scoreEls.p1.textContent = this.scores.p1;
        this.scoreEls.p2.textContent = this.scores.p2;
    }

    levelComplete() {
        setTimeout(() => {
            if (this.currentLevel < 10) { // Max level 10
                this.currentLevel++;
                // Bonus points for clearing level
                this.scores[`p${this.currentTurn}`] += 50;
                this.updateScoreUI();

                // Celebration animation could go here

                this.startLevel();
            } else {
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {
        let message = '';
        if (this.playerCount === 1) {
            message = `Great Job! Final Score: ${this.scores.p1}`;
        } else {
            if (this.scores.p1 > this.scores.p2) {
                message = `Player 1 Wins! (${this.scores.p1} vs ${this.scores.p2})`;
            } else if (this.scores.p2 > this.scores.p1) {
                message = `Player 2 Wins! (${this.scores.p2} vs ${this.scores.p1})`;
            } else {
                message = `It's a Tie! (${this.scores.p1})`;
            }
        }

        this.winnerText.textContent = message;
        this.modal.classList.add('active');
    }

    resizeGrid() {
        if (!this.gridCols || !this.gridRows) return;

        // Get available space in the game board container
        const container = this.grid.parentElement;
        // We need the actual available content box size
        const style = window.getComputedStyle(container);
        const containerWidth = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const containerHeight = container.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);

        // Calculate aspect ratios
        const containerRatio = containerWidth / containerHeight;
        const gridRatio = this.gridCols / this.gridRows;

        // Apply sizing based on which dimension is the constraint
        if (containerRatio > gridRatio) {
            // Container is wider than grid -> Height is the constraint
            this.grid.style.width = `${containerHeight * gridRatio}px`;
            this.grid.style.height = '100%';
        } else {
            // Container is taller than grid -> Width is the constraint
            this.grid.style.width = '100%';
            this.grid.style.height = `${containerWidth / gridRatio}px`;
        }

        // Update grid template
        this.grid.style.gridTemplateColumns = `repeat(${this.gridCols}, 1fr)`;
        this.grid.style.gridTemplateRows = `repeat(${this.gridRows}, 1fr)`;
    }

    switchScreen(screenName) {
        Object.values(this.screens).forEach(s => s.classList.remove('active'));
        this.screens[screenName].classList.add('active');

        // Trigger resize when switching to game screen
        if (screenName === 'game') {
            setTimeout(() => this.resizeGrid(), 50);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new RememberMeGame();

    // Ensure audio context is resumed on first interaction
    const unlockAudio = () => {
        if (game.music && game.music.audioContext && game.music.audioContext.state === 'suspended') {
            game.music.audioContext.resume();
        }
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
});
