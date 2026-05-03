// let quadrantCenters;
let h0;
let order;

let animations;
let animationIndex;
let currentAnimation;

let weight = 10;
let totalAnimationLength;
let totalFrameCount;

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
    
    OCTANT_CENTERS_ALT = [
        createVector(-CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector(-CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector(-CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4),
        createVector( CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
        createVector(-CANVAS_SIZE * 1 / 4,  CANVAS_SIZE * 1 / 4, -CANVAS_SIZE * 1 / 4),
    ];

    h0 = Array.from(OCTANT_CENTERS_ALT);
    order = 4;

    animations = [new Pause(BASE_ANIMATION_FRAMES)];

    for (let i = 0; i < order - 1; i++) {
        animations = animations.concat([
            new Scale(BASE_ANIMATION_FRAMES, 1/2),
            new Duplicate(1, 8),
            new ShiftDuplicatesHilbert3DV2(BASE_ANIMATION_FRAMES),
            new RotateDuplicatesHilbert3DV2(BASE_ANIMATION_FRAMES),
            new ConnectHilbert3DV2(1),
            new Pause(BASE_ANIMATION_FRAMES / 2),
        ]);
    }

    animations.push(new Pause(BASE_ANIMATION_FRAMES * 2));

    totalAnimationLength = animations.length;
    totalFrameCount = 3 * BASE_ANIMATION_FRAMES + (order - 1) * (3.5 * BASE_ANIMATION_FRAMES + 2);

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([h0]);
}

function draw() {
    background(225, 80, 30);
    camera(700, -900, 1200);

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
    // if (frameCount < totalFrameCount) {
    //     saveCanvas('frame-' + nf(frameCount, 4), 'png');
    // }
}
