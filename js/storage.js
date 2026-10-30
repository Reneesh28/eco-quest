/**
 * EcoQuest - Local Storage Utility (Phase 5)
 * Handles demonstration user state, preferences, cumulative gamification,
 * challenges, leaderboard, activity history, and unified data architecture.
 */

const StorageKeys = {
    USER_PROFILE: 'ecoquest_user_profile',
    PREFERENCES: 'ecoquest_preferences',
    USER_PROGRESS: 'ecoquest_user_progress',
    USER_DATA: 'ecoquest_user_data'
};

const DefaultUserProfile = {
    name: 'Alex Morgan',
    initials: 'AM',
    role: 'Environmental Learner',
    avatarTheme: 'forest', // forest, sage, emerald, moss, teal
    memberSince: 'October 2026',
    xp: 1250,
    level: 5,
    levelTitle: 'Earth Protector',
    streakDays: 5,
    streakBest: 7,
    completedChallengesCount: 8,
    badgesUnlockedCount: 4
};

const DefaultUserProgress = {
    totalXP: 1250,
    currentLevel: 5,
    currentLevelName: 'Earth Protector',
    totalQuizzesCompleted: 3,
    totalCorrectAnswers: 26,
    totalIncorrectAnswers: 4,
    totalXpEarned: 260,
    currentStreak: 5,
    longestStreak: 7,
    lastActivityDate: '2026-10-30',
    completedCategories: ['climate', 'waste', 'biodiversity'],
    unlockedAchievements: [
        { id: 'first_steps', title: 'First Steps', unlockedAt: '2026-10-26T10:00:00.000Z' },
        { id: 'climate_advocate', title: 'Climate Advocate', unlockedAt: '2026-10-27T11:30:00.000Z' },
        { id: 'waste_warrior', title: 'Waste Warrior', unlockedAt: '2026-10-28T14:15:00.000Z' },
        { id: 'consistent_learner', title: 'Consistent Learner', unlockedAt: '2026-10-29T09:45:00.000Z' }
    ],
    processedTransactions: [],
    // Phase 4 Challenges & History
    completedDailyChallenges: [
        {
            id: 'daily-water-01',
            date: '2026-10-29',
            transactionId: 'txn_init_water_audit',
            completedAt: '2026-10-29T16:20:00.000Z'
        }
    ],
    completedWeeklyChallenges: [],
    challengeHistory: [
        {
            id: 'daily-water-01',
            title: 'Household Water Audit',
            type: 'daily',
            date: '2026-10-29',
            xpAwarded: 20,
            period: '2026-10-29'
        }
    ],
    weeklyXPHistory: {
        '2026-W44': 160
    },
    quizHistory: [
        { categoryId: 'climate', score: 80, accuracy: 80, totalQuestions: 10, correctCount: 8, completedAt: '2026-10-27T11:30:00.000Z', weekKey: '2026-W44' },
        { categoryId: 'waste', score: 90, accuracy: 90, totalQuestions: 10, correctCount: 9, completedAt: '2026-10-28T14:15:00.000Z', weekKey: '2026-W44' },
        { categoryId: 'biodiversity', score: 90, accuracy: 90, totalQuestions: 10, correctCount: 9, completedAt: '2026-10-30T10:00:00.000Z', weekKey: '2026-W44' }
    ],
    // Phase 5 Activity History (Central Log)
    activityHistory: [
        {
            id: 'act_quiz_bio_1',
            type: 'quiz_completed',
            title: 'Quiz Completed: Biodiversity & Ecosystems',
            description: 'Scored 90/100 (9/10 questions correct)',
            category: 'biodiversity',
            xpEarned: 90,
            date: '2026-10-30T10:00:00.000Z'
        },
        {
            id: 'act_chall_water_1',
            type: 'challenge_completed',
            title: 'Daily Challenge: Household Water Audit',
            description: 'Completed audit of household water fixtures and usage',
            xpEarned: 20,
            date: '2026-10-29T16:20:00.000Z'
        },
        {
            id: 'act_achieve_learner_1',
            type: 'achievement_unlocked',
            title: 'Achievement Unlocked: Consistent Learner',
            description: 'Maintained a 3-day environmental study streak',
            badgeId: 'consistent_learner',
            xpEarned: 0,
            date: '2026-10-29T09:45:00.000Z'
        },
        {
            id: 'act_quiz_waste_1',
            type: 'quiz_completed',
            title: 'Quiz Completed: Waste Management & Recycling',
            description: 'Scored 90/100 (9/10 questions correct)',
            category: 'waste',
            xpEarned: 90,
            date: '2026-10-28T14:15:00.000Z'
        },
        {
            id: 'act_achieve_waste_1',
            type: 'achievement_unlocked',
            title: 'Achievement Unlocked: Waste Warrior',
            description: 'Finished Waste Management quiz with 80%+ accuracy',
            badgeId: 'waste_warrior',
            xpEarned: 0,
            date: '2026-10-28T14:15:00.000Z'
        },
        {
            id: 'act_quiz_climate_1',
            type: 'quiz_completed',
            title: 'Quiz Completed: Climate Change Fundamentals',
            description: 'Scored 80/100 (8/10 questions correct)',
            category: 'climate',
            xpEarned: 80,
            date: '2026-10-27T11:30:00.000Z'
        },
        {
            id: 'act_achieve_climate_1',
            type: 'achievement_unlocked',
            title: 'Achievement Unlocked: Climate Advocate',
            description: 'Finished Climate Change quiz',
            badgeId: 'climate_advocate',
            xpEarned: 0,
            date: '2026-10-27T11:30:00.000Z'
        },
        {
            id: 'act_lvl_5',
            type: 'level_up',
            title: 'Reached Level 5: Earth Protector',
            description: 'Advanced to Tier 5 environmental steward status',
            levelNumber: 5,
            xpEarned: 0,
            date: '2026-10-26T10:05:00.000Z'
        },
        {
            id: 'act_achieve_first_1',
            type: 'achievement_unlocked',
            title: 'Achievement Unlocked: First Steps',
            description: 'Completed first environmental quiz',
            badgeId: 'first_steps',
            xpEarned: 0,
            date: '2026-10-26T10:00:00.000Z'
        }
    ],
    lastCompletedCategory: 'biodiversity',
    lastQuizScore: 90,
    lastQuizAccuracy: 90,
    lastQuizTotalQuestions: 10,
    lastQuizCorrect: 9,
    lastQuizIncorrect: 1,
    lastCompletedAt: '2026-10-30T10:00:00.000Z',
    lastQuizReview: []
};

const EcoStorage = {
    /**
     * Check if localStorage is available in the current browser environment
     */
    isAvailable: function() {
        try {
            const testKey = '__eco_test__';
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Get user profile data with fallback to default demo data
     */
    getUserProfile: function() {
        if (!this.isAvailable()) {
            return { ...DefaultUserProfile };
        }
        try {
            const stored = window.localStorage.getItem(StorageKeys.USER_PROFILE);
            if (!stored) {
                this.saveUserProfile(DefaultUserProfile);
                return { ...DefaultUserProfile };
            }
            const parsed = JSON.parse(stored);
            if (typeof parsed === 'object' && parsed !== null) {
                // Ensure required Phase 5 properties exist
                return {
                    name: parsed.name || DefaultUserProfile.name,
                    initials: parsed.initials || this.computeInitials(parsed.name || DefaultUserProfile.name),
                    role: parsed.role || DefaultUserProfile.role,
                    avatarTheme: parsed.avatarTheme || DefaultUserProfile.avatarTheme,
                    memberSince: parsed.memberSince || DefaultUserProfile.memberSince,
                    xp: parsed.xp !== undefined ? Number(parsed.xp) : DefaultUserProfile.xp,
                    level: parsed.level !== undefined ? Number(parsed.level) : DefaultUserProfile.level,
                    levelTitle: parsed.levelTitle || DefaultUserProfile.levelTitle,
                    streakDays: parsed.streakDays !== undefined ? Number(parsed.streakDays) : DefaultUserProfile.streakDays,
                    streakBest: parsed.streakBest !== undefined ? Number(parsed.streakBest) : DefaultUserProfile.streakBest,
                    completedChallengesCount: parsed.completedChallengesCount !== undefined ? Number(parsed.completedChallengesCount) : DefaultUserProfile.completedChallengesCount,
                    badgesUnlockedCount: parsed.badgesUnlockedCount !== undefined ? Number(parsed.badgesUnlockedCount) : DefaultUserProfile.badgesUnlockedCount
                };
            }
            return { ...DefaultUserProfile };
        } catch (e) {
            console.warn('EcoQuest: Unable to parse stored user profile, using defaults.', e);
            return { ...DefaultUserProfile };
        }
    },

    /**
     * Helper to compute uppercase initials from display name
     */
    computeInitials: function(name) {
        if (!name || typeof name !== 'string') return 'EQ';
        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return 'EQ';
    },

    /**
     * Save user profile data and dispatch synchronization event
     */
    saveUserProfile: function(profile) {
        if (!this.isAvailable() || !profile) return;
        try {
            // Always recompute initials from current display name
            if (profile.name) {
                profile.initials = this.computeInitials(profile.name);
            }
            window.localStorage.setItem(StorageKeys.USER_PROFILE, JSON.stringify(profile));

            // Dispatch storage event notification for multi-component syncing
            if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent('ecoquest:profile-updated', { detail: profile }));
            }
        } catch (e) {
            console.warn('EcoQuest: Unable to save user profile.', e);
        }
    },

    /**
     * Get user overall gamification, challenges and quiz progress
     * Automatically handles schema versioning, activity history migration, and backward compatibility
     */
    getUserProgress: function() {
        if (!this.isAvailable()) {
            return { ...DefaultUserProgress };
        }
        try {
            const stored = window.localStorage.getItem(StorageKeys.USER_PROGRESS);
            if (!stored) {
                const initial = { ...DefaultUserProgress };
                const userProfile = this.getUserProfile();
                if (userProfile && userProfile.xp !== undefined) {
                    initial.totalXP = Number(userProfile.xp) || 1250;
                }
                this.saveUserProgress(initial);
                return initial;
            }

            const parsed = JSON.parse(stored);
            if (typeof parsed === 'object' && parsed !== null) {
                const totalXP = parsed.totalXP !== undefined
                    ? Number(parsed.totalXP)
                    : (parsed.totalXpEarned ? Number(parsed.totalXpEarned) + 1250 : 1250);

                let levelNum = parsed.currentLevel || 5;
                let levelName = parsed.currentLevelName || 'Earth Protector';
                if (window.EcoGamification && typeof window.EcoGamification.getLevelInfo === 'function') {
                    const info = window.EcoGamification.getLevelInfo(totalXP);
                    levelNum = info.levelNumber;
                    levelName = info.levelName;
                }

                // Ensure activityHistory exists and contains demonstration records if empty
                let activityHistory = Array.isArray(parsed.activityHistory) ? parsed.activityHistory : null;
                if (!activityHistory || activityHistory.length === 0) {
                    activityHistory = [...DefaultUserProgress.activityHistory];
                }

                return {
                    totalXP: totalXP,
                    currentLevel: levelNum,
                    currentLevelName: levelName,
                    totalQuizzesCompleted: Number(parsed.totalQuizzesCompleted) || 0,
                    totalCorrectAnswers: Number(parsed.totalCorrectAnswers) || 0,
                    totalIncorrectAnswers: Number(parsed.totalIncorrectAnswers) || 0,
                    totalXpEarned: Number(parsed.totalXpEarned) || 0,
                    currentStreak: Number(parsed.currentStreak) || 0,
                    longestStreak: Number(parsed.longestStreak) || 0,
                    lastActivityDate: parsed.lastActivityDate || null,
                    completedCategories: Array.isArray(parsed.completedCategories) ? parsed.completedCategories : [],
                    unlockedAchievements: Array.isArray(parsed.unlockedAchievements) ? parsed.unlockedAchievements : [],
                    processedTransactions: Array.isArray(parsed.processedTransactions) ? parsed.processedTransactions : [],
                    pendingLevelUp: parsed.pendingLevelUp || null,
                    pendingNewAchievements: Array.isArray(parsed.pendingNewAchievements) ? parsed.pendingNewAchievements : null,
                    // Phase 4 fields
                    completedDailyChallenges: Array.isArray(parsed.completedDailyChallenges) ? parsed.completedDailyChallenges : [],
                    completedWeeklyChallenges: Array.isArray(parsed.completedWeeklyChallenges) ? parsed.completedWeeklyChallenges : [],
                    challengeHistory: Array.isArray(parsed.challengeHistory) ? parsed.challengeHistory : [],
                    weeklyXPHistory: typeof parsed.weeklyXPHistory === 'object' && parsed.weeklyXPHistory !== null ? parsed.weeklyXPHistory : {},
                    quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
                    // Phase 5 Activity History
                    activityHistory: activityHistory,
                    // Quiz specifics
                    lastCompletedCategory: parsed.lastCompletedCategory || null,
                    lastQuizScore: parsed.lastQuizScore !== undefined ? Number(parsed.lastQuizScore) : null,
                    lastQuizAccuracy: parsed.lastQuizAccuracy !== undefined ? Number(parsed.lastQuizAccuracy) : null,
                    lastQuizTotalQuestions: parsed.lastQuizTotalQuestions !== undefined ? Number(parsed.lastQuizTotalQuestions) : null,
                    lastQuizCorrect: parsed.lastQuizCorrect !== undefined ? Number(parsed.lastQuizCorrect) : null,
                    lastQuizIncorrect: parsed.lastQuizIncorrect !== undefined ? Number(parsed.lastQuizIncorrect) : null,
                    lastCompletedAt: parsed.lastCompletedAt || null,
                    lastQuizReview: Array.isArray(parsed.lastQuizReview) ? parsed.lastQuizReview : []
                };
            }
            return { ...DefaultUserProgress };
        } catch (e) {
            console.warn('EcoQuest: Unable to parse user progress.', e);
            return { ...DefaultUserProgress };
        }
    },

    /**
     * Save updated user progress and dispatch progress event
     */
    saveUserProgress: function(progress) {
        if (!this.isAvailable() || !progress) return;
        try {
            window.localStorage.setItem(StorageKeys.USER_PROGRESS, JSON.stringify(progress));

            if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent('ecoquest:progress-updated', { detail: progress }));
            }
        } catch (e) {
            console.warn('EcoQuest: Could not write progress to localStorage.', e);
        }
    },

    /**
     * Record a genuine activity event into centralized activity history with deduplication
     * @param {string} type - 'quiz_completed' | 'challenge_completed' | 'achievement_unlocked' | 'level_up'
     * @param {Object} details - Details of the activity
     * @returns {Object|null} The recorded activity object
     */
    recordActivity: function(type, details) {
        if (!type || !details) return null;

        const progress = this.getUserProgress();
        if (!Array.isArray(progress.activityHistory)) {
            progress.activityHistory = [];
        }

        const id = details.id || `act_${type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const date = details.date || new Date().toISOString();

        // Deduplication check: check id or exact match within same minute
        const isDuplicate = progress.activityHistory.some(existing => {
            if (existing.id === id) return true;
            if (details.entityId && existing.entityId === details.entityId && existing.type === type) return true;
            if (type === 'achievement_unlocked' && details.badgeId && existing.badgeId === details.badgeId) return true;
            if (type === 'level_up' && details.levelNumber && existing.levelNumber === details.levelNumber) return true;
            return false;
        });

        if (isDuplicate) {
            return null;
        }

        const activityRecord = {
            id: id,
            type: type,
            title: details.title || 'Environmental Action',
            description: details.description || '',
            category: details.category || null,
            xpEarned: Math.max(0, Number(details.xpEarned) || 0),
            date: date,
            entityId: details.entityId || null,
            badgeId: details.badgeId || null,
            levelNumber: details.levelNumber || null
        };

        // Insert at the front (most recent first)
        progress.activityHistory.unshift(activityRecord);

        // Keep maximum 100 recent entries to avoid storage bloat
        if (progress.activityHistory.length > 100) {
            progress.activityHistory = progress.activityHistory.slice(0, 100);
        }

        this.saveUserProgress(progress);

        if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
            window.dispatchEvent(new CustomEvent('ecoquest:activity-recorded', { detail: activityRecord }));
        }

        return activityRecord;
    },

    /**
     * Get user activity history
     */
    getUserActivityHistory: function() {
        const progress = this.getUserProgress();
        return Array.isArray(progress.activityHistory) ? progress.activityHistory : [];
    },

    /**
     * Get overall statistics computed from user progress
     */
    getUserStatistics: function() {
        const progress = this.getUserProgress();
        if (window.EcoAnalytics && typeof window.EcoAnalytics.getOverallStatistics === 'function') {
            return window.EcoAnalytics.getOverallStatistics(progress);
        }

        const correct = Number(progress.totalCorrectAnswers) || 0;
        const incorrect = Number(progress.totalIncorrectAnswers) || 0;
        const total = correct + incorrect;
        return {
            totalQuizzes: Number(progress.totalQuizzesCompleted) || 0,
            totalQuestions: total,
            correctAnswers: correct,
            incorrectAnswers: incorrect,
            accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
            totalXP: Number(progress.totalXP) || 0
        };
    },

    /**
     * Get unlocked achievements
     */
    getUserAchievements: function() {
        const progress = this.getUserProgress();
        return Array.isArray(progress.unlockedAchievements) ? progress.unlockedAchievements : [];
    },

    /**
     * Backward-compatible quiz result save wrapper
     */
    saveQuizResult: function(resultData) {
        if (window.EcoGamification && typeof window.EcoGamification.recordQuizCompletion === 'function') {
            return window.EcoGamification.recordQuizCompletion(resultData);
        }

        const currentProgress = this.getUserProgress();
        currentProgress.totalQuizzesCompleted += 1;
        currentProgress.totalCorrectAnswers += (Number(resultData.correctCount) || 0);
        currentProgress.totalIncorrectAnswers += (Number(resultData.incorrectCount) || 0);
        currentProgress.totalXP += (Number(resultData.score) || 0);
        currentProgress.lastQuizScore = Number(resultData.score) || 0;
        currentProgress.lastQuizAccuracy = Number(resultData.accuracy) || 0;
        currentProgress.lastCompletedCategory = resultData.categoryId || 'climate';
        currentProgress.lastQuizReview = Array.isArray(resultData.reviewList) ? resultData.reviewList : [];
        this.saveUserProgress(currentProgress);
        return true;
    },

    /**
     * Record a completed daily challenge
     */
    recordDailyChallengeCompletion: function(challengeId, xpAwarded, transactionId, challengeTitle) {
        const progress = this.getUserProgress();
        const todayStr = window.EcoChallenges ? window.EcoChallenges.getLocalDateString() : new Date().toISOString().split('T')[0];
        const weekKey = window.EcoChallenges ? window.EcoChallenges.getCurrentWeekKey() : '2026-W44';

        // Add to completed daily challenges list
        progress.completedDailyChallenges.push({
            id: challengeId,
            date: todayStr,
            transactionId: transactionId,
            completedAt: new Date().toISOString()
        });

        // Add to challenge history
        progress.challengeHistory.unshift({
            id: challengeId,
            title: challengeTitle || 'Daily Challenge',
            type: 'daily',
            date: todayStr,
            xpAwarded: xpAwarded,
            period: todayStr
        });

        // Update weekly XP history
        progress.weeklyXPHistory[weekKey] = (Number(progress.weeklyXPHistory[weekKey]) || 0) + xpAwarded;

        this.saveUserProgress(progress);

        // Record central activity
        this.recordActivity('challenge_completed', {
            entityId: challengeId,
            title: `Daily Challenge: ${challengeTitle || 'Action Complete'}`,
            description: `Completed daily practical sustainability action`,
            xpEarned: xpAwarded,
            date: new Date().toISOString()
        });
    },

    /**
     * Record a completed weekly challenge
     */
    recordWeeklyChallengeCompletion: function(challengeId, xpAwarded, transactionId, challengeTitle, weekKey) {
        const progress = this.getUserProgress();
        const todayStr = window.EcoChallenges ? window.EcoChallenges.getLocalDateString() : new Date().toISOString().split('T')[0];

        progress.completedWeeklyChallenges.push({
            id: challengeId,
            weekKey: weekKey,
            transactionId: transactionId,
            completedAt: new Date().toISOString()
        });

        progress.challengeHistory.unshift({
            id: challengeId,
            title: challengeTitle || 'Weekly Challenge',
            type: 'weekly',
            date: todayStr,
            xpAwarded: xpAwarded,
            period: weekKey
        });

        progress.weeklyXPHistory[weekKey] = (Number(progress.weeklyXPHistory[weekKey]) || 0) + xpAwarded;

        this.saveUserProgress(progress);

        // Record central activity
        this.recordActivity('challenge_completed', {
            entityId: challengeId,
            title: `Weekly Challenge: ${challengeTitle || 'Mission Complete'}`,
            description: `Completed comprehensive environmental weekly mission`,
            xpEarned: xpAwarded,
            date: new Date().toISOString()
        });
    },

    /**
     * Add quiz entry to quiz history
     */
    recordQuizHistoryEntry: function(entry) {
        const progress = this.getUserProgress();
        progress.quizHistory.push(entry);

        const weekKey = entry.weekKey || (window.EcoChallenges ? window.EcoChallenges.getCurrentWeekKey() : '2026-W44');
        progress.weeklyXPHistory[weekKey] = (Number(progress.weeklyXPHistory[weekKey]) || 0) + (Number(entry.score) || 0);

        this.saveUserProgress(progress);
    },

    /**
     * Export all user data as formatted JSON and trigger a browser download
     * File named: ecoquest-progress-YYYY-MM-DD.json
     * @returns {boolean} Success status
     */
    exportUserData: function() {
        try {
            const profile = this.getUserProfile();
            const progress = this.getUserProgress();
            const stats = this.getUserStatistics();
            const analytics = window.EcoAnalytics ? window.EcoAnalytics.getCategoryPerformance(progress) : [];

            const exportPayload = {
                exportVersion: '1.0',
                exportDate: new Date().toISOString(),
                platform: 'EcoQuest - Environmental Awareness & Learning Platform',
                user: profile,
                gamification: {
                    totalXP: progress.totalXP,
                    currentLevel: progress.currentLevel,
                    currentLevelName: progress.currentLevelName,
                    currentStreak: progress.currentStreak,
                    longestStreak: progress.longestStreak,
                    unlockedAchievements: progress.unlockedAchievements
                },
                learningStatistics: stats,
                categoryPerformance: analytics,
                quizHistory: progress.quizHistory || [],
                challengeHistory: progress.challengeHistory || [],
                activityHistory: progress.activityHistory || []
            };

            const jsonStr = JSON.stringify(exportPayload, null, 2);
            const todayStr = new Date().toISOString().split('T')[0];
            const fileName = `ecoquest-progress-${todayStr}.json`;

            const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 1000);

            return true;
        } catch (e) {
            console.error('EcoQuest: Failed to export user data.', e);
            return false;
        }
    },

    /**
     * Get preference value
     */
    getPreference: function(key, defaultValue = null) {
        if (!this.isAvailable()) return defaultValue;
        try {
            const prefs = JSON.parse(window.localStorage.getItem(StorageKeys.PREFERENCES) || '{}');
            return key in prefs ? prefs[key] : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    /**
     * Set preference value
     */
    setPreference: function(key, value) {
        if (!this.isAvailable()) return;
        try {
            const prefs = JSON.parse(window.localStorage.getItem(StorageKeys.PREFERENCES) || '{}');
            prefs[key] = value;
            window.localStorage.setItem(StorageKeys.PREFERENCES, JSON.stringify(prefs));
        } catch (e) {
            console.warn('EcoQuest: Unable to save preference.', e);
        }
    },

    /**
     * Reset all progress back to starting demonstration defaults
     */
    resetProgress: function() {
        if (!this.isAvailable()) return;
        try {
            window.localStorage.setItem(StorageKeys.USER_PROGRESS, JSON.stringify(DefaultUserProgress));
            window.localStorage.setItem(StorageKeys.USER_PROFILE, JSON.stringify(DefaultUserProfile));
            
            if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent('ecoquest:storage-reset'));
            }
            return true;
        } catch (e) {
            console.warn('EcoQuest: Unable to reset progress.', e);
            return false;
        }
    }
};

window.EcoStorage = EcoStorage;
