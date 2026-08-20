/**
 * Aplicación Principal
 * Controlador principal de la aplicación
 */

const App = {
    currentScreen: 'home',
    
    /**
     * Inicializa la aplicación
     */
    init() {
        // Inicializar sistemas
        Storage.getSettings(); // Cargar configuración
        AudioSystem.init();
        Particles.init();
        
        // Configurar audio según preferencias
        const settings = Storage.getSettings();
        AudioSystem.setEnabled(settings.sound);
        
        // Actualizar UI de ajustes
        this.updateSettingsUI();
        
        // Renderizar pantalla de inicio
        this.renderHome();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Animar entrada
        Animations.animateHomeScreen();
        
        // Actualizar contador de quizzes
        document.getElementById('total-quizzes').textContent = 
            String(quizzes.length).padStart(2, '0');
    },

    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Botón de jugar desde home
        document.getElementById('btn-play').addEventListener('click', () => {
            AudioSystem.playClick();
            this.navigateTo('quizzes');
        });

        // Botón de ver quizzes
        document.getElementById('btn-quizzes').addEventListener('click', () => {
            AudioSystem.playClick();
            this.navigateTo('quizzes');
        });

        // Botón de volver desde quizzes
        document.getElementById('btn-back-home').addEventListener('click', () => {
            AudioSystem.playClick();
            this.navigateTo('home');
        });

        // Botón flotante de ajustes
        document.getElementById('btn-settings').addEventListener('click', () => {
            AudioSystem.playClick();
            this.navigateTo('settings');
        });

        // Botón de volver desde ajustes
        document.getElementById('btn-back-settings').addEventListener('click', () => {
            AudioSystem.playClick();
            this.navigateTo(this.currentScreen === 'game' ? 'game' : 'home');
        });

        // Toggle de sonido
        document.getElementById('toggle-sound').addEventListener('click', (e) => {
            const isActive = e.currentTarget.classList.contains('active');
            e.currentTarget.classList.toggle('active');
            const newSetting = !isActive;
            
            const settings = Storage.getSettings();
            settings.sound = newSetting;
            Storage.saveSettings(settings);
            AudioSystem.setEnabled(newSetting);
            AudioSystem.playClick();
        });

        // Toggle de animaciones
        document.getElementById('toggle-animations').addEventListener('click', (e) => {
            const isActive = e.currentTarget.classList.contains('active');
            e.currentTarget.classList.toggle('active');
            
            const settings = Storage.getSettings();
            settings.animations = !isActive;
            Storage.saveSettings(settings);
            AudioSystem.playClick();
        });

        // Toggle de reduced motion
        document.getElementById('toggle-reduced-motion').addEventListener('click', (e) => {
            const isActive = e.currentTarget.classList.contains('active');
            e.currentTarget.classList.toggle('active');
            
            const settings = Storage.getSettings();
            settings.reducedMotion = !isActive;
            Storage.saveSettings(settings);
            AudioSystem.playClick();
        });

        // Botón de reset de datos
        document.getElementById('btn-reset-data').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
                Storage.resetData();
                AudioSystem.playClick();
                this.updateSettingsUI();
                alert('Datos borrados correctamente.');
            }
        });

        // Botón de replay
        document.getElementById('btn-replay').addEventListener('click', () => {
            AudioSystem.playClick();
            const lastQuiz = Storage.getLastQuiz();
            if (lastQuiz) {
                this.startQuiz(lastQuiz);
            } else {
                this.navigateTo('quizzes');
            }
        });

        // Botón de elegir otro quiz
        document.getElementById('btn-other-quiz').addEventListener('click', () => {
            AudioSystem.playClick();
            this.navigateTo('quizzes');
        });

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentScreen === 'settings') {
                AudioSystem.playClick();
                this.navigateTo('home');
            }
        });
    },

    /**
     * Navega a una pantalla específica
     */
    navigateTo(screen) {
        const fromScreen = document.getElementById(`${this.currentScreen}-screen`);
        const toScreen = document.getElementById(`${screen}-screen`);
        
        if (!toScreen || fromScreen === toScreen) return;

        AudioSystem.playTransition();
        
        Animations.transitionScreens(fromScreen, toScreen, () => {
            this.currentScreen = screen;
            
            // Acciones específicas por pantalla
            if (screen === 'quizzes') {
                this.renderQuizzes();
            } else if (screen === 'home') {
                Animations.animateHomeScreen();
            }
        });
    },

    /**
     * Renderiza la pantalla de inicio
     */
    renderHome() {
        // El contenido ya está en el HTML
    },

    /**
     * Renderiza la pantalla de selección de quizzes
     */
    renderQuizzes() {
        const grid = document.getElementById('quizzes-grid');
        grid.innerHTML = '';

        const highScores = Storage.getHighScores();
        const completed = Storage.getCompletedQuizzes();

        quizzes.forEach((quiz, index) => {
            const card = document.createElement('div');
            card.className = 'quiz-card';
            
            const progress = completed[quiz.id];
            const highScore = highScores[quiz.id] || 0;
            const progressPercent = progress ? (progress.correct / progress.total) * 100 : 0;

            card.innerHTML = `
                <div class="quiz-card-number">${String(index + 1).padStart(2, '0')}</div>
                <div class="quiz-card-category">${quiz.category}</div>
                <h3 class="quiz-card-title">${quiz.title}</h3>
                <div class="quiz-card-info">
                    <span class="quiz-card-badge">${quiz.difficulty}</span>
                    <span class="quiz-card-badge">${quiz.questions.length} preguntas</span>
                </div>
                <div class="quiz-card-progress">
                    <div class="quiz-card-progress-bar">
                        <div class="quiz-card-progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                <div class="quiz-card-score">
                    ${highScore > 0 ? `RÉCORD: ${highScore.toLocaleString('es-ES')} pts` : 'Sin jugar'}
                </div>
                <button class="quiz-card-btn" data-quiz-id="${quiz.id}">JUGAR</button>
            `;

            grid.appendChild(card);

            // Event listener para el botón de jugar
            card.querySelector('.quiz-card-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                AudioSystem.playClick();
                this.startQuiz(quiz.id);
            });

            // Click en toda la tarjeta
            card.addEventListener('click', () => {
                AudioSystem.playClick();
                this.startQuiz(quiz.id);
            });
        });

        // Animar entrada de tarjetas
        setTimeout(() => {
            const cards = grid.querySelectorAll('.quiz-card');
            Animations.animateQuizCards(cards);
        }, 100);
    },

    /**
     * Inicia un quiz
     */
    startQuiz(quizId) {
        QuizEngine.start(quizId);
        Storage.setLastQuiz(quizId);
        
        this.navigateTo('game');
        this.renderQuestion();
    },

    /**
     * Renderiza la pregunta actual
     */
    renderQuestion() {
        const question = QuizEngine.getCurrentQuestion();
        const progress = QuizEngine.getProgress();

        // Actualizar header
        document.getElementById('current-question').textContent = progress.current;
        document.getElementById('total-questions').textContent = progress.total;
        document.getElementById('question-number').textContent = 
            String(progress.current).padStart(2, '0');
        document.getElementById('question-text').textContent = question.question;

        // Actualizar barra de progreso
        Animations.animateProgressBar(
            document.getElementById('progress-fill'),
            progress.percentage
        );

        // Actualizar puntuación
        document.getElementById('score-display').textContent = 
            QuizEngine.score.toLocaleString('es-ES');

        // Actualizar combo
        const comboContainer = document.getElementById('combo-container');
        const comboMultiplier = document.getElementById('combo-multiplier');
        
        if (QuizEngine.streak >= 2) {
            comboContainer.classList.add('active');
            comboMultiplier.textContent = '×' + QuizEngine.streak;
            if (QuizEngine.streak > 2) {
                Animations.animateCombo(QuizEngine.streak);
            }
        } else {
            comboContainer.classList.remove('active');
        }

        // Renderizar respuestas
        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';

        const shuffledAnswers = QuizEngine.shuffleAnswers(question);

        shuffledAnswers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer.text;
            btn.dataset.originalIndex = answer.originalIndex;
            btn.dataset.isCorrect = answer.isCorrect;
            
            btn.addEventListener('click', () => this.handleAnswer(btn));
            answersContainer.appendChild(btn);
        });

        // Animar entrada
        const questionCard = document.getElementById('question-card');
        Animations.animateQuestionIn(questionCard);
        
        const answerBtns = answersContainer.querySelectorAll('.answer-btn');
        Animations.animateAnswersIn(answerBtns);
    },

    /**
     * Maneja la respuesta del usuario
     */
    handleAnswer(btnElement) {
        if (QuizEngine.isAnswering) return;

        const isCorrect = btnElement.dataset.isCorrect === 'true';
        const result = QuizEngine.answer(parseInt(btnElement.dataset.originalIndex));

        // Deshabilitar todos los botones
        const allBtns = document.querySelectorAll('.answer-btn');
        allBtns.forEach(btn => btn.disabled = true);

        if (isCorrect) {
            // Respuesta correcta
            AudioSystem.playCorrect();
            Animations.animateCorrectAnswer(btnElement);
            Particles.celebrateCorrect(btnElement);
            
            // Actualizar puntuación con animación
            Animations.animateScoreCounter(
                document.getElementById('score-display'),
                QuizEngine.score - result.points,
                QuizEngine.score
            );

            // Mostrar feedback positivo
            this.showFeedback(true, result.explanation);

            // Sonido de combo si aplica
            if (QuizEngine.streak >= 2) {
                AudioSystem.playCombo(QuizEngine.streak);
                Particles.celebrateCombo(QuizEngine.streak);
            }
        } else {
            // Respuesta incorrecta
            AudioSystem.playWrong();
            Animations.animateWrongAnswer(btnElement);

            // Marcar la correcta
            allBtns.forEach(btn => {
                if (btn.dataset.isCorrect === 'true') {
                    btn.classList.add('correct');
                }
            });

            // Mostrar feedback negativo
            this.showFeedback(false, result.explanation);
        }
    },

    /**
     * Muestra el feedback modal
     */
    showFeedback(isCorrect, explanation) {
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackText = document.getElementById('feedback-text');
        const feedbackExplanation = document.getElementById('feedback-explanation');

        feedbackIcon.textContent = isCorrect ? '✓' : '✗';
        feedbackIcon.style.color = isCorrect ? '#2D6A4F' : '#E63946';
        feedbackText.textContent = isCorrect ? '¡CORRECTO!' : 'INCORRECTO';
        feedbackText.style.color = isCorrect ? '#2D6A4F' : '#E63946';
        feedbackExplanation.textContent = explanation;

        Animations.animateFeedbackIn(feedbackContainer);

        // Esperar y avanzar
        setTimeout(() => {
            Animations.animateFeedbackOut(feedbackContainer, () => {
                this.nextStep();
            });
        }, 2500);
    },

    /**
     * Avanza al siguiente paso
     */
    nextStep() {
        const hasMore = QuizEngine.nextQuestion();

        if (hasMore) {
            this.renderQuestion();
        } else {
            this.showResults();
        }
    },

    /**
     * Muestra la pantalla de resultados
     */
    showResults() {
        const results = QuizEngine.finish();

        // Actualizar estadísticas
        document.getElementById('final-score').textContent = 
            results.score.toLocaleString('es-ES');
        document.getElementById('correct-count').textContent = 
            `${results.correct}/${results.total}`;
        document.getElementById('accuracy-rate').textContent = 
            `${results.accuracy}%`;
        document.getElementById('max-combo').textContent = 
            `×${results.maxStreak}`;

        // Mostrar indicador de nuevo récord
        const highscoreIndicator = document.getElementById('highscore-indicator');
        if (results.isNewHighScore) {
            highscoreIndicator.classList.add('active');
            AudioSystem.playHighScore();
        } else {
            highscoreIndicator.classList.remove('active');
        }

        // Navegar a pantalla de resultados
        this.navigateTo('results');

        // Animar resultados
        setTimeout(() => {
            Animations.animateResults();
            
            // Animar contador de puntuación
            Animations.animateScoreCounter(
                document.getElementById('final-score'),
                0,
                results.score
            );

            // Celebración si hay buen resultado
            if (results.accuracy >= 70) {
                setTimeout(() => {
                    Particles.confetti(3000);
                    AudioSystem.playComplete();
                }, 1000);
            }
        }, 500);
    },

    /**
     * Actualiza la UI de ajustes según la configuración guardada
     */
    updateSettingsUI() {
        const settings = Storage.getSettings();
        
        document.getElementById('toggle-sound').classList.toggle('active', settings.sound);
        document.getElementById('toggle-animations').classList.toggle('active', settings.animations);
        document.getElementById('toggle-reduced-motion').classList.toggle('active', settings.reducedMotion);
    }
};

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Hacer disponible globalmente
window.App = App;
