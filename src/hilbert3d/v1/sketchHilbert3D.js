// let quadrantCenters;
let h0;
let order;

let animations;
let animationIndex;
let currentAnimation;

let weight = 10;
let totalAnimationLength;

function setup() {
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
    canvas.parent("canvas-container");
    frameRate(FRAME_RATE);
    colorMode(HSL);
    
    OCTANT_CENTERS = [
        createVector(-CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector(-CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
        createVector(-CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
        createVector(-CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
    ];

    h0 = Array.from(OCTANT_CENTERS);
    order = 3;

    animations = [new Pause(BASE_ANIMATION_FRAMES)];

    for (let i = 0; i < order - 1; i++) {
        animations = animations.concat([
            new Scale(BASE_ANIMATION_FRAMES, 1/2),
            new Duplicate(1, 8),
            new ShiftDuplicatesHilbert3D(BASE_ANIMATION_FRAMES),
            new RotateDuplicatesHilbert3D(BASE_ANIMATION_FRAMES),
            new ConnectHilbert3D(1),
            new Pause(BASE_ANIMATION_FRAMES / 2),
        ]);
    }

    animations.push(new Pause(BASE_ANIMATION_FRAMES * 2));

    totalAnimationLength = animations.length;

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([h0]);
}

function draw() {
    background(225, 80, 30);
    camera(800, -800, 1200);

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

    currentAnimation.draw(weight - animationIndex * 2 / totalAnimationLength);
    // currentAnimation.draw(weight);
}
