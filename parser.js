const fs = require('fs');


// TODO : Add backup reference points because it is rather common for a point to not register on a single frame.
function parse(filename, referencePoint1, referencePoint2)
{
    function loadJSON(filename)
    {
        let rawdata = fs.readFileSync(filename);
        return JSON.parse(rawdata);
    }

    function calculateDistance(X1, X2, Y1, Y2)
    {
        let deltaX = X1 - X2;
        let deltaY = Y1 - Y2;

        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    }

    function containsBothReferencePoints(data, referencePoint1, referencePoint2)
    {
        return data[referencePoint1] != undefined && data[referencePoint2] != undefined;
    }

    let data = loadJSON(filename)["data"];
    let outputData = [];

    let deltaReference;
    let frame;

    for (let i = 0; i < data.length; i+=1)
    {
        if (containsBothReferencePoints(data[i], referencePoint1, referencePoint2))
        {
            frame = {};

            deltaReference = calculateDistance(data[i][referencePoint1]["x"], data[i][referencePoint2]["x"], data[i][referencePoint1]["y"], data[i][referencePoint2]["y"]);
            frame["deltaReference"] = deltaReference;

            for (bodyPart in data[i])
            {
                frame[bodyPart] = (
                        calculateDistance(data[i][referencePoint1]["x"], data[i][bodyPart]["x"], data[i][referencePoint1]["y"], data[i][bodyPart]["y"])
                    ) / deltaReference;
            }

            outputData.push(frame);
        }
        else
        {
            outputData.push(null);
        }
    }
    
    // TODO : save outputData as JSON

}

parse("output.json", "leftEye", "rightEye");