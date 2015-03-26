
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bg', 'assets/pics/cougar_dragonsun.png');

    game.load.spritesheet('button', 'assets/buttons/flixel-button.png', 80, 20);
    game.load.bitmapFont('nokia', 'assets/fonts/bitmapFonts/nokia16black.png', 'assets/fonts/bitmapFonts/nokia16black.xml');

    game.load.audio('sfx', [ 'assets/audio/SoundEffects/magical_horror_audiosprite.mp3', 'assets/audio/SoundEffects/magical_horror_audiosprite.ogg' ]);

}

var fx;

function create() {

    var bg = game.add.image(0, 0, 'bg');
    bg.width = 800;
    bg.height = 600;

	//	Here we set-up our audio sprite
	fx = game.add.audio('sfx');
    fx.allowMultiple = false;

	//	And this defines the markers.

	//	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.

    fx.addMarker('charm', 0, 2.7);
    fx.addMarker('curse', 4, 2.9);
    fx.addMarker('fireball', 8, 5.2);
    fx.addMarker('spell', 14, 4.7);
    fx.addMarker('soundscape', 20, 18.8);
	
	//	Make some buttons to trigger the sounds
	makeButton('charm', 600, 100);
	makeButton('curse', 600, 140);
	makeButton('fireball', 600, 180);
	makeButton('spell', 600, 220);
    makeButton('soundscape', 600, 260);

	makeButton('pause', 600, 380);

}

function makeButton(name, x, y) {

    var button = game.add.button(x, y, 'button', click, this, 0, 1, 2);
    button.name = name;
    button.scale.set(2, 1.5);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', name, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);

}

function click(button) {

    if (button.name === 'pause')
    {
        if (fx.paused)
        {
            fx.resume();
        }
        else
        {
            fx.pause();
        }
    }
    else
    {
    	fx.play(button.name);
    }

}