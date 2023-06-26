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
let language = "english";

const fg = "#A89984";
const white = "#e2d9c1";
const red = "#cc241d";
const green = "#98971a";
const highlight = "#191b1c";

const getWords = async (language) => {
    const res = await fetch(`/get_words/${language}`);
    const data = await res.json();
    return data;
};

let wordsArray = await getWords(language);

const getMaxWpm = async () => {
    const res = await fetch('/get_max_wpm');
    const data = await res.json();
    return data;
};

// function that make POST request and send WPM to backend
const sendWpm = async (wpm) => {
    if (wpm != 0) {
        wpm = { wpm }
        await fetch('/request_wpm', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wpm)
        });
    }
};

let stopGame = async () => {
    let wpm = correct / (timerTime / 60);
    if (language == "english") {
        if (await getMaxWpm() < wpm) {
            results.innerHTML = `New best: <b>${wpm}</b> WPM`;
            sendWpm(wpm);
        } else {
            results.innerHTML = `<b>${wpm}</b> WPM`;
            sendWpm(wpm);
        }
    } else if (language == "russian") {
        if (await getMaxWpm() < wpm) {
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
        timer.style.color = white;
    }
}

let startTimer = () => {
    input.placeholder = "";
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
        const randomIndex = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        document.getElementById(`first-row-word-${i}`).innerHTML = randomIndex.word;
        document.getElementById(`first-row-word-${i}`).style.color = white;
        document.getElementById(`first-row-word-${i}`).style.background = 'none';
        document.getElementById(`first-row-word-0`).style.background = highlight;
        wordCounter = 0;
    }
}

let renderSecondRow = () => {
    for (let i = 0; i < 8; i++) {
        const randomIndex = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        document.getElementById(`second-row-word-${i}`).innerHTML = randomIndex.word;
        wordCounter = 0;
    }
}

let refresh = async () => {
    wordsArray = await getWords(language);
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
    input.placeholder = "/help";
    input.focus();
}

document.onload = refresh();

let handleEnter = (event) => {
    if (event.key === "Enter") {
        if (input.value === "/russian" || input.value === "/ru") {
            language = "russian";
            refresh();
        } else if (input.value === "/english" || input.value === "/en") {
            language = "english";
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
