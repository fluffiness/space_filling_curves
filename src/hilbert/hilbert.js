// let quadrantCenters;
let h0;
let order;

let animations;
let animationIndex;
let currentAnimation;



function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    frameRate(FRAME_RATE);

    CANVAS_CENTER = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    
    QUADRANT_CENTERS = [
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 3 / 4),
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 3 / 4),
    ];

    h0 = Array.from(QUADRANT_CENTERS);
    order = 6;

    animations = [
        new Pause(30),
    ];

    for (let i = 0; i < order - 1; i++) {
        animations = animations.concat([
            new Scale(FRAME_RATE),
            new Duplicate(1, 4),
            new ShiftDuplicatesHilbert(FRAME_RATE),
            new RotateDuplicatesHilbert(FRAME_RATE),
            new ConnectHilbert(1),
            new Pause(FRAME_RATE / 2),
        ]);
    }

    animations.push(new Pause(FRAME_RATE * 2));

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([h0]);
}

function draw() {
    background(28, 9, 150);

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
    console.log("animationIndex: ", animationIndex);
    currentAnimation.draw();
}
