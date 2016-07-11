
//  Comment out the line below to see the rocker switch work as expected
window.PhaserGlobal = { disableWebAudio: true };

var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.stage.disableVisibilityChange = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.load.audio('music', 'rave_digger.mp3');

}

function create() {

    game.stage.backgroundColor = '#182d3b';

    music = game.add.audio('music');

    game.input.onDown.addOnce(function() { music.play(); });

}

function render() {

    game.debug.soundInfo(music, 20, 32);

}
