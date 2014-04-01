
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

}

var text;
var button;
var x = 32;
var y = 80;

function create() {

    game.stage.backgroundColor = '#182d3b';

    //	You can listen for each of these events from Phaser.Loader
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);

    //	Just to kick things off
    button = game.add.button(game.world.centerX - 95, 400, 'button', start, this, 2, 1, 0);

    //	Progress report
    text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });

}

function start() {

    game.load.image('picture1', 'assets/pics/mighty_no_09_cover_art_by_robduenas.jpg');
    game.load.image('picture2', 'assets/pics/cougar_dragonsun.png');
    game.load.image('picture3', 'assets/pics/trsipic1_lazur.jpg');
    game.load.image('picture4', 'assets/pics/archmage_in_your_face.png');
    game.load.image('picture5', 'assets/pics/acryl_bladerunner.png');
    game.load.image('picture6', 'assets/pics/acryl_bobablast.png');
    game.load.image('picture7', 'assets/pics/alex-bisleys_horsy_5.png');

    game.load.start();

    button.visible = false;

}

function loadStart() {

	text.setText("Loading ...");

}

//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

	text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

	var newImage = game.add.image(x, y, cacheKey);

	newImage.scale.set(0.3);

	x += newImage.width + 20;

	if (x > 700)
	{
		x = 32;
		y += 332;
	}

}

function loadComplete() {

	text.setText("Load Complete");

}
