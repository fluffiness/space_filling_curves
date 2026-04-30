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
    }
    setStartFrame(startFrame) {
        this.startFrame = startFrame;
    }
    setCurves(curves) {
        this.curves = curves;
    }
    elapsedFrame() {
        return frameCount - this.startFrame;
    }
    finished() {
        return this.elapsedFrame() == this.numFrames;
    }
    transformCurves() {
        return this.curves;
    }
    /**
     * Draw all the curves in this.curves with the given color and weight
     * @param {string} color 
     * @param {number} weight 
     */
    draw(color="red", weight=5) {
        let curves = this.transformCurves();
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
        return this.curves;
    }
}


class Pause extends AnimateTfm {
    constructor(numFrames, curves=[]) {
        super(numFrames, curves);
    }
}


class Rotation extends AnimateTfm {
    constructor(
        num_frames,
        angle=Math.PI/2,
        // center=[CANVAS_SIZE/2, CANVAS_SIZE/2],
        center=createVector(CANVAS_SIZE/2, CANVAS_SIZE/2),
        curves=[],
    ) {
        super(num_frames, curves);
        this.angle = angle;
        this.center = center;
    }
    rotateCurves(angle) {
        let rotated_curves = [];
        for (let i = 0; i < this.curves.length; i++) {
            let new_curve = [];
            for (let j = 0; j < this.curves[i].length; j++) {
                let rotated_pt = rotateAround(this.curves[i][j], angle, this.center);
                new_curve.push(rotated_pt);
            }
            rotated_curves.push(new_curve);
        }
        return rotated_curves;
    }
    transformCurves() {
        let angle = this.angle * (this.elapsedFrame() + 1) / this.numFrames;
        return this.rotateCurves(angle);
    }
    getFinalCurves() {
        return this.rotateCurves(this.angle);
    }
}


class Scale extends AnimateTfm {
    constructor(numFrames, center=[], curves=[]) {
        super(numFrames, curves);
    }
}


class DuplicateShift extends AnimateTfm {
    constructor(numFrames, curves=[]) {
        super(numFrames, curves);
    }
}