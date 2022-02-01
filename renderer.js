const extractFrames = require('ffmpeg-extract-frames')
var fs = require('fs');
var path = require('path');
const bodyPix = require('@tensorflow-models/body-pix');
const Canvas = require("canvas");
const tf = require("@tensorflow/tfjs");

let img = new Canvas.Image();

async function main()
{
    let imgPath;
    let net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
        internalResolution: 'medium'
    });

    await extractFrames({
        input: './IMG_1319.mov',
        output: 'media/screenshot-%d.jpg',
        fps: 160
    });

    // ITERATE THROUGH ALL FILES
    // NOTE: files are all out of order due to this function using async
    const dir = await fs.promises.opendir("media/");
    for await (const dirent of dir) {
        imgPath = "media/" + dirent.name; 

        img.src = imgPath;
        console.log(img);
    }  
}

main();