
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var video;

function create() {

    //  No properties at all means we'll create a video stream from a webcam
    video = game.add.video();

    //  If access to the camera is allowed
    video.onAccess.add(camAllowed, this);

    //  If access to the camera is denied
    video.onError.add(camBlocked, this);

    //  As soon as the stream starts this will fire
    video.onChangeSource.add(takeSnapshot, this);

    //  Start the stream
    video.startMediaStream();

}

function camAllowed() {

    var cam = video.addToWorld();
    cam.scale.set(0.5);

    var grab = video.snapshot.addToWorld(game.width, game.height);
    grab.anchor.set(1);

    game.add.text(400, 32, 'Click to grab', { font: "bold 26px Arial", fill: "#ffffff" })

    game.input.onDown.add(takeSnapshot, this);

}

function camBlocked(video, error) {

    console.log('Camera was blocked', video, error);

}

function takeSnapshot() {

    video.grab();

    // grab: function (clear, alpha, blendMode) {
    // video.grab(false, 0.5, 'multiply');
    // video.grab(false, 1, 'overlay');

}
