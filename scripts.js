import { words } from "./words.js";

let wordCounter = 0;
let typos = 0;
let correct = 0;

let form = document.querySelector("form");
let input = document.querySelector("input");
let results = document.querySelector(".results");


let refresh = () => {
    for (let i = 0; i < 8; i++) {
        let randomIndex = words[Math.floor(Math.random() * words.length)]
        document.getElementById(`word-${i}`).innerHTML = randomIndex;
        document.getElementById(`word-${i}`).style.color = "#393E41";
        wordCounter = 0;
        typos = 0;
        correct = 0;
        results.innerHTML = '<div class="results"></div>';
    }
}

refresh();

input.addEventListener('keyup', function(event) {
    let word = document.getElementById(`word-${wordCounter}`);
    if (event.key === " ") {
        if (input.value === word.innerHTML + " ") {
            word.style.color = "green";
            correct++;
        } else {
            word.style.color = "#E94F37";
            typos++;
        }
        wordCounter++;
        form.reset();
        if (wordCounter === 8) {
            results.innerHTML = `
                <div 
                    class="results" 
                    style="
                    border: 5px solid #3f88c5; 
                    color: red;
                    margin-top: 2em;
                    padding: 1.5em;
                    font-size: 1.7rem;
                    background: #C1BDB3;
                    ">
                    <p>Correct: ${correct}</p>
                    <p>Typos: ${typos}</p>
                </div>
            `;
        }
    }
})


document.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        refresh();
        form.reset();
    }
})
