const state = {
    canvas: document.querySelector('canvas'),
    context: document.querySelector('canvas').getContext('2d'),
    video: document.querySelector('video'),
    constraints: {
        video: true,
    },
    FPS: 160,
    net: null
};

async function loadModel()
{
    state.net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
        internalResolution: 'medium'
    });
}

setInterval(function() {
    loadAndPredict();
    draw();
}, state.FPS);

function draw()
{
    state.context.drawImage(state.video, 0, 0);
    //context.clearRect(0, 0, canvas.width, canvas.height);

}

function getWebcamAccess()
{
    navigator.mediaDevices.getUserMedia(state.constraints).then((stream) => {
        state.video.srcObject = stream;
    });
}

function drawBodyPart(x, y)
{
    state.context.fillStyle = "red";

    state.context.beginPath();
    state.context.rect(x, y, 5, 5);
    state.context.fill();
}

async function loadAndPredict()
{
    const segmentation = await state.net.segmentPerson(state.canvas);

    for (let i = 0; i < segmentation.allPoses.length; i+=1)
    {
        for (let j = 0; j < segmentation.allPoses[i].keypoints.length; j+=1)
        {
            let part = segmentation.allPoses[i].keypoints[j].part;
            let x = segmentation.allPoses[i].keypoints[j].position.x;
            let y = segmentation.allPoses[i].keypoints[j].position.y;
            let score = segmentation.allPoses[i].keypoints[j].score;
            
            if (score >= 0.80)
            {
                drawBodyPart(x, y);
                
                if (timerState["isRecording"])
                {
                    // temp. save the data in state if isRecording is set.
                    timerState["recordedData"].push(segmentation.allPoses[i].keypoints);
                }
            }
        }
    }
}

loadModel();
getWebcamAccess();
