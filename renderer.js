const extractFrames = require('ffmpeg-extract-frames')
var fs = require('fs');
var path = require('path');
const bodyPix = require('@tensorflow-models/body-pix');
const { createCanvas, loadImage, createImageData, Image, Canvas } = require('canvas');
const tfjs = require('@tensorflow/tfjs-node');   // TODO : Change this to the native nodejs tensorflowjs library in order to speed things up.
const inkjet = require("inkjet");

let Img = new Image();

let annotated_data = {"data":[]};

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
        input: './jumping-jacks.mp4',
        output: 'media/screenshot-%d.jpg',
        fps: 160
    });

    // ITERATE THROUGH ALL FILES
    fs.readdir("media/", async function (err, files) {
        if (err)
            console.error(err);

        totalFiles = files.length;

        function convImg(data){
            let imgD = createImageData(new Uint8ClampedArray(data.data), data.width, data.height);
            const img = new Image();
            img.src = srcimagefile;
            const canvas = createCanvas(data.width,data.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img,0,0,data.width,data.height);
            return tfjs.browser.fromPixels(canvas);
        }

        for (let i = 1; i <= files.length; i+=1)
        {
            imgPath = "media/screenshot-" + [i] + ".jpg";

            var srcimagefile = imgPath;
            var srcimg = fs.readFileSync(srcimagefile);
            let img;
            inkjet.decode(srcimg, function(err, data){
                if(err) throw err;
                console.log("Image loaded.");
                img = convImg(data); //this function is provided below
            });  

            console.log(imgPath);
            
            let seg = await net.segmentPerson(img);

            let idx = imgPath.split("-")[1].split(".")[0];
            for (let i = 0; i < seg.allPoses.length; i+=1)
            {
                let poseData = {};
                for (let j = 0; j < seg.allPoses[i].keypoints.length; j+=1)
                {
                    let part = seg.allPoses[i].keypoints[j].part;
                    let x = seg.allPoses[i].keypoints[j].position.x;
                    let y = seg.allPoses[i].keypoints[j].position.y;
                    let score = seg.allPoses[i].keypoints[j].score;
                    
                    if (score >= 0.80)
                    {
                        poseData[part] = {'x':x, 'y':y, 'score':score};
                    }
                }
                annotated_data["data"].push(poseData);
            }

        }
        const storeData = (data, path) => {
            try {
              fs.writeFileSync(path, JSON.stringify(data))
            } catch (err) {
              console.error(err)
            }
          }

        storeData(annotated_data, "output.json");
    });
}

main();