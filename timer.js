let timerState = {
    isRecording: false
};

async function countdownTimer()
{
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (timerState["isRecording"])
        return; // don't start recording if recording is already on.

    let timerHeader = document.getElementById("timer");
    let timerCount = 10;

    while (timerCount > 0)
    {
        timerHeader.innerHTML = "" + timerCount;
        timerCount -= 1;
        await sleep(1000);
    }

    timerHeader.innerHtML = "Recording...";
    timerState["isRecording"] = true;
}

async function stopRecording()
{
    if (!timerState["isRecording"])
        return;

    let timerHeader = document.getElementById("timer");
    timerHeader.innerHTML = "";

    timerState["isRecording"] = false;
}