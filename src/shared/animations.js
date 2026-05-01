/**
 * Base class for animated transformations
 */
class AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector[][]} curves 
     */
    constructor(numFrames, curves=[]) {
        this.numFrames = numFrames;
        this.curves = curves;
        this.startFrame = -1;
        this.tfms = [];
    }
    setStartFrame(startFrame) {
        this.startFrame = startFrame;
    }
    setCurves(curves) {
        this.curves = curves;
        this.setTfms();
    }
    setTfms() {
        this.tfms = [];
    }
    elapsedFrame() {
        return frameCount - this.startFrame;
    }
    finished() {
        return this.elapsedFrame() == this.numFrames;
    }
    getPortion() {
        return (this.elapsedFrame() + 1) / this.numFrames;
    }
    transformCurves(portion) {
        if (this.tfms.length == 0 || this.tfms.length != this.curves.length) {
            return this.curves;
        } else {
            let newCurves = [];
            let newCurve;
            for (let i = 0; i < this.tfms.length; i++){
                newCurve = tfmCurveByRatio(this.tfms[i], this.curves[i], portion);
                newCurves.push(newCurve);
            }
            return newCurves;
        }
    }
    /**
     * Draw all the curves in this.curves with the given color and weight
     * @param {string} color 
     * @param {number} weight 
     */
    draw(color="red", weight=6-animationIndex/FRAME_RATE) {
        let curves = this.transformCurves(this.getPortion());
        for (let c = 0; c < curves.length; c++) {
            let curve = curves[c];
            for (let i = 0; i < curve.length - 1; i++) {
                let start = curve[i];
                let end = curve[i+1];
                stroke(color);
                strokeWeight(weight);
                line(start.x, start.y, end.x, end.y);
            }
        }
    }
    /**
     * Returns this.curves transformed as specified at object instantiation
     * @returns {p5.Vector[][]}
     */
    getFinalCurves() {
        return this.transformCurves(1);
    }
}


class Pause extends AnimateTfm {
    constructor(numFrames, curves=[]) {
        super(numFrames, curves);
    }
}


/**
 * Animate the curves rotating around the given center
 */
class Rotation extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {number} angle 
     * @param {p5.Vector} center 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        angle=Math.PI/2,
        center=null,
        curves=[],
    ) {
        super(numFrames, curves);
        this.angle = angle;
        this.center = center ?? createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        this.tfms = [];
    }
    setTfms() {
        this.tfms = new Array(this.curves.length).fill(getRotatePortion(this.angle, this.center));
    }
}


/**
 * Animate the curves scale with the given center fixed
 */
class Scale extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {number} scale 
     * @param {p5.Vector} center 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        scale=0.5,
        center=null,
        curves=[],
    ) {
        super(numFrames, curves);
        this.scale = scale;
        this.center = center ?? createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        this.tfms = [];
    }
    setTfms(scale) {
        this.tfms = new Array(this.curves.length).fill(getScalePortion(this.scale, this.center));
    }
}

/**
 * Animate shifting the curves by the given shiftVector
 */
class Shift extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector} shiftVector 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        shiftVector,
        curves=[],
    ) {
        super(numFrames, curves);
        this.tfms = [];
        this.shiftVector = shiftVector;
    }
    setTfms(scale) {
        this.tfms = new Array(this.curves.length).fill(getShiftPortion(this.shiftVector));
    }
}

/**
 * Duplicate the first curve in curves by numDuplicates.
 * Should only be used  when there is only a single curve in curves.
 */
class Duplicate extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector} numDuplicates 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames=1,
        numDuplicates=4,
        curves=[],
    ) {
        super(numFrames, curves);
        this.numDuplicates = numDuplicates;
    }
    getFinalCurves() {
        return new Array(this.numDuplicates).fill(this.curves[0]);
    }
}