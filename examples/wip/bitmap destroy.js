
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser.png');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml', null, 0, -32);

}

var bob;

function create() {

    bob = game.add.group();

    var text = game.add.bitmapText(100, 300, 'desyrel', 'Phaser & Pixi\nrocking!', 64);

    bob.add(text);

    game.input.onDown.add(nuke, this);

}

function nuke() {

    bob.destroy();

}

function update() {

}

function render() {

}
