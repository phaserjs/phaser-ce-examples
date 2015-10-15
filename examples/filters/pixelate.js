
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/pics/mighty_no_09_cover_art_by_robduenas.jpg');

    game.load.shader('pixelate', 'assets/shaders/pixelate.frag');

}

function create() {

	var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');

	logo.anchor.set(0.5);

	var pixelate = game.add.filter('Pixelate', null, game.cache.getShader('pixelate'));

    // filter = new Phaser.Filter(game, null, game.cache.getShader('bacteria'));

	logo.filters = [pixelate];

    game.add.tween(pixelate).to( { sizeX: 100, sizeY: 100 }, 5000, "Quad.easeInOut", true, 0, -1, true);

}
