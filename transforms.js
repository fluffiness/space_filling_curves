/**
 * Rotates vector around center counter-clockwise by angle radians
 * @param {p5.Vector} vector 
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function rotateAround(vector, angle, center) {
    // rotates coord counter-cloackwise around center by angle
    let cos_angle = cosine(angle);
    let sin_angle = sine(angle);
    let x_new = cos_angle * (vector.x - center.x) + sin_angle * (vector.y - center.y) + center.x;
    let y_new = -sin_angle * (vector.x - center.x) + cos_angle * (vector.y - center.y) + center.y;
    return createVector(x_new, y_new);
}

/**
 * Cosine with some default values to prevent floating point error
 * @param {number} angle 
 * @param {number} epsilon 
 * @returns {number}
 */
function cosine(angle, epsilon=0.0001) {
    let test_angle = 0;
    for (let i = -1; i < 2; i++) {
        test_angle = angle + 2 * Math.PI * i;
        if (Math.abs(test_angle - 0) < epsilon) {
            return 1;
        } else if (Math.abs(test_angle - Math.PI / 2) < epsilon) {
            return 0;
        } else if (Math.abs(test_angle - Math.PI) < epsilon) {
            return -1;
        } else if (Math.abs(test_angle + Math.PI / 2) < epsilon) {
            return 0;
        }
    }
    return Math.cos(angle);
}

/**
 * Sine with some default values to prevent floating point error
 * @param {number} angle 
 * @param {number} epsilon 
 * @returns {number}
 */
function sine(angle, epsilon=0.0001) {
    let test_angle = 0;
    for (let i = -1; i < 2; i++) {
        test_angle = angle + 2 * Math.PI * i;
        if (Math.abs(test_angle - 0) < epsilon) {
            return 0;
        } else if (Math.abs(test_angle - Math.PI / 2) < epsilon) {
            return 1;
        } else if (Math.abs(test_angle - Math.PI) < epsilon) {
            return 0;
        } else if (Math.abs(test_angle + Math.PI / 2) < epsilon) {
            return -1;
        }
    }
    return Math.sin(angle);
}

function scaleAround(coord, scale, center) {
    let x_new = (coord[0] - center[0]) * scale + coord[0];
    let y_new = (coord[1] - center[1]) * scale + coord[1];
    return [x_new, y_new];
}

function shiftBy(coord, shift) {
    return [coord[0] + shift[0], coord[1] + shift[1]];
}