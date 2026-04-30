// let quadrantCenters;
let h0;

let animations;
let animationIndex;
let currentAnimation;

function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);

    CANVAS_CENTER = (CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    
    QUADRANT_CENTERS = [
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 3 / 4),
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 3 / 4),
    ];

    h0 = Array.from(QUADRANT_CENTERS);

    let shiftVector = createVector(100, 100);

    animations = [
        new Pause(30),
        new Scale(30),
        new Duplicate(1, 4),
        new ShiftDuplicatesHilbert(30),
        new Pause(30),
    ];

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([h0]);
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
            currentAnimation.setCurves(prev_final_curves);
        } else {
            animationIndex = 0;
            currentAnimation = animations[animationIndex];
            animations[0].setStartFrame(frameCount);
            currentAnimation.setCurves([h0]);
        }
    }
    // console.log("animationIndex: ", animationIndex);
    // console.log("animationLength: ", animations.length);
    console.log("numCurves: ", currentAnimation.curves.length)
    currentAnimation.draw();
}
