
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');
    game.load.image('block', 'assets/sprites/block.png');

}

var atari;
var block;
var text;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#07ba9a';

    atari = game.add.sprite(300, 200, 'atari');
    // block = game.add.sprite(0, 230, 'block');
    block = game.add.sprite(100, 0, 'block');

    game.physics.arcade.enable([atari, block]);

    block.body.velocity.x = 50;
    block.body.velocity.y = 50;

    text = game.add.text();

    // game.input.onDown.add(big, this);

}

function update() {

    if (game.physics.arcade.overlap(atari, block))
    {
        text.text = "Overlap: " + block.body.overlapX.toString();
        block.tint = 0xff0000;
    }
    else
    {
        text.text = "No overlap";
        block.tint = 0xffffff;
    }

}
