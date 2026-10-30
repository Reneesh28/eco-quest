/**
 * EcoQuest - Centralized Gamification Engine (Phase 3)
 * Manages XP transactions, level progression, achievements, and learning streaks
 */

const EcoGamification = {
    // 7 Predefined Levels
    LEVELS: [
        { level: 1, name: "Eco Beginner", minXP: 0 },
        { level: 2, name: "Eco Explorer", minXP: 100 },
        { level: 3, name: "Nature Guardian", minXP: 250 },
        { level: 4, name: "Green Champion", minXP: 500 },
        { level: 5, name: "Earth Protector", minXP: 850 },
        { level: 6, name: "Eco Master", minXP: 1300 },
        { level: 7, name: "Planet Hero", minXP: 2000 }
    ],

    // Predefined Achievements (12 comprehensive achievements)
    ACHIEVEMENTS: [
        {
            id: "first_steps",
            title: "First Steps",
            description: "Complete your first environmental quiz.",
            unlockCondition: "Complete 1 quiz",
            category: "General",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v-2.38C4 11.5 6 9 9 9h1a5 5 0 0 1 5 5v2"></path><circle cx="9" cy="4" r="2"></circle><path d="M12 21v-4"></path><path d="M16 21v-2a3 3 0 0 0-3-3"></path></svg>`
        },
        {
            id: "curious_mind",
            title: "Curious Mind",
            description: "Complete 5 quizzes across any categories.",
            unlockCondition: "Complete 5 quizzes",
            category: "Milestone",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`
        },
        {
            id: "knowledge_seeker",
            title: "Knowledge Seeker",
            description: "Complete 10 quizzes and demonstrate sustained commitment to eco-learning.",
            unlockCondition: "Complete 10 quizzes",
            category: "Milestone",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
        },
        {
            id: "perfect_score",
            title: "Perfect Score",
            description: "Achieve 100% accuracy in a completed quiz containing at least 5 questions.",
            unlockCondition: "100% accuracy on a quiz",
            category: "Mastery",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        },
        {
            id: "climate_advocate",
            title: "Climate Advocate",
            description: "Complete a Climate Change quiz session.",
            unlockCondition: "Complete Climate Change quiz",
            category: "Category",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>`
        },
        {
            id: "waste_warrior",
            title: "Waste Warrior",
            description: "Complete a Waste Management quiz session.",
            unlockCondition: "Complete Waste Management quiz",
            category: "Category",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>`
        },
        {
            id: "nature_guardian_badge",
            title: "Nature Guardian",
            description: "Complete a Biodiversity quiz session.",
            unlockCondition: "Complete Biodiversity quiz",
            category: "Category",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`
        },
        {
            id: "energy_saver",
            title: "Energy Saver",
            description: "Complete a Renewable Energy quiz session.",
            unlockCondition: "Complete Renewable Energy quiz",
            category: "Category",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><circle cx="12" cy="18" r="4"></circle></svg>`
        },
        {
            id: "consistent_learner",
            title: "Consistent Learner",
            description: "Reach a 3-day learning streak by completing quizzes on consecutive days.",
            unlockCondition: "3-day learning streak",
            category: "Streak",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`
        },
        {
            id: "dedicated_eco_learner",
            title: "Dedicated Eco Learner",
            description: "Reach a 7-day learning streak by completing quizzes every day for a full week.",
            unlockCondition: "7-day learning streak",
            category: "Streak",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`
        },
        {
            id: "eco_explorer_level",
            title: "Rising Explorer",
            description: "Reach Level 2 (Eco Explorer) by advancing your environmental literacy.",
            unlockCondition: "Reach Level 2 (100 XP)",
            category: "Level",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
        },
        {
            id: "century_club",
            title: "Century Club",
            description: "Answer 50 quiz questions correctly across your learning journey.",
            unlockCondition: "Answer 50 questions correctly",
            category: "Mastery",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`
        }
    ],

    /**
     * Calculate Level details based on cumulative XP
     */
    getLevelInfo: function(totalXP) {
        const xp = Math.max(0, Number(totalXP) || 0);
        let currentLevel = this.LEVELS[0];

        for (let i = this.LEVELS.length - 1; i >= 0; i--) {
            if (xp >= this.LEVELS[i].minXP) {
                currentLevel = this.LEVELS[i];
                break;
            }
        }

        const nextLevel = this.LEVELS.find(l => l.level === currentLevel.level + 1) || null;
        let progressPercentage = 100;
        let xpToNextLevel = 0;

        if (nextLevel) {
            const range = nextLevel.minXP - currentLevel.minXP;
            const progressInRange = xp - currentLevel.minXP;
            progressPercentage = Math.min(100, Math.max(0, Math.round((progressInRange / range) * 100)));
            xpToNextLevel = Math.max(0, nextLevel.minXP - xp);
        }

        return {
            levelNumber: currentLevel.level,
            levelName: currentLevel.name,
            currentLevelMinXP: currentLevel.minXP,
            nextLevelNumber: nextLevel ? nextLevel.level : null,
            nextLevelName: nextLevel ? nextLevel.name : null,
            nextLevelMinXP: nextLevel ? nextLevel.minXP : null,
            xpToNextLevel: xpToNextLevel,
            progressPercentage: progressPercentage,
            isMaxLevel: nextLevel === null
        };
    },

    /**
     * Helper to get local date string YYYY-MM-DD
     */
    getLocalDateString: function(dateObj = new Date()) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Calculate consecutive days difference between two YYYY-MM-DD strings
     */
    getDayDifference: function(earlierDateStr, laterDateStr) {
        if (!earlierDateStr || !laterDateStr) return null;
        const [y1, m1, d1] = earlierDateStr.split('-').map(Number);
        const [y2, m2, d2] = laterDateStr.split('-').map(Number);

        const dStart = new Date(y1, m1 - 1, d1);
        const dEnd = new Date(y2, m2 - 1, d2);

        const diffTime = dEnd.getTime() - dStart.getTime();
        return Math.round(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * Update learning streak based on current quiz completion date
     */
    calculateStreak: function(currentProgress) {
        const todayStr = this.getLocalDateString();
        let currentStreak = Number(currentProgress.currentStreak) || 0;
        let longestStreak = Number(currentProgress.longestStreak) || 0;
        const lastDate = currentProgress.lastActivityDate;

        if (!lastDate) {
            currentStreak = 1;
        } else if (lastDate === todayStr) {
            // Already active today; streak remains unchanged
            currentStreak = Math.max(1, currentStreak);
        } else {
            const daysDiff = this.getDayDifference(lastDate, todayStr);
            if (daysDiff === 1) {
                // Consecutive calendar day
                currentStreak += 1;
            } else if (daysDiff > 1) {
                // Streak broken
                currentStreak = 1;
            }
        }

        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }

        return {
            currentStreak: currentStreak,
            longestStreak: longestStreak,
            lastActivityDate: todayStr
        };
    },

    /**
     * Check achievement unlock conditions against current progress
     */
    checkAchievements: function(userProgress, context = {}) {
        const unlockedList = Array.isArray(userProgress.unlockedAchievements)
            ? [...userProgress.unlockedAchievements]
            : [];
        const unlockedIds = new Set(unlockedList.map(a => (typeof a === 'string' ? a : a.id)));

        const newlyUnlocked = [];
        const nowIso = new Date().toISOString();

        this.ACHIEVEMENTS.forEach(ach => {
            if (unlockedIds.has(ach.id)) return;

            let conditionMet = false;

            switch (ach.id) {
                case "first_steps":
                    conditionMet = (userProgress.totalQuizzesCompleted || 0) >= 1;
                    break;
                case "curious_mind":
                    conditionMet = (userProgress.totalQuizzesCompleted || 0) >= 5;
                    break;
                case "knowledge_seeker":
                    conditionMet = (userProgress.totalQuizzesCompleted || 0) >= 10;
                    break;
                case "perfect_score":
                    conditionMet = (context.accuracy === 100 || userProgress.lastQuizAccuracy === 100) &&
                                   ((context.totalQuestions || userProgress.lastQuizTotalQuestions || 0) >= 5);
                    break;
                case "climate_advocate":
                    conditionMet = (context.categoryId === 'climate') ||
                                   (Array.isArray(userProgress.completedCategories) && userProgress.completedCategories.includes('climate'));
                    break;
                case "waste_warrior":
                    conditionMet = (context.categoryId === 'waste') ||
                                   (Array.isArray(userProgress.completedCategories) && userProgress.completedCategories.includes('waste'));
                    break;
                case "nature_guardian_badge":
                    conditionMet = (context.categoryId === 'biodiversity') ||
                                   (Array.isArray(userProgress.completedCategories) && userProgress.completedCategories.includes('biodiversity'));
                    break;
                case "energy_saver":
                    conditionMet = (context.categoryId === 'energy') ||
                                   (Array.isArray(userProgress.completedCategories) && userProgress.completedCategories.includes('energy'));
                    break;
                case "consistent_learner":
                    conditionMet = (userProgress.currentStreak || 0) >= 3 || (userProgress.longestStreak || 0) >= 3;
                    break;
                case "dedicated_eco_learner":
                    conditionMet = (userProgress.currentStreak || 0) >= 7 || (userProgress.longestStreak || 0) >= 7;
                    break;
                case "eco_explorer_level":
                    conditionMet = (userProgress.totalXP || 0) >= 100;
                    break;
                case "century_club":
                    conditionMet = (userProgress.totalCorrectAnswers || 0) >= 50;
                    break;
                default:
                    conditionMet = false;
            }

            if (conditionMet) {
                const item = { id: ach.id, title: ach.title, unlockedAt: nowIso };
                unlockedList.push(item);
                unlockedIds.add(ach.id);
                newlyUnlocked.push(ach);
            }
        });

        return {
            updatedUnlockedList: unlockedList,
            newlyUnlocked: newlyUnlocked
        };
    },

    /**
     * Centralized XP awarding method
     * Validates transaction, updates cumulative XP and user level, prevents duplicate submissions
     */
    awardXP: function(amount, source, transactionId) {
        if (!transactionId || typeof transactionId !== 'string') {
            return { success: false, error: "Invalid transaction ID." };
        }

        const validAmount = Number(amount);
        if (isNaN(validAmount) || validAmount < 0) {
            return { success: false, error: "Invalid XP amount." };
        }

        const progress = window.EcoStorage.getUserProgress();
        const transactions = Array.isArray(progress.processedTransactions)
            ? progress.processedTransactions
            : [];

        // Duplicate check
        if (transactions.includes(transactionId)) {
            return {
                success: false,
                duplicate: true,
                message: "XP has already been credited for this transaction.",
                progress: progress
            };
        }

        // Previous Level
        const oldLevelInfo = this.getLevelInfo(progress.totalXP);

        // Update Cumulative XP
        const newTotalXP = (Number(progress.totalXP) || 0) + validAmount;
        const newTotalXpEarned = (Number(progress.totalXpEarned) || 0) + validAmount;

        // New Level
        const newLevelInfo = this.getLevelInfo(newTotalXP);
        const didLevelUp = newLevelInfo.levelNumber > oldLevelInfo.levelNumber;

        // Record transaction
        transactions.push(transactionId);
        if (transactions.length > 200) {
            transactions.splice(0, transactions.length - 200);
        }

        progress.totalXP = newTotalXP;
        progress.totalXpEarned = newTotalXpEarned;
        progress.currentLevel = newLevelInfo.levelNumber;
        progress.currentLevelName = newLevelInfo.levelName;
        progress.processedTransactions = transactions;

        if (didLevelUp) {
            progress.pendingLevelUp = {
                levelNumber: newLevelInfo.levelNumber,
                levelName: newLevelInfo.levelName
            };
        }

        window.EcoStorage.saveUserProgress(progress);

        // Synchronize with user profile
        const userProfile = window.EcoStorage.getUserProfile();
        userProfile.xp = newTotalXP;
        userProfile.level = newLevelInfo.levelNumber;
        userProfile.levelTitle = newLevelInfo.levelName;
        window.EcoStorage.saveUserProfile(userProfile);

        return {
            success: true,
            awardedXP: validAmount,
            totalXP: newTotalXP,
            levelUp: didLevelUp,
            oldLevel: oldLevelInfo,
            newLevel: newLevelInfo,
            progress: progress
        };
    },

    /**
     * Centralized Quiz Completion Handler
     * Integrates scoring, centralized XP awarding, streak calculation, achievements, and level checking
     */
    recordQuizCompletion: function(quizResult) {
        if (!quizResult || typeof quizResult !== 'object') return null;

        const transactionId = `quiz_${quizResult.categoryId}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const score = Math.max(0, Number(quizResult.score) || 0);
        const accuracy = Math.round((Number(quizResult.correctCount) / Number(quizResult.totalQuestions)) * 100);

        const currentProgress = window.EcoStorage.getUserProgress();

        // 1. Update streak
        const streakData = this.calculateStreak(currentProgress);

        // 2. Update quiz counts & categories
        const completedCats = Array.isArray(currentProgress.completedCategories)
            ? [...currentProgress.completedCategories]
            : [];
        if (quizResult.categoryId && !completedCats.includes(quizResult.categoryId)) {
            completedCats.push(quizResult.categoryId);
        }

        const tempProgress = {
            ...currentProgress,
            totalQuizzesCompleted: (Number(currentProgress.totalQuizzesCompleted) || 0) + 1,
            totalCorrectAnswers: (Number(currentProgress.totalCorrectAnswers) || 0) + (Number(quizResult.correctCount) || 0),
            totalIncorrectAnswers: (Number(currentProgress.totalIncorrectAnswers) || 0) + (Number(quizResult.incorrectCount) || 0),
            completedCategories: completedCats,
            currentStreak: streakData.currentStreak,
            longestStreak: streakData.longestStreak,
            lastActivityDate: streakData.lastActivityDate,
            lastCompletedCategory: quizResult.categoryId,
            lastQuizScore: score,
            lastQuizAccuracy: accuracy,
            lastQuizTotalQuestions: Number(quizResult.totalQuestions) || 10,
            lastQuizCorrect: Number(quizResult.correctCount) || 0,
            lastQuizIncorrect: Number(quizResult.incorrectCount) || 0,
            lastCompletedAt: new Date().toISOString(),
            lastQuizReview: Array.isArray(quizResult.reviewList) ? quizResult.reviewList : []
        };

        // 3. Award XP via central XP system
        const xpResult = this.awardXP(score, "quiz_completion", transactionId);
        tempProgress.totalXP = xpResult.totalXP;
        tempProgress.totalXpEarned = (Number(currentProgress.totalXpEarned) || 0) + score;

        // Record into quiz history for weekly challenge tracking
        const weekKey = (window.EcoChallenges && typeof window.EcoChallenges.getCurrentWeekKey === 'function')
            ? window.EcoChallenges.getCurrentWeekKey()
            : '2026-W44';

        if (!Array.isArray(tempProgress.quizHistory)) {
            tempProgress.quizHistory = [];
        }
        tempProgress.quizHistory.push({
            id: `quiz_${Date.now()}`,
            categoryId: quizResult.categoryId,
            score: score,
            accuracy: accuracy,
            completedAt: new Date().toISOString(),
            weekKey: weekKey
        });

        if (!tempProgress.weeklyXPHistory || typeof tempProgress.weeklyXPHistory !== 'object') {
            tempProgress.weeklyXPHistory = {};
        }
        tempProgress.weeklyXPHistory[weekKey] = (Number(tempProgress.weeklyXPHistory[weekKey]) || 0) + score;

        // 4. Validate Achievements
        const achievementResult = this.checkAchievements(tempProgress, {
            categoryId: quizResult.categoryId,
            accuracy: accuracy,
            totalQuestions: Number(quizResult.totalQuestions) || 10
        });

        tempProgress.unlockedAchievements = achievementResult.updatedUnlockedList;
        if (achievementResult.newlyUnlocked.length > 0) {
            tempProgress.pendingNewAchievements = achievementResult.newlyUnlocked;
        }

        // Save progress to LocalStorage
        window.EcoStorage.saveUserProgress(tempProgress);

        // Also sync streak back to profile
        const userProfile = window.EcoStorage.getUserProfile();
        userProfile.streakDays = streakData.currentStreak;
        userProfile.streakBest = streakData.longestStreak;
        userProfile.badgesUnlockedCount = achievementResult.updatedUnlockedList.length;
        window.EcoStorage.saveUserProfile(userProfile);

        // Record Central Activity Events for Phase 5 Learning Analytics
        if (window.EcoStorage && typeof window.EcoStorage.recordActivity === 'function') {
            const categoryNames = {
                climate: 'Climate Change Fundamentals',
                waste: 'Waste Management & Recycling',
                biodiversity: 'Biodiversity & Ecosystems',
                energy: 'Renewable Energy Systems'
            };
            const catName = categoryNames[quizResult.categoryId] || 'Environmental Quiz';
            
            // 1. Quiz completion activity
            window.EcoStorage.recordActivity('quiz_completed', {
                entityId: transactionId,
                category: quizResult.categoryId,
                title: `Quiz Completed: ${catName}`,
                description: `Scored ${score}/100 (${Number(quizResult.correctCount) || 0}/${Number(quizResult.totalQuestions) || 10} questions correct)`,
                xpEarned: score
            });

            // 2. Level up activity (if leveled up)
            if (xpResult.levelUp && xpResult.newLevel) {
                window.EcoStorage.recordActivity('level_up', {
                    levelNumber: xpResult.newLevel.levelNumber,
                    title: `Reached Level ${xpResult.newLevel.levelNumber}: ${xpResult.newLevel.levelName}`,
                    description: `Advanced to Tier ${xpResult.newLevel.levelNumber} environmental steward status`,
                    xpEarned: 0
                });
            }

            // 3. New achievements activities
            if (Array.isArray(achievementResult.newlyUnlocked)) {
                achievementResult.newlyUnlocked.forEach(badge => {
                    window.EcoStorage.recordActivity('achievement_unlocked', {
                        badgeId: badge.id,
                        title: `Achievement Unlocked: ${badge.title}`,
                        description: badge.description,
                        xpEarned: 0
                    });
                });
            }
        }

        return {
            transactionId: transactionId,
            awardedXP: score,
            totalXP: tempProgress.totalXP,
            levelUp: xpResult.levelUp,
            newLevel: xpResult.newLevel,
            newAchievements: achievementResult.newlyUnlocked,
            streak: streakData,
            progress: tempProgress
        };
    }
};

window.EcoGamification = EcoGamification;

