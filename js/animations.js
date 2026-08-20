/**
 * Animations System
 * Sistema de animaciones con Anime.js
 */

const Animations = {
    /**
     * Verifica si las animaciones están habilitadas
     */
    isEnabled() {
        const settings = Storage.getSettings();
        return settings.animations && !settings.reducedMotion;
    },
    
    /**
     * Animación de entrada de la pantalla de inicio
     */
    animateHomeScreen() {
        if (!this.isEnabled()) {
            document.querySelectorAll('.title-line').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            document.querySelector('.subtitle').style.opacity = '1';
            document.querySelector('.decorative-divider').style.opacity = '1';
            document.querySelector('.actions-container').style.opacity = '1';
            document.querySelector('.stats-preview').style.opacity = '1';
            return;
        }
        
        const tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        });
        
        tl
        .add({
            targets: '.line-1',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 200
        })
        .add({
            targets: '.line-2',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000
        }, '-=600')
        .add({
            targets: '.subtitle',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800
        }, '-=700')
        .add({
            targets: '.decorative-divider',
            opacity: [0, 1],
            scaleX: [0, 1],
            duration: 600
        }, '-=500')
        .add({
            targets: '.actions-container',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=400')
        .add({
            targets: '.stats-preview',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600
        }, '-=400');
        
        // Animación continua de elementos decorativos
        this.animateBackgroundShapes();
    },
    
    /**
     * Animación de fondo para formas decorativas
     */
    animateBackgroundShapes() {
        if (!this.isEnabled()) return;
        
        anime({
            targets: '.bg-shape-1',
            translateX: [0, 30],
            translateY: [0, 20],
            direction: 'alternate',
            loop: true,
            duration: 8000,
            easing: 'easeInOutSine'
        });
        
        anime({
            targets: '.bg-shape-2',
            translateX: [0, -20],
            translateY: [0, 30],
            direction: 'alternate',
            loop: true,
            duration: 10000,
            easing: 'easeInOutSine'
        });
        
        anime({
            targets: '.bg-shape-3',
            rotate: [0, 180],
            scale: [1, 1.1],
            direction: 'alternate',
            loop: true,
            duration: 12000,
            easing: 'easeInOutSine'
        });
    },
    
    /**
     * Animación de entrada para tarjetas de quiz
     */
    animateQuizCards(cards) {
        if (!this.isEnabled() || cards.length === 0) return;
        
        anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [30, 0],
            rotate: [-2, 0],
            delay: anime.stagger(100, {start: 200}),
            duration: 600,
            easing: 'easeOutExpo'
        });
    },
    
    /**
     * Animación de entrada de pregunta
     */
    animateQuestionIn(element) {
        if (!this.isEnabled()) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.95, 1],
            duration: 500,
            easing: 'easeOutExpo'
        });
    },
    
    /**
     * Animación de salida de pregunta
     */
    animateQuestionOut(element, callback) {
        if (!this.isEnabled()) {
            if (callback) callback();
            return;
        }
        
        anime({
            targets: element,
            opacity: [1, 0],
            translateY: [0, -50],
            scale: [1, 0.95],
            duration: 400,
            easing: 'easeInExpo',
            complete: callback
        });
    },
    
    /**
     * Animación de entrada de respuestas
     */
    animateAnswersIn(elements) {
        if (!this.isEnabled() || elements.length === 0) return;
        
        anime({
            targets: elements,
            opacity: [0, 1],
            translateX: [50, 0],
            delay: anime.stagger(80, {start: 200}),
            duration: 400,
            easing: 'easeOutExpo'
        });
    },
    
    /**
     * Animación de respuesta correcta
     */
    animateCorrectAnswer(element) {
        if (!this.isEnabled()) {
            element.classList.add('correct');
            return;
        }
        
        anime({
            targets: element,
            scale: [1, 1.05, 1],
            backgroundColor: ['#FFFFFF', '#2D6A4F', '#2D6A4F'],
            borderColor: ['#1A3A5C', '#2D6A4F', '#2D6A4F'],
            duration: 500,
            easing: 'easeOutQuad'
        });
    },
    
    /**
     * Animación de respuesta incorrecta
     */
    animateWrongAnswer(element) {
        if (!this.isEnabled()) {
            element.classList.add('incorrect');
            return;
        }
        
        anime({
            targets: element,
            translateX: [-10, 10, -10, 10, 0],
            backgroundColor: ['#FFFFFF', '#E63946', '#E63946'],
            borderColor: ['#1A3A5C', '#E63946', '#E63946'],
            duration: 400,
            easing: 'easeInOutQuad'
        });
    },
    
    /**
     * Animación del contador de puntuación
     */
    animateScoreCounter(element, from, to) {
        if (!this.isEnabled()) {
            element.textContent = to;
            return;
        }
        
        anime({
            targets: { value: from },
            value: to,
            round: 1,
            duration: 1000,
            easing: 'easeOutExpo',
            update: function() {
                element.textContent = this.targets[0].value.toLocaleString('es-ES');
            }
        });
    },
    
    /**
     * Animación de la barra de progreso
     */
    animateProgressBar(element, percentage) {
        if (!this.isEnabled()) {
            element.style.width = percentage + '%';
            return;
        }
        
        anime({
            targets: element,
            width: percentage + '%',
            duration: 800,
            easing: 'easeOutExpo'
        });
    },
    
    /**
     * Animación del combo
     */
    animateCombo(multiplier) {
        if (!this.isEnabled()) return;
        
        const container = document.getElementById('combo-container');
        const badge = container.querySelector('.combo-badge');
        
        anime({
            targets: badge,
            scale: [1, 1.3, 1],
            rotate: [-10, 10, 0],
            duration: 400,
            easing: 'easeOutBack'
        });
    },
    
    /**
     * Animación de resultados
     */
    animateResults() {
        if (!this.isEnabled()) {
            document.querySelectorAll('.result-stat').forEach((el, i) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }
        
        anime({
            targets: '.result-stat',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(150, {start: 300}),
            duration: 600,
            easing: 'easeOutExpo'
        });
    },
    
    /**
     * Animación de transición entre pantallas
     */
    transitionScreens(fromScreen, toScreen, callback) {
        if (!this.isEnabled()) {
            fromScreen.classList.remove('active');
            toScreen.classList.add('active');
            if (callback) callback();
            return;
        }
        
        anime({
            targets: fromScreen,
            opacity: [1, 0],
            translateY: [0, -30],
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                fromScreen.classList.remove('active');
                toScreen.classList.add('active');
                
                anime({
                    targets: toScreen,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 400,
                    easing: 'easeOutExpo',
                    complete: callback
                });
            }
        });
    },
    
    /**
     * Animación del feedback modal
     */
    animateFeedbackIn(element) {
        if (!this.isEnabled()) {
            element.style.display = 'flex';
            element.style.opacity = '1';
            return;
        }
        
        element.style.display = 'flex';
        
        anime({
            targets: element.querySelector('.feedback-content'),
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
    },
    
    animateFeedbackOut(element, callback) {
        if (!this.isEnabled()) {
            element.classList.remove('active');
            if (callback) callback();
            return;
        }
        
        anime({
            targets: element.querySelector('.feedback-content'),
            opacity: [1, 0],
            scale: [1, 0.9],
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                element.classList.remove('active');
                if (callback) callback();
            }
        });
    }
};

// Hacer disponible globalmente
window.Animations = Animations;
