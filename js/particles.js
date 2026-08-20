/**
 * Particles System
 * Sistema de partículas y confeti usando DOM
 */

const Particles = {
    container: null,
    
    /**
     * Inicializa el sistema de partículas
     */
    init() {
        this.container = document.getElementById('particles-container');
    },
    
    /**
     * Crea una partícula individual
     */
    createParticle(x, y, color, size = 10) {
        if (!this.container) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '4px';
        
        this.container.appendChild(particle);
        
        // Animación con Anime.js
        const duration = 800 + Math.random() * 600;
        const translateX = (Math.random() - 0.5) * 200;
        const translateY = -100 - Math.random() * 150;
        const rotate = (Math.random() - 0.5) * 720;
        
        anime({
            targets: particle,
            translateX: translateX,
            translateY: translateY,
            rotate: rotate,
            opacity: [1, 0],
            scale: [1, 0.5],
            duration: duration,
            easing: 'easeOutExpo',
            complete: () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        });
    },
    
    /**
     * Explosión de partículas
     */
    explode(x, y, count = 20, colors = null) {
        const defaultColors = ['#E63946', '#F4A261', '#2D6A4F', '#E76F51', '#1A3A5C'];
        const particleColors = colors || defaultColors;
        
        for (let i = 0; i < count; i++) {
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            const size = 6 + Math.random() * 8;
            setTimeout(() => {
                this.createParticle(x, y, color, size);
            }, i * 20);
        }
    },
    
    /**
     * Lluvia de confeti
     */
    confetti(duration = 3000) {
        const colors = ['#E63946', '#F4A261', '#2D6A4F', '#E76F51', '#F5F0E6'];
        const shapes = ['square', 'circle', 'triangle'];
        const startTime = Date.now();
        
        const createConfettiPiece = () => {
            if (Date.now() - startTime > duration) return;
            
            const confetti = document.createElement('div');
            confetti.className = 'particle';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.width = (8 + Math.random() * 8) + 'px';
            confetti.style.height = (8 + Math.random() * 8) + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.background = 'transparent';
                confetti.style.borderLeft = '8px solid transparent';
                confetti.style.borderRight = '8px solid transparent';
                confetti.style.borderBottom = '14px solid ' + colors[Math.floor(Math.random() * colors.length)];
            }
            
            this.container.appendChild(confetti);
            
            const fallDuration = 2000 + Math.random() * 2000;
            const rotateAmount = (Math.random() - 0.5) * 1440;
            
            anime({
                targets: confetti,
                translateY: window.innerHeight + 50,
                rotate: rotateAmount,
                opacity: [1, 0.8, 0],
                duration: fallDuration,
                easing: 'easeInQuad',
                complete: () => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }
            });
            
            // Crear más confeti
            setTimeout(createConfettiPiece, 50 + Math.random() * 100);
        };
        
        // Crear múltiples piezas iniciales
        for (let i = 0; i < 10; i++) {
            setTimeout(createConfettiPiece, i * 100);
        }
    },
    
    /**
     * Efecto de celebración para respuesta correcta
     */
    celebrateCorrect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        this.explode(centerX, centerY, 30, ['#2D6A4F', '#F4A261', '#F5F0E6']);
    },
    
    /**
     * Efecto para combo
     */
    celebrateCombo(multiplier) {
        const comboContainer = document.getElementById('combo-container');
        if (!comboContainer) return;
        
        const rect = comboContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const particleCount = Math.min(10 + multiplier * 3, 40);
        const colors = ['#E76F51', '#F4A261', '#E63946'];
        
        this.explode(centerX, centerY, particleCount, colors);
    },
    
    /**
     * Limpia todas las partículas
     */
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
};

// Hacer disponible globalmente
window.Particles = Particles;
