

const users = [
{ userName: "Notth3dev", score: 220000, rankedscore: 220000, speedruntime: 1, highscore: 22000 },
{ userName: "Yesth3dev", score: 202425, rankedscore: 202425, speedruntime: 1400, highscore: 202425 },
{ userName: "Yesimth3dev", score: 175108, rankedscore: 175108, speedruntime: 1300, highscore: 175108 },
{ userName: "Yesimreallyth3dev", score: 144018, rankedscore: 144018, speedruntime: 1200, highscore: 144018 },
{ userName: "imreallyth3developer", score: 82011, rankedscore: 82011, speedruntime: 1100, highscore: 82011 },
{ userName: "almostth3dev", score: 11005, rankedscore: 11005, speedruntime: 1000, highscore: 11005 },
{ userName: "devMaster", score: 200000, rankedscore: 200000, speedruntime: 1350, highscore: 200000 },
{ userName: "devGuru", score: 185000, rankedscore: 185000, speedruntime: 1250, highscore: 185000 },
{ userName: "codeNinja", score: 160000, rankedscore: 160000, speedruntime: 1450, highscore: 160000 },
{ userName: "bugSquasher", score: 150000, rankedscore: 150000, speedruntime: 1550, highscore: 150000 },
{ userName: "dataDiver", score: 130000, rankedscore: 130000, speedruntime: 1650, highscore: 130000 },
{ userName: "syntaxSlayer", score: 120000, rankedscore: 120000, speedruntime: 1750, highscore: 120000 },
{ userName: "debugDuke", score: 100000, rankedscore: 100000, speedruntime: 1850, highscore: 100000 },
{ userName: "compilerQueen", score: 95000, rankedscore: 95000, speedruntime: 1950, highscore: 95000 },
{ userName: "functionFreak", score: 85000, rankedscore: 85000, speedruntime: 2050, highscore: 85000 },
{ userName: "variableVirtuoso", score: 80000, rankedscore: 80000, speedruntime: 2150, highscore: 80000 },
{ userName: "loopLord", score: 75000, rankedscore: 75000, speedruntime: 2250, highscore: 75000 },
{ userName: "exceptionExpert", score: 70000, rankedscore: 70000, speedruntime: 2350, highscore: 70000 },
{ userName: "stackOverflow", score: 65000, rankedscore: 65000, speedruntime: 2450, highscore: 65000 },
{ userName: "puzzleSolver", score: 60000, rankedscore: 60000, speedruntime: 2550, highscore: 60000 },
{ userName: "interfaceIntellect", score: 55000, rankedscore: 55000, speedruntime: 2650, highscore: 55000 },
{ userName: "memoryMogul", score: 50000, rankedscore: 50000, speedruntime: 2750, highscore: 50000 },
{ userName: "cacheCommander", score: 45000, rankedscore: 45000, speedruntime: 2850, highscore: 45000 },
{ userName: "runtimeRuler", score: 40000, rankedscore: 40000, speedruntime: 2950, highscore: 40000 },
{ userName: "threadTitan", score: 35000, rankedscore: 35000, speedruntime: 3050, highscore: 35000 },
{ userName: "garbageCollector", score: 30000, rankedscore: 30000, speedruntime: 3150, highscore: 30000 },
{ userName: "recursionRanger", score: 25000, rankedscore: 25000, speedruntime: 3250, highscore: 25000 },
{ userName: "algorithmAce", score: 24000, rankedscore: 24000, speedruntime: 3350, highscore: 24000 },
{ userName: "bitwiseBoss", score: 23000, rankedscore: 23000, speedruntime: 3450, highscore: 23000 },
{ userName: "refactorRuler", score: 22000, rankedscore: 22000, speedruntime: 3550, highscore: 22000 },
{ userName: "performancePrince", score: 21000, rankedscore: 21000, speedruntime: 3650, highscore: 21000 },
{ userName: "objectOriented", score: 20000, rankedscore: 20000, speedruntime: 3750, highscore: 20000 },
{ userName: "methodManiac", score: 19000, rankedscore: 19000, speedruntime: 3850, highscore: 19000 },
{ userName: "classClown", score: 18000, rankedscore: 18000, speedruntime: 950, highscore: 18000 },
{ userName: "packagePioneer", score: 17000, rankedscore: 17000, speedruntime: 4050, highscore: 17000 },
{ userName: "threadMaster", score: 16000, rankedscore: 16000, speedruntime: 4150, highscore: 16000 },
{ userName: "nullPointer", score: 15000, rankedscore: 15000, speedruntime: 4250, highscore: 15000 },
{ userName: "codeCaptain", score: 14000, rankedscore: 14000, speedruntime: 4350, highscore: 14000 },
{ userName: "arrayArchitect", score: 13000, rankedscore: 13000, speedruntime: 4450, highscore: 13000 },
{ userName: "scriptSultan", score: 12000, rankedscore: 12000, speedruntime: 4550, highscore: 12000 },
{ userName: "pointerPirate", score: 11000, rankedscore: 11000, speedruntime: 4650, highscore: 11000 },
{ userName: "dynamicDon", score: 10000, rankedscore: 10000, speedruntime: 4750, highscore: 10000 },
{ userName: "loopLover", score: 9000, rankedscore: 9000, speedruntime: 50, highscore: 9000 },
{ userName: "conditionConqueror", score: 8000, rankedscore: 8000, speedruntime: 4950, highscore: 8000 },
{ userName: "syntaxSensei", score: 7000, rankedscore: 7000, speedruntime: 5050, highscore: 7000 },
{ userName: "debugDominator", score: 6000, rankedscore: 6000, speedruntime: 5150, highscore: 6000 },
{ userName: "bugHunter", score: 5000, rankedscore: 5000, speedruntime: 5250, highscore: 5000 },
{ userName: "compilerKing", score: 4000, rankedscore: 4000, speedruntime: 5350, highscore: 4000 },
{ userName: "binaryBishop", score: 3000, rankedscore: 3000, speedruntime: 5450, highscore: 3000 },
{ userName: "hexHero", score: 2000, rankedscore: 2000, speedruntime: 5550, highscore: 2000 }
];

const tierMap = {
    bronze: { threshold: 0, levels: [1000, 2000, 3000, 4000, 5000], color: 'var(--tier_bronze)' },
    silver: { threshold: 15000, levels: [1500, 2500, 3500, 4500, 5500], color: 'var(--tier_silver)' },
    gold: { threshold: 31500, levels: [2000, 3000, 4000, 5000, 6000], color: 'var(--tier_gold)' },
    platinum: { threshold: 51500, levels: [2500, 3500, 4500, 5500, 6500], color: 'var(--tier_platinum)' },
    diamond: { threshold: 74000, levels: [3000, 4000, 5000, 6000, 7000], color: 'var(--tier_diamond)' },
    emerald: { threshold: 99000, levels: [3500, 4500, 5500, 6500, 7500], color: 'var(--tier_emerald)' },
    conqueror: { threshold: 126000, levels: [4000, 5000, 6000, 7000, 8000], color: 'var(--tier_conqueror)' },
    lumen: { threshold: 156000, levels: [4500, 5500, 6500, 7500, 85000, 10000000], color: 'var(--tier_lumen)' },
};

// Define speedrun time colors
const speedrunColorMap = [
    { threshold: 600, color: '#ff0000' }, // Red
    { threshold: 1200, color: '#ff7f00' }, // Orange
    { threshold: 1800, color: '#ffff00' }, // Yellow
    { threshold: 2400, color: '#7fff00' }, // Green
    { threshold: 3000, color: '#00ffff' }, // Cyan
    { threshold: 3600, color: '#0000ff' }, // Blue
    { threshold: 4200, color: '#8a2be2' }, // Violet
    { threshold: 10000, color: '#ffffff'}
];

function calculateRank(score) {
    let highestRank = '';
    let tierColor = '';

    // Determine the highest rank based on score
    for (const [tier, data] of Object.entries(tierMap)) {
        if (score >= data.threshold) {
            let tierScore = score - data.threshold;
            for (let i = 0; i < data.levels.length; i++) {
                if (tierScore < data.levels[i]) {
                    highestRank = `${tier.charAt(0).toUpperCase() + tier.slice(1)} ${['I', 'II', 'III', 'IV', 'V'][i]}`;
                    tierColor = data.color;
                    break;
                }
                tierScore -= data.levels[i];
            }
        }
    }

    return { highestRank, tierColor };
}
function getSpeedrunColor(time) {
    for (const { threshold, color } of speedrunColorMap) {
        if (time <= threshold) {
            return color;
        }
    }
    return '#000000'; // Default color if no threshold is met
}

function renderTop5(users, category) {
    const top5Container = document.getElementById('top5-container');
    top5Container.innerHTML = '';

    users.slice(0, 5).forEach((user, index) => {
        let content = '';
        if (category === 'speedruntime') {
            content = `
                <div class="top ${index === 0 ? 'first-place' : ''}">
                    <div class="rank" style="color: ${getSpeedrunColor(user.speedruntime)}">#${index + 1}</div>
                    <div class="score">${user.speedruntime} seconds</div>
                    <div class="handle">${user.userName}</div>
                </div>
            `;
        } else if (category === 'alltime') {
            content = `
                <div class="top ${index === 0 ? 'first-place' : ''}">
                    <div class="rank">#${index + 1}</div>
                    <div class="score">${user.highscore}</div>
                    <div class="handle">${user.userName}</div>
                </div>
            `;
        } else {
            const { highestRank, tierColor } = calculateRank(user.rankedscore);
            content = `
                <div class="top ${index === 0 ? 'first-place' : ''}">
                    <div class="rank" style="color: ${tierColor}">#${index + 1}</div>
                    <div class="score">${user.rankedscore}</div>
                    <div class="handle">${user.userName}</div>
                    <div class="level" style="color: ${tierColor}">${highestRank}</div>
                </div>
            `;
        }
        top5Container.innerHTML += content;
    });
}

function renderTable(users, tableBody, page, category) {
    tableBody.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const usersOnPage = users.slice(start, end);

    usersOnPage.forEach((user, index) => {
        let rowHTML = '';
        if (category === 'speedruntime') {
            rowHTML = `
                <tr>
                    <td>${start + index + 1}</td>
                    <td>${user.userName}</td>
                    <td style="color: ${getSpeedrunColor(user.speedruntime)}">${user.speedruntime} seconds</td>
                </tr>
            `;
        } else if (category === 'alltime') {
            rowHTML = `
                <tr>
                    <td>${start + index + 1}</td>
                    <td>${user.userName}</td>
                    <td>${user.highscore}</td>
                </tr>
            `;
        } else {
            const { highestRank, tierColor } = calculateRank(user.rankedscore);
            rowHTML = `
                <tr>
                    <td>${start + index + 1}</td>
                    <td>${user.userName}</td>
                    <td style="color: ${tierColor}">${highestRank}</td>
                    <td>${user.rankedscore}</td>
                </tr>
            `;
        }
        tableBody.innerHTML += rowHTML;
    });
}

function setupPagination(users, paginationElement, tableBody, category) {
    paginationElement.innerHTML = '';
    const pageCount = Math.ceil(users.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.classList.add('page-link');
        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            renderTable(users, tableBody, i, category);
            document.querySelectorAll('.pagination a').forEach(link => link.classList.remove('active'));
            pageLink.classList.add('active');
        });
        paginationElement.appendChild(pageLink);
    }
    paginationElement.firstChild.classList.add('active');
}

function updateRanking(category) {
    let sortedUsers = [];
    if (category === 'speedruntime') {
        sortedUsers = users.slice().sort((a, b) => a.speedruntime - b.speedruntime);
        const tableBody = document.getElementById('speedrun-table-body');
        const paginationElement = document.getElementById('speedrun-pagination');
        renderTop5(sortedUsers, category);
        renderTable(sortedUsers, tableBody, 1, category);
        setupPagination(sortedUsers, paginationElement, tableBody, category);
    } else if (category === 'alltime') {
        sortedUsers = users.slice().sort((a, b) => b.highscore - a.highscore);
        const tableBody = document.getElementById('alltime-table-body');
        const paginationElement = document.getElementById('alltime-pagination');
        renderTop5(sortedUsers, category);
        renderTable(sortedUsers, tableBody, 1, category);
        setupPagination(sortedUsers, paginationElement, tableBody, category);
    } else {
        sortedUsers = users.slice().sort((a, b) => b.rankedscore - a.rankedscore);
        const tableBody = document.getElementById('default-table-body');
        const paginationElement = document.getElementById('default-pagination');
        renderTop5(sortedUsers, category);
        renderTable(sortedUsers, tableBody, 1, category);
        setupPagination(sortedUsers, paginationElement, tableBody, category);
    }
}

function initialize() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            document.querySelector(`.tab-content[data-category="${category}"]`).classList.add('active');

            updateRanking(category);
        });
    });

    updateRanking('speedruntime'); // Initial load
}

const itemsPerPage = 30;
initialize();