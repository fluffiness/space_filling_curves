// let quadrantCenters;
let m0;
let order;

let animations;
let animationIndex;
let currentAnimation;

let weight = 6;
let totalAnimationLength;

function setup() {
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent("canvas-container");
    frameRate(FRAME_RATE);
    colorMode(HSL);

    CANVAS_CENTER = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    
    QUADRANT_CENTERS_Z = [
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 1 / 4),
        createVector(CANVAS_SIZE * 1 / 4, CANVAS_SIZE * 3 / 4),
        createVector(CANVAS_SIZE * 3 / 4, CANVAS_SIZE * 3 / 4),
    ];

    m0 = Array.from(QUADRANT_CENTERS_Z);
    order = 6;

    animations = [
        new Pause(BASE_ANIMATION_FRAMES),
    ];

    // animations.push(new FlipX(FRAME_RATE));

    for (let i = 0; i < order - 1; i++) {
        animations = animations.concat([
            new Scale(BASE_ANIMATION_FRAMES, 1/2),
            new Duplicate(1, 4),
            new ShiftDuplicatesMorton(BASE_ANIMATION_FRAMES),
            new ConnectMorton(1),
            new Pause(BASE_ANIMATION_FRAMES/2),
        ]);
    }

    animations.push(new Pause(BASE_ANIMATION_FRAMES * 2));

    totalAnimationLength = animations.length;

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([m0]);
}

function draw() {
    background(225, 80, 30);

    if (currentAnimation.finished()) {
        console.log("currentAnimation.finished()");
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
            currentAnimation.setCurves([m0]);
        }
    }

    currentAnimation.draw(weight - animationIndex * 4 / totalAnimationLength);
}
