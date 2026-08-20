/**
 * Audio System
 * Sistema de audio sintetizado sin dependencias externas
 */

const AudioSystem = {
    enabled: true,
    audioContext: null,
    
    /**
     * Inicializa el contexto de audio
     */
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API no soportada');
            this.enabled = false;
        }
    },
    
    /**
     * Activa o desactiva el sonido
     */
    setEnabled(enabled) {
        this.enabled = enabled;
        if (enabled && !this.audioContext) {
            this.init();
        }
    },
    
    /**
     * Reproduce un tono simple
     */
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },
    
    /**
     * Sonido de clic/interacción
     */
    playClick() {
        this.playTone(800, 0.1, 'sine', 0.2);
    },
    
    /**
     * Sonido de respuesta correcta
     */
    playCorrect() {
        if (!this.enabled || !this.audioContext) return;
        
        // Arpegio ascendente
        const now = this.audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.15, 'sine', 0.3);
            }, index * 80);
        });
    },
    
    /**
     * Sonido de respuesta incorrecta
     */
    playWrong() {
        if (!this.enabled || !this.audioContext) return;
        
        // Tonos descendentes
        const now = this.audioContext.currentTime;
        const notes = [400, 350, 300];
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.2, 'triangle', 0.3);
            }, index * 100);
        });
    },
    
    /**
     * Sonido de combo
     */
    playCombo(multiplier) {
        if (!this.enabled || !this.audioContext) return;
        
        // Más intenso según el multiplicador
        const baseFreq = 440 + (multiplier * 50);
        this.playTone(baseFreq, 0.2, 'sine', 0.3);
        
        if (multiplier >= 5) {
            setTimeout(() => {
                this.playTone(baseFreq * 1.5, 0.2, 'sine', 0.2);
            }, 100);
        }
    },
    
    /**
     * Sonido de quiz completado
     */
    playComplete() {
        if (!this.enabled || !this.audioContext) return;
        
        // Fanfarria simple
        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        const durations = [0.15, 0.15, 0.15, 0.3, 0.15, 0.4];
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, durations[index], 'sine', 0.3);
            }, index * 150);
        });
    },
    
    /**
     * Sonido de nuevo récord
     */
    playHighScore() {
        if (!this.enabled || !this.audioContext) return;
        
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.2, 'sine', 0.3);
            }, index * 120);
        });
    },
    
    /**
     * Sonido de transición de pantalla
     */
    playTransition() {
        this.playTone(600, 0.15, 'sine', 0.15);
    },
    
    /**
     * Sonido de contador
     */
    playCounter() {
        this.playTone(1000, 0.05, 'sine', 0.1);
    }
};

// Hacer disponible globalmente
window.AudioSystem = AudioSystem;
