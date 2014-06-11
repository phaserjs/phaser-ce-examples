
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('einstein', 'assets/pics/mighty_no_09_cover_art_by_robduenas.jpg');

}

function create() {

    game.add.sprite(0, 0, 'einstein');

}
