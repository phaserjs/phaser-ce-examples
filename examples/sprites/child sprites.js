
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var parent;

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

function create() {

    // parent = game.add.group();

    // parent.create(0, 0, 'mummy');
    // parent.create(100, 0, 'mummy');
    // parent.create(100, 100, 'mummy');
    // parent.create(0, 100, 'mummy');

    parent = game.add.sprite();

    parent.addChild(game.make.sprite(0, 0, 'mummy'));
    parent.addChild(game.make.sprite(100, 0, 'mummy'));
    parent.addChild(game.make.sprite(100, 100, 'mummy'));
    parent.addChild(game.make.sprite(0, 100, 'mummy'));

}

function update() {

}

function render() {

    game.debug.geom(parent.getBounds());

}