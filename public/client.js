import { easyEnglishWords } from "./words.js";
import { easyRussianWords } from "./words.js";

let main = document.querySelector("main");
let center = document.querySelector(".center");
let wordsContainer = document.querySelector(".words-container");
let timer = document.querySelector(".timer");
let form = document.querySelector("form");
let input = document.querySelector("input");
let results = document.createElement("div");

let wordCounter = 0;
let correct = 0;
let decrimentInterval;
let gameTimeout;
let timerTime = 15;
let language = easyEnglishWords;

let fg = "#A89984";
let white = "#ede7d8";
let red = "#cc241d";
let green = "#98971a";
let highlight = "#24201c";

// function that make POST request and send WPM to backend
const sendWpm = async (wpm) => {
    if (wpm != 0) {
        wpm = { wpm }
        await fetch('/wpm', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wpm)
        });
    }
};

let stopGame = () => {
    let wpm = correct / (timerTime / 60);

    if (language == easyEnglishWords) {
        if (localStorage.getItem("BestScoreEnglish") < wpm) {
            localStorage.setItem("BestScoreEnglish", wpm);
            results.innerHTML = `New best: <b>${wpm}</b> WPM`;
            sendWpm(wpm);
        } else {
            results.innerHTML = `<b>${wpm}</b> WPM`;
            sendWpm(wpm);
        }
    } else if (language == easyRussianWords) {
        if (localStorage.getItem("BestScoreRussian") < wpm) {
            localStorage.setItem("BestScoreRussian", wpm);
            results.innerHTML = `New best: <b>${wpm}</b> WPM`;
            sendWpm(wpm);
        } else {
            results.innerHTML = `<b>${wpm}</b> WPM`;
            sendWpm(wpm);
        }
    }

    results.setAttribute('class', 'results');
    input.removeEventListener('keyup', handleSpace);
    wordsContainer.replaceWith(results);
}

let updateTimer = () => {
    if (timer.innerHTML > 0) {
        timer.innerHTML--;
    }

    if (timer.innerHTML < 4) {
        timer.style.color = red;
    }

    if (timer.innerHTML == 0) {
        timer.style.color = fg;
    }
}

let startTimer = () => {
    gameTimeout = setTimeout(stopGame, timerTime * 1000);
    decrimentInterval = setInterval(updateTimer, 1000);
    input.removeEventListener('keypress', startTimer);
}

let handleSpace = (event) => {
    let word = document.getElementById(`first-row-word-${wordCounter}`);
    if (event.key === " ") {
        if (wordCounter < 7) {
            document.getElementById(`first-row-word-${wordCounter + 1}`)
                .style.background = highlight;
        }

        if (input.value === word.innerHTML + " ") {
            word.style.color = green;
            correct++;
        } else {
            word.style.color = red;
        }

        wordCounter++;
        document.getElementById(`first-row-word-${wordCounter - 1}`)
            .style.background = "none";
        form.reset();

        if (wordCounter === 8) {
            for (let i = 0; i < 8; i++) {
                document.getElementById(`first-row-word-${i}`)
                    .innerHTML = document.getElementById(`second-row-word-${i}`).innerHTML;
                document.getElementById(`first-row-word-${i}`)
                    .style.color = white;
                document.getElementById(`first-row-word-${i}`)
                    .style.background = 'none';
                document.getElementById(`first-row-word-0`)
                    .style.background = highlight;
                wordCounter = 0;
            }
            renderSecondRow();
        }
    }
}

let renderFirstRow = () => {
    for (let i = 0; i < 8; i++) {
        const randomIndex = language[Math.floor(Math.random() * language.length)];
        document.getElementById(`first-row-word-${i}`).innerHTML = randomIndex;
        document.getElementById(`first-row-word-${i}`).style.color = white;
        document.getElementById(`first-row-word-${i}`).style.background = 'none';
        document.getElementById(`first-row-word-0`).style.background = highlight;
        wordCounter = 0;
    }
}

let renderSecondRow = () => {
    for (let i = 0; i < 8; i++) {
        const randomIndex = language[Math.floor(Math.random() * language.length)];
        document.getElementById(`second-row-word-${i}`).innerHTML = randomIndex;
        wordCounter = 0;
    }
}

let refresh = () => {
    main.append(center);
    let elementExists = document.querySelector(".results");
    if (elementExists) results.replaceWith(wordsContainer);
    renderFirstRow();
    renderSecondRow();
    clearInterval(decrimentInterval);
    clearTimeout(gameTimeout);
    wordCounter = 0;
    correct = 0;
    timer.innerHTML = timerTime;
    timer.style.color = fg;
    results.remove();
    form.reset();
    input.addEventListener('keyup', handleSpace);
    input.addEventListener('keypress', startTimer);
    center.style.visibility = 'visible';
    input.focus();
}

document.onload = refresh();


let handleEnter = (event) => {
    if (event.key === "Enter") {
        if (input.value === "/russian" || input.value === "/ru") {
            language = easyRussianWords;
            refresh();
        } else if (input.value === "/english" || input.value === "/en") {
            language = easyEnglishWords;
            refresh();
        } else if (input.value === "/15") {
            timerTime = 15;
            refresh();
        } else if (input.value === "/30") {
            timerTime = 30;
            refresh();
        } else if (input.value === "/60") {
            timerTime = 60;
            refresh();
        } else if (input.value === "/120") {
            timerTime = 120;
            refresh();
        } else if (input.value === "/help") {
            window.location.href = "/help";
        } else {
            refresh();
        }
    }
}

document.addEventListener('keyup', handleEnter);
