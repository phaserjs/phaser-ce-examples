
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.video('liquid', 'assets/video/liquid2.mp4');

}

var video;
var sprite;

function create() {

    video = game.add.video('liquid');

    video.onPlay.addOnce(start, this);

    sprite = video.addToWorld();
    sprite.scale.set(0.5);

    video.play();

}

function start() {

    //  After 5 seconds we'll swap to a new video
    // game.time.events.add(5000, changeSource, this);

    game.input.onDown.addOnce(changeSource, this);

}

function changeSource() {

    video.changeSource('/inside-out/games/disgust/assets/sd/videos/intro.mp4');

}

function render() {

    // game.debug.text(video.progress, 32, 32);
    game.debug.text(video.video.videoWidth, 420, 32);
    game.debug.text(video.video.videoHeight, 480, 32);

    game.debug.text(video.playing, 320, 32);
    game.debug.text(video.currentTime, 32, 32);
    game.debug.text(video.duration, 32, 64);

}
