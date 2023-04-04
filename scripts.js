import { easyEnglishWords } from "./words.js";
import { easyRussianWords } from "./words.js";

let button15 = document.querySelector("#button-15");
let button30 = document.querySelector("#button-30");
let button60 = document.querySelector("#button-60");
let button120 = document.querySelector("#button-120");
let englishButton = document.querySelector("#english");
let russianButton = document.querySelector("#russian");
let returnButton = document.querySelector(".return-button");
let main = document.querySelector("main");
let center = document.querySelector(".center");
let settingsButton = document.querySelector(".settings-button");
let settingsContainer = document.querySelector(".settings-container");
let wordsContainer = document.querySelector(".words-container");
let timer = document.querySelector(".timer");
let form = document.querySelector("form");
let input = document.querySelector("input");
let results = document.createElement("div");

let wordCounter = 0;
let correct = 0;
let decrimentInterval;
let gameTimeout;
let timerTime = 30;
let language = easyEnglishWords;

let fg = "#A89984";
let red = "#cc241d";
let green = "#98971a";
let orange = "#D65D0E";

let stopGame = () => {
    let englishSpeed = `<p><b>${correct / (timerTime / 60)}</b> WPM</p>`;
    let russianSpeed = `<p><b>${correct / (timerTime / 60)}</b> СВМ</p>`;
    results.setAttribute('class', 'results');

    if (language == easyEnglishWords) {
        results.innerHTML = englishSpeed;
    } else if (language == easyRussianWords) {
        results.innerHTML = russianSpeed;
    }

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
                .style.background = orange;
            document.getElementById(`first-row-word-${wordCounter + 1}`)
                .style.color = 'black';
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
                    .style.color = fg;
                document.getElementById(`first-row-word-${i}`)
                    .style.background = 'none';
                document.getElementById(`first-row-word-0`)
                    .style.background = orange;
                document.getElementById(`first-row-word-0`)
                    .style.color = 'black';
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
        document.getElementById(`first-row-word-${i}`).style.color = fg;
        document.getElementById(`first-row-word-${i}`).style.background = 'none';
        document.getElementById(`first-row-word-0`).style.background = orange;
        document.getElementById(`first-row-word-0`).style.color = 'black';
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
    if (settingsContainer) settingsContainer.remove();
    var elementExists = document.querySelector(".results");
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
    input.focus();
}

document.onload = refresh();

returnButton.onclick = function returnToMain() {
    refresh();
};

let handleEnter = (event) => {
    if (event.key === "Enter") {
        refresh();
    }
}

document.addEventListener('keyup', handleEnter);

settingsButton.onclick = function renderSettings() {
    center.remove();
    main.append(settingsContainer);
}

button15.onclick = function changeTimer() {
    timerTime = 15;
    refresh();
}

button30.onclick = function changeTimer() {
    timerTime = 30;
    refresh();
}

button60.onclick = function changeTimer() {
    timerTime = 60;
    refresh();
}

button120.onclick = function changeTimer() {
    timerTime = 120;
    refresh();
}

englishButton.onclick = function changeLenguage() {
    language = easyEnglishWords;
    refresh();
}

russianButton.onclick = function changeLenguage() {
    language = easyRussianWords;
    refresh();
}
