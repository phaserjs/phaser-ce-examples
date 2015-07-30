
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.audio('explosion', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');

}

var explosion;
var sword;
var blaster;

var text;

var text1;
var text2;
var text3;

function create() {

    game.stage.backgroundColor = '#414040';

    var style = { font: "65px Arial", fill: "#52bace", align: "center" };
    text = game.add.text(game.world.centerX, 100, "decoding", style);
    text.anchor.set(0.5);

    explosion = game.add.audio('explosion');
    sword = game.add.audio('sword');
    blaster = game.add.audio('blaster');

    //  Being mp3 files these take time to decode, so we can't play them instantly
    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
    //  The audio files could decode in ANY order, we can never be sure which it'll be.

    game.sound.setDecodedCallback([ explosion, sword, blaster ], start, this);

}

var keys;

function start() {

    text.text = 'Press 1, 2 or 3';

    var style = { font: "48px Arial", fill: "#cdba52", align: "center" };

    text1 = game.add.text(game.world.centerX, 250, "Blaster: Stopped", style);
    text1.anchor.set(0.5);

    text2 = game.add.text(game.world.centerX, 350, "Explosion: Stopped", style);
    text2.anchor.set(0.5);

    text3 = game.add.text(game.world.centerX, 450, "Sword: Stopped", style);
    text3.anchor.set(0.5);

    explosion.onStop.add(soundStopped, this);
    sword.onStop.add(soundStopped, this);
    blaster.onStop.add(soundStopped, this);

    keys = game.input.keyboard.addKeys({ blaster: Phaser.Keyboard.ONE, explosion: Phaser.Keyboard.TWO, sword: Phaser.Keyboard.THREE });

    keys.blaster.onDown.add(playFx, this);
    keys.explosion.onDown.add(playFx, this);
    keys.sword.onDown.add(playFx, this);

    //  And for touch devices you can also press the top, middle or bottom of the screen
    game.input.onDown.add(onTouch, this);

}

function onTouch(pointer) {

    var b = game.height / 3;

    if (pointer.y < b)
    {
        playFx(keys.blaster);
    }
    else if (pointer.y > b * 2)
    {
        playFx(keys.sword);
    }
    else
    {
        playFx(keys.explosion);
    }

}

function playFx(key) {

    switch (key.keyCode)
    {
        case Phaser.Keyboard.ONE:
            text1.text = "Blaster: Playing";
            blaster.play();
            break;

        case Phaser.Keyboard.TWO:
            text2.text = "Explosion: Playing";
            explosion.play();
            break;

        case Phaser.Keyboard.THREE:
            text3.text = "Sword: Playing";
            sword.play();
            break;
    }

}

function soundStopped(sound) {

    if (sound === blaster)
    {
        text1.text = "Blaster: Complete";
    }
    else if (sound === explosion)
    {
        text2.text = "Explosion: Complete";
    }
    else if (sound === sword)
    {
        text3.text = "Sword: Complete";
    }

}
