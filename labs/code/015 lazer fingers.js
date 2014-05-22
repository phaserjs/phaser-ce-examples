
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('blue', 'assets/particles/blue.png');
    game.load.image('green', 'assets/particles/yellow.png');
    game.load.image('red', 'assets/particles/red.png');

}

var emitter1;
var emitter2;
var emitter3;

function makeEmitter(obj, key) {

    this[obj] = game.add.emitter(game.world.centerX, game.world.centerY, 300);
    this[obj].makeParticles(key);
    this[obj].gravity = 700;
    this[obj].setScale(0.7, 0, 0.7, 0, 5000);
    this[obj].minParticleSpeed.set(-100, -250);
    this[obj].maxParticleSpeed.set(100, -500);
    this[obj].particleSendToBack = true;

}

function create() {

    //  Allow 3 fingers
    game.input.addPointer();

    makeEmitter('emitter1', 'red');
    makeEmitter('emitter2', 'green');
    makeEmitter('emitter3', 'blue');

    createText(16, 16, 'best on a multi-touch device');

}

function update() {

    if (game.input.mousePointer.isDown)
    {
        emitter1.emitX = game.input.mousePointer.x;
        emitter1.emitY = game.input.mousePointer.y;
        emitter1.start(true, 5000, 20);
    }
    else if (game.input.pointer1.isDown)
    {
        emitter1.emitX = game.input.pointer1.x;
        emitter1.emitY = game.input.pointer1.y;
        emitter1.start(true, 5000, 20);
    }

    if (game.input.pointer2.isDown)
    {
        emitter2.emitX = game.input.pointer2.x;
        emitter2.emitY = game.input.pointer2.y;
        emitter2.start(true, 5000, 20);
    }

    if (game.input.pointer3.isDown)
    {
        emitter3.emitX = game.input.pointer3.x;
        emitter3.emitY = game.input.pointer3.y;
        emitter3.start(true, 5000, 20);
    }

}

function createText(x, y, string) {

    var text = game.add.text(x, y, string);
    text.font = 'Arial';
    text.fontSize = 14;
    text.fill = '#ffffff';
    text.setShadow(2, 2, 'rgba(0, 0, 0, 0.7)', 2);

    return text;

}
