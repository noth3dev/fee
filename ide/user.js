document.addEventListener('DOMContentLoaded', () => {
    const userName = "Notth3dev"; 
    const score = 180000; 
    const highestScore = 54000; 
    const playerLevel = 7;
    const gamesPlayed = 1972;
    const winRate = 66.8;
    const highestStreak = 15;
    const userNumber = 956;

    // Define the tier system
    const tierMap = {
        bronze: { threshold: 0, levels: [1000, 2000, 3000, 4000, 5000], color: 'var(--tier_bronze)' },       
        silver: { threshold: 15000, levels: [1500, 2500, 3500, 4500, 5500], color: 'var(--tier_silver)' },   
        gold: { threshold: 32500, levels: [2000, 3000, 4000, 5000, 6000], color: 'var(--tier_gold)' },     
        platinum: { threshold: 52500, levels: [2500, 3500, 4500, 5500, 6500], color: 'var(--tier_platinum)' }, 
        diamond: { threshold: 77500, levels: [3000, 4000, 5000, 6000, 7000], color: 'var(--tier_diamond)' },  
        emerald: { threshold: 107500, levels: [3500, 4500, 5500, 6500, 7500], color: 'var(--tier_emerald)' }, 
        conqueror: { threshold: 147500, levels: [4000, 5000, 6000, 7000, 8000], color: 'var(--tier_conqueror)' }, 
        lumen: { threshold: 177500, levels: [4500, 5500, 6500, 7500, 8500], color: 'var(--tier_lumen)' },   
    };

    function calculateRank(score) {
        let tierName = '';
        let tierLevel = '';
        let tierColor = '';
        let progressToNextLevel = 0;
        let nextLevelThreshold = 0;

        for (const [tier, data] of Object.entries(tierMap)) {
            if (score >= data.threshold) {
                tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
                tierColor = data.color;

                let tierScore = score - data.threshold;
                for (let i = 0; i < data.levels.length; i++) {
                    if (tierScore < data.levels[i]) {
                        tierLevel = i + 1;
                        progressToNextLevel = tierScore;
                        nextLevelThreshold = data.levels[i];
                        break;
                    }
                    tierScore -= data.levels[i];
                }

                // Convert the level to Roman numeral
                switch (tierLevel) {
                    case 1: tierLevel = 'I'; break;
                    case 2: tierLevel = 'II'; break;
                    case 3: tierLevel = 'III'; break;
                    case 4: tierLevel = 'IV'; break;
                    case 5: tierLevel = 'V'; break;
                }
            }
        }

        return { tierName, tierLevel, tierColor, progressToNextLevel, nextLevelThreshold };
    }

    function setProgressBarWidth(currentLevelElement, levelMaxElement, progressToNextLevel, nextLevelThreshold, tierColor) {
        const progressBarFillElement = document.querySelector('.progress-bar-fill');
        if (progressBarFillElement) {
            if (!isNaN(progressToNextLevel) && !isNaN(nextLevelThreshold) && nextLevelThreshold > 0) {
                const progressPercentage = (progressToNextLevel / nextLevelThreshold) * 100;
                progressBarFillElement.style.width = `${progressPercentage}%`;
                progressBarFillElement.style.backgroundColor = tierColor; // Set the color for the progress bar
            }
        }
    }

    const currentRank = calculateRank(score);
    const highestRankData = calculateRank(highestScore);

    // Update highest rank dynamically
    const highestRankElement = document.getElementById('highest-rank');
    if (highestRankElement) {
        highestRankElement.textContent = `${highestRankData.tierName} ${highestRankData.tierLevel}`;
        highestRankElement.style.color = highestRankData.tierColor;  // Set the color for the rank
    }

    // Update total games played
    const totalGamesElement = document.getElementById('total-gamesdp');
    if (totalGamesElement) {
        totalGamesElement.textContent = gamesPlayed;
    }

    // Update win rate
    const winRateElement = document.getElementById('win-rate');
    if (winRateElement) {
        winRateElement.textContent = winRate;
    }

    // Update highest streak
    const highestStreakElement = document.getElementById('highest-streak');
    if (highestStreakElement) {
        highestStreakElement.textContent = highestStreak;
    }

    // Update user number
    const userNumberElement = document.getElementById('user-number');
    if (userNumberElement) {
        userNumberElement.textContent = `#${userNumber}`;
    }

    // Update user name
    const usernameElements = document.querySelectorAll('.username');
    usernameElements.forEach(element => {
        element.textContent = userName;
    });

    // Update user level with leading zero if less than 10
    const userlvElements = document.querySelectorAll('.userlv');
    if (userlvElements.length > 0) {
        const formattedLevel = playerLevel < 10 ? `0${playerLevel}` : `${playerLevel}`;
        userlvElements.forEach((element) => {
            element.textContent = formattedLevel;
        });
    }

    // Update the progress bar
    const currentLevelElement = document.getElementById('current-level');
    const levelMaxElement = document.getElementById('level-max');
    if (currentLevelElement && levelMaxElement) {
        currentLevelElement.textContent = currentRank.progressToNextLevel;
        levelMaxElement.textContent = currentRank.nextLevelThreshold;
        setProgressBarWidth(currentLevelElement, levelMaxElement, currentRank.progressToNextLevel, currentRank.nextLevelThreshold, currentRank.tierColor);
    }

    // Update tier color in CSS
    const root = document.documentElement;
    if (currentRank.tierColor) {
        root.style.setProperty('--user_tier', currentRank.tierColor);
    }

    // Update tier name and level in ranked tier element
    const rankedTierElement = document.querySelector('.ranked-tier');
    if (rankedTierElement) {
        rankedTierElement.textContent = `${currentRank.tierName} ${currentRank.tierLevel}`;
        rankedTierElement.style.color = currentRank.tierColor;  // Set the color for the ranked tier element
    }

    // Update the highlight tier elements
    const highlightTierElements = document.querySelectorAll('.highlight-tier');
    if (highlightTierElements.length > 0) {
        highlightTierElements.forEach(element => {
            element.innerHTML = `<sup>${currentRank.tierName.charAt(0)}${currentRank.tierLevel}</sup>`;
            element.style.color = currentRank.tierColor;  // Set the color for the highlight tier elements
        });
    }

    // Update the league level in the progress title
    const progressTitleElement = document.querySelector('.progress-title');
    if (progressTitleElement) {
        const leagueThresholds = [
            0, 16500, 33000, 49500, 66000, 82500, 99000, 115500, 
            132000, 148500, 165000, 181500, 198000, 214500, 231000, 247500
        ];

        let leagueLevel = 1; // Default value in case none match
        for (let i = 0; i < leagueThresholds.length - 1; i++) {
            if (score >= leagueThresholds[i] && score < leagueThresholds[i + 1]) {
                leagueLevel = i + 1;
                break;
            }
        }
        progressTitleElement.textContent = `League ${leagueLevel}`;
    }

    const greetingElement = document.querySelector('.Hello');
    const currentHour = new Date().getHours();
    let greetingText;

    // Define the greetings for different time intervals
    const greetings = {
        lateNight: [
            "Still up? Let's push through!",
            "The night is young, let's keep going!",
            "Burning the midnight oil?"
        ],
        earlyMorning: [
            "Quiet hours, focus time!",
            "Need a lo-fi music?",
            "The early bird catches the worm!"
        ],
        morning: [
            "Early riser, eh? Good morning!",
            "Morning hustle! Let's go!",
            "Good morning! Ready to code?"
        ],
        lateMorning: [
            "Keep up the momentum!",
            "The morning's almost done, stay strong!",
            "Great start to the day!"
        ],
        lunchtime: [
            "Lunchtime! Take a break!",
            "Refuel and recharge!",
            "Time for a quick bite?"
        ],
        afternoon: [
            "Post-lunch productivity boost!",
            "Afternoon grind, stay strong!",
            "Focus time! Let's do this!"
        ],
        evening: [
            "Evening work mode activated!",
            "Winding down? Almost done!",
            "Good evening! Keep the momentum!"
        ],
        lateEvening: [
            "Evening vibes! Keep it up!",
            "It's been a long day, hang in there!",
            "Ready to call it a night?"
        ],
        night: [
            "Good night! Time to rest!",
            "You've earned some rest. Good night!",
            "Time to unwind and relax!"
        ]
    };

    // Determine which set of greetings to use based on the current hour
    if (currentHour >= 0 && currentHour < 4) {
        greetingText = greetings.lateNight[Math.floor(Math.random() * greetings.lateNight.length)];
    } else if (currentHour >= 4 && currentHour < 8) {
        greetingText = greetings.earlyMorning[Math.floor(Math.random() * greetings.earlyMorning.length)];
    } else if (currentHour >= 8 && currentHour < 12) {
        greetingText = greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
    } else if (currentHour >= 12 && currentHour < 14) {
        greetingText = greetings.lunchtime[Math.floor(Math.random() * greetings.lunchtime.length)];
    } else if (currentHour >= 14 && currentHour < 18) {
        greetingText = greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
    } else if (currentHour >= 18 && currentHour < 20) {
        greetingText = greetings.evening[Math.floor(Math.random() * greetings.evening.length)];
    } else if (currentHour >= 20 && currentHour < 22) {
        greetingText = greetings.lateEvening[Math.floor(Math.random() * greetings.lateEvening.length)];
    } else {
        greetingText = greetings.night[Math.floor(Math.random() * greetings.night.length)];
    }

    // Set the greeting text
    if (greetingElement) {
        greetingElement.textContent = greetingText;
    }
});

function setProgressBarWidth(currentLevelElement, levelMaxElement, tierColor) {
    const progressBarFillElement = document.querySelector('.progress-bar-fill');
    if (progressBarFillElement && currentLevelElement && levelMaxElement) {
        const currentLevel = parseInt(currentLevelElement.textContent, 10);
        const levelMax = parseInt(levelMaxElement.textContent, 10);
        if (!isNaN(currentLevel) && !isNaN(levelMax) && levelMax > 0) {
            const progressPercentage = (currentLevel / levelMax) * 100;
            progressBarFillElement.style.width = `${progressPercentage}%`;
            progressBarFillElement.style.backgroundColor = tierColor; // Set the color for the progress bar
        }
    }
}

document.querySelector('.copyinfo').addEventListener('click', () => {
    // Get user information
    const username = document.querySelector('.username').textContent;
    const rank = document.querySelector('.rank').textContent;
    const gamesPlayed = document.querySelector('.games-played').textContent;
    const winRate = document.querySelector('.win-rate').textContent;
    const highestStreak = document.querySelector('.highest-streak').textContent;

    // Format the information
    const formattedInfo = `
        User Info:
        - Username: ${username}
        - ${rank}
        - ${gamesPlayed}
        - ${winRate}
        - ${highestStreak}
    `;

    // Copy the formatted information to the clipboard
    navigator.clipboard.writeText(formattedInfo).then(() => {
        alert('User information copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
