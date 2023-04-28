let player_score = 0;
let computer_score = 0;

const result = document.getElementById('result');

function play(user_choice: string) {
    const choices = ['rock', 'paper', 'scissors'];
    const computer_choice = choices[Math.floor(Math.random() * choices.length)];

    if (computer_choice === 'rock') {
        document.getElementById('rock').classList.remove('hidden');
        document.getElementById('paper').classList.add('hidden');
        document.getElementById('scissors').classList.add('hidden');
    }
    if (computer_choice === 'paper') {
        document.getElementById('paper').classList.remove('hidden');
        document.getElementById('rock').classList.add('hidden');
        document.getElementById('scissors').classList.add('hidden');
    }
    if (computer_choice === 'scissors') {
        document.getElementById('scissors').classList.remove('hidden');
        document.getElementById('rock').classList.add('hidden');
        document.getElementById('paper').classList.add('hidden');
    }

    if (player_score < 3 && computer_score < 3) {
        if (user_choice === computer_choice) {
            result.textContent = `You - ${player_score} : Computer - ${computer_score}`;
        } else if (
            (user_choice === 'rock' && computer_choice === 'scissors') ||
            (user_choice === 'paper' && computer_choice === 'rock') ||
            (user_choice === 'scissors' && computer_choice === 'paper')
        ) {
            player_score++;
            result.textContent = `You - ${player_score} : Computer - ${computer_score}`;
        } else {
            computer_score++;
            result.textContent = `You - ${player_score} : Computer - ${computer_score}`;
        }

        if (player_score === 3) {
            result.textContent = `You - ${player_score} : Computer - ${computer_score}`;
            setTimeout(() =>
                alert('You won!')
                , 25);
        } else if (computer_score === 3) {
            result.textContent = `You - ${player_score} : Computer - ${computer_score}`;
            setTimeout(() =>
                alert('You lost!')
                , 25);
        }
    } else {
        return;
    }
}

function reset() {
    player_score = 0;
    computer_score = 0;
    result.textContent = "You - 0 : Computer - 0";
}