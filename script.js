document.getElementById('start-btn').addEventListener('click', startGame);
let score = 0;
let gameInterval;

async function startGame() {
    document.getElementById('start-btn').disabled = true;
    score = 0; // Reset score at the start
    const pokemonId = Math.floor(Math.random() * 151) + 1; // Random Pokémon ID between 1 and 151
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const pokemonImage = data.sprites.other.dream_world.front_default;
        const pokemonTarget = document.getElementById('pokemon-target');
        pokemonTarget.src = pokemonImage;
        pokemonTarget.style.display = 'block';
        pokemonTarget.addEventListener('click', incrementScore);
        movePokemonTarget();
        startCountdown();
    } catch (error) {
        swal("Oops!", "Failed to fetch Pokémon. Please try again.", "error");
        document.getElementById('start-btn').disabled = false;
    }
}

function movePokemonTarget() {
    const gameContainer = document.getElementById('game-container');
    const maxX = gameContainer.clientWidth - 100; // Width of the target is 100px
    const maxY = gameContainer.clientHeight - 100; // Height of the target is 100px
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        const pokemonTarget = document.getElementById('pokemon-target');
        pokemonTarget.style.left = x + 'px';
        pokemonTarget.style.top = y + 'px';
    }, 1000);
}

function incrementScore() {
    score++;
}

function startCountdown() {
    let timeLeft = 20; // 20 seconds game time
    const timeLeftDisplay = document.getElementById('time-left');
    timeLeftDisplay.textContent = timeLeft;
    const timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            endGame();
        } else {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    const pokemonTarget = document.getElementById('pokemon-target');
    pokemonTarget.style.display = 'none';
    document.getElementById('start-btn').disabled = false;
    swal("Time's Up!", `The game has ended. Your score is: ${score}.`, "info");
}