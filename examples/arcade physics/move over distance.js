
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('clown', 'assets/sprites/clown.png');
    game.load.image('block', 'assets/sprites/block.png');

}

var sprite;
var block;
var startTime = 0;
var endTime = 0;
var duration = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite = game.add.sprite(200, 300, 'clown');
    block = game.add.sprite(600, 280, 'block');

    game.physics.arcade.enable(sprite);
    game.physics.arcade.enable(block);

    sprite.body.bounce.set(1);
    sprite.body.collideWorldBounds = true;

    block.body.immovable = true;

    sprite.body.onMoveComplete.add(moveOver, this);

    game.input.onDown.addOnce(move, this);

}

function move() {

    //  Move the Body 300 pixels to the right, over 2000 ms
    sprite.body.moveTo(2000, 300, Phaser.ANGLE_RIGHT);

    // sprite.body.stopVelocityOnCollide = false;
    // sprite.body.moveTo(Phaser.ANGLE_RIGHT, 2000, 400);

    // sprite.body.moveFrom(2000, 100, Phaser.ANGLE_RIGHT);
    // sprite.body.moveFrom(2000, 100, 300);

    startTime = game.time.time;
    duration = 0;

}

function moveOver() {

    // sprite.body.move(Phaser.ANGLE_LEFT, 400, 3000, moveCallback, this);

    endTime = game.time.time;
    duration = endTime - startTime;

}

function moveCallback(body, velocity, percent) {

    velocity.y = -200 + (Math.sin(percent) * 400);

}

function update() {

    game.physics.arcade.collide(sprite, block);

}

function render() {

    game.debug.text("expire: " + sprite.body.moveTimer, 32, 32);
    game.debug.text("vx: " + sprite.body.velocity.x, 300, 32);
    game.debug.text("vy: " + sprite.body.velocity.y, 600, 32);
    game.debug.text("duration: " + duration, 32, 64);
    game.debug.text("m: " + sprite.body.isMoving, 300, 64);
    game.debug.text("sx: 200", 32, 96);

}

