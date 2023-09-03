document.addEventListener('keyup', hideHelp = (event) => {
    if (event.key === "Enter") {
        location.replace('/');
    }
});

const bestWpm = document.getElementById("best-wpm");
const averageWpm = document.getElementById("average-wpm");
const testsCompleted = document.getElementById("tests-completed");

const getMaxWpm = async () => {
    const res = await fetch('/get_max_wpm');
    const data = await res.json();
    bestWpm.textContent = data;
};
getMaxWpm();

const getTestsCompletedWpm = async () => {
    const res = await fetch('/get_total_completed');
    const data = await res.json();
    testsCompleted.textContent = data;
};
getTestsCompletedWpm();

const getAverageWpm = async () => {
    const res = await fetch('/get_average_wpm');
    const data = await res.json();
    averageWpm.textContent = data;
};
getAverageWpm();
