let playerScore = 0;
let computerScore = 0;

const result = document.getElementById('result');

function play(userChoice: string) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    if (playerScore < 3 && computerScore < 3) {
        if (userChoice === computerChoice) {
            result.textContent = `It's a tie! Score: You - ${playerScore}, Computer - ${computerScore}`;
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            playerScore++;
            result.textContent = `You win this round! ${userChoice} beats ${computerChoice}. Score: You - ${playerScore}, Computer - ${computerScore}`;
        } else {
            computerScore++;
            result.textContent = `You lose this round! ${computerChoice} beats ${userChoice}. Score: You - ${playerScore}, Computer - ${computerScore}`;
        }

        if (playerScore === 3) {
            result.textContent += " Congratulations! You won the game.";
        } else if (computerScore === 3) {
            result.textContent += " Sorry, computer won the game.";
        }
    } else {
        return;
    }
}

function reset() {
    playerScore = 0;
    computerScore = 0;
    result.textContent = "Score: You - 0, Computer - 0";
}