import { words } from "./words.js";

let wordCounter = 0;
let correct = 0;
let decrimentInterval;
let gameTimeout;

let form = document.querySelector("form");
let input = document.querySelector("input");
let main = document.querySelector("main");
let results = document.createElement("div");
let timer = document.querySelector(".timer");

let stopGame = () => {
    results.setAttribute('class', 'results');
    results.innerHTML = `<p>WPM: ${correct / 0.5}</p>`;
    main.append(results);
    input.removeEventListener('keyup', handleSpace);
}

let updateTimer = () => {
    if (timer.innerHTML > 0) {
        timer.innerHTML--;
    }

    if (timer.innerHTML < 4) {
        timer.style.color = "#D44D5C";
    }

    if (timer.innerHTML == 0) {
        timer.style.color = "#393E41";
    }
}

let startTimer = () => {
    gameTimeout = setTimeout(stopGame, 30 * 1000);
    decrimentInterval = setInterval(updateTimer, 1000);
    input.removeEventListener('keypress', startTimer);
}

let handleSpace = (event) => {
    let word = document.getElementById(`word-${wordCounter}`);
    if (event.key === " ") {
        if (wordCounter !== 7) {
            document.getElementById(`word-${wordCounter + 1}`).style.background = 'lightgray';
            document.getElementById(`word-${wordCounter + 1}`).style.color = 'black';
        }

        if (input.value === word.innerHTML + " ") {
            word.style.color = "#63A375";
            correct++;
        } else {
            word.style.color = "#D44D5C";
        }

        wordCounter++;
        document.getElementById(`word-${wordCounter - 1}`).style.background = "none";
        form.reset();

        if (wordCounter === 8) {
            renderWords();
        }
    }
}

//render words 
let renderWords = () => {
    for (let i = 0; i < 8; i++) {
        const randomIndex = words[Math.floor(Math.random() * words.length)];
        document.getElementById(`word-${i}`).innerHTML = randomIndex;
        document.getElementById(`word-${i}`).style.color = "#393E41";
        document.getElementById(`word-${i}`).style.background = 'none';
        document.getElementById(`word-0`).style.background = 'lightgray';
        document.getElementById(`word-0`).style.color = 'black';
        wordCounter = 0;
    }
}

let handleEnter = (event) => {
    if (event.key === "Enter") {
        refresh();
    }
}

// render words and clear input 
let refresh = () => {
    renderWords();
    clearInterval(decrimentInterval);
    clearTimeout(gameTimeout);
    wordCounter = 0;
    correct = 0;
    timer.innerHTML = 30;
    results.remove();
    form.reset();
    input.addEventListener('keyup', handleSpace);
    input.addEventListener('keypress', startTimer);
    input.focus();
}

document.onload = refresh();

//handle enter
input.addEventListener('keyup', handleEnter);
