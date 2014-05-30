var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create:
create, update: update, render: render });

function preload() {
    game.load.image('atari', 'assets/sprites/atari130xe.png');
    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
}

var sprite1;
var sprite2;
var force2 = 0;
var takeOff2 = false;
var count2 = 0;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite1 = game.add.sprite(300, game.world.height, 'atari');
    sprite2 = game.add.sprite(300, game.world.height - 200, 'mushroom');
    game.physics.enable([sprite1, sprite2], Phaser.Physics.ARCADE);
    
    sprite1.name = 'atari';
//    sprite1.body.immovable = true;
    sprite1.body.collideWorldBounds = true;
    
    sprite2.name = 'mushroom';
    sprite2.body.gravity.y = 100;
    sprite2.body.collideWorldBounds = true;
}

function update() {
    game.physics.arcade.collide(sprite1, sprite2, collisionHandler, null, this);
    if (takeOff2)
        force2 -= .5;
    sprite2.body.velocity.y += force2;
}

function collisionHandler
(obj1, obj2) {
    // let it sit in contact for one frame before attempting to take off
    if (count2++ > 0)
        takeOff2 = true;
}

function render() {
    game.debug.text("force " + force2, 0, 50);
}