
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var balls;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    balls = game.add.physicsGroup();

    for (var i = 0; i < 16; i++)
    {
        var ball = balls.create(game.rnd.between(32, 768), game.rnd.between(32, 568), 'ball');
        ball.body.setCircle(16);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);
        ball.body.gravity.y = 100;
        ball.body.velocity.set(game.rnd.between(-100, 100), game.rnd.between(-100, 100));
    }

}

function update () {

    game.physics.arcade.collide(balls);
    
}

function render () {

    // game.debug.body(disk);
    // game.debug.body(ball1);
    // game.debug.body(ball2);

}