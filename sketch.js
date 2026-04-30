let rotation_angle = 0;
let pause_frames = 10;
let startup_frames = 20;
let shift_frames = 20;
let rotation_frames = 30;

let quadrant_centers = [
    [canvas_size * 1 / 4, canvas_size * 3 / 4], 
    [canvas_size * 1 / 4, canvas_size * 1 / 4], 
    [canvas_size * 3 / 4, canvas_size * 1 / 4], 
    [canvas_size * 3 / 4, canvas_size * 3 / 4]
];

let h0 = Array.from(quadrant_centers);

let animations = [
    new Pause(30),
    new Rotation(30),
    new Pause(30),
];

let animation_index = 0;
let current_animation = animations[animation_index];
current_animation.set_start_frame(0);
current_animation.curves = [h0];

function setup() {
    createCanvas(canvas_size, canvas_size);
}
function draw() {
    background(28, 9, 150);
    frameRate(30);

    if (current_animation.finished()) {
        console.log("finished")
        prev_final_curves = current_animation.get_final_curves();
        animation_index++;
        if (animation_index < animations.length) {
            current_animation = animations[animation_index];
            current_animation.set_start_frame(frameCount);
            current_animation.curves = prev_final_curves;
        } else {
            animation_index = 0;
            current_animation = animations[animation_index];
            animations[0].set_start_frame(frameCount);
            current_animation.curves = [h0];
        }
    }
    current_animation.draw();

}
