/**
 * Insert point in the middle of every line, as required for dosper curves
 */
class RotateDuplicateDragon extends AnimateTfm {
    /**
     * @param {number} numFrames 
     * @param {p5.Vector[][]} curves 
     */
    constructor(
        numFrames,
        curves=[],
    ) {
        super(numFrames, curves);
        this.angles = [0, Math.PI / 2];
        this.centers = [];
    }
    setTfms() {
        this.centers = [BASE_DRAGON[0], this.curves[1].at(-1)];
        this.tfms = Array.from(
            {length: this.angles.length},
            (_, i) => getRotatePortion(this.angles[i], this.centers[i])
        );
    }
}


/**
 * Connect the rotated duplicates, as required for dragon curves
 */
class ConnectDragon extends AnimateTfm {
    constructor(numFrames=1, curves=[]) {
        super(numFrames, curves);
    }
    getFinalCurves() {
        this.curves[1].reverse();
        let portion = 2 / 3;
        if (this.curves[0].length == 2) {
            portion = 3 / 4;
        }
        let diffVec = p5.Vector.sub(this.curves[0].at(-1), this.curves[0].at(-2));
        diffVec = p5.Vector.mult(diffVec, portion);
        this.curves[0][this.curves[0].length - 1] = p5.Vector.add(this.curves[0].at(-2), diffVec);

        diffVec = p5.Vector.sub(this.curves[1][0], this.curves[1][1])
        diffVec = p5.Vector.mult(diffVec, portion);
        this.curves[1][0] = p5.Vector.add(this.curves[1][1], diffVec)

        let newCurves = this.curves[0].concat(this.curves[1]);
        return [newCurves];
    }
}