
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var ball;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    ball = game.add.sprite(game.world.randomX, 200, 'ball');

    game.physics.arcade.enable(ball);

    game.camera.follow(ball);

    game.input.onDown.add(moveBall, this);

}

function moveBall() {

    //  If we don't it'll look very wrong
    game.camera.follow();

    game.physics.arcade.moveToPointer(ball, 100);

    //  The maxTime parameter lets you control how fast it will arrive at the Pointer coords
    // game.physics.arcade.moveToPointer(ball, 100, game.input.activePointer, 1000);


}

function render() {

    game.debug.text("distance: " + game.physics.arcade.distanceToPointer(ball), 32, 32);

}