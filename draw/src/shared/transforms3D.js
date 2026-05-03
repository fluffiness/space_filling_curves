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
 * Rotates vector around center counter-clockwise by angle radians along the xy-plane
 * @param {p5.Vector} vector 
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function rotateAroundXY(vector, angle, center) {
    // rotates coord counter-cloackwise around center by angle
    if (Math.abs(angle - 0) < EPS) {
        return vector;
    }
    let cosAngle = cosine(angle);
    let sinAngle = sine(angle);
    let xNew = cosAngle * (vector.x - center.x) - sinAngle * (vector.y - center.y) + center.x;
    let yNew = sinAngle * (vector.x - center.x) + cosAngle * (vector.y - center.y) + center.y;
    return createVector(xNew, yNew, vector.z);
}


/**
 * Rotates vector around center counter-clockwise by angle radians along the yz-plane
 * @param {p5.Vector} vector 
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function rotateAroundYZ(vector, angle, center) {
    // rotates coord counter-cloackwise around center by angle
    if (Math.abs(angle - 0) < EPS) {
        return vector;
    }
    let cosAngle = cosine(angle);
    let sinAngle = sine(angle);
    let yNew = cosAngle * (vector.y - center.y) - sinAngle * (vector.z - center.z) + center.y;
    let zNew = sinAngle * (vector.y - center.y) + cosAngle * (vector.z - center.z) + center.z;
    return createVector(vector.x, yNew, zNew);
}


/**
 * Rotates vector around center counter-clockwise by angle radians along the zx-plane
 * @param {p5.Vector} vector 
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function rotateAroundZX(vector, angle, center) {
    // rotates coord counter-cloackwise around center by angle
    if (Math.abs(angle - 0) < EPS) {
        return vector;
    }
    let cosAngle = cosine(angle);
    let sinAngle = sine(angle);
    let zNew = cosAngle * (vector.z - center.z) - sinAngle * (vector.x - center.x) + center.z;
    let xNew = sinAngle * (vector.z - center.z) + cosAngle * (vector.x - center.x) + center.x;
    return createVector(xNew, vector.y, zNew);
}


/**
 * @param {number} angle 
 * @param {p5.Vector} center 
 * @param {string} plane
 * @returns {TfmPortion}
 */
function getRotatePlanePortion(angle, center, plane) {
    if (Math.abs(angle - 0) < EPS) {
        return doNothing;
    }
    function wrapper(vector, portion) {
        switch (plane) {
            case "xy":
                return rotateAroundXY(vector, angle * portion, center);
            case "yz":
                return rotateAroundYZ(vector, angle * portion, center);
            case "zx":
                return rotateAroundZX(vector, angle * portion, center);
            default:
                return doNothing(vector, portion);
        }
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
 * Scale vector's x coordinate by scale around center
 * @param {p5.Vector} vector 
 * @param {number} scale 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function scaleXAround(vector, scale, center) {
    if (Math.abs(scale - 1) < 1e-5) {
        return vector;
    }
    let scaleVector = createVector(scale, 1, 1);
    return vector.copy().sub(center).mult(scaleVector).add(center);
}


/**
 * Scale vector's y coordinate by scale around center
 * @param {p5.Vector} vector 
 * @param {number} scale 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function scaleYAround(vector, scale, center) {
    if (Math.abs(scale - 1) < 1e-5) {
        return vector;
    }
    let scaleVector = createVector(1, scale, 1);
    return vector.copy().sub(center).mult(scaleVector).add(center);
}


/**
 * Scale vector's z coordinate by scale around center
 * @param {p5.Vector} vector 
 * @param {number} scale 
 * @param {p5.Vector} center 
 * @returns {p5.Vector}
 */
function scaleZAround(vector, scale, center) {
    if (Math.abs(scale - 1) < 1e-5) {
        return vector;
    }
    let scaleVector = createVector(1, 1, scale);
    return vector.copy().sub(center).mult(scaleVector).add(center);
}


/**
 * @param {number} scale 
 * @param {p5.Vector} center
 * @param {string} axis
 * @returns {TfmPortion}
 */
function getScaleAlongPortion(scale, center, axis) {
    if (Math.abs(scale - 1) < EPS) {
        return doNothing;
    }
    function wrapper(vector, portion) {
        switch (axis) {
            case "x":
                return scaleXAround(vector, scale * portion + (1 - portion), center);
            case "y":
                return scaleYAround(vector, scale * portion + (1 - portion), center);
            case "z":
                return scaleZAround(vector, scale * portion + (1 - portion), center);
            default:
                return doNothing(vector, portion);
        }
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
    return wrapper;
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
