/**
 * Storage Layer
 * Manejo de localStorage y sessionStorage para la aplicación
 */

const Storage = {
    KEYS: {
        HIGH_SCORES: 'quiz_high_scores',
        STATS: 'quiz_stats',
        SETTINGS: 'quiz_settings',
        COMPLETED_QUIZZES: 'quiz_completed',
        LAST_QUIZ: 'quiz_last'
    },

    /**
     * Obtiene los datos almacenados para una clave específica
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    /**
     * Guarda datos en localStorage
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    /**
     * Guarda una puntuación máxima para un quiz específico
     */
    saveScore(quizId, score) {
        const highScores = this.getHighScores();
        const currentHigh = highScores[quizId] || 0;
        
        if (score > currentHigh) {
            highScores[quizId] = score;
            this.set(this.KEYS.HIGH_SCORES, highScores);
            return true; // Nuevo récord
        }
        return false;
    },

    /**
     * Obtiene la puntuación máxima para un quiz
     */
    getHighScore(quizId) {
        const highScores = this.getHighScores();
        return highScores[quizId] || 0;
    },

    /**
     * Obtiene todas las puntuaciones máximas
     */
    getHighScores() {
        return this.get(this.KEYS.HIGH_SCORES) || {};
    },

    /**
     * Guarda estadísticas generales del usuario
     */
    saveStats(stats) {
        const currentStats = this.getStats();
        const mergedStats = { ...currentStats, ...stats };
        this.set(this.KEYS.STATS, mergedStats);
    },

    /**
     * Obtiene las estadísticas generales
     */
    getStats() {
        return this.get(this.KEYS.STATS) || {
            gamesPlayed: 0,
            totalCorrect: 0,
            totalIncorrect: 0,
            maxStreak: 0,
            totalScore: 0
        };
    },

    /**
     * Actualiza estadísticas después de un juego
     */
    updateStats(gameStats) {
        const stats = this.getStats();
        stats.gamesPlayed += 1;
        stats.totalCorrect += gameStats.correct;
        stats.totalIncorrect += gameStats.incorrect;
        stats.totalScore += gameStats.score;
        
        if (gameStats.maxStreak > stats.maxStreak) {
            stats.maxStreak = gameStats.maxStreak;
        }
        
        this.set(this.KEYS.STATS, stats);
    },

    /**
     * Guarda la configuración del usuario
     */
    saveSettings(settings) {
        this.set(this.KEYS.SETTINGS, settings);
    },

    /**
     * Obtiene la configuración del usuario
     */
    getSettings() {
        return this.get(this.KEYS.SETTINGS) || {
            sound: true,
            animations: true,
            reducedMotion: false
        };
    },

    /**
     * Marca un quiz como completado
     */
    markQuizCompleted(quizId, score, correct, total) {
        const completed = this.getCompletedQuizzes();
        const now = new Date().toISOString();
        
        completed[quizId] = {
            score,
            correct,
            total,
            completedAt: now,
            attempts: (completed[quizId]?.attempts || 0) + 1
        };
        
        this.set(this.KEYS.COMPLETED_QUIZZES, completed);
    },

    /**
     * Obtiene los quizzes completados
     */
    getCompletedQuizzes() {
        return this.get(this.KEYS.COMPLETED_QUIZZES) || {};
    },

    /**
     * Obtiene el progreso de un quiz específico
     */
    getQuizProgress(quizId) {
        const completed = this.getCompletedQuizzes();
        return completed[quizId] || null;
    },

    /**
     * Guarda el último quiz jugado
     */
    setLastQuiz(quizId) {
        this.set(this.KEYS.LAST_QUIZ, quizId);
    },

    /**
     * Obtiene el último quiz jugado
     */
    getLastQuiz() {
        return this.get(this.KEYS.LAST_QUIZ);
    },

    /**
     * Borra todos los datos almacenados
     */
    resetData() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    },

    /**
     * Borra solo las estadísticas
     */
    resetStats() {
        this.set(this.KEYS.STATS, {
            gamesPlayed: 0,
            totalCorrect: 0,
            totalIncorrect: 0,
            maxStreak: 0,
            totalScore: 0
        });
    },

    /**
     * Exporta todos los datos
     */
    exportData() {
        return {
            highScores: this.getHighScores(),
            stats: this.getStats(),
            settings: this.getSettings(),
            completedQuizzes: this.getCompletedQuizzes()
        };
    },

    /**
     * Importa datos desde un objeto
     */
    importData(data) {
        if (data.highScores) this.set(this.KEYS.HIGH_SCORES, data.highScores);
        if (data.stats) this.set(this.KEYS.STATS, data.stats);
        if (data.settings) this.set(this.KEYS.SETTINGS, data.settings);
        if (data.completedQuizzes) this.set(this.KEYS.COMPLETED_QUIZZES, data.completedQuizzes);
    }
};

// Hacer disponible globalmente
window.Storage = Storage;
