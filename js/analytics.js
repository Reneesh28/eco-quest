/**
 * EcoQuest - Learning Analytics Module (Phase 5)
 * Pure Vanilla JavaScript module for calculating learning metrics, category performance,
 * weekly activity distribution, and activity timelines.
 */

(function(window) {
    'use strict';

    const CATEGORY_DEFINITIONS = [
        {
            id: 'climate',
            name: 'Climate Change',
            fullName: 'Climate Change Fundamentals',
            description: 'Global warming, greenhouse gases, carbon cycles, and mitigation strategies.',
            iconSvg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        },
        {
            id: 'waste',
            name: 'Waste Management',
            fullName: 'Waste Management & Circular Economy',
            description: 'Recycling protocols, plastic pollution reduction, composting, and zero-waste systems.',
            iconSvg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`
        },
        {
            id: 'biodiversity',
            name: 'Biodiversity',
            fullName: 'Biodiversity & Wildlife Conservation',
            description: 'Ecosystem health, species preservation, keystone species, and habitat restoration.',
            iconSvg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10a10 10 0 0 1-10-10C2 6.477 6.477 2 12 2Z"></path><path d="M12 8c2.5 0 4 1.5 4 4 0 3-4 6-4 6s-4-3-4-6c0-2.5 1.5-4 4-4Z"></path><path d="M12 12v6"></path></svg>`
        },
        {
            id: 'energy',
            name: 'Renewable Energy',
            fullName: 'Renewable & Clean Energy Systems',
            description: 'Solar photovoltaics, wind energy, grid storage, and sustainable energy transitions.',
            iconSvg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
        }
    ];

    const EcoAnalytics = {
        CATEGORIES: CATEGORY_DEFINITIONS,

        /**
         * Calculate overall summary statistics from user progress
         * @param {Object} progress - User progress object
         * @returns {Object} Calculated metrics
         */
        getOverallStatistics: function(progress) {
            progress = progress || {};
            const correct = Math.max(0, Number(progress.totalCorrectAnswers) || 0);
            const incorrect = Math.max(0, Number(progress.totalIncorrectAnswers) || 0);
            const totalQuestions = correct + incorrect;
            const accuracy = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

            const totalQuizzes = Math.max(0, Number(progress.totalQuizzesCompleted) || 0);
            const dailyChallenges = Array.isArray(progress.completedDailyChallenges) ? progress.completedDailyChallenges.length : 0;
            const weeklyChallenges = Array.isArray(progress.completedWeeklyChallenges) ? progress.completedWeeklyChallenges.length : 0;
            const totalChallenges = dailyChallenges + weeklyChallenges;

            const badges = Array.isArray(progress.unlockedAchievements) ? progress.unlockedAchievements.length : 0;
            const streak = Math.max(0, Number(progress.currentStreak) || 0);
            const longestStreak = Math.max(0, Number(progress.longestStreak) || 0);
            const totalXP = Math.max(0, Number(progress.totalXP) || 0);

            return {
                totalQuizzes: totalQuizzes,
                totalQuestions: totalQuestions,
                correctAnswers: correct,
                incorrectAnswers: incorrect,
                accuracy: accuracy,
                dailyChallenges: dailyChallenges,
                weeklyChallenges: weeklyChallenges,
                totalChallenges: totalChallenges,
                badgesCount: badges,
                currentStreak: streak,
                longestStreak: longestStreak,
                totalXP: totalXP
            };
        },

        /**
         * Calculate category-by-category performance across all 4 categories
         * Guaranteed not to produce NaN or division-by-zero
         * @param {Object} progress - User progress object
         * @returns {Array<Object>} List of category metrics
         */
        getCategoryPerformance: function(progress) {
            progress = progress || {};
            const quizHistory = Array.isArray(progress.quizHistory) ? progress.quizHistory : [];
            const completedCats = Array.isArray(progress.completedCategories) ? progress.completedCategories : [];

            return CATEGORY_DEFINITIONS.map(cat => {
                // Filter quiz entries matching this category
                const catEntries = quizHistory.filter(entry => entry.categoryId === cat.id);
                const quizzesCompleted = catEntries.length;

                let totalQuestions = 0;
                let correctAnswers = 0;
                let scoreSum = 0;

                if (quizzesCompleted > 0) {
                    catEntries.forEach(entry => {
                        // In Phase 2 quiz history: entry.score is 0-100 (10 pts per question out of 10)
                        const score = Number(entry.score) || 0;
                        scoreSum += score;
                        // Determine questions and correct answers
                        const qCount = Number(entry.totalQuestions) || 10;
                        const cCount = entry.correctCount !== undefined
                            ? Number(entry.correctCount)
                            : Math.round(score / 10);
                        totalQuestions += qCount;
                        correctAnswers += cCount;
                    });
                } else if (completedCats.includes(cat.id)) {
                    // Fallback if completedCategories had it recorded before quizHistory tracking
                    quizzesCompleted = 1;
                    totalQuestions = 10;
                    correctAnswers = 8;
                    scoreSum = 80;
                }

                const accuracy = totalQuestions > 0
                    ? Math.round((correctAnswers / totalQuestions) * 100)
                    : 0;

                // Mastery Status Badge
                let status = 'Not Started';
                let statusClass = 'badge-neutral';
                if (quizzesCompleted > 0) {
                    if (accuracy >= 85) {
                        status = 'Mastered';
                        statusClass = 'badge-mint';
                    } else if (accuracy >= 70) {
                        status = 'Proficient';
                        statusClass = 'badge-mint';
                    } else {
                        status = 'In Progress';
                        statusClass = 'badge-accent';
                    }
                }

                return {
                    id: cat.id,
                    name: cat.name,
                    fullName: cat.fullName,
                    description: cat.description,
                    iconSvg: cat.iconSvg,
                    quizzesCompleted: quizzesCompleted,
                    totalQuestions: totalQuestions,
                    correctAnswers: correctAnswers,
                    accuracy: accuracy,
                    averageScore: quizzesCompleted > 0 ? Math.round(scoreSum / quizzesCompleted) : 0,
                    status: status,
                    statusClass: statusClass
                };
            });
        },

        /**
         * Calculate weekly distribution of learning actions for Monday - Sunday
         * @param {Object} progress - User progress
         * @returns {Array<Object>} 7 day objects with activity count and visual bar percentage
         */
        getWeeklyActivityDistribution: function(progress) {
            progress = progress || {};
            const now = new Date();
            
            // Find current week Monday
            const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday
            const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
            const monday = new Date(now);
            monday.setDate(now.getDate() + diffToMonday);
            monday.setHours(0, 0, 0, 0);

            const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const fullDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            // Gather all completed activity dates
            const activities = Array.isArray(progress.activityHistory) ? progress.activityHistory : [];
            const quizHistory = Array.isArray(progress.quizHistory) ? progress.quizHistory : [];
            const dailyChallenges = Array.isArray(progress.completedDailyChallenges) ? progress.completedDailyChallenges : [];

            const days = [];
            let maxCount = 1; // baseline so we never divide by zero

            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(monday);
                dayDate.setDate(monday.getDate() + i);
                const dateStr = dayDate.toISOString().split('T')[0];

                // Count activities matching this date
                let activityCount = 0;
                let dayXP = 0;

                // 1. Check activityHistory
                activities.forEach(act => {
                    if (act.date && act.date.startsWith(dateStr)) {
                        activityCount++;
                        dayXP += (Number(act.xpEarned) || 0);
                    }
                });

                // 2. Fallback check quiz history if activityHistory didn't capture it
                if (activityCount === 0) {
                    quizHistory.forEach(q => {
                        if (q.completedAt && q.completedAt.startsWith(dateStr)) {
                            activityCount++;
                            dayXP += (Number(q.score) || 0);
                        }
                    });
                    dailyChallenges.forEach(ch => {
                        if (ch.date === dateStr) {
                            activityCount++;
                            dayXP += 20;
                        }
                    });
                }

                if (activityCount > maxCount) {
                    maxCount = activityCount;
                }

                const isToday = (dayDate.toDateString() === now.toDateString());

                days.push({
                    day: dayNames[i],
                    dayFullName: fullDayNames[i],
                    date: dateStr,
                    count: activityCount,
                    xpEarned: dayXP,
                    isToday: isToday
                });
            }

            // Calculate percentage heights (minimum 12% for visual bar baseline)
            return days.map(d => {
                const pct = d.count > 0 ? Math.max(25, Math.round((d.count / maxCount) * 100)) : 10;
                return {
                    ...d,
                    barPercentage: pct
                };
            });
        },

        /**
         * Get recent activities sorted chronologically descending
         * @param {Object} progress - User progress
         * @param {number} limit - Maximum activities to return
         * @returns {Array<Object>} List of recent activities
         */
        getRecentActivities: function(progress, limit = 10) {
            progress = progress || {};
            const list = Array.isArray(progress.activityHistory) ? [...progress.activityHistory] : [];
            
            // Sort by date descending
            list.sort((a, b) => {
                const dateA = new Date(a.date || 0).getTime();
                const dateB = new Date(b.date || 0).getTime();
                return dateB - dateA;
            });

            return list.slice(0, limit);
        },

        /**
         * Format ISO date string into readable format (e.g., 'Oct 30, 2026')
         * @param {string} isoString
         * @returns {string} Formatted date
         */
        formatDate: function(isoString) {
            if (!isoString) return 'Recent';
            try {
                const d = new Date(isoString);
                if (isNaN(d.getTime())) return isoString;
                return d.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            } catch (e) {
                return isoString;
            }
        },

        /**
         * Format ISO date string into readable relative or time format
         * @param {string} isoString
         * @returns {string} Formatted date with time
         */
        formatDateTime: function(isoString) {
            if (!isoString) return 'Just now';
            try {
                const d = new Date(isoString);
                if (isNaN(d.getTime())) return isoString;
                return d.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                });
            } catch (e) {
                return isoString;
            }
        }
    };

    window.EcoAnalytics = EcoAnalytics;

})(typeof window !== 'undefined' ? window : this);

