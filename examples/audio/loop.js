
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('speakers','assets/sprites/speakers.png');

    game.load.audio('bass', 'assets/audio/tech/bass.mp3');
    game.load.audio('drums', 'assets/audio/tech/drums.mp3');
    game.load.audio('percussion', 'assets/audio/tech/percussion.mp3');
    game.load.audio('synth1', 'assets/audio/tech/synth1.mp3');
    game.load.audio('synth2', 'assets/audio/tech/synth2.mp3');
    game.load.audio('top1', 'assets/audio/tech/top1.mp3');
    game.load.audio('top2', 'assets/audio/tech/top2.mp3');

}

var bass;
var drums;
var percussion;
var synth1;
var synth2;
var top1;
var top2;

var text;
var sounds;
var current;
var speakers;
var loopCount = 0;

function create() {

    game.stage.backgroundColor = '#838282';

    speakers = game.add.image(game.world.centerX, 500, 'speakers');
    speakers.anchor.set(0.5, 1);

    var style = { font: "65px Arial", fill: "#52bace", align: "center" };
    text = game.add.text(game.world.centerX, 100, "decoding", style);
    text.anchor.set(0.5);

    bass = game.add.audio('bass');
    drums = game.add.audio('drums');
    percussion = game.add.audio('percussion');
    synth1 = game.add.audio('synth1');
    synth2 = game.add.audio('synth2');
    top1 = game.add.audio('top1');
    top2 = game.add.audio('top2');

    sounds = [ bass, drums, percussion, synth1, synth2, top1, top2 ];

    //  Being mp3 files these take time to decode, so we can't play them instantly
    //  Using setDecodedCallback we can be notified when they're ALL ready for use.
    //  The audio files could decode in ANY order, we can never be sure which it'll be.

    game.sound.setDecodedCallback(sounds, start, this);

}

function start() {

    sounds.shift();

    bass.loopFull(0.6);
    bass.onLoop.add(hasLooped, this);

    text.text = 'bass';

}

function hasLooped(sound) {

    loopCount++;

    if (loopCount === 1)
    {
        sounds.shift();
        drums.loopFull(0.6);
        text.text = 'drums';
        game.add.tween(speakers.scale).to( { x: 1.3, y: 1.1 }, 230, "Sine.easeInOut", true, 0, -1, true);
    }
    else if (loopCount === 2)
    {
        current = game.rnd.pick(sounds);
        current.loopFull();
        text.text = current.key;
    }
    else if (loopCount > 2)
    {
        current.stop();
        current = game.rnd.pick(sounds);
        current.loopFull();
        text.text = current.key;
    }

}
