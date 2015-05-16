
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.video('liquid', 'assets/video/liquid2.mp4');
    game.load.video('space', 'assets/video/space.mp4');

}

var video1;
var video2;

function create() {

    video1 = game.add.video('liquid');
    video2 = game.add.video('space');

    video1.play(true);
    video2.play(true);

    video1.addToWorld(0, 0, 0, 0, 0.5, 0.5);
    video2.addToWorld(0, 300, 0, 0, 0.5, 0.5);

}

function render() {
}
