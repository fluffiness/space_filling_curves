/**
 * Shift the duplicates to the center of the four quadrants, as required for Hilbert curves
 */
class ShiftDuplicatesMorton3D extends AnimateTfm3D {
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
            {length: 8},
            (_, i) => OCTANT_CENTERS_Z[i].copy()
        );
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 8},
            (_, i) => getShiftPortion(this.shiftVectors[i])
        );
    }
}


/**
 * Connect the rotated duplicates, as required for Hilbert curves
 */
class ConnectMorton3D extends AnimateTfm3D {
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