
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.audio('sfx', [ 'assets/audio/SoundEffects/fx_mixdown.mp3', 'assets/audio/SoundEffects/fx_mixdown.ogg' ]);

}

var fx;

function create() {

	//	Here we set-up our audio sprite
	fx = game.add.audio('sfx');
    // fx.allowMultiple = true;

	//	And this defines the markers.

	//	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
	//	You can also set the volume and loop state, although we don't use them in this example (see the docs)

	fx.addMarker('alien death', 1, 1.0);
	fx.addMarker('boss hit', 3, 0.5);

    fx.play(button.name);

}

function click(button) {


}