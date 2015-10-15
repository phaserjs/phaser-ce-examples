
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser.png');

}

var sprite;

function create() {

    sprite = game.add.sprite(0, 0, 'phaser');

}

function update () {

    sprite.x = game.input.x;
    sprite.y = game.input.y;

}

function render () {

}
