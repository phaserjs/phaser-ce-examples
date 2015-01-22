
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var emitter;
var x;

function preload() {

    game.load.image('bubble', 'assets/particles/bubble.png');
    game.load.image('water', 'assets/skies/underwater2.png');

}

function create() {

    game.add.image(0, 0, 'water');

    //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    emitter = game.add.emitter(game.world.centerX, 400, 400);

    //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    // emitter.width = 800;

    emitter.makeParticles('bubble');

    // emitter.minParticleSpeed.set(0, 300);
    // emitter.maxParticleSpeed.set(0, 600);

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.1, 1, 3000);
    emitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);
    emitter.gravity = -200;

    emitter.start(false, 5000, 10);

    emitter.emitX = 0;

    game.add.tween(emitter).to( { emitX: 800 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

}

function update() {

	// emitter.emitX

    emitter.customSort(scaleSort, this);

}

function scaleSort(a, b) {

    if (a.scale.x < b.scale.x)
    {
        return -1;
    }
    else if (a.scale.x > b.scale.x)
    {
        return 1;
    }
    else
    {
        return 0;
    }

}

function render() {
	// game.debug.text(emitter.total, 32, 32);
}