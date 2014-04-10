
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var emitter;
var emitter2;
var emitter3;
var x;
var x3;

function preload() {

    game.load.image('flash', 'assets/particles/smoke-puff.png');
    game.load.image('bubble', 'assets/particles/green.png');
    game.load.image('bubble2', 'assets/particles/red.png');

}

function create() {

    emitter = game.add.emitter(game.world.centerX, 32, 250);

    emitter.makeParticles('bubble');

    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(300, 300);

    emitter.bringToTop = true;
    emitter.setRotation(0, 0);
    emitter.setAlpha(0.1, 1, 2000);
    emitter.setScale(0.1, 2, 4000);
    emitter.gravity = 50;

    emitter.start(false, 5000, 20);

    emitter.emitX = 100;

    game.add.tween(emitter).to( { emitX: 700 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    // game.add.tween(emitter).to( { emitX: 700 }, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);




    emitter3 = game.add.emitter(game.world.centerX, 32, 250);

    emitter3.makeParticles('bubble2');

    emitter3.setXSpeed(0, 0);
    emitter3.setYSpeed(300, 300);

    emitter3.bringToTop = true;
    emitter3.setRotation(0, 0);
    emitter3.setAlpha(0.1, 1, 2000);
    emitter3.setScale(0.1, 2, 4000);
    emitter3.gravity = 50;

    emitter3.start(false, 5000, 20);

    emitter3.emitX = 700;


    // game.add.tween(emitter).to( { emitX: 700 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    game.add.tween(emitter3).to( { emitX: 100 }, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);







    emitter2 = game.add.emitter(0, 0, 250);

    emitter2.makeParticles('flash');

    emitter2.setXSpeed(-100, 100);
    emitter2.setYSpeed(100, 200);

    // emitter2.setAlpha(0.1, 1, 1000, Phaser.Easing.Linear.None, true);
    emitter2.setScale(0, 1, 2000, Phaser.Easing.Back.Out, true);
    emitter2.setRotation(0, 90);
    emitter2.gravity = -650;

    game.input.onDown.add(boom, this);

}

function boom(p) {

    // emitter2.x = emitter.emitX;
    // emitter2.y = emitter.emitY + 100;
    emitter2.x = p.x;
    emitter2.y = p.y;
    emitter2.start(true, 3000, 30, 10);

}

function update() {

    // game.context.clearRect(0, 0, 800, 600);

}

