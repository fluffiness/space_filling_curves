/**
 * Shift the 9 duplicates to the grid centers, as required for Peano curves
 */
class ShiftDuplicatesPeano extends AnimateTfm {
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
            {length: 9},
            (_, i) => GRID_CENTERS[i].copy().sub(CANVAS_CENTER)
        );
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 9},
            (_, i) => getShiftPortion(this.shiftVectors[i])
        );
    }
}


/**
 * Flip the duplicates that needs to be, as required for Peano curves
 */
class FlipDuplicatesPeano extends AnimateTfm {
    /** */
    constructor(
        numFrames,
        scale=-1,
        centers=null,
        curves=[],
    ) {
        super(numFrames, curves);
        this.scaleX = [1, -1, 1, -1, 1, -1, 1, -1, 1];
        this.centers = centers ?? GRID_CENTERS;
        this.curves = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 9},
            (_, i) => getScaleXPortion(this.scaleX[i], this.centers[i])
        );
    }
}


/**
 * Connect the flipped duplicates, as required for Peano curves
 */
class ConnectPeano extends AnimateTfm {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        this.curves[3].reverse();
        this.curves[4].reverse();
        this.curves[5].reverse();
        let newCurves = [];
        for(let i = 0; i < this.curves.length; i++) {
            newCurves = newCurves.concat(this.curves[i]);
        }
        return [newCurves];
    }
}