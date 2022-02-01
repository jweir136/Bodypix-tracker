const extractFrames = require('ffmpeg-extract-frames')
var fs = require('fs');
var path = require('path');
const bodyPix = require('@tensorflow-models/body-pix');
const { createCanvas, loadImage, createImageData, Image, Canvas } = require('canvas');
const tfjs = require("@tensorflow/tfjs");
const { create } = require('domain');
const inkjet = require("inkjet");

let Img = new Image();

async function main()
{
    function convImg(data){
        let imgD = createImageData(new Uint8ClampedArray(data.data), data.width, data.height);
        const img = new Image();
        img.src = srcimagefile;
        const canvas = createCanvas(data.width,data.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,data.width,data.height);
        return tfjs.browser.fromPixels(canvas);
    }

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

        var srcimagefile = imgPath;
        var srcimg = fs.readFileSync(srcimagefile);
        let img;
        inkjet.decode(srcimg, function(err, data){
            if(err) throw err;
            console.log("Image loaded.");
            img = convImg(data); //this function is provided below
        });
        let seg = await net.segmentPerson(img);
        
    }  
}

main();