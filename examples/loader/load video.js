
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    //  To load a video file use the following structure.
    //  As with all load operations the first parameter is a unique key, which must be unique between all video files.

    game.load.video('chrome', 'assets/video/chrome.webm');

}

var video;
var sprite;

function create() {

    game.stage.backgroundColor = '#232323';

    video = game.add.video('chrome');

    //  See the docs for the full parameters
    //  But it goes x, y, anchor x, anchor y, scale x, scale y
    sprite = video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 2, 2);

    //  true = loop
    video.play(true);

    game.input.onDown.add(pause, this);

}

function pause() {

    video.paused = (video.paused) ? false : true;

}

function render() {

    game.debug.text("Video Time: " + video.currentTime, 32, 20);
    game.debug.text("Video Duration: " + video.duration, 550, 20);

    game.debug.text("Video Progress: " + Math.round(video.progress * 100) + "%", 32, 590);
    game.debug.text("Video Playing: " + video.playing, 550, 590);

}
