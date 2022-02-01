const extractFrames = require('ffmpeg-extract-frames')

async function main()
{
await extractFrames({
    input: './IMG_1319.mov',
    output: './screenshot-%d.jpg',
    fps: 160
  })
}

main();