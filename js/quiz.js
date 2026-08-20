/**
 * Quiz Engine
 * Lógica principal del juego de quizzes
 */

const QuizEngine = {
    currentQuiz: null,
    currentQuestionIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    isAnswering: false,
    questionStartTime: 0,

    /**
     * Inicia un nuevo quiz
     */
    start(quizId) {
        this.currentQuiz = quizzes.find(q => q.id === quizId);
        if (!this.currentQuiz) return false;

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.isAnswering = false;

        // Guardar en sessionStorage para la partida actual
        sessionStorage.setItem('currentQuiz', quizId);
        sessionStorage.setItem('startTime', Date.now());

        return true;
    },

    /**
     * Obtiene la pregunta actual
     */
    getCurrentQuestion() {
        if (!this.currentQuiz) return null;
        return this.currentQuiz.questions[this.currentQuestionIndex];
    },

    /**
     * Verifica si hay más preguntas
     */
    hasMoreQuestions() {
        return this.currentQuestionIndex < this.currentQuiz.questions.length;
    },

    /**
     * Procesa una respuesta
     */
    answer(selectedIndex) {
        if (this.isAnswering || !this.currentQuiz) return null;

        this.isAnswering = true;
        this.questionStartTime = Date.now();

        const question = this.getCurrentQuestion();
        const isCorrect = selectedIndex === question.correct;
        const timeTaken = Date.now() - this.questionStartTime;

        if (isCorrect) {
            this.streak++;
            this.correctAnswers++;
            
            if (this.streak > this.maxStreak) {
                this.maxStreak = this.streak;
            }

            // Calcular puntos: base + bonus tiempo + bonus racha
            const basePoints = 100;
            const timeBonus = Math.max(0, Math.floor((5000 - timeTaken) / 100));
            const streakBonus = Math.min(this.streak, 10) * 50;
            const points = basePoints + timeBonus + streakBonus;
            
            this.score += points;

            return {
                correct: true,
                points: points,
                explanation: question.explanation
            };
        } else {
            this.streak = 0;
            this.incorrectAnswers++;

            return {
                correct: false,
                points: 0,
                explanation: question.explanation
            };
        }
    },

    /**
     * Avanza a la siguiente pregunta
     */
    nextQuestion() {
        this.currentQuestionIndex++;
        this.isAnswering = false;
        
        // Actualizar sessionStorage
        sessionStorage.setItem('currentQuestion', this.currentQuestionIndex);
        sessionStorage.setItem('score', this.score);
        sessionStorage.setItem('streak', this.streak);

        return this.hasMoreQuestions();
    },

    /**
     * Finaliza el quiz y devuelve resultados
     */
    finish() {
        const totalQuestions = this.currentQuiz.questions.length;
        const accuracy = Math.round((this.correctAnswers / totalQuestions) * 100);

        const results = {
            quizId: this.currentQuiz.id,
            quizTitle: this.currentQuiz.title,
            score: this.score,
            correct: this.correctAnswers,
            incorrect: this.incorrectAnswers,
            total: totalQuestions,
            accuracy: accuracy,
            maxStreak: this.maxStreak,
            isNewHighScore: Storage.saveScore(this.currentQuiz.id, this.score)
        };

        // Guardar estadísticas
        Storage.markQuizCompleted(
            this.currentQuiz.id,
            this.score,
            this.correctAnswers,
            totalQuestions
        );

        Storage.updateStats({
            correct: this.correctAnswers,
            incorrect: this.incorrectAnswers,
            score: this.score,
            maxStreak: this.maxStreak
        });

        // Limpiar sessionStorage
        sessionStorage.removeItem('currentQuiz');
        sessionStorage.removeItem('currentQuestion');
        sessionStorage.removeItem('score');
        sessionStorage.removeItem('streak');
        sessionStorage.removeItem('startTime');

        return results;
    },

    /**
     * Restaura el estado desde sessionStorage
     */
    restoreState() {
        const quizId = sessionStorage.getItem('currentQuiz');
        if (!quizId) return false;

        this.currentQuiz = quizzes.find(q => q.id === quizId);
        if (!this.currentQuiz) return false;

        this.currentQuestionIndex = parseInt(sessionStorage.getItem('currentQuestion') || '0');
        this.score = parseInt(sessionStorage.getItem('score') || '0');
        this.streak = parseInt(sessionStorage.getItem('streak') || '0');

        return true;
    },

    /**
     * Reinicia el quiz actual
     */
    restart() {
        if (this.currentQuiz) {
            return this.start(this.currentQuiz.id);
        }
        return false;
    },

    /**
     * Obtiene el progreso actual
     */
    getProgress() {
        if (!this.currentQuiz) return { current: 0, total: 0, percentage: 0 };
        
        return {
            current: this.currentQuestionIndex + 1,
            total: this.currentQuiz.questions.length,
            percentage: ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100
        };
    },

    /**
     * Mezcla las respuestas de una pregunta
     */
    shuffleAnswers(question) {
        const answers = question.answers.map((answer, index) => ({
            text: answer,
            originalIndex: index,
            isCorrect: index === question.correct
        }));

        // Algoritmo Fisher-Yates
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }

        return answers;
    }
};

// Hacer disponible globalmente
window.QuizEngine = QuizEngine;
