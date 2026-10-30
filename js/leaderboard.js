/**
 * EcoQuest - Leaderboard Controller (Phase 4)
 * Manages player rankings, XP sorting, weekly/total filters, and user rank highlighting
 */

const EcoLeaderboard = {
    currentFilter: 'total', // 'total', 'weekly', 'all'

    /**
     * Get integrated player records including benchmark sample players and the active user
     */
    getAllPlayers: function() {
        const benchmarks = (window.EcoChallengeData && Array.isArray(window.EcoChallengeData.benchmarkPlayers))
            ? window.EcoChallengeData.benchmarkPlayers
            : [];

        const progress = window.EcoStorage ? window.EcoStorage.getUserProgress() : {};
        const profile = window.EcoStorage ? window.EcoStorage.getUserProfile() : {};

        const weekKey = window.EcoChallenges ? window.EcoChallenges.getCurrentWeekKey() : '2026-W44';
        const userWeeklyXP = (progress.weeklyXPHistory && progress.weeklyXPHistory[weekKey]) ? progress.weeklyXPHistory[weekKey] : 160;

        const totalXP = progress.totalXP !== undefined ? progress.totalXP : 1250;
        const levelNum = progress.currentLevel || 5;
        const levelName = progress.currentLevelName || 'Earth Protector';

        const currentUser = {
            id: 'current-user-alex',
            name: profile.name || 'Alex Morgan',
            initials: profile.initials || 'AM',
            level: levelNum,
            levelName: levelName,
            totalXP: totalXP,
            weeklyXP: userWeeklyXP,
            isCurrentUser: true,
            isDemo: false
        };

        return [currentUser, ...benchmarks];
    },

    /**
     * Sort player list with consistent tie-breaking
     */
    getSortedPlayers: function(filterType = 'total') {
        const players = this.getAllPlayers();

        return players.sort((a, b) => {
            const xpA = filterType === 'weekly' ? a.weeklyXP : a.totalXP;
            const xpB = filterType === 'weekly' ? b.weeklyXP : b.totalXP;

            if (xpB !== xpA) {
                return xpB - xpA; // Descending XP
            }
            // Tie-break alphabetically by name
            return a.name.localeCompare(b.name);
        });
    },

    /**
     * Get current user's rank information
     */
    getCurrentUserRankInfo: function(sortedPlayers, filterType = 'total') {
        const userIndex = sortedPlayers.findIndex(p => p.isCurrentUser);
        if (userIndex === -1) return null;

        const user = sortedPlayers[userIndex];
        const rank = userIndex + 1;
        const totalPlayers = sortedPlayers.length;

        // Compare with player ahead
        let xpToSurpass = 0;
        let aheadPlayer = null;
        if (userIndex > 0) {
            aheadPlayer = sortedPlayers[userIndex - 1];
            const targetXP = filterType === 'weekly' ? aheadPlayer.weeklyXP : aheadPlayer.totalXP;
            const currentXP = filterType === 'weekly' ? user.weeklyXP : user.totalXP;
            xpToSurpass = Math.max(1, (targetXP - currentXP) + 1);
        }

        return {
            rank: rank,
            totalPlayers: totalPlayers,
            user: user,
            aheadPlayer: aheadPlayer,
            xpToSurpass: xpToSurpass,
            isFirst: rank === 1
        };
    },

    /**
     * Render the Leaderboard Page
     */
    initLeaderboardPage: function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        const weekRange = window.EcoChallenges ? window.EcoChallenges.getWeekDateRange() : 'Current Week';

        mainContent.innerHTML = `
            <div class="leaderboard-page-container">
                
                <!-- Page Intro Banner -->
                <section class="leaderboard-intro-card">
                    <div class="leaderboard-intro-header">
                        <h2>Community Eco Rankings</h2>
                        <p>Track learning milestones and compare your environmental XP progress against peer learners.</p>
                    </div>

                    <!-- Transparency Notice -->
                    <div class="leaderboard-notice-box" role="note">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <span>
                            <strong>Local Standings:</strong> This frontend-only educational platform displays local benchmarks and demonstration peer scores. Live multi-device cloud synchronization will be activated in future backend phases.
                        </span>
                    </div>

                    <!-- My Ranking Highlight Bar -->
                    <div id="myRankingHighlightBox" class="my-ranking-card"></div>
                </section>

                <!-- Filter Controls -->
                <div class="leaderboard-toolbar">
                    <nav class="leaderboard-filter-tabs" aria-label="Leaderboard Filters">
                        <button type="button" class="leaderboard-tab-btn active" data-filter="total">
                            <span>Total Cumulative XP</span>
                        </button>
                        <button type="button" class="leaderboard-tab-btn" data-filter="weekly">
                            <span>Weekly XP (${weekRange})</span>
                        </button>
                        <button type="button" class="leaderboard-tab-btn" data-filter="all">
                            <span>All Available Participants</span>
                        </button>
                    </nav>
                </div>

                <!-- Leaderboard Table Container -->
                <section class="leaderboard-table-card">
                    <div class="table-responsive-wrapper">
                        <table class="eco-table leaderboard-table" aria-label="Player Rankings">
                            <thead>
                                <tr>
                                    <th style="width: 70px; text-align: center;">Rank</th>
                                    <th>Participant</th>
                                    <th>Level</th>
                                    <th style="text-align: right;" id="scoreColumnHeader">Cumulative XP</th>
                                    <th style="width: 140px; text-align: center;">Status</th>
                                </tr>
                            </thead>
                            <tbody id="leaderboardTableBody">
                                <!-- Dynamic rows -->
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        `;

        this.renderTableContent(this.currentFilter);

        // Bind filter tabs
        const tabBtns = document.querySelectorAll('.leaderboard-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                this.currentFilter = filter;
                this.renderTableContent(filter);
            });
        });
    },

    /**
     * Render Table rows and user ranking highlight
     */
    renderTableContent: function(filterType) {
        const sorted = this.getSortedPlayers(filterType);
        const rankInfo = this.getCurrentUserRankInfo(sorted, filterType);

        // Update score column header
        const colHeader = document.getElementById('scoreColumnHeader');
        if (colHeader) {
            colHeader.textContent = filterType === 'weekly' ? 'Weekly XP' : 'Total XP';
        }

        // Render My Ranking card
        const myRankBox = document.getElementById('myRankingHighlightBox');
        if (myRankBox && rankInfo) {
            const user = rankInfo.user;
            const xpDisplay = filterType === 'weekly' ? `${user.weeklyXP} Weekly XP` : `${user.totalXP.toLocaleString()} Total XP`;

            myRankBox.innerHTML = `
                <div class="my-rank-left">
                    <div class="rank-badge-large">#${rankInfo.rank}</div>
                    <div class="my-rank-info">
                        <div class="my-rank-name-row">
                            <span class="my-rank-name">${user.name}</span>
                            <span class="badge badge-mint">You</span>
                            <span class="badge badge-neutral">Level ${user.level}: ${user.levelName}</span>
                        </div>
                        <span class="my-rank-subtext">Currently ranked <strong>#${rankInfo.rank}</strong> of <strong>${rankInfo.totalPlayers}</strong> active local learners.</span>
                    </div>
                </div>
                <div class="my-rank-right">
                    <div class="my-rank-stat">
                        <span class="stat-num">${xpDisplay}</span>
                        <span class="stat-sub">
                            ${rankInfo.isFirst 
                                ? 'Leading the community leaderboard!' 
                                : `${rankInfo.xpToSurpass} XP needed to pass #${rankInfo.rank - 1} ${rankInfo.aheadPlayer.name}`}
                        </span>
                    </div>
                </div>
            `;
        }

        // Render Table Body
        const tbody = document.getElementById('leaderboardTableBody');
        if (!tbody) return;

        let rowsHtml = '';
        sorted.forEach((player, idx) => {
            const rank = idx + 1;
            const isMe = Boolean(player.isCurrentUser);
            const score = filterType === 'weekly' ? player.weeklyXP : player.totalXP;

            let rankBadgeClass = 'rank-number';
            if (rank === 1) rankBadgeClass = 'rank-badge rank-gold';
            else if (rank === 2) rankBadgeClass = 'rank-badge rank-silver';
            else if (rank === 3) rankBadgeClass = 'rank-badge rank-bronze';

            rowsHtml += `
                <tr class="${isMe ? 'current-user-row' : ''}">
                    <td style="text-align: center;">
                        <span class="${rankBadgeClass}">${rank}</span>
                    </td>
                    <td>
                        <div class="player-cell">
                            <div class="player-avatar ${isMe ? 'user-avatar-active' : ''}">${player.initials}</div>
                            <div class="player-names">
                                <span class="player-name">${player.name}</span>
                                ${isMe ? '<span class="badge badge-mint badge-xs">You</span>' : ''}
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge badge-neutral">Lvl ${player.level} &bull; ${player.levelName}</span>
                    </td>
                    <td style="text-align: right; font-weight: 700; color: ${isMe ? 'var(--primary)' : 'var(--text)'};">
                        ${Number(score).toLocaleString()} XP
                    </td>
                    <td style="text-align: center;">
                        ${player.isDemo 
                            ? '<span class="badge badge-neutral text-xs">Benchmark</span>' 
                            : '<span class="badge badge-success text-xs">Active Student</span>'}
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = rowsHtml;
    }
};

window.EcoLeaderboard = EcoLeaderboard;

