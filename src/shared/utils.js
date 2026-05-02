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


function getGradientColor(t) {
    return color(t * 270, 80, 60); // hue 0-360, saturation 80%, lightness 60%
}