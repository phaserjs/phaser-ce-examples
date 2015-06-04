
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/pics/mighty_no_09_cover_art_by_robduenas.jpg');
    // game.load.script('pixelate', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Pixelate.js');
    game.load.script('pixelate', '/phaser/filters/Pixelate.js');

}

function create() {

	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
	logo.anchor.setTo(0.5, 0.5);

	var pixelate = game.add.filter('Pixelate');

	logo.filters = [pixelate];

    game.add.tween(pixelate).to( { sizeX: 100, sizeY: 100 }, 5000, "Quad.easeInOut", true, 0, -1, true);

}
