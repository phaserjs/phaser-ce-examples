
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');

}

var atari;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    atari = game.add.sprite(0, 100, 'atari');

    game.physics.arcade.enable(atari);

    atari.body.velocity.x = 50;

    game.input.onDown.add(big, this);

}

function update() {


}

function big() {

    atari.scale.set(2);

}

function render() {

}
