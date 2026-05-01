/**
 * Shift the duplicates as required for Gosper curves
 */
class ShiftDuplicatesGosper extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        curves=[],
    ) {
        super(numFrames, curves);
        this.shiftVectors = [
            BASE_GOSPER[1].copy().sub(BASE_GOSPER[0]),
            BASE_GOSPER[1].copy().sub(BASE_GOSPER[0]),
            BASE_GOSPER[2].copy().sub(BASE_GOSPER[0]),
            BASE_GOSPER[5].copy().sub(BASE_GOSPER[0]),
            BASE_GOSPER[5].copy().sub(BASE_GOSPER[0]),
            BASE_GOSPER[6].copy().sub(BASE_GOSPER[0]),
            BASE_GOSPER[6].copy().sub(BASE_GOSPER[0]),
        ];
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 7},
            (_, i) => getShiftPortion(this.shiftVectors[i])
        );
    }
}


/**
 * Rotate the duplicates as required for Gosper curves
 */
class RotateDuplicatesGosper extends AnimateTfm {
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
        this.angles = [
            -Math.PI * 2 / 3, 
            0, 
            0, 
            -Math.PI * 2 / 3,
            0,
            Math.PI * 2 / 3,
            0,
        ];
        this.centers = [
            BASE_GOSPER[1],
            BASE_GOSPER[1],
            BASE_GOSPER[2],
            BASE_GOSPER[4],
            BASE_GOSPER[5],
            BASE_GOSPER[6],
            BASE_GOSPER[6],
        ];
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 7},
            (_, i) => getRotatePortion(this.angles[i], this.centers[i])
        );
    }
}


/**
 * Connect the rotated duplicates, as required for Gosper curves
 */
class ConnectGosper extends AnimateTfm {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        this.curves[0].reverse();
        this.curves[4].reverse();
        this.curves[5].reverse();
        let length = this.curves[0].length
        let newCurves = [];
        for(let i = 0; i < this.curves.length; i++) {
            if (i < this.curves.length - 1) {
                newCurves = newCurves.concat(this.curves[i].slice(0, length - 1));
            } else {
                newCurves = newCurves.concat(this.curves[i]);
            }
        }
        return [newCurves];
    }
}