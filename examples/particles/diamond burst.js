
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var emitter;

function preload() {

    game.load.image('diamond', 'assets/sprites/diamond.png');

}

function create() {

    game.stage.backgroundColor = '#337799';

    emitter = game.add.emitter(game.world.centerX, 200, 200);

    emitter.makeParticles('diamond');

    //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
    //	The 5000 value is the lifespan of each particle
    emitter.start(false, 5000, 20);

}
