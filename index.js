let DTW = require("dtw");

{
    console.log("\n");
    console.log("Test #1");
    console.log("####################################");

    let s = [1,1,2,3,2,0];
    let t = [0,1,1,2,3,2,1];

    let dtw = new DTW();

    let cost = ((3 * t.length) - dtw.compute(s, t)) / (3 * t.length);

    console.log("Simularity Score: " + cost);

    console.log("####################################");
    console.log("\n");
}