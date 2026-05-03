// let quadrantCenters;
let d0;
let order;

let animations;
let animationIndex;
let currentAnimation;

let weight = 6;
let totalAnimationLength;
let totalFrameCount;

function setup() {
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent("canvas-container");
    frameRate(FRAME_RATE);
    colorMode(HSL);

    CANVAS_CENTER = createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    BASE_DRAGON = [
        createVector(CANVAS_SIZE * (5 / 16), CANVAS_SIZE * (3 / 5)),
        createVector(CANVAS_SIZE * (13 / 16), CANVAS_SIZE * (3 / 5)),
    ];

    d0 = Array.from(BASE_DRAGON);
    order = 13;

    animations = [new Pause(BASE_ANIMATION_FRAMES)];

    for (let i = 0; i < order - 1; i++) {
        animations = animations.concat([
            new Scale(BASE_ANIMATION_FRAMES, 1 / Math.sqrt(2), BASE_DRAGON[0]),
            new Rotation(BASE_ANIMATION_FRAMES, Math.PI / 4, BASE_DRAGON[0]),
            new Duplicate(1, 2),
            new RotateDuplicateDragon(BASE_ANIMATION_FRAMES),
            new ConnectDragon(1),
            new Pause(BASE_ANIMATION_FRAMES / 2),
        ]);
    }

    animations.push(new Pause(BASE_ANIMATION_FRAMES * 2));

    totalAnimationLength = animations.length;
    totalFrameCount = 3 * BASE_ANIMATION_FRAMES + (order - 1) * (3.5 * BASE_ANIMATION_FRAMES + 2);

    animationIndex = 0;
    currentAnimation = animations[animationIndex];
    currentAnimation.setStartFrame(0);
    currentAnimation.setCurves([d0]);
}

function draw() {
    background(225, 80, 30);

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
            currentAnimation.setCurves([d0]);
        }
    }

    currentAnimation.draw(weight - animationIndex * 5 / totalAnimationLength);
    // if (frameCount < totalFrameCount) {
    //     saveCanvas('frame-' + nf(frameCount, 4), 'png');
    // }
}
