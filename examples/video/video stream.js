
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var video;
var sprite;

function create() {

    //  No properties at all means we'll create a video stream from a webcam
    video = game.add.video();

    //  If access to the camera is allowed
    video.onAccess.add(camAllowed, this);

    //  If access to the camera is denied
    video.onError.add(camBlocked, this);

    //  Start the stream
    video.startMediaStream();

}

function camAllowed(video) {

    console.log('--> camera was allowed', video);

    sprite = video.addToWorld();

    game.input.onDown.add(stopCam, this);

}

function camBlocked(video, error) {

    console.log('camera was blocked', video, error);

}

function stopCam() {

    console.log('camera stopped');

    video.stop();

}
