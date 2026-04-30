class AnimateTfm {
    constructor(num_frames, curves=[]) {
        this.num_frames = num_frames;
        this.curves = curves;
        this.start_frame = -1;
    }
    set_start_frame(start_frame) {
        this.start_frame = start_frame;
    }
    elapsed_frame() {
        return frameCount - this.start_frame;
    }
    finished() {
        return this.elapsed_frame() == this.num_frames;
    }
    transform_curves() {
        return this.curves;
    }
    draw(color="red", weight=5) {
        let curves = this.transform_curves();
        for (let c = 0; c < curves.length; c++) {
            let curve = curves[c];
            for (let i = 0; i < curve.length - 1; i++) {
                let start = curve[i];
                let end = curve[i+1];
                // console.log(start, end);
                stroke(color);
                strokeWeight(weight);
                line(start[0], start[1], end[0], end[1]);
            }
        }
    }
    get_final_curves() {
        return this.curves;
    }
}


class Pause extends AnimateTfm {
    constructor(num_frames, curves=[]) {
        super(num_frames, curves);
    }
}


class Rotation extends AnimateTfm {
    constructor(num_frames, angle=Math.PI/2, center=[canvas_size/2, canvas_size/2], curves=[]) {
        super(num_frames, curves);
        this.angle = angle;
        this.center = center;
    }
    rotate_curves(angle) {
        let rotated_curves = [];
        for (let i = 0; i < this.curves.length; i++) {
            let new_curve = [];
            for (let j = 0; j < this.curves[i].length; j++) {
                let rotated_pt = rotate_around(this.curves[i][j], angle, this.center);
                new_curve.push(rotated_pt);
            }
            rotated_curves.push(new_curve);
        }
        return rotated_curves;
    }
    transform_curves() {
        let angle = this.angle * (this.elapsed_frame() + 1) / this.num_frames;
        return this.rotate_curves(angle);
    }
    get_final_curves() {
        return this.rotate_curves(this.angle);
    }
}


class Scale extends AnimateTfm {
    constructor(num_frames, center, curves) {
        super(num_frames, curves);
    }
}


class DuplicateShift extends AnimateTfm {
    constructor(num_frames, curves) {
        super(num_frames, curves);
    }
}