
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/pics/mighty_no_09_cover_art_by_robduenas.jpg');

    game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Pixelate.js');

}

function create() {

	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');

	logo.anchor.set(0.5);

    var filter = game.add.filter('Pixelate', 800, 600);

	logo.filters = [filter];

    game.add.tween(filter).to( { sizeX: 100, sizeY: 100 }, 5000, "Quad.easeInOut", true, 0, -1, true);

}
