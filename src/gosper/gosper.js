// let quadrantCenters;
let g0;
let order;

let animations;
let animationIndex;
let currentAnimation;



function setup() {
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent("canvas-container");
    frameRate(FRAME_RATE);

    CANVAS_CENTER = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    BASE_GOSPER = [
        createVector(CANVAS_SIZE * (4 / 9), CANVAS_SIZE * 3 / 18),
        createVector(CANVAS_SIZE * (4 / 9 + Math.sqrt(3) / 9), CANVAS_SIZE * 5 / 18),
        createVector(CANVAS_SIZE * (4 / 9 + Math.sqrt(3) / 9), CANVAS_SIZE * 9 / 18),
        createVector(CANVAS_SIZE * (4 / 9 + Math.sqrt(3) / 9), CANVAS_SIZE * 13 / 18),
        createVector(CANVAS_SIZE * (4 / 9), CANVAS_SIZE * 11 / 18),
        createVector(CANVAS_SIZE * (4 / 9), CANVAS_SIZE * 7 / 18),
        createVector(CANVAS_SIZE * (4 / 9 - Math.sqrt(3) / 9), CANVAS_SIZE * 9 / 18),
        createVector(CANVAS_SIZE * (4 / 9 - Math.sqrt(3) / 9), CANVAS_SIZE * 13 / 18),
    ];

    let scaleCenter = BASE_GOSPER[5].copy().add(createVector(0, 2 * CANVAS_SIZE / 9 * 1 / (Math.sqrt(7) - 1)));

    g0 = Array.from(BASE_GOSPER);
    order = 4;

    animations = [new Pause(BASE_ANIMATION_FRAMES)];

    for (let i = 0; i < order - 1; i++) {
        animations = animations.concat([
            new Rotation(BASE_ANIMATION_FRAMES, GOSPER_ANGLE, BASE_GOSPER[0]),
            new Scale(BASE_ANIMATION_FRAMES, GOSPER_SCALE, scaleCenter),
            new Duplicate(1, 7),
            new ShiftDuplicatesGosper(BASE_ANIMATION_FRAMES),
            new RotateDuplicatesGosper(BASE_ANIMATION_FRAMES),
            new ConnectGosper(1),
            new Pause(BASE_ANIMATION_FRAMES / 2),
        ]);
    }

    animations.push(new Pause(BASE_ANIMATION_FRAMES * 2));

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([g0]);
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
            currentAnimation.setCurves([g0]);
        }
    }
    drawCurve(BASE_GOSPER, (255, 255, 0, 100), 5);
    currentAnimation.draw();
}
