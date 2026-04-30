/**
 * @callback TfmPortion
 * @param {p5.Vector} vector - vector to be transformed
 * @param {number} portion - the portion of the overall transformation to apply
 * @returns {p5.Vector}
 */


function doNothing(vector, portion) {
    return vector;
}


/**
 * Rotates vector around center counter-clockwise by angle radians
 * @param {p5.Vector} vector 
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function rotateAround(vector, angle, center) {
    // rotates coord counter-cloackwise around center by angle
    if (Math.abs(angle - 0) < EPS) {
        return vector;
    }
    let cosAngle = cosine(angle);
    let sinAngle = sine(angle);
    let xNew = cosAngle * (vector.x - center.x) + sinAngle * (vector.y - center.y) + center.x;
    let yNew = -sinAngle * (vector.x - center.x) + cosAngle * (vector.y - center.y) + center.y;
    return createVector(xNew, yNew);
}


/**
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @returns {TfmPortion}
 */
function getRotatePortion(angle, center) {
    if (Math.abs(angle - 0) < EPS) {
        return doNothing;
    }
    function wrapper(vector, portion) {
        return rotateAround(vector, angle * portion, center);
    }
    return wrapper;
}


/**
 * Scale vector by scale around center
 * @param {p5.Vector} vector 
 * @param {number} scale 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function scaleAround(vector, scale, center) {
    if (Math.abs(scale - 0) < 1e-5) {
        return vector;
    }
    return vector.copy().sub(center).mult(scale).add(center);
}


/**
 * @param {number} scale 
 * @param {p5.Vector} center 
 * @returns {TfmPortion}
 */
function getScalePortion(scale, center) {
    if (Math.abs(scale - 1) < EPS) {
        return doNothing;
    }
    function wrapper(vector, portion) {
        return scaleAround(vector, scale * portion + (1 - portion), center);
    }
    return wrapper;
}


/**
 * Shift vector by shiftVector
 * @param {p5.Vector} vector 
 * @param {p5.Vector} shiftVector 
 * @returns {p5.Vector}
 */
function shift(vector, shiftVector) {
    return vector.copy().add(shiftVector);
}


/**
 * @param {p5.Vector} shiftVector 
 * @returns 
 */
function getShiftPortion(shiftVector) {
    function wrapper(vector, portion) {
        return shift(vector, shiftVector.copy().mult(portion));
    }
    return wrapper
}


/**
 * Apply the given transformation to the points in the curve by the given portion
 * @param {TfmPortion} tfm 
 * @param {p5.Vector[]} curve 
 * @param {number} portion 
 * @returns {p5.Vector[]}
 */
function tfmCurveByRatio(tfm, curve, portion=1) {
    let new_curve = [];
    for (let i = 0; i < curve.length; i++) {
        new_curve.push(tfm(curve[i], portion));
    }
    return new_curve;
}