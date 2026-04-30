

let quadrantCenters;
let h0;

let animations;
let animationIndex;
let currentAnimation;

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    
    quadrantCenters = [
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 3 / 4),
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 3 / 4),
    ];

    h0 = Array.from(quadrantCenters);

    animations = [
        new Pause(30),
        new Rotation(30),
        new Pause(30),
    ];

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.curves = [h0];
}

function draw() {
    background(28, 9, 150);
    frameRate(30);

    if (currentAnimation.finished()) {
        prev_final_curves = currentAnimation.getFinalCurves();
        animationIndex++;
        if (animationIndex < animations.length) {
            currentAnimation = animations[animationIndex];
            currentAnimation.setStartFrame(frameCount);
            currentAnimation.curves = prev_final_curves;
        } else {
            animationIndex = 0;
            currentAnimation = animations[animationIndex];
            animations[0].setStartFrame(frameCount);
            currentAnimation.curves = [h0];
        }
    }
    currentAnimation.draw();

}
