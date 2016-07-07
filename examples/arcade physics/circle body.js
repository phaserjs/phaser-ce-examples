
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('wizball', 'assets/sprites/wizball.png');
    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');

}

var ball1;
var ball2;
var disk;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    disk = game.add.sprite(80, 0, 'disk');
    ball1 = game.add.sprite(100, 240, 'wizball');
    ball2 = game.add.sprite(700, 240, 'wizball');

    //  rect corners collide, but circles don't
    // ball2.x = 280;
    // ball2.y = 220;

    //  circles collide
    // ball2.x = 260;
    // ball2.y = 140;

    //  disk rect NOT collide with ball1, and is out of its bounds
    // disk.x = 320;
    // disk.y = 380;

    //  disk rect NOT collide with ball1, but is within its bounds
    // disk.x = 280;
    // disk.y = 380;

    //  disk rect WILL collide with ball1
    // disk.x = 270;
    // disk.y = 370;


    // game.physics.arcade.enable([ball1, ball2]);
    game.physics.arcade.enable([disk, ball1, ball2]);

    //  By default the Body is a rectangle. Let's turn it into a Circle with a radius of 45 pixels

    ball1.body.setCircle(45);
    ball2.body.setCircle(45);

    // ball1.body.immovable = true;
    // ball2.body.mass = 3;

    //  Set the ball to collide with the world, have gravity, bounce, and move.
    ball1.body.collideWorldBounds = true;
    ball2.body.collideWorldBounds = true;
    disk.body.collideWorldBounds = true;

    ball1.body.bounce.set(1);
    ball2.body.bounce.set(1);
    disk.body.bounce.set(1);

    ball1.body.gravity.y = 100;
    ball2.body.gravity.y = 100;
    disk.body.gravity.y = 100;

    // ball1.body.velocity.x = 50;
    // ball2.body.velocity.x = -50;

    ball1.body.velocity.set(150);
    ball2.body.velocity.set(-200, 60);
    disk.body.velocity.set(50);

    // game.input.onDown.add(function() { console.log(game.physics.arcade.intersects(ball1.body, ball2.body)); });
    // game.input.onDown.add(function() { console.log(game.physics.arcade.intersects(ball1.body, disk.body)); });

}

function update () {

    game.physics.arcade.collide(ball1, ball2);
    game.physics.arcade.collide(ball1, disk);
    game.physics.arcade.collide(ball2, disk);
    
}

function render () {

    game.debug.body(disk);
    game.debug.body(ball1);
    game.debug.body(ball2);

}