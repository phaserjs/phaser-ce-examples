var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var mummy;
var image;
var bmd;

function create() {

    game.stage.backgroundColor = '#4285f4';

    mummy = game.add.sprite(300, 200, 'mummy', 2);

	bmd = game.add.bitmapData(300, 300);
    bmd.load(mummy);

    // bmd.drawSprite(mummy, 0, 0);

	game.add.image(0, 0, bmd);

}

function update() {


}

function render() {


}
