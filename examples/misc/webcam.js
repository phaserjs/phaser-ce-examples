
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload () {

    game.load.script('webcam', '../_plugins/Webcam.js');

}

var webcam;
var bmd;
var sprite;

function create () {

    webcam = game.plugins.add(Phaser.Plugin.Webcam);

    bmd = game.make.bitmapData(800, 600);
    sprite = bmd.addToWorld();

    webcam.start(800, 600, bmd.context);

    game.input.onDown.addOnce(takePicture, this);

}

function takePicture () {

    webcam.stop();

    //  bmd.context now contains your webcam image

    sprite.tint = Math.random() * 0xff0000;

}
