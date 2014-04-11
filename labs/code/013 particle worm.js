
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var emitter1;
var emitter2;
var emitter3;

function preload() {

    game.load.image('green', 'assets/particles/green.png');
    game.load.image('red', 'assets/particles/red.png');
    game.load.image('blue', 'assets/particles/blue.png');

}

function create() {

    emitter1 = game.add.emitter(game.world.centerX, 32, 250);

    emitter1.makeParticles('green');
    emitter1.setXSpeed(0, 0);
    emitter1.setYSpeed(300, 300);
    emitter1.bringToTop = true;
    emitter1.setRotation(0, 0);
    emitter1.setAlpha(0.1, 1, 2000);
    emitter1.setScale(0.1, 2, 0.1, 2, 4000);
    emitter1.gravity = 50;
    emitter1.start(false, 5000, 20);
    emitter1.emitX = 100;

    game.add.tween(emitter1).to( { emitX: 700 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);

    emitter2 = game.add.emitter(game.world.centerX, 32, 250);

    emitter2.makeParticles('red');
    emitter2.setXSpeed(0, 0);
    emitter2.setYSpeed(300, 300);
    emitter2.bringToTop = true;
    emitter2.setRotation(0, 0);
    emitter2.setAlpha(0.1, 1, 2000);
    emitter2.setScale(0.1, 2, 0.1, 2, 4000);
    emitter2.gravity = 50;
    emitter2.start(false, 5000, 20);
    emitter2.emitX = 700;

    game.add.tween(emitter2).to( { emitX: 100 }, 4000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);

    emitter3 = game.add.emitter(game.world.centerX, 32, 250);

    emitter3.makeParticles('blue');
    emitter3.setXSpeed(0, 0);
    emitter3.setYSpeed(300, 300);
    emitter3.bringToTop = true;
    emitter3.setRotation(0, 0);
    emitter3.setAlpha(0.1, 1, 2000);
    emitter3.setScale(0.1, 2, 0.1, 2, 4000);
    emitter3.gravity = 50;
    emitter3.start(false, 5000, 20);
    emitter3.emitX = 100;

    game.add.tween(emitter3).to( { emitX: 700 }, 3000, Phaser.Easing.Quartic.InOut, true, 0, Number.MAX_VALUE, true);

}
