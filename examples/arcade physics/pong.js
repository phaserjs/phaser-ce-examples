
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('wizball', 'assets/sprites/wizball.png');

}

var paddle;
var ball;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    paddle = game.add.sprite(400, 300, 'wizball');
    ball = game.add.sprite(400, 100, 'wizball');

    // paddle = game.add.sprite(100, 500, 'wizball');
    // ball = game.add.sprite(400, 430, 'wizball');

    game.physics.arcade.enable([paddle, ball]);

    //  By default the Body is a rectangle. Let's turn it into a Circle with a radius of 45 pixels

    paddle.body.setCircle(45);
    ball.body.setCircle(45);

    //  The paddle
    paddle.body.immovable = true;

    //  Set the ball to collide with the world, have gravity, bounce, and move.
    paddle.body.collideWorldBounds = true;
    ball.body.collideWorldBounds = true;

    paddle.body.bounce.set(1);
    ball.body.bounce.set(1);

    ball.body.gravity.y = 200;
    ball.body.velocity.y = 100;

    paddle.body.velocity.y = -200;

}

function update () {

    // console.log('tick');
    game.physics.arcade.collide(paddle, ball);
    
}

function render () {

    game.debug.body(paddle);
    game.debug.body(ball);

}