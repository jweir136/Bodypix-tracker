const fs = require('fs');


// TODO : Add backup reference points because it is rather common for a point to not register on a single frame.
function parse(filename, referencePoint1, referencePoint2)
{
    function loadJSON(filename)
    {
        let rawdata = fs.readFileSync(filename);
        return JSON.parse(rawdata);
    }

    let data = loadJSON(filename);
    console.log(data);
}

parse("output.json", null, null);