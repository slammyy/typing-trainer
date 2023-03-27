import { words } from "./words.js";

let wordCounter = 0;
let typos = 0;
let correct = 0;
let renders = 0;

let form = document.querySelector("form");
let input = document.querySelector("input");
let main = document.querySelector("main");
let results = document.createElement("div");

// render words and clear input 
let render = () => {
    renders++;
    for (let i = 0; i < 8; i++) {
        const randomIndex = words[Math.floor(Math.random() * words.length)]
        document.getElementById(`word-${i}`).innerHTML = randomIndex;
        document.getElementById(`word-${i}`).style.color = "#393E41";
        document.getElementById(`word-${i}`).style.background = 'none';
        document.getElementById(`word-0`).style.background = 'lightgray';
        wordCounter = 0;
        typos = 0;
        correct = 0;
        results.remove();
    }
}

render();

// handle spacebar
input.addEventListener('keyup', function(event) {
    let word = document.getElementById(`word-${wordCounter}`);
    if (event.key === " ") {
        if (wordCounter !== 7) {
            document.getElementById(`word-${wordCounter + 1}`).style.background = 'lightgray';
        }
        if (input.value === word.innerHTML + " ") {
            word.style.color = "#63A375";
            correct++;
        } else {
            word.style.color = "#D44D5C";
            typos++;
        }
        wordCounter++;
        document.getElementById(`word-${wordCounter - 1}`).style.background = "none";
        form.reset();
        if (wordCounter === 8) {
            results.setAttribute('class', 'results');
            results.innerHTML = `
                <p>Correct: ${correct}</p>
                <p>Typos: ${typos}</p>
            `;
            main.append(results);
            console.log(renders);
            if (renders < 3) {
                render();
            }
        }
    }
})


// handle enter
document.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        render();
        form.reset();
    }
})
