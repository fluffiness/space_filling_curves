/**
 * Shift the duplicates to the center of the four quadrants, as required for Hilbert curves
 */
class ShiftDuplicatesHilbert3D extends AnimateTfm3D {
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
            (_, i) => OCTANT_CENTERS[i].copy()
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
 * Rotate the duplicates around the center of the 8 octants, as required for Hilbert curves
 */
class RotateDuplicatesHilbert3D extends AnimateTfm3D {
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
            Math.PI / 2,
            Math.PI / 2,
            0,
            -Math.PI / 2,
            Math.PI / 2,
            0,
            -Math.PI / 2,
            -Math.PI / 2,
        ];
        this.planes = ["yz", "zx", "zx", "yz", "yz", "zx", "zx", "yz"]
        this.centers = centers ?? OCTANT_CENTERS;
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 8},
            (_, i) => getRotatePlanePortion(this.angles[i], this.centers[i], this.planes[i])
        );
    }
}


/**
 * Connect the rotated duplicates, as required for Hilbert curves
 */
class ConnectHilbert3D extends AnimateTfm3D {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        let reverseIdx = [0, 1, 3, 4, 6, 7]
        for (let idxIdx = 0; idxIdx < reverseIdx.length; idxIdx++) {
            this.curves[reverseIdx[idxIdx]].reverse();
        }
        let newCurves = [];
        for(let i = 0; i < this.curves.length; i++) {
            newCurves = newCurves.concat(this.curves[i]);
        }
        return [newCurves];
    }
}


/**
 * Rotate the duplicates around the center of the 8 octants, as required for Hilbert curves
 */
class RotateDuplicatesHilbert3DAltStep1 extends AnimateTfm3D {
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
            Math.PI / 2,
            -Math.PI / 2,
            Math.PI,
            Math.PI / 2,
            Math.PI / 2,
            -Math.PI,
            Math.PI / 2,
            Math.PI / 2,
        ];
        this.planes = ["xy", "zx", "zx", "xy", "xy", "zx", "zx", "xy"]
        this.centers = centers ?? OCTANT_CENTERS;
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 8},
            (_, i) => getRotatePlanePortion(this.angles[i], this.centers[i], this.planes[i])
        );
    }
}


class RotateDuplicatesHilbert3DAltStep2 extends AnimateTfm3D {
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
            -Math.PI / 2,
            Math.PI / 2,
            Math.PI / 2,
            -Math.PI / 2,
            Math.PI / 2,
            Math.PI / 2,
            -Math.PI / 2,
            Math.PI / 2,
        ];
        this.planes = ["yz", "yz", "xy", "zx", "zx", "xy", "yz", "yz"]
        this.centers = centers ?? OCTANT_CENTERS;
        this.tfms = [];
    }
    setTfms() {
        this.tfms = Array.from(
            {length: 8},
            (_, i) => getRotatePlanePortion(this.angles[i], this.centers[i], this.planes[i])
        );
    }
}


/**
 * Connect the rotated duplicates, as required for Hilbert curves
 */
class ConnectHilbert3DAlt extends AnimateTfm3D {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        let reverseIdx = [2, 5];
        for (let idxIdx = 0; idxIdx < reverseIdx.length; idxIdx++) {
            this.curves[reverseIdx[idxIdx]].reverse();
        }
        let newCurves = [];
        for(let i = 0; i < this.curves.length; i++) {
            newCurves = newCurves.concat(this.curves[i]);
        }
        return [newCurves];
    }
}