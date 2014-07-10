
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/giant.png');

}

var atari;
var r;

function create() {

    r = new Phaser.Rectangle(0, 0, 320, 50);

    atari = game.add.image(200, 200, 'pic');

    // atari.anchor.set(0.5);
    // atari.tint = Math.random() * 0xffffff;

    atari.crop(r);

    game.input.onDown.add(updateCrop, this);

}

function updateCrop() {

    // r.width += 4;
    r.height += 4;
    // r.y += 2;

    atari.updateCrop();

}

function update() {

    // atari.rotation += 0.01;

}

function render() {

    // game.debug.geom(atari.getBounds());
    // game.debug.spriteInfo(atari, 32, 32);

}
