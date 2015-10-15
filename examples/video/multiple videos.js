
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.add.text(100, 100, "Loading videos ...", { font: "65px Arial", fill: "#ff0044" });

    game.load.video('liquid', 'assets/video/skull.mp4');
    game.load.video('space', 'assets/video/wormhole.mp4');

}

var video1;
var video2;

function create() {

    video1 = game.add.video('space');
    video2 = game.add.video('liquid');

    video1.play(true);
    video2.play(true);

    //  x, y, anchor x, anchor y, scale x, scale y
    video1.addToWorld(400, 300, 0.5, 0.5);

    video2.addToWorld(780, 580, 1, 1, 0.5, 0.5);

}
