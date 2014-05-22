
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);

}

var music;

function create() {

	var bmd = game.make.bitmapData(800, 600);
	bmd.context.fillStyle = '#754c24';
	bmd.context.fillRect(0, 0, 800, 300);
	bmd.context.fillStyle = '#24756b';
	bmd.context.fillRect(0, 300, 800, 300);
	game.add.image(0, 0, bmd);

    music = game.add.audio('boden');

    music.play();

	game.input.onDown.add(handleClick);

}

function handleClick(pointer) {

	if (pointer.y <= 300)
	{
		game.paused = !game.paused
	}
	else
	{
		//	It is entirely possible to un-mute audio WHILE a game is paused.
		//	I consider this a feature, so I'm not going to prevent it.
		//	What this test should demonstrate is that paused audio isn't restarted when a game un-pauses.
		game.sound.mute = !game.sound.mute;
	}

}

function render() {

	game.debug.text('Click to toggle game paused state', 32, 32);
	game.debug.text('Game Paused: ' + game.paused, 32, 96);

	game.debug.text('Click to toggle audio mute', 32, 332);
    game.debug.soundInfo(music, 32, 396);

}
