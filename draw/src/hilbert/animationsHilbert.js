/**
 * Shift the duplicates to the center of the four quadrants, as required for Hilbert curves
 */
class ShiftDuplicatesHilbert extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        curves=[],
    ) {
        super(numFrames, curves);
        this.shiftVectors = Array.from(
            {length: 4},
            (_, i) => QUADRANT_CENTERS[i].copy().sub(CANVAS_CENTER)
        );
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 4},
            (_, i) => getShiftPortion(this.shiftVectors[i])
        );
    }
}


/**
 * Rotate the duplicates around the center of the four quadrants, as required for Hilbert curves
 */
class RotateDuplicatesHilbert extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        centers=null,
        curves=[],
    ) {
        super(numFrames, curves);
        this.angles = [-Math.PI / 2, 0, 0, Math.PI / 2];
        this.centers = centers ?? QUADRANT_CENTERS;
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 4},
            (_, i) => getRotatePortion(this.angles[i], this.centers[i])
        );
    }
}


/**
 * Connect the rotated duplicates, as required for Hilbert curves
 */
class ConnectHilbert extends AnimateTfm {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        this.curves[0].reverse();
        this.curves[3].reverse();
        let newCurves = [];
        for(let i = 0; i < this.curves.length; i++) {
            newCurves = newCurves.concat(this.curves[i]);
        }
        return [newCurves];
    }
}