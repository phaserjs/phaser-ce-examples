
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.video('liquid', 'assets/video/liquid2.mp4');

}

var video;
var sprite;

function create() {

    video = game.add.video('liquid');

    video.onPlay.addOnce(start, this);

    sprite = video.addToWorld(400, 300, 0.5, 0.5);

    video.play();

}

function start() {

    //  After 5 seconds we'll swap to a new video
    game.time.events.add(5000, changeSource, this);

    //  This would swap on a mouse click
    // game.input.onDown.addOnce(changeSource, this);

}

function changeSource() {

    video.changeSource('assets/video/skull.mp4');

}

function render() {

    game.debug.text("Video width: " + video.video.videoWidth, 600, 32);
    game.debug.text("Video height: " + video.video.videoHeight, 600, 64);

    game.debug.text("Video Time: " + video.currentTime, 32, 32);
    game.debug.text("Video Duration: " + video.duration, 32, 64);

}
