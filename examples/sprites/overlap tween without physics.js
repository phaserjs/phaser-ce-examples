
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

    sprite2 = game.add.sprite(400, 100, 'atari2');

    game.add.tween(sprite2).to( { y: 400 }, 3000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);

    text = game.add.text(16, 16, 'Drag the sprite. Overlapping: false', { fill: '#ffffff' });

}

function update() {

    if (checkOverlap(sprite1, sprite2))
    {
        text.text = 'Drag the sprite. Overlapping: true';
    }
    else
    {
        text.text = 'Drag the sprite. Overlapping: false';
    }

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
