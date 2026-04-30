/**
 * Cosine with some default values to prevent floating point error
 * @param {number} angle 
 * @param {number} epsilon 
 * @returns {number}
 */
function cosine(angle, epsilon=1e-5) {
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
function sine(angle, epsilon=1e-5) {
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