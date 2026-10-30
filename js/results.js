/**
 * EcoQuest - Results Controller (Phase 3)
 * Displays final quiz metrics, performance feedback, gamification progression, and question-by-question review
 */

const EcoResultsController = {
    init: function() {
        const progress = window.EcoStorage ? window.EcoStorage.getUserProgress() : null;

        // Check for valid completed quiz data
        if (!progress || !progress.lastQuizReview || progress.lastQuizReview.length === 0 || progress.lastQuizScore === null) {
            this.renderEmptyState();
            return;
        }

        this.renderResults(progress);
    },

    /**
     * Render results summary and questions review
     */
    renderResults: function(progress) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        const categoryId = progress.lastCompletedCategory || 'climate';
        const categoryData = (window.quizData && window.quizData[categoryId]) ? window.quizData[categoryId] : null;
        const categoryTitle = categoryData ? categoryData.title : 'Environmental Quiz';

        const score = progress.lastQuizScore;
        const totalQuestions = progress.lastQuizTotalQuestions || 10;
        const maxScore = totalQuestions * 10;
        const accuracy = progress.lastQuizAccuracy !== null ? progress.lastQuizAccuracy : Math.round((progress.lastQuizCorrect / totalQuestions) * 100);
        const correctCount = progress.lastQuizCorrect !== null ? progress.lastQuizCorrect : 0;
        const incorrectCount = progress.lastQuizIncorrect !== null ? progress.lastQuizIncorrect : 0;

        // Gamification Level calculations
        const totalXP = progress.totalXP || 0;
        const levelInfo = window.EcoGamification
            ? window.EcoGamification.getLevelInfo(totalXP)
            : { levelNumber: progress.currentLevel || 1, levelName: progress.currentLevelName || 'Eco Beginner', progressPercentage: 50, xpToNextLevel: 50, isMaxLevel: false };

        // Performance feedback tier
        let feedbackMessage = '';
        if (accuracy >= 90) {
            feedbackMessage = "Excellent work! You're an Eco Expert.";
        } else if (accuracy >= 70) {
            feedbackMessage = "Great job! Keep learning.";
        } else if (accuracy >= 50) {
            feedbackMessage = "Good effort! There's more to discover.";
        } else {
            feedbackMessage = "Keep practising. Every step counts.";
        }

        // Check for pending level up or newly unlocked achievements
        let gamificationBanners = '';

        if (progress.pendingLevelUp) {
            gamificationBanners += `
                <div class="gamification-banner levelup-banner" role="alert">
                    <div class="banner-icon-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </div>
                    <div class="banner-text">
                        <span class="banner-subtitle">LEVEL UP!</span>
                        <h3 class="banner-title">You reached Level ${progress.pendingLevelUp.levelNumber}: ${progress.pendingLevelUp.levelName}</h3>
                        <p class="banner-desc">Keep learning and expanding your environmental mastery.</p>
                    </div>
                </div>
            `;
            // Clear pending notification once shown
            delete progress.pendingLevelUp;
            window.EcoStorage.saveUserProgress(progress);
        }

        if (Array.isArray(progress.pendingNewAchievements) && progress.pendingNewAchievements.length > 0) {
            progress.pendingNewAchievements.forEach(ach => {
                gamificationBanners += `
                    <div class="gamification-banner badge-banner" role="alert">
                        <div class="banner-icon-box badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="6"></circle>
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                            </svg>
                        </div>
                        <div class="banner-text">
                            <span class="banner-subtitle">NEW BADGE UNLOCKED</span>
                            <h3 class="banner-title">${ach.title}</h3>
                            <p class="banner-desc">${ach.description}</p>
                        </div>
                    </div>
                `;
            });
            // Clear pending badges once shown
            delete progress.pendingNewAchievements;
            window.EcoStorage.saveUserProgress(progress);
        }

        let reviewHtml = '';
        progress.lastQuizReview.forEach((item, index) => {
            const isCorrect = item.isCorrect;
            reviewHtml += `
                <article class="review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                    <div class="review-item-header">
                        <span class="review-item-number">Question ${index + 1} of ${totalQuestions}</span>
                        <span class="badge ${isCorrect ? 'badge-success' : 'badge-accent'}">
                            ${isCorrect ? 'Correct (+10 XP)' : 'Incorrect (0 XP)'}
                        </span>
                    </div>

                    <h3 class="review-question-text">${item.question}</h3>

                    <div class="review-answers-box">
                        <div class="user-answer-line ${isCorrect ? 'right' : 'wrong'}">
                            <strong>Your Answer:</strong> ${item.userAnswerText}
                        </div>
                        ${!isCorrect ? `
                            <div class="correct-answer-line">
                                <strong>Correct Answer:</strong> ${item.correctAnswerText}
                            </div>
                        ` : ''}
                    </div>

                    <div class="review-explanation">
                        <strong>Explanation:</strong> ${item.explanation}
                    </div>
                </article>
            `;
        });

        mainContent.innerHTML = `
            <div class="results-container">
                
                ${gamificationBanners}

                <section class="results-summary-card">
                    <div class="results-category-badge">
                        <span class="badge badge-mint">${categoryTitle}</span>
                    </div>

                    <h2 class="results-title">Quiz Completed</h2>

                    <div class="results-score-display">
                        <span class="score-number">${score}</span>
                        <span class="score-max">/ ${maxScore} XP</span>
                    </div>

                    <div class="performance-banner">
                        <span>${feedbackMessage}</span>
                    </div>

                    <!-- Progress to Next Level -->
                    <div class="results-level-box">
                        <div class="level-box-header">
                            <span>Level ${levelInfo.levelNumber}: <strong>${levelInfo.levelName}</strong></span>
                            <span>${levelInfo.isMaxLevel ? 'Maximum Level' : `${levelInfo.xpToNextLevel} XP to Level ${levelInfo.nextLevelNumber}`}</span>
                        </div>
                        <div class="progress-track" style="height: 8px;">
                            <div class="progress-fill" style="width: ${levelInfo.progressPercentage}%;"></div>
                        </div>
                        <div class="level-box-footer">
                            <span class="text-sm text-muted">Total XP: <strong>${totalXP.toLocaleString()} XP</strong></span>
                            <span class="text-sm text-muted">Streak: <strong>${progress.currentStreak || 1} Days</strong></span>
                        </div>
                    </div>

                    <div class="results-metrics-grid">
                        <div class="result-metric-box">
                            <span class="metric-label">Accuracy</span>
                            <span class="metric-val">${accuracy}%</span>
                        </div>
                        <div class="result-metric-box">
                            <span class="metric-label">Correct</span>
                            <span class="metric-val correct-text">${correctCount}</span>
                        </div>
                        <div class="result-metric-box">
                            <span class="metric-label">Incorrect</span>
                            <span class="metric-val incorrect-text">${incorrectCount}</span>
                        </div>
                    </div>

                    <div class="results-actions-row">
                        <a href="quiz.html?category=${encodeURIComponent(categoryId)}" class="btn btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                                <path d="M3 21v-5h5"></path>
                            </svg>
                            <span>Retake Quiz</span>
                        </a>
                        <a href="categories.html" class="btn btn-primary">
                            <span>Explore Other Categories</span>
                        </a>
                        <a href="index.html" class="btn btn-outline">
                            <span>Return to Dashboard</span>
                        </a>
                    </div>
                </section>

                <section class="review-section">
                    <div class="review-header">
                        <h3 class="review-title">Detailed Question Review</h3>
                    </div>
                    <div class="review-list">
                        ${reviewHtml}
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * Render friendly empty state when results accessed directly
     */
    renderEmptyState: function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        mainContent.innerHTML = `
            <div class="empty-result-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                </svg>
                <h2 style="font-size: 20px; color: var(--text); margin-bottom: 8px;">No Quiz Results Found</h2>
                <p style="font-size: 14px; color: var(--muted); margin-bottom: 20px; max-width: 480px; margin-left: auto; margin-right: auto;">
                    You haven't completed any quizzes in this session yet. Explore our environmental categories to test your knowledge and earn points!
                </p>
                <a href="categories.html" class="btn btn-primary btn-sm">Explore Quizzes</a>
            </div>
        `;
    }
};

window.EcoResultsController = EcoResultsController;
