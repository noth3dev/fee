// Example data (this could be fetched from an API or another source)
const userStats = {
    totalWins: 1500,
    totalLosses: 700,
    mostPlayedGame: "League of Legends",
    averageMatchDuration: "15 min"
};

// Function to update the stats dynamically
function updateDetailedStats(stats) {
    document.getElementById('total-wins').textContent = stats.totalWins;
    document.getElementById('total-losses').textContent = stats.totalLosses;
    document.getElementById('most-played-game').textContent = stats.mostPlayedGame;
    document.getElementById('average-match-duration').textContent = stats.averageMatchDuration;
}

// Call the function to update stats on page load
updateDetailedStats(userStats);

        // Example game records data with match start times and round results
        const gameRecords = [
            { 
                type: 'Ranked', 
                opponent: 'Player123', 
                startTime: '2024-08-30T14:30:00Z',  // Example ISO 8601 time format
                result: 'Win',
                details: 'Score: 10-5 | Map: Dust II | Duration: 30 min',
                rounds: ['W', 'L', 'W', 'W', 'L', 'W', 'W', 'W', 'L', 'W']  // Example round results
            },
            { 
                type: 'Casual', 
                opponent: 'Player456', 
                startTime: '2024-08-29T12:00:00Z', 
                result: 'Loss',
                details: 'Score: 7-10 | Map: Mirage | Duration: 25 min',
                rounds: ['L', 'W', 'L', 'L', 'W', 'L', 'W', 'L', 'L', 'L']
            },
            { 
                type: 'Tournament', 
                opponent: 'Player789', 
                startTime: '2024-08-27T16:45:00Z', 
                result: 'Win',
                details: 'Score: 15-8 | Map: Inferno | Duration: 35 min',
                rounds: ['W', 'W', 'L', 'W', 'W', 'L', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'L', 'W', 'W', 'L', 'W', 'W']
            },
            // Add more records as needed
        ];

        // Example language usage data
        const languageUsage = {
            "C": 60,
            "PY": 30,
            "JAVA": 10
        };

        // Example experience gained over time
        const experienceData = [
            { date: '2024-08-20', xp: 100 },
            { date: '2024-08-21', xp: 150 },
            { date: '2024-08-22', xp: 200 },
            { date: '2024-08-23', xp: 250 },
            { date: '2024-08-24', xp: 300 },
            { date: '2024-08-25', xp: 350 },
            { date: '2024-08-26', xp: 400 }
        ];

        // Function to calculate the time difference between now and the match start time
        function timeAgo(startTime) {
            const now = new Date();
            const start = new Date(startTime);
            const difference = now - start;

            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 0) {
                return `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
            }
        }

        // Function to render the game records
        function renderGameRecords(records) {
            const recordsList = document.getElementById('game-records-list');

            records.forEach(record => {
                const recordElement = document.createElement('div');
                recordElement.className = 'game-record';

                // Calculate how long ago the game was played
                const timeAgoString = timeAgo(record.startTime);

                // Prepare the rounds string (W for win, L for loss)
                const roundsString = record.rounds.join(' ');

                recordElement.innerHTML = `
                    <div class="game-info">
                        <span class="game-type">${record.type} - ${record.result}</span>
                        <span class="opponent">vs ${record.opponent}</span>
                    </div>
                    <div class="game-time">${timeAgoString}</div>
                    <div class="game-details" style="display: none; margin-top: 10px; color: #bbb;">
                        ${record.details}
                        <div class="rounds" style="margin-top: 5px; color: #fff;">Rounds: ${roundsString}</div>
                    </div>
                `;

                // Add click event listener to toggle the details
                recordElement.addEventListener('click', function() {
                    const detailsElement = this.querySelector('.game-details');
                    if (detailsElement.style.display === 'none') {
                        detailsElement.style.display = 'block';
                    } else {
                        detailsElement.style.display = 'none';
                    }
                });

                recordsList.appendChild(recordElement);
            });
        }

        // Call the function to render the records on page load
        renderGameRecords(gameRecords);

        // Function to render the pie chart for language usage
        // Function to render the pie chart for language usage
function renderLanguagesChart(data) {
    const ctx = document.getElementById('languagesChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#FF6384', '#36A2EB', '#9B59B6'],  // Customize colors here
                borderColor: ['#ffffff', '#ffffff', '#ffffff'],  // Optional: add border color
                borderWidth: 2  // Optional: adjust border width
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff'  // Optional: set legend text color
                    }
                },
                title: {
                    display: true,
                    text: 'Most Used Languages',
                    color: '#ffffff'  // Optional: set title text color
                }
            }
        }
    });
}


        // Function to render the line chart for experience gained over time
        function renderExperienceChart(data) {
            const ctx = document.getElementById('experienceChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d.date),
                    datasets: [{
                        label: 'XP Gained',
                        data: data.map(d => d.xp),
                        borderColor: '#ff6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Experience Gained Over Time'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Experience Points'
                            }
                        }
                    }
                }
            });
        }

        // Render charts on page load
        renderLanguagesChart(languageUsage);
        renderExperienceChart(experienceData);
        // Example report history data
const reportHistory = [
    {
        date: '2024-08-25',
        reason: 'Abusive Language',
        status: 'Resolved'
    },
    {
        date: '2024-08-22',
        reason: 'Cheating',
        status: 'Pending'
    },
    {
        date: '2024-08-20',
        reason: 'Spamming',
        status: 'Resolved'
    }
];

// Function to render the report history
function renderReportHistory(reports) {
    const reportList = document.getElementById('report-history-list');

    reports.forEach(report => {
        const reportItem = document.createElement('li');
        reportItem.style.padding = '10px 0';
        reportItem.style.borderBottom = '1px solid #444';

        reportItem.innerHTML = `
            <span style="font-weight: bold;">Date:</span> ${report.date} <br>
            <span style="font-weight: bold;">Reason:</span> ${report.reason} <br>
            <span style="font-weight: bold;">Status:</span> ${report.status}
        `;

        reportList.appendChild(reportItem);
    });
}

// Call the function to render the report history on page load
renderReportHistory(reportHistory);
