
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var mummy1;
var mummy2;
var mummy3;

function create() {

	game.stage.backgroundColor = 0x3d4d3d;

    mummy1 = game.add.sprite(300, 300, 'mummy', 0);

    mummy2 = game.add.sprite(400, 300);

    mummy3 = game.add.sprite(500, 300, 'mummy', 5);
 
}
