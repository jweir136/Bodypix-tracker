const extractFrames = require('ffmpeg-extract-frames')

async function main()
{
await extractFrames({
    input: './IMG_1319.mov',
    output: './screenshot-%i.jpg',
    offsets: [
      1000,
      2000,
      3500
    ]
  })
}

main();