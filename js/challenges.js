/**
 * EcoQuest - Challenges Controller (Phase 4)
 * Manages daily challenge rotation, weekly measurable progress, modal interactions, and challenge history
 */

const EcoChallenges = {
    /**
     * Get local date string YYYY-MM-DD
     */
    getLocalDateString: function(d = new Date()) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Calculate ISO-style week key YYYY-Www using Monday as first day of week
     */
    getCurrentWeekKey: function(d = new Date()) {
        const target = new Date(d.valueOf());
        const dayNr = (d.getDay() + 6) % 7; // Monday = 0, Sunday = 6
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        const weekNum = 1 + Math.ceil((firstThursday - target) / 604800000);
        return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
    },

    /**
     * Get formatted date range for the current week (Monday to Sunday)
     */
    getWeekDateRange: function(d = new Date()) {
        const day = d.getDay();
        const diffToMonday = (day === 0 ? -6 : 1) - day;
        const monday = new Date(d);
        monday.setDate(d.getDate() + diffToMonday);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const opts = { month: 'short', day: 'numeric' };
        const yearOpts = { year: 'numeric' };
        return `${monday.toLocaleDateString('en-US', opts)} – ${sunday.toLocaleDateString('en-US', opts)}, ${sunday.toLocaleDateString('en-US', yearOpts)}`;
    },

    /**
     * Deterministic featured daily challenge selector based on calendar date
     */
    getFeaturedDailyChallenge: function() {
        if (!window.EcoChallengeData || !Array.isArray(window.EcoChallengeData.dailyChallenges)) {
            return null;
        }
        const challenges = window.EcoChallengeData.dailyChallenges;
        if (challenges.length === 0) return null;

        const now = new Date();
        const daySeed = now.getFullYear() * 365 + (now.getMonth() + 1) * 31 + now.getDate();
        const index = Math.abs(daySeed) % challenges.length;
        return challenges[index];
    },

    /**
     * Check if a daily challenge has been completed on today's local date
     */
    isDailyChallengeCompletedToday: function(challengeId) {
        if (!window.EcoStorage) return false;
        const progress = window.EcoStorage.getUserProgress();
        const todayStr = this.getLocalDateString();

        return progress.completedDailyChallenges.some(item => {
            return item.id === challengeId && item.date === todayStr;
        });
    },

    /**
     * Calculate progress for a specific weekly challenge
     */
    getWeeklyChallengeProgress: function(challenge, progress) {
        const weekKey = this.getCurrentWeekKey();
        const isCompleted = progress.completedWeeklyChallenges.some(w => w.id === challenge.id && w.weekKey === weekKey);

        let currentCount = 0;
        const quizHistory = Array.isArray(progress.quizHistory) ? progress.quizHistory : [];

        switch (challenge.type) {
            case 'quiz_count':
                currentCount = quizHistory.filter(q => q.weekKey === weekKey).length;
                break;
            case 'category_quiz_climate':
                currentCount = quizHistory.filter(q => q.weekKey === weekKey && q.categoryId === 'climate').length;
                break;
            case 'category_quiz_waste':
                currentCount = quizHistory.filter(q => q.weekKey === weekKey && q.categoryId === 'waste').length;
                break;
            case 'category_quiz_biodiversity':
                currentCount = quizHistory.filter(q => q.weekKey === weekKey && q.categoryId === 'biodiversity').length;
                break;
            case 'category_quiz_energy':
                currentCount = quizHistory.filter(q => q.weekKey === weekKey && q.categoryId === 'energy').length;
                break;
            case 'daily_challenges_count':
                currentCount = progress.completedDailyChallenges.filter(d => {
                    const challengeDate = new Date(d.date + 'T12:00:00');
                    return this.getCurrentWeekKey(challengeDate) === weekKey;
                }).length;
                break;
            default:
                currentCount = 0;
        }

        const target = challenge.target || 1;
        const percentage = Math.min(100, Math.round((currentCount / target) * 100));

        return {
            current: currentCount,
            target: target,
            percentage: percentage,
            isCompleted: isCompleted || (currentCount >= target)
        };
    },

    /**
     * Evaluate all weekly challenges and award XP automatically upon reaching targets
     */
    evaluateWeeklyChallenges: function(progress) {
        if (!window.EcoChallengeData || !Array.isArray(window.EcoChallengeData.weeklyChallenges)) return;
        const weekKey = this.getCurrentWeekKey();

        window.EcoChallengeData.weeklyChallenges.forEach(challenge => {
            const alreadyCompleted = progress.completedWeeklyChallenges.some(w => w.id === challenge.id && w.weekKey === weekKey);
            if (alreadyCompleted) return;

            const progressInfo = this.getWeeklyChallengeProgress(challenge, progress);
            if (progressInfo.current >= challenge.target) {
                // Target reached! Award XP once for this weekly period
                const txnId = `weekly-challenge-${challenge.id}-${weekKey}`;
                if (window.EcoGamification && typeof window.EcoGamification.awardXP === 'function') {
                    window.EcoGamification.awardXP(challenge.reward, 'weekly_challenge', txnId);
                }
                if (window.EcoStorage && typeof window.EcoStorage.recordWeeklyChallengeCompletion === 'function') {
                    window.EcoStorage.recordWeeklyChallengeCompletion(challenge.id, challenge.reward, txnId, challenge.title, weekKey);
                }
            }
        });
    },

    /**
     * Complete a daily challenge activity
     */
    completeDailyChallenge: function(challengeId) {
        if (this.isDailyChallengeCompletedToday(challengeId)) {
            if (typeof alert === 'function') alert('This daily challenge has already been completed today.');
            return false;
        }

        const challenge = (window.EcoChallengeData.dailyChallenges || []).find(c => c.id === challengeId);
        if (!challenge) {
            if (typeof alert === 'function') alert('Challenge not found.');
            return false;
        }

        const todayStr = this.getLocalDateString();
        const txnId = `daily-challenge-${challenge.id}-${todayStr}`;

        // Award XP through centralized gamification
        if (window.EcoGamification && typeof window.EcoGamification.awardXP === 'function') {
            const xpResult = window.EcoGamification.awardXP(challenge.reward, 'daily_challenge', txnId);
            if (!xpResult.success && xpResult.duplicate) {
                if (typeof alert === 'function') alert('Reward has already been recorded for today.');
                return false;
            }
        }

        // Record completion in storage
        if (window.EcoStorage) {
            window.EcoStorage.recordDailyChallengeCompletion(challenge.id, challenge.reward, txnId, challenge.title);
        }

        // Re-evaluate weekly challenges (e.g. daily habit builder)
        const updatedProgress = window.EcoStorage.getUserProgress();
        this.evaluateWeeklyChallenges(updatedProgress);

        return true;
    },

    /**
     * Open daily challenge modal with instructions and action confirmation
     */
    openChallengeModal: function(challengeId) {
        const challenge = (window.EcoChallengeData.dailyChallenges || []).find(c => c.id === challengeId);
        if (!challenge) return;

        const isCompleted = this.isDailyChallengeCompletedToday(challenge.id);
        const modalId = 'dailyChallengeDetailModal';
        const existing = document.getElementById(modalId);
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = modalId;
        overlay.className = 'instructions-overlay active';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'challengeModalTitle');

        let stepsHtml = '';
        if (Array.isArray(challenge.actionSteps)) {
            stepsHtml = challenge.actionSteps.map(step => `<li>${step}</li>`).join('');
        }

        overlay.innerHTML = `
            <div class="instructions-modal">
                <div class="instructions-header">
                    <div class="instructions-badge-row">
                        <span class="badge badge-mint">${challenge.category}</span>
                        <span class="badge ${isCompleted ? 'badge-success' : 'badge-accent'}">
                            ${isCompleted ? 'Completed Today' : `+${challenge.reward} XP Reward`}
                        </span>
                    </div>
                    <h2 class="instructions-title" id="challengeModalTitle">${challenge.title}</h2>
                    <p class="body-text text-muted">${challenge.description}</p>
                </div>

                <div class="instructions-meta-grid" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="meta-box">
                        <span class="meta-box-label">Duration</span>
                        <span class="meta-box-value">${challenge.duration}</span>
                    </div>
                    <div class="meta-box">
                        <span class="meta-box-label">Difficulty</span>
                        <span class="meta-box-value">${challenge.difficulty}</span>
                    </div>
                    <div class="meta-box">
                        <span class="meta-box-label">Reward</span>
                        <span class="meta-box-value">+${challenge.reward} XP</span>
                    </div>
                </div>

                <div class="instructions-rules">
                    <h3 class="rules-heading">Practical Environmental Steps</h3>
                    <ul class="rules-list" style="list-style: disc inside;">
                        ${stepsHtml}
                    </ul>
                </div>

                <div class="instructions-actions">
                    <button type="button" class="btn btn-outline btn-sm" id="closeChallengeModalBtn">Cancel</button>
                    ${!isCompleted ? `
                        <button type="button" class="btn btn-primary btn-sm" id="confirmCompleteChallengeBtn">
                            <span>Mark as Completed (+${challenge.reward} XP)</span>
                        </button>
                    ` : `
                        <button type="button" class="btn btn-secondary btn-sm" disabled>
                            <span>Completed Today</span>
                        </button>
                    `}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => overlay.remove(), 250);
        };

        const closeBtn = document.getElementById('closeChallengeModalBtn');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        const confirmBtn = document.getElementById('confirmCompleteChallengeBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const confirmed = window.confirm(`Confirm that you have practiced these eco actions today to claim your +${challenge.reward} XP.`);
                if (!confirmed) return;

                const success = this.completeDailyChallenge(challenge.id);
                if (success) {
                    closeModal();
                    // Refresh view
                    if (window.EcoApp && window.EcoApp.currentPage === 'challenges') {
                        this.initChallengesPage();
                    } else if (window.EcoApp && window.EcoApp.currentPage === 'dashboard') {
                        window.EcoApp.initDashboard();
                    }
                }
            });
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById(modalId)) {
                closeModal();
            }
        });
    },

    /**
     * Render challenges.html Page
     */
    initChallengesPage: function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent || !window.EcoChallengeData) return;

        const progress = window.EcoStorage ? window.EcoStorage.getUserProgress() : {};
        const dailyList = window.EcoChallengeData.dailyChallenges || [];
        const weeklyList = window.EcoChallengeData.weeklyChallenges || [];
        const historyList = Array.isArray(progress.challengeHistory) ? progress.challengeHistory : [];

        const featuredDaily = this.getFeaturedDailyChallenge() || dailyList[0];
        const isFeaturedCompleted = featuredDaily ? this.isDailyChallengeCompletedToday(featuredDaily.id) : false;
        const weekDateRange = this.getWeekDateRange();

        // Calculate weekly challenges progress
        this.evaluateWeeklyChallenges(progress);

        // Daily challenges cards HTML
        let dailyCardsHtml = '';
        dailyList.forEach(challenge => {
            const isCompleted = this.isDailyChallengeCompletedToday(challenge.id);
            const isFeatured = featuredDaily && featuredDaily.id === challenge.id;

            dailyCardsHtml += `
                <article class="challenge-item-card ${isCompleted ? 'completed' : ''}">
                    <div class="challenge-item-header">
                        <div class="challenge-item-tags">
                            <span class="badge ${isFeatured ? 'badge-accent' : 'badge-mint'}">${challenge.category}</span>
                            ${isFeatured ? '<span class="badge badge-neutral">Today\'s Featured</span>' : ''}
                        </div>
                        <span class="badge ${isCompleted ? 'badge-success' : 'badge-neutral'}">
                            ${isCompleted ? 'Completed' : `+${challenge.reward} XP`}
                        </span>
                    </div>

                    <h3 class="challenge-item-title">${challenge.title}</h3>
                    <p class="challenge-item-desc">${challenge.description}</p>

                    <div class="challenge-item-footer">
                        <span class="text-muted text-sm">${challenge.duration} &bull; ${challenge.difficulty}</span>
                        <button type="button" class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'} btn-sm open-challenge-btn" data-id="${challenge.id}">
                            <span>${isCompleted ? 'View Details' : 'Start Challenge'}</span>
                        </button>
                    </div>
                </article>
            `;
        });

        // Weekly challenges cards HTML
        let weeklyCardsHtml = '';
        weeklyList.forEach(challenge => {
            const prog = this.getWeeklyChallengeProgress(challenge, progress);

            weeklyCardsHtml += `
                <article class="weekly-challenge-card ${prog.isCompleted ? 'completed' : ''}">
                    <div class="weekly-card-header">
                        <div class="weekly-tags">
                            <span class="badge badge-mint">${challenge.category}</span>
                            <span class="badge badge-neutral">${challenge.difficulty}</span>
                        </div>
                        <span class="badge ${prog.isCompleted ? 'badge-success' : 'badge-accent'}">
                            ${prog.isCompleted ? 'Earned +75 XP' : `+${challenge.reward} XP`}
                        </span>
                    </div>

                    <h3 class="weekly-title">${challenge.title}</h3>
                    <p class="weekly-desc">${challenge.description}</p>

                    <div class="weekly-progress-wrap">
                        <div class="weekly-progress-labels">
                            <span>Progress</span>
                            <span><strong>${prog.current} / ${prog.target}</strong></span>
                        </div>
                        <div class="progress-track" style="height: 7px;">
                            <div class="progress-fill" style="width: ${prog.percentage}%;"></div>
                        </div>
                    </div>

                    <div class="weekly-card-footer">
                        <span class="text-muted text-sm">Valid: ${weekDateRange}</span>
                        <span class="text-sm" style="font-weight: 600; color: ${prog.isCompleted ? 'var(--success)' : 'var(--primary)'};">
                            ${prog.isCompleted ? 'Completed' : `${prog.target - prog.current} remaining`}
                        </span>
                    </div>
                </article>
            `;
        });

        // History items HTML
        let historyRowsHtml = '';
        if (historyList.length === 0) {
            historyRowsHtml = `<tr><td colspan="5" style="text-align: center; color: var(--muted); padding: 20px;">No challenge history recorded yet. Complete today's featured challenge above!</td></tr>`;
        } else {
            historyList.slice(0, 10).forEach(h => {
                historyRowsHtml += `
                    <tr>
                        <td style="font-weight: 600;">${h.title}</td>
                        <td><span class="badge ${h.type === 'daily' ? 'badge-mint' : 'badge-accent'}">${h.type.toUpperCase()}</span></td>
                        <td>${h.date}</td>
                        <td style="color: var(--success); font-weight: 600;">+${h.xpAwarded} XP</td>
                        <td><span class="badge badge-success">Completed</span></td>
                    </tr>
                `;
            });
        }

        mainContent.innerHTML = `
            <div class="challenges-page-container">
                
                <!-- Featured Daily Hero Card -->
                <section class="featured-challenge-hero" aria-labelledby="heroChallengeHeading">
                    <div class="featured-hero-content">
                        <div class="featured-badge-row">
                            <span class="badge badge-accent">Featured Daily Challenge</span>
                            <span class="badge badge-mint">${featuredDaily ? featuredDaily.category : 'Water Conservation'}</span>
                            <span class="badge ${isFeaturedCompleted ? 'badge-success' : 'badge-neutral'}">
                                ${isFeaturedCompleted ? 'Completed Today' : 'Available Today'}
                            </span>
                        </div>
                        <h2 class="featured-hero-title" id="heroChallengeHeading">${featuredDaily ? featuredDaily.title : 'Save Water, Save Life'}</h2>
                        <p class="featured-hero-desc">${featuredDaily ? featuredDaily.description : 'Implement practical water conservation steps in your household routine.'}</p>
                        
                        <div class="featured-hero-meta">
                            <span>Reward: <strong style="color: var(--primary);">+${featuredDaily ? featuredDaily.reward : 20} XP</strong></span>
                            <span>&bull;</span>
                            <span>Time: <strong>${featuredDaily ? featuredDaily.duration : '5 mins'}</strong></span>
                            <span>&bull;</span>
                            <span>Rotation: <strong>Changes Daily at Midnight</strong></span>
                        </div>
                    </div>
                    
                    <div class="featured-hero-action">
                        <button type="button" class="btn ${isFeaturedCompleted ? 'btn-secondary' : 'btn-primary'} open-challenge-btn" data-id="${featuredDaily ? featuredDaily.id : ''}">
                            <span>${isFeaturedCompleted ? 'View Details' : 'Start Today\'s Challenge'}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </section>

                <!-- Section A: Daily Challenges Grid -->
                <section aria-labelledby="dailySectionHeading">
                    <div class="section-title-row">
                        <div>
                            <h2 class="section-title" id="dailySectionHeading">Daily Eco Challenges</h2>
                            <p class="text-sm text-muted">Complete small, actionable sustainability steps every day to build lasting environmental habits.</p>
                        </div>
                        <span class="badge badge-neutral">${dailyList.length} Challenges Available</span>
                    </div>

                    <div class="challenges-grid">
                        ${dailyCardsHtml}
                    </div>
                </section>

                <!-- Section B: Weekly Challenges Grid -->
                <section aria-labelledby="weeklySectionHeading" style="margin-top: 16px;">
                    <div class="section-title-row">
                        <div>
                            <h2 class="section-title" id="weeklySectionHeading">Weekly Missions</h2>
                            <p class="text-sm text-muted">Active week: <strong>${weekDateRange}</strong>. Weekly mission targets calculate automatically from completed quizzes.</p>
                        </div>
                        <span class="badge badge-mint">+75 XP Each</span>
                    </div>

                    <div class="weekly-challenges-grid">
                        ${weeklyCardsHtml}
                    </div>
                </section>

                <!-- Section C: Challenge History Table -->
                <section class="challenge-history-section" aria-labelledby="historyHeading">
                    <div class="section-title-row">
                        <h2 class="section-title" id="historyHeading">Challenge History</h2>
                        <span class="text-sm text-muted">${historyList.length} Recorded Completions</span>
                    </div>

                    <div class="table-responsive-wrapper">
                        <table class="eco-table">
                            <thead>
                                <tr>
                                    <th>Challenge Name</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>XP Earned</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${historyRowsHtml}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        `;

        // Wire modal openers
        document.querySelectorAll('.open-challenge-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (id) this.openChallengeModal(id);
            });
        });
    }
};

window.EcoChallenges = EcoChallenges;
