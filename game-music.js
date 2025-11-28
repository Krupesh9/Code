// ============= GAME MUSIC SYSTEM =============
// Procedurally generated music using Web Audio API
// Each game has a unique theme and mood

class GameMusic {
    constructor(theme = 'calm') {
        this.audioContext = null;
        this.masterGain = null;
        this.isPlaying = false;
        this.theme = theme;
        this.scheduledTimeout = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.12;
            this.masterGain.connect(this.audioContext.destination);
        }
    }

    playNote(freq, startTime, duration, waveType = 'sine', volume = 0.08) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = waveType;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    // Different music themes for different games
    getThemeConfig() {
        const themes = {
            space: {
                notes: [130.81, 146.83, 164.81, 196.00, 220.00, 246.94], // C3-B3
                pattern: [0, 4, 2, 5, 1, 4, 3, 5],
                tempo: 0.4,
                waveType: 'sawtooth',
                bassOctave: 2
            },
            mysterious: {
                notes: [174.61, 196.00, 220.00, 246.94, 261.63], // F3-C4
                pattern: [0, 2, 1, 3, 4, 3, 2, 1],
                tempo: 1.0,
                waveType: 'triangle',
                bassOctave: 2
            },
            playful: {
                notes: [523.25, 587.33, 659.25, 783.99, 880.00], // C5-A5
                pattern: [0, 2, 4, 2, 1, 3, 4, 0],
                tempo: 0.3,
                waveType: 'square',
                bassOctave: 1
            },
            atmospheric: {
                notes: [110.00, 123.47, 130.81, 146.83, 164.81], // A2-E3
                pattern: [0, 2, 4, 2, 1, 3, 2, 0],
                tempo: 1.2,
                waveType: 'sine',
                bassOctave: 3
            },
            urgent: {
                notes: [261.63, 293.66, 329.63, 349.23, 392.00], // C4-G4
                pattern: [0, 1, 2, 3, 4, 3, 2, 1],
                tempo: 0.25,
                waveType: 'sawtooth',
                bassOctave: 1
            },
            rain: {
                notes: [220.00, 246.94, 261.63, 293.66, 329.63], // A3-E4
                pattern: [0, 2, 1, 3, 2, 4, 3, 1],
                tempo: 0.7,
                waveType: 'sine',
                bassOctave: 2
            },
            educational: {
                notes: [392.00, 440.00, 493.88, 523.25, 587.33], // G4-D5
                pattern: [0, 2, 4, 2, 1, 3, 4, 0],
                tempo: 0.5,
                waveType: 'triangle',
                bassOctave: 1
            },
            scifi: {
                notes: [146.83, 164.81, 185.00, 207.65, 220.00], // D3-A3
                pattern: [0, 3, 1, 4, 2, 3, 1, 0],
                tempo: 0.35,
                waveType: 'sawtooth',
                bassOctave: 2
            },
            calm: {
                notes: [261.63, 293.66, 329.63, 392.00, 440.00], // C4-A4
                pattern: [0, 2, 4, 2, 1, 3, 4, 3],
                tempo: 0.8,
                waveType: 'sine',
                bassOctave: 2
            }
        };

        return themes[this.theme] || themes.calm;
    }

    scheduleMusic() {
        if (!this.isPlaying) return;

        const config = this.getThemeConfig();
        const now = this.audioContext.currentTime;
        const beatDuration = config.tempo;

        // Melody
        for (let i = 0; i < config.pattern.length; i++) {
            const noteIndex = config.pattern[i];
            this.playNote(
                config.notes[noteIndex],
                now + i * beatDuration,
                beatDuration * 1.5,
                config.waveType,
                0.06
            );
        }

        // Bass note
        this.playNote(
            config.notes[0] / config.bassOctave,
            now,
            beatDuration * config.pattern.length,
            'sine',
            0.04
        );

        // Add some harmony
        if (this.theme === 'space' || this.theme === 'scifi') {
            this.playNote(
                config.notes[2],
                now,
                beatDuration * config.pattern.length,
                'triangle',
                0.03
            );
        }

        this.scheduledTimeout = setTimeout(
            () => this.scheduleMusic(),
            beatDuration * config.pattern.length * 1000
        );
    }

    play() {
        if (this.isPlaying) return;
        this.init();

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.isPlaying = true;
        this.scheduleMusic();
    }

    stop() {
        this.isPlaying = false;
        if (this.scheduledTimeout) {
            clearTimeout(this.scheduledTimeout);
        }
        if (this.audioContext && this.masterGain) {
            this.masterGain.gain.exponentialRampToValueAtTime(
                0.001,
                this.audioContext.currentTime + 1
            );
        }
    }

    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.value = volume;
        }
    }
}

// Auto-start music helper
function autoStartMusic(musicInstance) {
    const startMusic = () => {
        musicInstance.play();
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
    };

    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });
}
