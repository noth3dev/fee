let playerCount = 88;
let remainingTime = 31; 

let isInQueue = false; 
let currentGameName = ''; 

function showContent(sectionId, event) {
    let contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        item.classList.remove('active');
        item.style.display = 'none'; 
    });

    let tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    let selectedContent = document.getElementById(sectionId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        setTimeout(() => {
            selectedContent.classList.add('active');
        }, 10);
    }

    let selectedItem = event.target;
    selectedItem.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.querySelector('.tab-item');
    if (firstTab) {
        firstTab.click(); 
    }
    let contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        item.classList.remove('active');
        item.style.display = 'none'; 
    });

    let tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        item.classList.remove('selected');
    });

    let selectedContent = document.getElementById(sectionId);
    selectedContent.style.display = 'block'; 
    setTimeout(() => {
        selectedContent.classList.add('active');
    }, 10);

    let selectedItem = document.querySelector(`[onclick="showContentByGameName('${gameName}')"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');

        const tabContainer = document.querySelector('.tab-container');
        const itemOffsetLeft = selectedItem.offsetLeft;
        const itemWidth = selectedItem.offsetWidth;
        const containerWidth = tabContainer.offsetWidth;

        const scrollPosition = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);

        tabContainer.scroll({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {
        if (event.target.closest('.startbtn')) {

            const button = event.target.closest('.startbtn');
            const gameName = button.getAttribute('data-game');
            console.log(`Button clicked: ${gameName}`);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let gameStartTime = null;  
    let elapsedTimeInterval = null;  
    let currentGame = '';  
    const overlay = document.getElementById('overlay');  

    const gameSectionMap = {
        'Shake Royale': 'snakeRoyale',
        'Speedrun': 'speedrun',
        'Ranked Match': 'rankedMatch',
        'Quick Play': 'quickPlay',
        'Casual Play': 'casualPlay',
        'Custom Match': 'customMatch'
    };

    document.addEventListener('click', function(event) {
        if (event.target.closest('.startbtn')) {
            const button = event.target.closest('.startbtn');
            const gameName = button.getAttribute('data-game');

            if (gameName) {
                if (!isInQueue) {
                    currentGame = gameName;  
                    updateGameStatus(gameName);
                    sendStatusToBackend('join', gameName);
                    isInQueue = true;

                    button.querySelector('.text-container').textContent = 'Leave Queue';

                    gameStartTime = new Date();
                    if (elapsedTimeInterval) {
                        clearInterval(elapsedTimeInterval);  
                    }
                    elapsedTimeInterval = setInterval(() => {
                        updateElapsedTime(gameStartTime);
                    }, 1000);

                    overlay.style.display = 'block';
                } else {

                    leaveQueue(button);
                }
            }
        }
    });

    function updateGameStatus(gameName) {
        const gameStatusElement = document.getElementById('game-status');
        const gameNameElement = document.getElementById('game-name');

        if (gameStatusElement && gameNameElement) {
            gameStatusElement.textContent = 'joined';
            gameNameElement.textContent = `${gameName} (0s)`;
            gameStatusElement.parentElement.style.display = 'inline';  
        }
    }

    function updateElapsedTime(startTime) {
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        const gameNameElement = document.getElementById('game-name');

        if (gameNameElement) {
            gameNameElement.textContent = gameNameElement.textContent.split(' (')[0] + ` (${elapsedSeconds}s)`;
        }
    }

    function leaveQueue(button) {
        clearInterval(elapsedTimeInterval);  
        isInQueue = false;
        currentGame = '';  

        const gameStatusElement = document.getElementById('game-status').parentElement;
        if (gameStatusElement) {
            gameStatusElement.style.display = 'none';
        }

        if (button) {
            button.querySelector('.text-container').textContent = 'SHAKE IT!';
        }

        overlay.style.display = 'none';

        sendStatusToBackend('leave', '');  
    }

    function sendStatusToBackend(action, gameName) {
        fetch('ender dragon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: action,
                game: gameName,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(`Status ${action} sent to backend for ${gameName}:`, data);
        })
        .catch(error => {
            console.error('Error sending status to backend:', error);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const qstartButton = document.querySelector('.qstartbtn');
    const usernameRoyale = document.querySelector('.username-royale');
    let isInQueue = false;

    qstartButton.addEventListener('click', () => {
        if (!isInQueue) {
            usernameRoyale.style.color = 'green';
            qstartButton.querySelector('.text-container').textContent = "Quit Queue";
            isInQueue = true;
        } else {
            usernameRoyale.style.color = 'red';
            qstartButton.querySelector('.text-container').textContent = "SHAKE IT!";
            isInQueue = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    function receiveMatchFoundFromBackend() {
        showMatchFoundOverlay();
    }

    function showMatchFoundOverlay() {
        const overlay = document.getElementById('match-found-overlay');
        const countdownTimer = document.getElementById('countdown-timer');
        let countdown = 5;

        overlay.style.display = 'flex'; 
        countdownTimer.textContent = countdown; 

        const countdownInterval = setInterval(() => {
            countdown -= 1;
            countdownTimer.textContent = countdown;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                hideMatchFoundOverlay();
            }
        }, 1000); 
    }

    function hideMatchFoundOverlay() {
        const overlay = document.getElementById('match-found-overlay');
        overlay.style.display = 'none'; 
    }

    window.triggerMatchFound = function() {
        receiveMatchFoundFromBackend();
    };

    console.log("Type 'triggerMatchFound()' in the console to simulate a match found event.");
});
