/**
 * EcoQuest - Quiz Engine Controller
 * Manages question rendering, option selection, answer validation, scoring, and navigation
 */

const EcoQuizEngine = {
    categoryId: null,
    categoryData: null,
    questions: [],
    currentIndex: 0,
    selectedOptionIndex: null,
    isSubmitted: false,
    score: 0,
    correctCount: 0,
    incorrectCount: 0,
    reviewList: [],

    /**
     * Entry point on quiz.html
     */
    init: function() {
        const params = new URLSearchParams(window.location.search);
        this.categoryId = params.get('category') || 'climate';

        // Validate data availability
        if (!window.quizData) {
            this.renderError('Quiz question bank is not loaded. Please return to the quiz categories page.');
            return;
        }

        this.categoryData = window.quizData[this.categoryId];
        if (!this.categoryData || !Array.isArray(this.categoryData.questions) || this.categoryData.questions.length === 0) {
            this.renderError(`The selected category "${this.categoryId}" was not found or contains no questions.`);
            return;
        }

        this.questions = this.categoryData.questions;
        this.currentIndex = 0;
        this.selectedOptionIndex = null;
        this.isSubmitted = false;
        this.score = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.reviewList = [];

        this.bindEvents();
        this.renderCurrentQuestion();
    },

    /**
     * Bind static control events
     */
    bindEvents: function() {
        const submitBtn = document.getElementById('quizSubmitBtn');
        const continueBtn = document.getElementById('quizContinueBtn');
        const exitBtn = document.getElementById('quizExitBtn');

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.handleAnswerSubmission());
        }

        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.handleContinue());
        }

        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                if (this.currentIndex > 0 || this.isSubmitted) {
                    const confirmed = window.confirm('Are you sure you want to exit? Your current quiz session will be discarded.');
                    if (!confirmed) return;
                }
                window.location.href = 'categories.html';
            });
        }

        // Warn before leaving active quiz
        window.addEventListener('beforeunload', (e) => {
            if (this.currentIndex < this.questions.length && (this.currentIndex > 0 || this.selectedOptionIndex !== null)) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    },

    /**
     * Render the active question
     */
    renderCurrentQuestion: function() {
        const question = this.questions[this.currentIndex];
        const total = this.questions.length;

        // Reset state for new question
        this.selectedOptionIndex = null;
        this.isSubmitted = false;

        // Update Top Bar & Category name
        const catNameEl = document.getElementById('quizCatName');
        const counterEl = document.getElementById('quizQuestionCounter');
        const progressFill = document.getElementById('quizProgressFill');

        if (catNameEl) catNameEl.textContent = this.categoryData.title;
        if (counterEl) counterEl.textContent = `Question ${this.currentIndex + 1} of ${total}`;

        // Update Progress Bar
        if (progressFill) {
            const percent = Math.round(((this.currentIndex) / total) * 100);
            progressFill.style.width = `${Math.max(percent, 10)}%`;
            progressFill.setAttribute('aria-valuenow', percent);
        }

        // Update Question prompt
        const promptEl = document.getElementById('quizQuestionPrompt');
        if (promptEl) {
            promptEl.textContent = question.question;
        }

        // Render Options
        const optionsContainer = document.getElementById('quizOptionsList');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';

            const letters = ['A', 'B', 'C', 'D'];
            question.options.forEach((optText, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'quiz-option';
                btn.setAttribute('data-index', idx);
                btn.setAttribute('aria-pressed', 'false');

                btn.innerHTML = `
                    <span class="option-badge">${letters[idx]}</span>
                    <span class="option-text">${optText}</span>
                `;

                btn.addEventListener('click', () => this.handleOptionSelect(idx));
                optionsContainer.appendChild(btn);
            });
        }

        // Reset Feedback Box
        const feedbackBox = document.getElementById('quizFeedbackBox');
        if (feedbackBox) {
            feedbackBox.className = 'quiz-explanation-box';
            feedbackBox.innerHTML = '';
        }

        // Reset Action Buttons
        const submitBtn = document.getElementById('quizSubmitBtn');
        const continueBtn = document.getElementById('quizContinueBtn');
        const statusHint = document.getElementById('quizStatusHint');

        if (submitBtn) {
            submitBtn.style.display = 'inline-flex';
            submitBtn.disabled = true;
        }

        if (continueBtn) {
            continueBtn.style.display = 'none';
        }

        if (statusHint) {
            statusHint.textContent = 'Select an option to proceed';
        }
    },

    /**
     * Handle user selecting an answer option
     */
    handleOptionSelect: function(index) {
        if (this.isSubmitted) return;

        this.selectedOptionIndex = index;

        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, idx) => {
            if (idx === index) {
                opt.classList.add('selected');
                opt.setAttribute('aria-pressed', 'true');
            } else {
                opt.classList.remove('selected');
                opt.setAttribute('aria-pressed', 'false');
            }
        });

        const submitBtn = document.getElementById('quizSubmitBtn');
        const statusHint = document.getElementById('quizStatusHint');

        if (submitBtn) {
            submitBtn.disabled = false;
        }
        if (statusHint) {
            statusHint.textContent = 'Click "Submit Answer" to confirm';
        }
    },

    /**
     * Submit and validate the chosen answer
     */
    handleAnswerSubmission: function() {
        if (this.isSubmitted || this.selectedOptionIndex === null) return;

        this.isSubmitted = true;
        const currentQ = this.questions[this.currentIndex];
        const isCorrect = this.selectedOptionIndex === currentQ.answer;

        // Update score
        if (isCorrect) {
            this.score += 10;
            this.correctCount += 1;
        } else {
            this.incorrectCount += 1;
        }

        // Record for detailed review
        this.reviewList.push({
            id: currentQ.id,
            question: currentQ.question,
            options: currentQ.options,
            userAnswerIndex: this.selectedOptionIndex,
            userAnswerText: currentQ.options[this.selectedOptionIndex],
            correctAnswerIndex: currentQ.answer,
            correctAnswerText: currentQ.options[currentQ.answer],
            explanation: currentQ.explanation,
            isCorrect: isCorrect
        });

        // Update UI option states
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, idx) => {
            opt.disabled = true;
            if (idx === currentQ.answer) {
                opt.classList.add('correct');
            }
            if (idx === this.selectedOptionIndex && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Display explanation
        const feedbackBox = document.getElementById('quizFeedbackBox');
        if (feedbackBox) {
            feedbackBox.className = `quiz-explanation-box visible ${isCorrect ? 'correct' : 'incorrect'}`;
            feedbackBox.innerHTML = `
                <div class="explanation-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${isCorrect 
                            ? '<polyline points="20 6 9 17 4 12"></polyline>' 
                            : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
                    </svg>
                    <span>${isCorrect ? 'Correct! (+10 XP)' : 'Incorrect (0 XP)'}</span>
                </div>
                <p class="explanation-text">${currentQ.explanation}</p>
            `;
        }

        // Toggle action buttons
        const submitBtn = document.getElementById('quizSubmitBtn');
        const continueBtn = document.getElementById('quizContinueBtn');
        const statusHint = document.getElementById('quizStatusHint');

        if (submitBtn) {
            submitBtn.style.display = 'none';
        }

        if (continueBtn) {
            const isLastQuestion = this.currentIndex === this.questions.length - 1;
            continueBtn.innerHTML = `
                <span>${isLastQuestion ? 'Finish Quiz' : 'Continue'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            `;
            continueBtn.style.display = 'inline-flex';
        }

        if (statusHint) {
            statusHint.textContent = 'Review explanation, then continue';
        }

        // Complete progress fill for final question
        if (this.currentIndex === this.questions.length - 1) {
            const progressFill = document.getElementById('quizProgressFill');
            if (progressFill) progressFill.style.width = '100%';
        }
    },

    /**
     * Move to next question or conclude quiz
     */
    handleContinue: function() {
        if (!this.isSubmitted) return;

        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.renderCurrentQuestion();
        } else {
            this.finishQuiz();
        }
    },

    /**
     * Conclude the quiz and transition to results
     */
    finishQuiz: function() {
        const total = this.questions.length;
        const accuracy = Math.round((this.correctCount / total) * 100);

        const resultPayload = {
            categoryId: this.categoryId,
            categoryTitle: this.categoryData.title,
            score: this.score,
            accuracy: accuracy,
            totalQuestions: total,
            correctCount: this.correctCount,
            incorrectCount: this.incorrectCount,
            reviewList: this.reviewList
        };

        if (window.EcoGamification && typeof window.EcoGamification.recordQuizCompletion === 'function') {
            window.EcoGamification.recordQuizCompletion(resultPayload);
        } else if (window.EcoStorage) {
            window.EcoStorage.saveQuizResult(resultPayload);
        }

        // Navigate cleanly to results page
        window.location.href = `results.html?category=${encodeURIComponent(this.categoryId)}`;
    },

    /**
     * Render friendly error message
     */
    renderError: function(message) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        mainContent.innerHTML = `
            <div class="empty-result-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h2 style="font-size: 20px; color: var(--text); margin-bottom: 8px;">Unable to Load Quiz</h2>
                <p style="font-size: 14px; color: var(--muted); margin-bottom: 20px; max-width: 480px; margin-left: auto; margin-right: auto;">${message}</p>
                <a href="categories.html" class="btn btn-primary btn-sm">Return to Quiz Categories</a>
            </div>
        `;
    }
};

window.EcoQuizEngine = EcoQuizEngine;

