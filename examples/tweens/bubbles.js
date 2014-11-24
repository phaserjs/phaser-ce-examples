
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('space', 'assets/pics/thalion-rain.png');
    game.load.image('ball', 'assets/particles/bubble256.png');
    
}

var bg;

function create() {

    bg = game.add.tileSprite(0, 0, 800, 600, 'space');

    var delay = 0;

    for (var i = 0; i < 40; i++)
    {
        var sprite = game.add.sprite(-100 + (game.world.randomX), 600, 'ball');

        sprite.scale.set(game.rnd.realInRange(0.1, 0.6));

        var speed = game.rnd.between(4000, 6000);

        game.add.tween(sprite).to({ y: -256 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

        delay += 200;
    }

}

function update() {

    bg.tilePosition.y += 0.4;

}