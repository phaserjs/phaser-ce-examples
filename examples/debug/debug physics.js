
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render  });

var sprite;
var counter = 0;
var step = Math.PI * 2 / 360;

function preload() {

    game.load.image('sprite', 'assets/sprites/phaser2.png');

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sprite');
    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);
    
}

function update()
{
    // Move sprite up and down smoothly for show
    var tStep = Math.sin(counter);
    sprite.body.y = 120 + tStep * 60;
    counter += step;
}

function render() {

    game.debug.body(sprite);

}
