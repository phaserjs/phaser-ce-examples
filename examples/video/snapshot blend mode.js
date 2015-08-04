
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var video;
var bmd;
var alpha = { alpha: 0.2 };

function preload() {

    game.load.image('swirl', 'assets/pics/swirl1.jpg');

}

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

function camAllowed() {

    bmd = game.add.bitmapData(video.width, video.height);
    bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);

    //  Grab a new frame every 50ms
    game.time.events.loop(50, takeSnapshot, this);

    game.add.tween(alpha).to( { alpha: 0.5 }, 1000, "Cubic.easeInOut", true, 0, -1, true);

}

function camBlocked(video, error) {

    console.log('Camera was blocked', video, error);

}

function takeSnapshot() {

    if (bmd.width !== video.width || bmd.height !== video.height)
    {
        bmd.resize(video.width, video.height);
    }

    video.grab(true, alpha.alpha);

    bmd.draw(video.snapshot);

    bmd.draw('swirl', 0, 0, video.width, video.height, 'color');

}
