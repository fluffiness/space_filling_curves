/**
 * Shift the 4 duplicates to the quadrant centers, as required for Morton curves
 */
class ShiftDuplicatesMorton extends AnimateTfm {
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
            (_, i) => QUADRANT_CENTERS_Z[i].copy().sub(CANVAS_CENTER)
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
 * Connect the 4 duplicates, as required for Morton curves
 */
class ConnectMorton extends AnimateTfm {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        let newCurves = [];
        for(let i = 0; i < this.curves.length; i++) {
            newCurves = newCurves.concat(this.curves[i]);
        }
        return [newCurves];
    }
}