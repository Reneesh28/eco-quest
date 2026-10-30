/**
 * EcoQuest - Core Application Initializer (Phase 3)
 * Coordinates component loading, date formatting, gamification updates, dashboard, achievements, and profile pages
 */

const EcoTemplates = {
    sidebar: `<div class="sidebar-header">
    <a href="index.html" class="brand-link" aria-label="EcoQuest Home">
        <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a10 10 0 0 1-10-10C2 6.477 6.477 2 12 2Z"></path>
            <path d="M12 8c2.5 0 4 1.5 4 4 0 3-4 6-4 6s-4-3-4-6c0-2.5 1.5-4 4-4Z"></path>
            <path d="M12 12v6"></path>
        </svg>
        <div class="brand-info">
            <span class="brand-title">EcoQuest</span>
            <span class="brand-subtitle">Environmental Ed</span>
        </div>
    </a>
</div>

<nav class="sidebar-nav" aria-label="Main Navigation">
    <ul class="nav-list">
        <li class="nav-item">
            <a href="index.html" class="nav-link" data-page="dashboard">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                    <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                    <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                    <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                </svg>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="categories.html" class="nav-link" data-page="categories">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>
                <span>Explore Quizzes</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="challenges.html" class="nav-link" data-page="challenges">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" x2="4" y1="22" y2="15"></line>
                </svg>
                <span>Challenges</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="achievements.html" class="nav-link" data-page="achievements">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
                <span>Achievements</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="leaderboard.html" class="nav-link" data-page="leaderboard">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34"></path>
                    <path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <span>Leaderboard</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="profile.html" class="nav-link" data-page="profile">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>My Profile</span>
            </a>
        </li>
    </ul>
</nav>

<div class="sidebar-footer">
    <a href="profile.html" class="user-profile-badge" aria-label="View user profile">
        <div class="user-avatar" id="sidebarUserAvatar" aria-hidden="true">AM</div>
        <div class="user-info">
            <span class="user-name" id="sidebarUserName">Alex Morgan</span>
            <span class="user-role" id="sidebarUserRole">Level 5 • Earth Protector</span>
        </div>
    </a>
</div>`,

    header: `<div class="header-left">
    <button type="button" class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
    </button>
    <h1 class="page-title" id="headerPageTitle">Dashboard</h1>
</div>

<div class="header-right">
    <time class="header-date" id="headerDateDisplay" datetime="2026-10-30">Friday, October 30, 2026</time>
    <button type="button" class="header-icon-btn" id="notificationBtn" aria-label="Notifications (No unread items)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
    </button>
    <a href="profile.html" class="header-avatar" aria-label="Alex Morgan Profile">
        <span id="headerAvatarInitials">AM</span>
    </a>
</div>`,

    footer: `<div class="footer-inner">
    <p class="footer-copy">&copy; 2026 EcoQuest. Interactive Environmental Awareness Education.</p>
    <ul class="footer-links">
        <li><a href="categories.html">Quizzes</a></li>
        <li><a href="challenges.html">Challenges</a></li>
        <li><a href="achievements.html">Achievements</a></li>
        <li><a href="leaderboard.html">Leaderboard</a></li>
    </ul>
</div>`
};

const EcoApp = {
    currentPage: 'dashboard',

    /**
     * Main entry point
     */
    init: function(pageId) {
        this.currentPage = pageId || this.detectPage();

        // Load shared component fragments
        this.loadSharedComponents(() => {
            // Update header title based on current page
            this.updateHeaderContext();

            // Set current formatted date
            this.setCurrentDate();

            // Synchronize user profile in sidebar & header
            this.syncUserProfileDisplay();

            // Setup navigation bindings
            if (window.EcoNavigation) {
                window.EcoNavigation.init(this.currentPage);
            }

            // Check for pending level up notification across all pages
            this.checkLevelUpModal();

            // Page-specific initializers
            if (this.currentPage === 'dashboard') {
                this.initDashboard();
            } else if (this.currentPage === 'achievements') {
                this.initAchievementsPage();
            } else if (this.currentPage === 'profile') {
                if (window.EcoProfile && typeof window.EcoProfile.initProfilePage === 'function') {
                    window.EcoProfile.initProfilePage();
                } else {
                    this.initProfilePage();
                }
            } else if (this.currentPage === 'challenges') {
                if (window.EcoChallenges && typeof window.EcoChallenges.initChallengesPage === 'function') {
                    window.EcoChallenges.initChallengesPage();
                }
            } else if (this.currentPage === 'leaderboard') {
                if (window.EcoLeaderboard && typeof window.EcoLeaderboard.initLeaderboardPage === 'function') {
                    window.EcoLeaderboard.initLeaderboardPage();
                }
            }
        });
    },

    /**
     * Detect page identity
     */
    detectPage: function() {
        const bodyPage = document.body.getAttribute('data-page');
        if (bodyPage) return bodyPage;

        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').toLowerCase();
        return filename || 'dashboard';
    },

    /**
     * Load sidebar, header, and footer HTML fragments
     */
    loadSharedComponents: function(callback) {
        const components = [
            { id: 'sidebar', file: 'components/sidebar.html', fallback: EcoTemplates.sidebar },
            { id: 'header', file: 'components/header.html', fallback: EcoTemplates.header },
            { id: 'footer', file: 'components/footer.html', fallback: EcoTemplates.footer }
        ];

        let loadedCount = 0;
        const total = components.length;

        const checkFinished = () => {
            loadedCount++;
            if (loadedCount === total && typeof callback === 'function') {
                callback();
            }
        };

        const isFileProtocol = window.location.protocol === 'file:';

        components.forEach(item => {
            const container = document.getElementById(item.id);
            if (!container) {
                checkFinished();
                return;
            }

            if (isFileProtocol) {
                container.innerHTML = item.fallback;
                checkFinished();
                return;
            }

            fetch(item.file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Status ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    container.innerHTML = html;
                    checkFinished();
                })
                .catch(() => {
                    container.innerHTML = item.fallback;
                    checkFinished();
                });
        });
    },

    /**
     * Update page title in the header component
     */
    updateHeaderContext: function() {
        const titleEl = document.getElementById('headerPageTitle');
        if (!titleEl) return;

        const pageTitles = {
            dashboard: 'Dashboard',
            categories: 'Explore Quizzes',
            quiz: 'Interactive Quiz',
            results: 'Quiz Results',
            challenges: 'Eco Challenges',
            achievements: 'Achievements & Badges',
            leaderboard: 'Community Leaderboard',
            profile: 'My Profile'
        };

        const title = pageTitles[this.currentPage] || 'EcoQuest';
        titleEl.textContent = title;
    },

    /**
     * Display realistic formatted date
     */
    setCurrentDate: function() {
        const dateEl = document.getElementById('headerDateDisplay');
        if (!dateEl) return;

        const now = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        try {
            dateEl.textContent = now.toLocaleDateString('en-US', options);
            dateEl.setAttribute('datetime', now.toISOString().split('T')[0]);
        } catch (e) {
            dateEl.textContent = 'Friday, October 30, 2026';
        }
    },

    /**
     * Synchronize sidebar and header user profile text with stored state
     */
    syncUserProfileDisplay: function() {
        if (!window.EcoStorage) return;
        const progress = window.EcoStorage.getUserProgress();
        const profile = window.EcoStorage.getUserProfile();

        const roleEl = document.getElementById('sidebarUserRole');
        if (roleEl && progress) {
            const levelNum = progress.currentLevel || 1;
            const levelName = progress.currentLevelName || 'Eco Beginner';
            roleEl.textContent = `Level ${levelNum} • ${levelName}`;
        }

        const nameEl = document.getElementById('sidebarUserName');
        if (nameEl && profile && profile.name) {
            nameEl.textContent = profile.name;
        }

        const initials = profile && profile.initials ? profile.initials : 'AM';
        const themeColors = {
            forest: '#245C42',
            sage: '#3D7958',
            emerald: '#2A7F54',
            moss: '#486B4D',
            teal: '#2E7570'
        };
        const bgColor = profile && profile.avatarTheme && themeColors[profile.avatarTheme]
            ? themeColors[profile.avatarTheme]
            : '#245C42';

        const sidebarAvatar = document.getElementById('sidebarUserAvatar');
        if (sidebarAvatar) {
            sidebarAvatar.textContent = initials;
            sidebarAvatar.style.backgroundColor = bgColor;
            sidebarAvatar.style.color = '#FFFFFF';
        }

        const headerAvatar = document.getElementById('headerAvatarInitials');
        if (headerAvatar) {
            headerAvatar.textContent = initials;
            const headerAvatarLink = headerAvatar.closest('.header-avatar');
            if (headerAvatarLink) {
                headerAvatarLink.style.backgroundColor = bgColor;
                headerAvatarLink.style.color = '#FFFFFF';
            }
        }
    },

    /**
     * Check if a level up occurred and show clean modal
     */
    checkLevelUpModal: function() {
        if (!window.EcoStorage) return;
        const progress = window.EcoStorage.getUserProgress();
        if (!progress || !progress.pendingLevelUp) return;

        const levelUpData = progress.pendingLevelUp;

        // Create and mount modal
        const modalId = 'globalLevelUpModal';
        if (document.getElementById(modalId)) return;

        const overlay = document.createElement('div');
        overlay.id = modalId;
        overlay.className = 'level-modal-overlay active';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'modalLevelTitle');

        overlay.innerHTML = `
            <div class="level-modal-card">
                <div class="level-modal-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </div>
                <div class="level-modal-badge">
                    <span class="badge badge-accent">LEVEL UP!</span>
                </div>
                <h2 class="level-modal-title" id="modalLevelTitle">Level ${levelUpData.levelNumber}: ${levelUpData.levelName}</h2>
                <p class="level-modal-subtitle">Congratulations! Your environmental knowledge is growing. Keep learning and protecting our planet.</p>
                <button type="button" class="btn btn-primary" id="closeLevelUpBtn" style="width: 100%;">
                    <span>Continue Journey</span>
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        const dismissModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 250);

            // Clear pending status
            const current = window.EcoStorage.getUserProgress();
            delete current.pendingLevelUp;
            window.EcoStorage.saveUserProgress(current);
        };

        const closeBtn = document.getElementById('closeLevelUpBtn');
        if (closeBtn) {
            closeBtn.focus();
            closeBtn.addEventListener('click', dismissModal);
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) dismissModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById(modalId)) {
                dismissModal();
            }
        });
    },

    /**
     * Dashboard dynamic statistics & achievements preview
     */
    initDashboard: function() {
        if (!window.EcoStorage) return;

        const progress = window.EcoStorage.getUserProgress();
        const profile = window.EcoStorage.getUserProfile();

        // Greeting
        const greetingTitle = document.getElementById('welcomeGreeting');
        if (greetingTitle) {
            const hour = new Date().getHours();
            let greeting = 'Good morning';
            if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
            else if (hour >= 17 || hour < 5) greeting = 'Good evening';

            const firstName = profile.name ? profile.name.split(' ')[0] : 'Alex';
            greetingTitle.textContent = `${greeting}, ${firstName}!`;
        }

        // Live Level Information
        const totalXP = progress.totalXP !== undefined ? progress.totalXP : 1250;
        const levelInfo = window.EcoGamification
            ? window.EcoGamification.getLevelInfo(totalXP)
            : { levelNumber: 5, levelName: 'Earth Protector', progressPercentage: 60, xpToNextLevel: 50, isMaxLevel: false };

        // Card 1: Total Points
        const xpVal = document.getElementById('statTotalPoints');
        const xpDesc = document.getElementById('statXpDesc');
        if (xpVal) {
            xpVal.textContent = Number(totalXP).toLocaleString() + ' XP';
        }
        if (xpDesc) {
            xpDesc.textContent = levelInfo.isMaxLevel
                ? 'Maximum level reached'
                : `${levelInfo.xpToNextLevel} XP to Level ${levelInfo.nextLevelNumber}`;
        }

        // Card 2: Current Level
        const levelVal = document.getElementById('statCurrentLevelName');
        const levelDesc = document.getElementById('statLevelDesc');
        const levelBarFill = document.getElementById('statLevelBarFill');
        if (levelVal) {
            levelVal.textContent = levelInfo.levelName;
        }
        if (levelDesc) {
            levelDesc.textContent = `Level ${levelInfo.levelNumber} • ${levelInfo.progressPercentage}% completed`;
        }
        if (levelBarFill) {
            levelBarFill.style.width = `${levelInfo.progressPercentage}%`;
        }

        // Card 3: Learning Streak
        const streakVal = document.getElementById('statStreakDays');
        const streakDesc = document.getElementById('statStreakDesc');
        if (streakVal) {
            streakVal.textContent = `${progress.currentStreak || 1} Days`;
        }
        if (streakDesc) {
            streakDesc.textContent = `Active today • Personal best: ${progress.longestStreak || 1} days`;
        }

        // Achievement Preview Widget
        this.renderDashboardAchievements(progress);

        // Phase 4: Daily Challenge, Weekly Challenge & Leaderboard Preview
        this.renderDashboardDailyChallenge(progress);
        this.renderDashboardWeeklyChallenge(progress);
        this.renderDashboardLeaderboardPreview(progress);
    },

    /**
     * Render the featured daily challenge on the dashboard
     */
    renderDashboardDailyChallenge: function(progress) {
        if (!window.EcoChallenges || typeof window.EcoChallenges.getFeaturedDailyChallenge !== 'function') return;

        const featured = window.EcoChallenges.getFeaturedDailyChallenge();
        if (!featured) return;

        const isCompleted = window.EcoChallenges.isDailyChallengeCompletedToday(featured.id);

        const titleEl = document.getElementById('dailyChallengeTitle');
        const descEl = document.getElementById('dashboardDailyDesc');
        const catBadge = document.getElementById('dashboardDailyCategoryBadge');
        const statusBadge = document.getElementById('dashboardDailyStatusBadge');
        const durationEl = document.getElementById('dashboardDailyDuration');
        const rewardBadge = document.getElementById('dashboardDailyReward');
        const actionBtn = document.getElementById('dashboardDailyActionBtn');

        if (titleEl) titleEl.textContent = featured.title;
        if (descEl) descEl.textContent = featured.description;
        if (catBadge) catBadge.textContent = featured.category;
        if (durationEl) durationEl.textContent = featured.duration;
        if (rewardBadge) rewardBadge.textContent = `+${featured.reward} XP`;

        if (statusBadge) {
            statusBadge.className = `badge ${isCompleted ? 'badge-success' : 'badge-neutral'}`;
            statusBadge.textContent = isCompleted ? 'Completed Today' : 'Available Today';
        }

        if (actionBtn) {
            actionBtn.innerHTML = `
                <span>${isCompleted ? 'View Details' : 'Start Challenge'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            `;
            actionBtn.onclick = () => {
                window.EcoChallenges.openChallengeModal(featured.id);
            };
        }
    },

    /**
     * Render the active weekly mission progress on the dashboard
     */
    renderDashboardWeeklyChallenge: function(progress) {
        if (!window.EcoChallenges || !window.EcoChallengeData) return;

        window.EcoChallenges.evaluateWeeklyChallenges(progress);
        const weeklyList = window.EcoChallengeData.weeklyChallenges || [];
        const primaryMission = weeklyList[0];
        if (!primaryMission) return;

        const prog = window.EcoChallenges.getWeeklyChallengeProgress(primaryMission, progress);

        const titleEl = document.getElementById('dashboardWeeklyChallengeTitle');
        const descEl = document.getElementById('dashboardWeeklyDesc');
        const rewardEl = document.getElementById('dashboardWeeklyReward');
        const labelEl = document.getElementById('dashboardWeeklyProgressLabel');
        const barEl = document.getElementById('dashboardWeeklyProgressBar');

        if (titleEl) titleEl.textContent = primaryMission.title;
        if (descEl) descEl.textContent = primaryMission.description;
        if (rewardEl) rewardEl.textContent = `+${primaryMission.reward} XP`;
        if (labelEl) {
            labelEl.innerHTML = `<strong>${prog.current} / ${prog.target}</strong> ${prog.isCompleted ? '(Completed)' : ''}`;
        }
        if (barEl) {
            barEl.style.width = `${prog.percentage}%`;
        }
    },

    /**
     * Render the leaderboard preview widget on the dashboard
     */
    renderDashboardLeaderboardPreview: function(progress) {
        const previewList = document.getElementById('dashboardLeaderboardPreviewList');
        if (!previewList || !window.EcoLeaderboard) return;

        const sorted = window.EcoLeaderboard.getSortedPlayers('weekly');
        const top3 = sorted.slice(0, 3);

        let html = '';
        top3.forEach((player, idx) => {
            const rank = idx + 1;
            const isMe = Boolean(player.isCurrentUser);

            html += `
                <div class="preview-player-row ${isMe ? 'is-me' : ''}">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 700; color: var(--muted); width: 16px;">#${rank}</span>
                        <span>${player.name} ${isMe ? '<span class="badge badge-mint badge-xs">You</span>' : ''}</span>
                    </div>
                    <span style="font-weight: 600; color: ${isMe ? 'var(--primary)' : 'var(--text)'};">${player.weeklyXP} XP</span>
                </div>
            `;
        });

        // If current user is outside top 3, show user's ranking row as well!
        const userRankInfo = window.EcoLeaderboard.getCurrentUserRankInfo(sorted, 'weekly');
        if (userRankInfo && userRankInfo.rank > 3) {
            html += `
                <div class="preview-player-row is-me" style="margin-top: 4px; border-top: 1px dashed var(--border);">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 700; color: var(--primary); width: 16px;">#${userRankInfo.rank}</span>
                        <span>${userRankInfo.user.name} <span class="badge badge-mint badge-xs">You</span></span>
                    </div>
                    <span style="font-weight: 700; color: var(--primary);">${userRankInfo.user.weeklyXP} XP</span>
                </div>
            `;
        }

        previewList.innerHTML = html;
    },

    /**
     * Render the 3 live achievement cards on the dashboard
     */
    renderDashboardAchievements: function(progress) {
        const listContainer = document.getElementById('dashboardAchievementsList');
        const countBadge = document.getElementById('dashboardAchievementsCount');
        if (!listContainer || !window.EcoGamification) return;

        const allBadges = window.EcoGamification.ACHIEVEMENTS;
        const unlockedList = Array.isArray(progress.unlockedAchievements) ? progress.unlockedAchievements : [];
        const unlockedIds = new Set(unlockedList.map(a => (typeof a === 'string' ? a : a.id)));

        if (countBadge) {
            countBadge.textContent = `${unlockedList.length} of ${allBadges.length} Unlocked`;
        }

        // Pick 3 representative achievements
        const previewBadges = allBadges.slice(0, 3);
        let html = '';

        previewBadges.forEach(badge => {
            const isUnlocked = unlockedIds.has(badge.id);
            html += `
                <article class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon" aria-hidden="true">
                        ${badge.icon}
                    </div>
                    <div class="achievement-details">
                        <div class="achievement-name">
                            <span>${badge.title}</span>
                            <span class="achievement-status">${isUnlocked ? 'Unlocked' : 'Locked'}</span>
                        </div>
                        <p class="achievement-desc">${badge.description}</p>
                    </div>
                </article>
            `;
        });

        listContainer.innerHTML = html;
    },

    /**
     * Achievements Page Controller
     */
    initAchievementsPage: function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent || !window.EcoGamification) return;

        const progress = window.EcoStorage ? window.EcoStorage.getUserProgress() : { unlockedAchievements: [] };
        const allBadges = window.EcoGamification.ACHIEVEMENTS;
        const unlockedList = Array.isArray(progress.unlockedAchievements) ? progress.unlockedAchievements : [];
        
        // Map of id -> unlockedAt
        const unlockedMap = {};
        unlockedList.forEach(item => {
            if (typeof item === 'object' && item.id) {
                unlockedMap[item.id] = item.unlockedAt;
            } else if (typeof item === 'string') {
                unlockedMap[item] = '2026-10-30T10:00:00.000Z';
            }
        });

        const totalCount = allBadges.length;
        const unlockedCount = Object.keys(unlockedMap).length;
        const lockedCount = Math.max(0, totalCount - unlockedCount);
        const percent = Math.round((unlockedCount / totalCount) * 100);

        mainContent.innerHTML = `
            <div class="achievements-page-container">
                
                <!-- Summary Card -->
                <section class="achievements-summary-card">
                    <div class="achievements-summary-header">
                        <h2>Achievements & Badges</h2>
                        <p>Track your environmental milestones, quiz streaks, and subject mastery rewards.</p>
                    </div>

                    <div class="achievements-stats-row">
                        <div class="achievement-stat-box">
                            <span class="achievement-stat-val">${totalCount}</span>
                            <span class="achievement-stat-label">Total Badges</span>
                        </div>
                        <div class="achievement-stat-box">
                            <span class="achievement-stat-val" style="color: var(--success);">${unlockedCount}</span>
                            <span class="achievement-stat-label">Unlocked</span>
                        </div>
                        <div class="achievement-stat-box">
                            <span class="achievement-stat-val" style="color: var(--muted);">${lockedCount}</span>
                            <span class="achievement-stat-label">Locked</span>
                        </div>
                        <div class="achievement-stat-box">
                            <span class="achievement-stat-val" style="color: var(--primary);">${percent}%</span>
                            <span class="achievement-stat-label">Completion</span>
                        </div>
                    </div>

                    <div class="overall-progress-bar-wrap">
                        <div class="overall-progress-bar-info">
                            <span>Badge Mastery Progress</span>
                            <span>${unlockedCount} of ${totalCount} Unlocked</span>
                        </div>
                        <div class="progress-track" style="height: 8px;">
                            <div class="progress-fill" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                </section>

                <!-- Filter Tabs -->
                <nav class="achievements-filter-bar" aria-label="Achievement Filter Tabs">
                    <button type="button" class="filter-tab-btn active" data-filter="all">All (${totalCount})</button>
                    <button type="button" class="filter-tab-btn" data-filter="unlocked">Unlocked (${unlockedCount})</button>
                    <button type="button" class="filter-tab-btn" data-filter="locked">Locked (${lockedCount})</button>
                </nav>

                <!-- Grid -->
                <section class="all-achievements-grid" id="achievementsGridList"></section>

            </div>
        `;

        // Render card items
        const gridList = document.getElementById('achievementsGridList');

        const renderFilteredCards = (filterType) => {
            let html = '';
            allBadges.forEach(badge => {
                const isUnlocked = Boolean(unlockedMap[badge.id]);
                if (filterType === 'unlocked' && !isUnlocked) return;
                if (filterType === 'locked' && isUnlocked) return;

                let dateFormatted = '';
                if (isUnlocked && unlockedMap[badge.id]) {
                    try {
                        const d = new Date(unlockedMap[badge.id]);
                        dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    } catch (e) {
                        dateFormatted = 'Unlocked';
                    }
                }

                html += `
                    <article class="achievement-full-card ${isUnlocked ? 'unlocked' : 'locked'}">
                        <div>
                            <div class="ach-card-top">
                                <div class="ach-card-icon" aria-hidden="true">
                                    ${badge.icon}
                                </div>
                                <span class="badge ${isUnlocked ? 'badge-success' : 'badge-neutral'}">
                                    ${isUnlocked ? (dateFormatted ? `Unlocked ${dateFormatted}` : 'Unlocked') : 'Locked'}
                                </span>
                            </div>

                            <h3 class="ach-card-title">${badge.title}</h3>
                            <p class="ach-card-desc">${badge.description}</p>
                        </div>

                        <div class="ach-card-footer">
                            <span class="ach-condition-pill">${badge.unlockCondition}</span>
                            <span class="text-muted text-sm">${badge.category}</span>
                        </div>
                    </article>
                `;
            });

            gridList.innerHTML = html;
        };

        renderFilteredCards('all');

        // Filter tab interactions
        const tabBtns = document.querySelectorAll('.filter-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                renderFilteredCards(filter);
            });
        });
    },

    /**
     * Profile Page Controller
     */
    initProfilePage: function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        const progress = window.EcoStorage ? window.EcoStorage.getUserProgress() : {};
        const profile = window.EcoStorage ? window.EcoStorage.getUserProfile() : { name: 'Alex Morgan' };

        const totalXP = progress.totalXP || 1250;
        const levelInfo = window.EcoGamification
            ? window.EcoGamification.getLevelInfo(totalXP)
            : { levelNumber: 5, levelName: 'Earth Protector', progressPercentage: 60, xpToNextLevel: 50, isMaxLevel: false };

        const totalAnswered = (progress.totalCorrectAnswers || 0) + (progress.totalIncorrectAnswers || 0);
        const overallAccuracy = totalAnswered > 0
            ? Math.round((progress.totalCorrectAnswers / totalAnswered) * 100)
            : 0;

        const unlockedBadges = Array.isArray(progress.unlockedAchievements) ? progress.unlockedAchievements : [];
        const soundEnabled = window.EcoStorage ? window.EcoStorage.getPreference('soundEnabled', true) : true;

        mainContent.innerHTML = `
            <div class="profile-page-container">
                
                <!-- Identity Card -->
                <section class="profile-identity-card">
                    <div class="profile-identity-left">
                        <div class="profile-avatar-large">AM</div>
                        <div class="profile-headings">
                            <h2>${profile.name || 'Alex Morgan'}</h2>
                            <div class="user-role-line">
                                <span class="badge badge-mint">Level ${levelInfo.levelNumber}: ${levelInfo.levelName}</span>
                                <span>&bull; Environmental Learner</span>
                            </div>
                        </div>
                    </div>

                    <div class="profile-level-widget">
                        <div class="level-box-header">
                            <span>Level Progress</span>
                            <span><strong>${levelInfo.progressPercentage}%</strong></span>
                        </div>
                        <div class="progress-track" style="height: 7px; margin-bottom: 6px;">
                            <div class="progress-fill" style="width: ${levelInfo.progressPercentage}%;"></div>
                        </div>
                        <div class="level-box-footer text-muted text-sm">
                            <span>${totalXP.toLocaleString()} XP Total</span>
                            <span>${levelInfo.isMaxLevel ? 'Max Level' : `${levelInfo.xpToNextLevel} XP to Level ${levelInfo.nextLevelNumber}`}</span>
                        </div>
                    </div>
                </section>

                <!-- 6 Metric Cards -->
                <section class="profile-stats-grid" aria-label="Learning Metrics">
                    <div class="profile-stat-box">
                        <span class="profile-stat-label">Current Streak</span>
                        <span class="profile-stat-number">${progress.currentStreak || 1} Days</span>
                        <span class="profile-stat-detail">Personal Best: ${progress.longestStreak || 1} Days</span>
                    </div>

                    <div class="profile-stat-box">
                        <span class="profile-stat-label">Total XP Earned</span>
                        <span class="profile-stat-number">${totalXP.toLocaleString()} XP</span>
                        <span class="profile-stat-detail">Rank: ${levelInfo.levelName}</span>
                    </div>

                    <div class="profile-stat-box">
                        <span class="profile-stat-label">Quizzes Completed</span>
                        <span class="profile-stat-number">${progress.totalQuizzesCompleted || 0}</span>
                        <span class="profile-stat-detail">Across 4 environmental tracks</span>
                    </div>

                    <div class="profile-stat-box">
                        <span class="profile-stat-label">Questions Answered</span>
                        <span class="profile-stat-number">${totalAnswered}</span>
                        <span class="profile-stat-detail">${progress.totalCorrectAnswers || 0} Correct &bull; ${progress.totalIncorrectAnswers || 0} Incorrect</span>
                    </div>

                    <div class="profile-stat-box">
                        <span class="profile-stat-label">Overall Accuracy</span>
                        <span class="profile-stat-number">${overallAccuracy}%</span>
                        <span class="profile-stat-detail">Based on all quiz answers</span>
                    </div>

                    <div class="profile-stat-box">
                        <span class="profile-stat-label">Badges Unlocked</span>
                        <span class="profile-stat-number">${unlockedBadges.length} / 12</span>
                        <span class="profile-stat-detail"><a href="achievements.html">View all badges &rarr;</a></span>
                    </div>
                </section>

                <!-- Panels: Settings & Quick Badges -->
                <div class="profile-panels-grid">
                    
                    <!-- Settings -->
                    <section class="profile-preferences-card">
                        <h3 class="card-title" style="margin-bottom: 16px;">Learning Preferences & Data</h3>
                        
                        <div class="pref-row">
                            <div class="pref-info">
                                <h4>Sound Effects</h4>
                                <p>Play subtle audio cues during quiz interactions.</p>
                            </div>
                            <button type="button" class="btn btn-outline btn-sm" id="toggleSoundBtn">
                                <span>${soundEnabled ? 'Enabled' : 'Disabled'}</span>
                            </button>
                        </div>

                        <div class="pref-row">
                            <div class="pref-info">
                                <h4>Storage Environment</h4>
                                <p>Progress is saved locally via browser LocalStorage.</p>
                            </div>
                            <span class="badge badge-mint">Local Active</span>
                        </div>

                        <div class="pref-row">
                            <div class="pref-info">
                                <h4>Reset Demonstration Progress</h4>
                                <p>Reset XP, streak, and quiz logs back to initial defaults.</p>
                            </div>
                            <button type="button" class="btn btn-outline btn-sm" id="resetProgressBtn" style="color: var(--error); border-color: #e5baba;">
                                <span>Reset Data</span>
                            </button>
                        </div>
                    </section>

                    <!-- Unlocked Badges Showcase -->
                    <section class="profile-preferences-card">
                        <div class="card-header">
                            <h3 class="card-title">Unlocked Badges</h3>
                            <a href="achievements.html" class="text-sm" style="font-weight: 600;">All (${unlockedBadges.length})</a>
                        </div>
                        <div class="achievements-list" id="profileBadgesShowcase"></div>
                    </section>

                </div>

            </div>
        `;

        // Populate recent badges showcase
        const showcase = document.getElementById('profileBadgesShowcase');
        if (showcase && window.EcoGamification) {
            const allBadges = window.EcoGamification.ACHIEVEMENTS;
            const unlockedIds = new Set(unlockedBadges.map(b => (typeof b === 'string' ? b : b.id)));
            const unlockedObjs = allBadges.filter(b => unlockedIds.has(b.id));

            if (unlockedObjs.length === 0) {
                showcase.innerHTML = `<p class="text-muted text-sm">No badges unlocked yet. Complete your first quiz to earn a badge!</p>`;
            } else {
                let html = '';
                unlockedObjs.slice(0, 3).forEach(b => {
                    html += `
                        <div class="achievement-item unlocked">
                            <div class="achievement-icon" aria-hidden="true">${b.icon}</div>
                            <div class="achievement-details">
                                <span class="achievement-name">${b.title}</span>
                                <p class="achievement-desc">${b.description}</p>
                            </div>
                        </div>
                    `;
                });
                showcase.innerHTML = html;
            }
        }

        // Toggle sound preference
        const soundBtn = document.getElementById('toggleSoundBtn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                const current = window.EcoStorage.getPreference('soundEnabled', true);
                window.EcoStorage.setPreference('soundEnabled', !current);
                soundBtn.querySelector('span').textContent = !current ? 'Enabled' : 'Disabled';
            });
        }

        // Reset progress handler
        const resetBtn = document.getElementById('resetProgressBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const confirmReset = window.confirm('Are you sure you want to reset all stored progress, XP, and badges back to defaults?');
                if (confirmReset) {
                    window.EcoStorage.resetProgress();
                    window.location.reload();
                }
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.getAttribute('data-page') || 'dashboard';
    EcoApp.init(pageId);
});

// Cross-tab and module synchronization
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
        if (event.key === 'ecoquest_user_profile' || event.key === 'ecoquest_user_progress') {
            if (window.EcoApp && typeof window.EcoApp.syncUserProfileDisplay === 'function') {
                window.EcoApp.syncUserProfileDisplay();
            }
            if (EcoApp.currentPage === 'profile' && window.EcoProfile && typeof window.EcoProfile.initProfilePage === 'function') {
                window.EcoProfile.initProfilePage();
            }
        }
    });

    window.addEventListener('ecoquest:profile-updated', () => {
        if (window.EcoApp && typeof window.EcoApp.syncUserProfileDisplay === 'function') {
            window.EcoApp.syncUserProfileDisplay();
        }
    });

    window.addEventListener('ecoquest:progress-updated', () => {
        if (window.EcoApp && typeof window.EcoApp.syncUserProfileDisplay === 'function') {
            window.EcoApp.syncUserProfileDisplay();
        }
    });
}

window.EcoApp = EcoApp;
