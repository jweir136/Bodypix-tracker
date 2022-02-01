const extractFrames = require('ffmpeg-extract-frames')
var fs = require('fs');
var path = require('path');

async function main()
{
    await extractFrames({
        input: './IMG_1319.mov',
        output: 'media/screenshot-%d.jpg',
        fps: 160
    });

    // ITERATE THROUGH ALL FILES
    // NOTE: files are all out of order due to this function using async
    const dir = await fs.promises.opendir("media/");
    for await (const dirent of dir) {
        console.log("media/" + dirent.name);
    }  
}

main();