let DTW = require("dynamic-time-warping");

//var ser1 = [ 9, 93, 15, 19, 24 ];
var ser1 = [[1, 1], [0, 0]];
var ser2 = [[1, 1], [0, 0]];
//var ser2 = [ 31, 97, 81, 82, 39 ];
var distFunc = function( a, b ) {
    return Math.abs( a - b );
};
 
var dtw = new DTW(ser1, ser2, distFunc);
var score = ((97 * ser1.length) - dtw.getDistance()) / (97 * ser1.length);
console.log(score);

/*
    N-D Arrays are not supported by most libraries. Fix this by taking the score of every dimension seperatly and averaging them.
*/