/**
 * EcoQuest - User Profile & Learning Analytics Controller (Phase 5)
 * Handles profile display, editing modal, avatar themes, learning statistics,
 * category performance breakdown, weekly activity distribution chart,
 * recent activity history log, and data management (JSON export & progress reset).
 */

(function(window) {
    'use strict';

    const AVATAR_THEMES = [
        { id: 'forest', name: 'Forest', color: '#245C42', textColor: '#FFFFFF' },
        { id: 'sage', name: 'Sage', color: '#3D7958', textColor: '#FFFFFF' },
        { id: 'emerald', name: 'Emerald', color: '#2A7F54', textColor: '#FFFFFF' },
        { id: 'moss', name: 'Moss', color: '#486B4D', textColor: '#FFFFFF' },
        { id: 'teal', name: 'Teal', color: '#2E7570', textColor: '#FFFFFF' }
    ];

    const EcoProfile = {
        currentAvatarTheme: 'forest',

        /**
         * Initialize the entire Profile Page
         */
        initProfilePage: function() {
            const mainContent = document.getElementById('mainContent');
            if (!mainContent) return;

            const profile = window.EcoStorage ? window.EcoStorage.getUserProfile() : { name: 'Alex Morgan', initials: 'AM' };
            const progress = window.EcoStorage ? window.EcoStorage.getUserProgress() : {};
            
            this.currentAvatarTheme = profile.avatarTheme || 'forest';

            const totalXP = Number(progress.totalXP) || 1250;
            const levelInfo = window.EcoGamification
                ? window.EcoGamification.getLevelInfo(totalXP)
                : { levelNumber: 5, levelName: 'Earth Protector', progressPercentage: 60, xpToNextLevel: 50, isMaxLevel: false };

            const stats = window.EcoAnalytics
                ? window.EcoAnalytics.getOverallStatistics(progress)
                : { totalQuizzes: 3, totalQuestions: 30, correctAnswers: 26, incorrectAnswers: 4, accuracy: 87, dailyChallenges: 1, weeklyChallenges: 0, badgesCount: 4, currentStreak: 5, longestStreak: 7 };

            const categoryBreakdown = window.EcoAnalytics
                ? window.EcoAnalytics.getCategoryPerformance(progress)
                : [];

            const weeklyActivity = window.EcoAnalytics
                ? window.EcoAnalytics.getWeeklyActivityDistribution(progress)
                : [];

            const recentActivities = window.EcoAnalytics
                ? window.EcoAnalytics.getRecentActivities(progress, 10)
                : [];

            const unlockedAchievements = Array.isArray(progress.unlockedAchievements)
                ? progress.unlockedAchievements
                : [];

            const soundEnabled = window.EcoStorage ? window.EcoStorage.getPreference('soundEnabled', true) : true;

            // Render complete page HTML
            mainContent.innerHTML = `
                <div class="profile-page-container">
                    
                    <!-- Profile Header / Identity Card -->
                    <section class="profile-identity-card" aria-label="Student Profile Overview">
                        <div class="profile-identity-left">
                            <div class="profile-avatar-large theme-${this.currentAvatarTheme}" id="profileAvatarDisplay" aria-hidden="true" style="background-color: ${this.getThemeColor(this.currentAvatarTheme)}; color: #FFFFFF;">
                                ${this.escapeHTML(profile.initials || 'AM')}
                            </div>
                            <div class="profile-headings">
                                <div class="profile-name-row">
                                    <h2 id="profileDisplayName">${this.escapeHTML(profile.name || 'Alex Morgan')}</h2>
                                    <button type="button" class="btn btn-outline btn-sm edit-profile-trigger" id="openEditModalBtn" aria-haspopup="dialog" aria-controls="editProfileModal">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                        </svg>
                                        <span>Edit Profile</span>
                                    </button>
                                </div>
                                <div class="user-role-line">
                                    <span class="badge badge-mint">Level ${levelInfo.levelNumber}: ${levelInfo.levelName}</span>
                                    <span class="text-muted">&bull; ${this.escapeHTML(profile.role || 'Environmental Learner')}</span>
                                    <span class="text-muted text-sm">&bull; Member since ${this.escapeHTML(profile.memberSince || 'October 2026')}</span>
                                </div>
                            </div>
                        </div>

                        <div class="profile-level-widget" aria-label="Level Progression">
                            <div class="level-box-header">
                                <span class="text-sm font-semibold">Level Progression</span>
                                <span><strong>${levelInfo.progressPercentage}%</strong></span>
                            </div>
                            <div class="progress-track" style="height: 8px; margin: 8px 0;" role="progressbar" aria-valuenow="${levelInfo.progressPercentage}" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-fill" style="width: ${levelInfo.progressPercentage}%;"></div>
                            </div>
                            <div class="level-box-footer text-muted text-sm">
                                <span>${totalXP.toLocaleString()} Total XP</span>
                                <span>${levelInfo.isMaxLevel ? 'Max Rank Reached' : `${levelInfo.xpToNextLevel} XP to Level ${levelInfo.nextLevelNumber}`}</span>
                            </div>
                        </div>
                    </section>

                    <!-- Learning Statistics Grid (6 Cards) -->
                    <section class="profile-section" aria-label="Learning Statistics">
                        <div class="section-header-row">
                            <h3 class="section-title">Learning Statistics</h3>
                            <span class="text-muted text-sm">Comprehensive performance metrics across quizzes and challenges</span>
                        </div>

                        <div class="profile-stats-grid">
                            <div class="profile-stat-box">
                                <span class="profile-stat-label">Overall Accuracy</span>
                                <span class="profile-stat-number">${stats.accuracy}%</span>
                                <span class="profile-stat-detail">${stats.correctAnswers} correct of ${stats.totalQuestions} questions</span>
                            </div>

                            <div class="profile-stat-box">
                                <span class="profile-stat-label">Quizzes Completed</span>
                                <span class="profile-stat-number">${stats.totalQuizzes}</span>
                                <span class="profile-stat-detail">Across 4 environmental tracks</span>
                            </div>

                            <div class="profile-stat-box">
                                <span class="profile-stat-label">Challenges Completed</span>
                                <span class="profile-stat-number">${stats.totalChallenges}</span>
                                <span class="profile-stat-detail">${stats.dailyChallenges} daily &bull; ${stats.weeklyChallenges} weekly</span>
                            </div>

                            <div class="profile-stat-box">
                                <span class="profile-stat-label">Active Streak</span>
                                <span class="profile-stat-number">${stats.currentStreak} Days</span>
                                <span class="profile-stat-detail">Personal Best: ${stats.longestStreak} consecutive days</span>
                            </div>

                            <div class="profile-stat-box">
                                <span class="profile-stat-label">Total Experience</span>
                                <span class="profile-stat-number">${totalXP.toLocaleString()} XP</span>
                                <span class="profile-stat-detail">Rank: ${levelInfo.levelName}</span>
                            </div>

                            <div class="profile-stat-box">
                                <span class="profile-stat-label">Badges Unlocked</span>
                                <span class="profile-stat-number">${stats.badgesCount} / 12</span>
                                <span class="profile-stat-detail"><a href="achievements.html">View all achievements &rarr;</a></span>
                            </div>
                        </div>
                    </section>

                    <!-- Category Performance Breakdown -->
                    <section class="profile-section" aria-label="Category Performance">
                        <div class="section-header-row">
                            <h3 class="section-title">Environmental Track Performance</h3>
                            <span class="text-muted text-sm">Accuracy and completion rate by environmental domain</span>
                        </div>

                        <div class="category-performance-grid">
                            ${this.renderCategoryCards(categoryBreakdown)}
                        </div>
                    </section>

                    <!-- Weekly Activity Chart & Recent Activities Layout -->
                    <div class="profile-two-column-layout">
                        
                        <!-- Weekly Activity Bar Chart (CSS Bar Chart) -->
                        <section class="profile-card weekly-chart-card" aria-label="Weekly Activity Distribution">
                            <div class="card-header-clean">
                                <div>
                                    <h3 class="card-title">Weekly Learning Distribution</h3>
                                    <p class="card-subtitle">Activity frequency across the current week (Mon – Sun)</p>
                                </div>
                            </div>

                            <div class="weekly-bar-chart" role="region" aria-label="Weekly activity bar chart">
                                <div class="chart-bars-container">
                                    ${this.renderWeeklyChartBars(weeklyActivity)}
                                </div>
                                <div class="chart-summary-footer text-muted text-sm">
                                    <span>Goal: 1 action daily</span>
                                    <span>${this.calculateWeeklyTotalActions(weeklyActivity)} actions completed this week</span>
                                </div>
                            </div>
                        </section>

                        <!-- Achievements Showcase Preview -->
                        <section class="profile-card achievements-preview-card" aria-label="Recent Achievements">
                            <div class="card-header-clean">
                                <div>
                                    <h3 class="card-title">Recent Badges</h3>
                                    <p class="card-subtitle">Latest environmental milestones unlocked</p>
                                </div>
                                <a href="achievements.html" class="btn btn-outline btn-sm">All Badges</a>
                            </div>

                            <div class="badges-preview-list">
                                ${this.renderBadgesPreview(unlockedAchievements)}
                            </div>
                        </section>

                    </div>

                    <!-- Recent Activity History Log -->
                    <section class="profile-card" aria-label="Activity History Log">
                        <div class="card-header-clean">
                            <div>
                                <h3 class="card-title">Activity History</h3>
                                <p class="card-subtitle">Chronological record of verified quizzes, challenges, and milestones</p>
                            </div>
                            <span class="badge badge-mint">${recentActivities.length} Recent Records</span>
                        </div>

                        <div class="activity-history-feed">
                            ${this.renderActivityHistoryFeed(recentActivities)}
                        </div>
                    </section>

                    <!-- Data Management & Platform Preferences -->
                    <section class="profile-card data-management-card" aria-label="Data Management and Preferences">
                        <div class="card-header-clean">
                            <div>
                                <h3 class="card-title">Data Management & Preferences</h3>
                                <p class="card-subtitle">Manage your local learning progress, audio preferences, and backups</p>
                            </div>
                        </div>

                        <div class="pref-list">
                            <div class="pref-row">
                                <div class="pref-info">
                                    <h4>Audio Feedback</h4>
                                    <p>Play subtle audio cues during quiz interactions and correct answers.</p>
                                </div>
                                <button type="button" class="btn btn-outline btn-sm" id="toggleSoundBtn">
                                    <span>${soundEnabled ? 'Enabled' : 'Disabled'}</span>
                                </button>
                            </div>

                            <div class="pref-row">
                                <div class="pref-info">
                                    <h4>Export Learning Data</h4>
                                    <p>Download a complete JSON backup of your progress, quiz history, and achievements.</p>
                                </div>
                                <button type="button" class="btn btn-secondary btn-sm" id="exportDataBtn">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    <span>Export JSON</span>
                                </button>
                            </div>

                            <div class="pref-row">
                                <div class="pref-info">
                                    <h4>Reset Demonstration Progress</h4>
                                    <p class="text-danger">Revert all quiz scores, streaks, and custom profile details back to default demo state.</p>
                                </div>
                                <button type="button" class="btn btn-outline btn-sm btn-danger-outline" id="openResetModalBtn">
                                    <span>Reset Progress</span>
                                </button>
                            </div>
                        </div>
                    </section>

                </div>

                <!-- Edit Profile Modal -->
                <div class="modal-backdrop" id="editProfileModal" role="dialog" aria-modal="true" aria-labelledby="editModalTitle" aria-hidden="true" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-header">
                            <h3 id="editModalTitle">Edit Profile</h3>
                            <button type="button" class="modal-close-btn" id="closeEditModalBtn" aria-label="Close dialog">&times;</button>
                        </div>
                        <form id="editProfileForm" class="modal-body" novalidate>
                            <div class="modal-avatar-preview-row">
                                <div class="avatar-preview-circle" id="modalAvatarPreview" style="background-color: ${this.getThemeColor(this.currentAvatarTheme)};">
                                    ${this.escapeHTML(profile.initials || 'AM')}
                                </div>
                                <div class="avatar-preview-text">
                                    <span class="font-semibold text-sm">Avatar Preview</span>
                                    <span class="text-muted text-xs">Initials update automatically from your name</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputDisplayName" class="form-label">Display Name <span class="text-danger">*</span></label>
                                <input type="text" id="inputDisplayName" class="form-input" value="${this.escapeHTML(profile.name || 'Alex Morgan')}" maxlength="30" required autocomplete="name">
                                <div class="form-hint" id="nameHint">Between 2 and 30 characters</div>
                            </div>

                            <div class="form-group">
                                <label for="inputRoleTitle" class="form-label">Student Role / Title</label>
                                <input type="text" id="inputRoleTitle" class="form-input" value="${this.escapeHTML(profile.role || 'Environmental Learner')}" maxlength="40">
                                <div class="form-hint">E.g., Environmental Learner, Climate Ambassador</div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Avatar Color Theme</label>
                                <div class="avatar-theme-picker" role="radiogroup" aria-label="Avatar color theme">
                                    ${this.renderThemePicker(this.currentAvatarTheme)}
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline btn-sm" id="cancelEditBtn">Cancel</button>
                                <button type="submit" class="btn btn-primary btn-sm" id="saveProfileBtn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Reset Confirmation Modal -->
                <div class="modal-backdrop" id="resetConfirmModal" role="dialog" aria-modal="true" aria-labelledby="resetModalTitle" aria-hidden="true" style="display: none;">
                    <div class="modal-dialog modal-dialog-sm">
                        <div class="modal-header">
                            <h3 id="resetModalTitle">Reset All Progress?</h3>
                            <button type="button" class="modal-close-btn" id="closeResetModalBtn" aria-label="Close dialog">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p class="body-text text-muted" style="margin-bottom: 16px;">
                                This action will reset all your completed quizzes, XP, streaks, challenges, and custom profile settings back to starting demonstration defaults.
                            </p>
                            <div class="warning-callout">
                                <strong>Important:</strong> You can download an export JSON backup first before resetting.
                            </div>
                            <div class="modal-footer" style="margin-top: 20px;">
                                <button type="button" class="btn btn-outline btn-sm" id="cancelResetBtn">Keep Progress</button>
                                <button type="button" class="btn btn-danger btn-sm" id="confirmResetBtn">Yes, Reset All Progress</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Toast Notification Container -->
                <div id="profileToastContainer" class="toast-container" aria-live="polite"></div>
            `;

            // Bind all interactive events
            this.bindEvents();
        },

        /**
         * Render 4 category performance cards
         */
        renderCategoryCards: function(categories) {
            if (!categories || categories.length === 0) {
                return '<p class="text-muted">No category data available.</p>';
            }

            return categories.map(cat => {
                return `
                    <div class="category-perf-card">
                        <div class="cat-card-top">
                            <div class="cat-icon-wrap" aria-hidden="true">
                                ${cat.iconSvg}
                            </div>
                            <span class="badge ${cat.statusClass}">${cat.status}</span>
                        </div>

                        <div class="cat-card-body">
                            <h4 class="cat-title">${this.escapeHTML(cat.name)}</h4>
                            <p class="cat-desc text-muted text-xs">${this.escapeHTML(cat.description)}</p>
                            
                            <div class="cat-stat-row">
                                <span class="text-muted text-xs">Accuracy: <strong>${cat.accuracy}%</strong></span>
                                <span class="text-muted text-xs">${cat.quizzesCompleted} ${cat.quizzesCompleted === 1 ? 'quiz' : 'quizzes'} completed</span>
                            </div>

                            <div class="progress-track" style="height: 6px; margin-top: 6px;" role="progressbar" aria-valuenow="${cat.accuracy}" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-fill" style="width: ${cat.accuracy}%;"></div>
                            </div>
                            
                            <div class="cat-card-footer text-muted text-xs">
                                <span>${cat.correctAnswers} / ${cat.totalQuestions} questions correct</span>
                                <a href="quiz.html?category=${cat.id}" class="cat-link">Take Quiz &rarr;</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        },

        /**
         * Render 7 weekly activity chart columns
         */
        renderWeeklyChartBars: function(days) {
            if (!days || days.length === 0) return '';

            return days.map(d => {
                const todayClass = d.isToday ? 'chart-bar-today' : '';
                return `
                    <div class="chart-column ${todayClass}">
                        <div class="bar-value-bubble" title="${d.count} activities (${d.xpEarned} XP)">
                            ${d.count > 0 ? d.count : ''}
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" style="height: ${d.barPercentage}%;" title="${d.dayFullName}: ${d.count} activities, ${d.xpEarned} XP"></div>
                        </div>
                        <div class="bar-label">
                            <span class="day-code">${d.day}</span>
                            ${d.isToday ? '<span class="today-dot" title="Today"></span>' : ''}
                        </div>
                    </div>
                `;
            }).join('');
        },

        /**
         * Calculate total actions completed this week
         */
        calculateWeeklyTotalActions: function(days) {
            if (!Array.isArray(days)) return 0;
            return days.reduce((sum, d) => sum + (Number(d.count) || 0), 0);
        },

        /**
         * Render recent badges showcase
         */
        renderBadgesPreview: function(unlockedList) {
            if (!unlockedList || unlockedList.length === 0) {
                return `
                    <div class="empty-state-card text-center" style="padding: 20px;">
                        <p class="text-muted text-sm">No badges unlocked yet.</p>
                        <a href="categories.html" class="btn btn-outline btn-sm" style="margin-top: 8px;">Start Quiz</a>
                    </div>
                `;
            }

            // Take the 3 most recent
            const recent = [...unlockedList].reverse().slice(0, 3);

            return recent.map(badge => {
                const dateStr = badge.unlockedAt ? window.EcoAnalytics.formatDate(badge.unlockedAt) : 'Unlocked';
                return `
                    <div class="badge-preview-item">
                        <div class="badge-icon-disc" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="6"></circle>
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                            </svg>
                        </div>
                        <div class="badge-preview-info">
                            <div class="badge-preview-title">${this.escapeHTML(badge.title || 'Environmental Achievement')}</div>
                            <div class="badge-preview-date text-muted text-xs">Unlocked on ${dateStr}</div>
                        </div>
                        <span class="badge badge-mint badge-xs">Unlocked</span>
                    </div>
                `;
            }).join('');
        },

        /**
         * Render chronological activity feed
         */
        renderActivityHistoryFeed: function(activities) {
            if (!activities || activities.length === 0) {
                return `
                    <div class="empty-state-card text-center" style="padding: 24px;">
                        <p class="text-muted">No activity history recorded yet.</p>
                        <p class="text-xs text-muted" style="margin-top: 4px;">Complete quizzes or sustainability challenges to build your log.</p>
                    </div>
                `;
            }

            return activities.map(act => {
                const dateFormatted = window.EcoAnalytics ? window.EcoAnalytics.formatDateTime(act.date) : act.date;
                const iconSvg = this.getActivityIcon(act.type);
                const xpBadge = act.xpEarned > 0
                    ? `<span class="badge badge-mint">+${act.xpEarned} XP</span>`
                    : `<span class="badge badge-neutral">Milestone</span>`;

                return `
                    <div class="activity-feed-item">
                        <div class="activity-type-icon activity-type-${this.escapeHTML(act.type)}" aria-hidden="true">
                            ${iconSvg}
                        </div>
                        <div class="activity-feed-details">
                            <div class="activity-feed-title-row">
                                <h4 class="activity-feed-title">${this.escapeHTML(act.title)}</h4>
                                ${xpBadge}
                            </div>
                            <p class="activity-feed-desc text-muted text-xs">${this.escapeHTML(act.description || '')}</p>
                            <time class="activity-feed-time text-muted text-xs" datetime="${this.escapeHTML(act.date || '')}">
                                ${dateFormatted}
                            </time>
                        </div>
                    </div>
                `;
            }).join('');
        },

        /**
         * SVG icon per activity type
         */
        getActivityIcon: function(type) {
            switch(type) {
                case 'quiz_completed':
                    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
                case 'challenge_completed':
                    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>`;
                case 'achievement_unlocked':
                    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>`;
                case 'level_up':
                    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
                default:
                    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`;
            }
        },

        /**
         * Render avatar theme swatches in modal
         */
        renderThemePicker: function(currentTheme) {
            return AVATAR_THEMES.map(theme => {
                const isSelected = theme.id === currentTheme;
                const checked = isSelected ? 'aria-checked="true" class="theme-swatch is-selected"' : 'aria-checked="false" class="theme-swatch"';
                return `
                    <button type="button" role="radio" ${checked} data-theme-id="${theme.id}" style="background-color: ${theme.color};" aria-label="${theme.name} theme">
                        ${isSelected ? '<span class="swatch-check">&check;</span>' : ''}
                    </button>
                `;
            }).join('');
        },

        /**
         * Get color for a theme ID
         */
        getThemeColor: function(themeId) {
            const theme = AVATAR_THEMES.find(t => t.id === themeId);
            return theme ? theme.color : '#245C42';
        },

        /**
         * Bind events for profile page
         */
        bindEvents: function() {
            // Sound effect toggle
            const toggleSoundBtn = document.getElementById('toggleSoundBtn');
            if (toggleSoundBtn) {
                toggleSoundBtn.addEventListener('click', () => {
                    const current = window.EcoStorage ? window.EcoStorage.getPreference('soundEnabled', true) : true;
                    const next = !current;
                    if (window.EcoStorage) {
                        window.EcoStorage.setPreference('soundEnabled', next);
                    }
                    toggleSoundBtn.innerHTML = `<span>${next ? 'Enabled' : 'Disabled'}</span>`;
                    this.showToast(`Sound effects ${next ? 'enabled' : 'disabled'}.`);
                });
            }

            // Export Data Button
            const exportDataBtn = document.getElementById('exportDataBtn');
            if (exportDataBtn) {
                exportDataBtn.addEventListener('click', () => {
                    if (window.EcoStorage && typeof window.EcoStorage.exportUserData === 'function') {
                        const success = window.EcoStorage.exportUserData();
                        if (success) {
                            this.showToast('Learning progress JSON downloaded successfully.');
                        } else {
                            this.showToast('Unable to export data at this time.', 'error');
                        }
                    }
                });
            }

            // Edit Profile Modal Elements
            const openEditModalBtn = document.getElementById('openEditModalBtn');
            const editProfileModal = document.getElementById('editProfileModal');
            const closeEditModalBtn = document.getElementById('closeEditModalBtn');
            const cancelEditBtn = document.getElementById('cancelEditBtn');
            const editProfileForm = document.getElementById('editProfileForm');
            const inputDisplayName = document.getElementById('inputDisplayName');
            const inputRoleTitle = document.getElementById('inputRoleTitle');
            const modalAvatarPreview = document.getElementById('modalAvatarPreview');
            const nameHint = document.getElementById('nameHint');

            // Open Edit Modal
            if (openEditModalBtn && editProfileModal) {
                openEditModalBtn.addEventListener('click', () => {
                    const profile = window.EcoStorage.getUserProfile();
                    this.currentAvatarTheme = profile.avatarTheme || 'forest';
                    if (inputDisplayName) inputDisplayName.value = profile.name || '';
                    if (inputRoleTitle) inputRoleTitle.value = profile.role || 'Environmental Learner';
                    this.updateModalAvatarPreview(profile.name || '', this.currentAvatarTheme);
                    this.updateThemeSwatches(this.currentAvatarTheme);

                    editProfileModal.style.display = 'flex';
                    editProfileModal.setAttribute('aria-hidden', 'false');
                    if (inputDisplayName) inputDisplayName.focus();
                });
            }

            // Close Edit Modal
            const closeEdit = () => {
                if (editProfileModal) {
                    editProfileModal.style.display = 'none';
                    editProfileModal.setAttribute('aria-hidden', 'true');
                }
            };
            if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', closeEdit);
            if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeEdit);

            // Live Name Input Preview & Validation
            if (inputDisplayName) {
                inputDisplayName.addEventListener('input', () => {
                    const val = inputDisplayName.value.trim();
                    if (val.length < 2) {
                        inputDisplayName.classList.add('is-invalid');
                        if (nameHint) nameHint.textContent = 'Name must be at least 2 characters';
                    } else {
                        inputDisplayName.classList.remove('is-invalid');
                        if (nameHint) nameHint.textContent = 'Between 2 and 30 characters';
                    }
                    this.updateModalAvatarPreview(val, this.currentAvatarTheme);
                });
            }

            // Theme swatch selection
            const themePicker = document.querySelector('.avatar-theme-picker');
            if (themePicker) {
                themePicker.addEventListener('click', (e) => {
                    const swatch = e.target.closest('.theme-swatch');
                    if (!swatch) return;
                    const themeId = swatch.getAttribute('data-theme-id');
                    if (themeId) {
                        this.currentAvatarTheme = themeId;
                        this.updateThemeSwatches(themeId);
                        const currentName = inputDisplayName ? inputDisplayName.value.trim() : 'Alex Morgan';
                        this.updateModalAvatarPreview(currentName, themeId);
                    }
                });
            }

            // Save Profile Form Submission
            if (editProfileForm) {
                editProfileForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newName = inputDisplayName ? inputDisplayName.value.trim() : '';
                    const newRole = inputRoleTitle ? inputRoleTitle.value.trim() : 'Environmental Learner';

                    if (!newName || newName.length < 2 || newName.length > 30) {
                        if (inputDisplayName) {
                            inputDisplayName.classList.add('is-invalid');
                            inputDisplayName.focus();
                        }
                        if (nameHint) nameHint.textContent = 'Please enter a valid name (2 to 30 characters).';
                        return;
                    }

                    const profile = window.EcoStorage ? window.EcoStorage.getUserProfile() : {};
                    profile.name = newName;
                    profile.role = newRole;
                    profile.avatarTheme = this.currentAvatarTheme;
                    profile.initials = window.EcoStorage.computeInitials(newName);

                    if (window.EcoStorage) {
                        window.EcoStorage.saveUserProfile(profile);
                    }

                    // Update Top Header and Sidebar immediately
                    if (window.EcoApp && typeof window.EcoApp.syncUserProfileDisplay === 'function') {
                        window.EcoApp.syncUserProfileDisplay();
                    }

                    closeEdit();
                    this.showToast('Profile updated successfully.');

                    // Re-render profile page elements in place
                    this.initProfilePage();
                });
            }

            // Reset Confirmation Modal Elements
            const openResetModalBtn = document.getElementById('openResetModalBtn');
            const resetConfirmModal = document.getElementById('resetConfirmModal');
            const closeResetModalBtn = document.getElementById('closeResetModalBtn');
            const cancelResetBtn = document.getElementById('cancelResetBtn');
            const confirmResetBtn = document.getElementById('confirmResetBtn');

            if (openResetModalBtn && resetConfirmModal) {
                openResetModalBtn.addEventListener('click', () => {
                    resetConfirmModal.style.display = 'flex';
                    resetConfirmModal.setAttribute('aria-hidden', 'false');
                    if (cancelResetBtn) cancelResetBtn.focus();
                });
            }

            const closeReset = () => {
                if (resetConfirmModal) {
                    resetConfirmModal.style.display = 'none';
                    resetConfirmModal.setAttribute('aria-hidden', 'true');
                }
            };
            if (closeResetModalBtn) closeResetModalBtn.addEventListener('click', closeReset);
            if (cancelResetBtn) cancelResetBtn.addEventListener('click', closeReset);

            if (confirmResetBtn) {
                confirmResetBtn.addEventListener('click', () => {
                    if (window.EcoStorage && typeof window.EcoStorage.resetProgress === 'function') {
                        window.EcoStorage.resetProgress();
                        closeReset();
                        this.showToast('All progress reset to demonstration defaults.');

                        if (window.EcoApp && typeof window.EcoApp.syncUserProfileDisplay === 'function') {
                            window.EcoApp.syncUserProfileDisplay();
                        }
                        setTimeout(() => {
                            this.initProfilePage();
                        }, 300);
                    }
                });
            }

            // Close modals on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeEdit();
                    closeReset();
                }
            });
        },

        /**
         * Update modal avatar preview
         */
        updateModalAvatarPreview: function(name, themeId) {
            const preview = document.getElementById('modalAvatarPreview');
            if (!preview) return;
            const initials = window.EcoStorage ? window.EcoStorage.computeInitials(name) : 'EQ';
            preview.textContent = initials;
            preview.style.backgroundColor = this.getThemeColor(themeId);
        },

        /**
         * Update swatch active classes
         */
        updateThemeSwatches: function(selectedThemeId) {
            const swatches = document.querySelectorAll('.avatar-theme-picker .theme-swatch');
            swatches.forEach(swatch => {
                const id = swatch.getAttribute('data-theme-id');
                if (id === selectedThemeId) {
                    swatch.classList.add('is-selected');
                    swatch.setAttribute('aria-checked', 'true');
                    swatch.innerHTML = '<span class="swatch-check">&check;</span>';
                } else {
                    swatch.classList.remove('is-selected');
                    swatch.setAttribute('aria-checked', 'false');
                    swatch.innerHTML = '';
                }
            });
        },

        /**
         * Simple Toast notification banner
         */
        showToast: function(message, type = 'success') {
            const container = document.getElementById('profileToastContainer');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `profile-toast toast-${type}`;
            toast.textContent = message;
            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('show');
            }, 10);

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) toast.parentNode.removeChild(toast);
                }, 300);
            }, 3500);
        },

        /**
         * HTML escape helper
         */
        escapeHTML: function(str) {
            if (typeof str !== 'string') return '';
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
    };

    window.EcoProfile = EcoProfile;

})(typeof window !== 'undefined' ? window : this);

