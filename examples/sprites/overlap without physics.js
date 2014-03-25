
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('atari1', 'assets/sprites/atari130xe.png');
    game.load.image('atari2', 'assets/sprites/atari800xl.png');

}

var sprite1;
var sprite2;
var text;

function create() {

    sprite1 = game.add.sprite(100, 200, 'atari1');
    sprite1.inputEnabled = true;
    sprite1.input.enableDrag();

    sprite2 = game.add.sprite(400, 400, 'atari2');
    sprite2.inputEnabled = true;
    sprite2.input.enableDrag();

    text = game.add.text(16, 16, 'Drag the sprites. Overlapping: false', { fill: '#ffffff' });

}

function update() {

    if (checkOverlap(sprite1, sprite2))
    {
        text.text = 'Drag the sprites. Overlapping: true';
    }
    else
    {
        text.text = 'Drag the sprites. Overlapping: false';
    }

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
