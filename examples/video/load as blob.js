
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.add.text(100, 100, "Loading videos ...", { font: "65px Arial", fill: "#ff0044" });

    game.load.video('space', 'assets/video/wormhole.mp4', 'canplaythrough', true);

}

var video;

function create() {

    video = game.add.video('space');

    video.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video.addToWorld();

}
