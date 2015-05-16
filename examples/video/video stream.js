
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var video;
var sprite;

function create() {

    //  No properties at all means we'll create a video stream from a webcam
    video = game.add.video(null, false);

    video.onAccess.add(camAllowed, this);
    video.onError.add(camBlocked, this);

    video.play();

}

function camAllowed(video) {

    console.log('--> camera was allowed', video);

    sprite = video.addToWorld();

    sprite.x = 640;
    sprite.scale.x = -1;

    console.log(sprite);

    game.input.onDown.add(stopCam, this);

}

function camBlocked(video, error) {

    console.log('camera was blocked', video, error);

}

function stopCam() {

    console.log('camera stopped');

    video.stop();

}
