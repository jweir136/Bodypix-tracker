let timerState = {
    timerHeader: document.getElementById("timer"),
};

async function countdownTimer()
{
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let timerHeader = document.getElementById("timer");
    let timerCount = 10;

    while (timerCount > 0)
    {
        timerHeader.innerHTML = "" + timerCount;
        timerCount -= 1;
        await sleep(1000);
    }

    timerHeader.innerHtML = "Recording...";
}