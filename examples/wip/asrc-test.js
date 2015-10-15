
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/dr_death-e605-endpart.png');

}

var sprite1;
var sprite2;
var sprite3;

function create() {

    sprite1 = game.add.sprite(0, 0, 'pic');

    sprite2 = game.add.sprite(100, 100);
    sprite2.addChild(game.make.sprite(0, 0, 'pic'));

    sprite3 = game.add.sprite(200, 200, 'pic');

}

function update() {


}

function render() {

}
