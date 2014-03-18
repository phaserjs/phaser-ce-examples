
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('bullets', 'assets/sprites/balls.png', 17, 17);

}

var balls;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    balls = [];

    for (var i = 0; i < 20; i++)
    {
        balls.push(game.add.sprite(80 + 32 * i, 100, 'bullets', game.rnd.integerInRange(0, 6)));
    }

    game.input.onDown.add(removeRandom, this);

}

function removeRandom() {

    var ball = game.math.removeRandom(balls);

    if (ball)
    {
        ball.destroy();
    }


}

