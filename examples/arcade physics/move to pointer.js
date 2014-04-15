
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var ball;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    ball = game.add.sprite(game.world.randomX, 200, 'ball');

    game.physics.arcade.enable(ball);

    game.physics.arcade.gravity.y = 200;

    ball.body.velocity.set(200, 200);
    ball.body.bounce.set(1, 1);
    ball.body.collideWorldBounds = true;

    game.input.onDown.add(moveBall, this);

}

function update() {
}

function moveBall(pointer) {

    ball.x = pointer.x;
    ball.y = pointer.y;

    //  Give a little boost to velocity
    ball.body.velocity.y *= 1.5;

}