
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var emitter;

function preload() {

    game.load.image('bubble', 'assets/particles/bubble.png');
    game.load.image('water', 'assets/skies/sunset.png');

}

function create() {

    game.add.image(0, 0, 'water');

    //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    emitter = game.add.emitter(game.world.centerX, 200, 200);

    //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    emitter.width = 800;

    emitter.makeParticles('bubble');

    emitter.minParticleSpeed.set(0, 300);
    emitter.maxParticleSpeed.set(0, 400);

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(0.5, 0.5, 1, 1);
    emitter.gravity = -200;

    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
    //	The 5000 value is the lifespan of each particle before it's killed
    emitter.start(false, 5000, 100);

}

function render() {
	// game.debug.text(emitter.total, 32, 32);
}