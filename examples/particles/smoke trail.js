
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var emitter;

function preload() {

    game.load.image('smoke', 'assets/particles/smoke-puff.png');

}

function create() {

    game.stage.backgroundColor = '#03273e';

    //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    emitter = game.add.emitter(game.world.centerX, 500, 400);

    //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    // emitter.width = 800;

    emitter.makeParticles('smoke');

    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(0, 0);

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.1, 1, 3000);
    emitter.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
    emitter.gravity = -100;

    emitter.start(false, 4000, 20);

    emitter.emitX = 64;
    emitter.emitY = 500;

    game.add.tween(emitter).to( { emitX: 800-64 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    game.add.tween(emitter).to( { emitY: 200 }, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);

}

function update() {

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