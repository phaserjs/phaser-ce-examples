
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('ilkke', 'assets/sprites/atari800xl.png');

}

var sprite;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Set the world (global) gravity
    game.physics.arcade.gravity.y = 100;

    //  Sprite 1 will use the World (global) gravity
    sprite = game.add.sprite(100, 96, 'ilkke');

    game.physics.arcade.enable(sprite);

    sprite.body.collideWorldBounds = true;
    sprite.body.velocity.x = 200;
    sprite.body.bounce.set(0.9);

    //  Also enable sprite for drag
    sprite.inputEnabled = true;
    sprite.input.enableDrag();

    sprite.events.onDragStart.add(startDrag, this);
    sprite.events.onDragStop.add(stopDrag, this);

    game.add.text(32, 32, 'Drag and release the sprite', { font: '16px Arial', fill: '#ffffff' });

}

function startDrag() {

    //  You can't have a sprite being moved by physics AND input, so we disable the physics while being dragged
    sprite.body.moves = false;

}

function stopDrag() {

    //  And re-enable it upon release
    sprite.body.moves = true;

}
