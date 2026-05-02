/**
 * Draws a given curve with the given color and weight
 * @param {p5.Vector[]} curve 
 */
function drawCurve(curve, color="yellow", weight=4) {
    for (let i = 0; i < curve.length - 1; i++) {
        let start = curve[i];
        let end = curve[i+1];
        stroke(color);
        strokeWeight(weight);
        line(start.x, start.y, end.x, end.y);
    }
}