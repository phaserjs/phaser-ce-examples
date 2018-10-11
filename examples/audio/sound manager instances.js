
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var manager1Volume;
var manager2Volume;

var soundManager1;
var soundManager2;

var isPlaying = false;

function preload ()
{
    game.load.image('speakers','assets/sprites/speakers.png');

    game.load.audio('bass', 'assets/audio/tech/bass.mp3');
    game.load.audio('drums', 'assets/audio/tech/drums.mp3');
}

function create ()
{
    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    soundManager1 = new Phaser.SoundManager(game);
    soundManager2 = new Phaser.SoundManager(game);

    soundManager1.boot();
    soundManager2.boot();

    var bass = soundManager1.add('bass', 1, true, false);

    bass.context = soundManager1.context;
    bass.masterGainNode = soundManager1.masterGain;

    if (bass.context.createGain === undefined)
    {
        bass.gainNode = bass.context.createGainNode();
    }
    else
    {
        bass.gainNode = bass.context.createGain();
    }

    bass.gainNode.gain.value = 1;
    bass.gainNode.connect(bass.masterGainNode);

    var drums = soundManager2.add('drums', 1, true, false);

    drums.context = soundManager2.context;
    drums.masterGainNode = soundManager2.masterGain;

    if (drums.context.createGain === undefined)
    {
        drums.gainNode = drums.context.createGainNode();
    }
    else
    {
        drums.gainNode = drums.context.createGain();
    }

    drums.gainNode.gain.value = 1;
    drums.gainNode.connect(drums.masterGainNode);

    bass.play();
    drums.play();

    var bassSpeaker = game.add.sprite(100, 200, 'speakers');
    var drumsSpeaker = game.add.sprite(500, 200, 'speakers');

    bassSpeaker.inputEnabled = true;
    drumsSpeaker.inputEnabled = true;

    bassSpeaker.events.onInputDown.add(clickedBass, this);
    drumsSpeaker.events.onInputDown.add(clickedDrums, this);

    manager1Volume = game.add.text(100, 100, 'Volume: 1', { font: '16px Courier', fill: '#ffffff' });
    manager2Volume = game.add.text(500, 100, 'Volume: 1', { font: '16px Courier', fill: '#ffffff' });

    game.add.text(10, 10, 'Click top of speaker to lower volume, bottom to raise it', { font: '16px Courier', fill: '#ffffff' });
}

function clickedBass (sprite, pointer)
{
    if (pointer.y < 300)
    {
        soundManager1.volume -= 0.1;
    }
    else
    {
        soundManager1.volume += 0.1;
    }

    manager1Volume.text = 'Volume: ' + soundManager1.volume;
}

function clickedDrums (sprite, pointer)
{
    if (pointer.y < 300)
    {
        soundManager2.volume -= 0.1;
    }
    else
    {
        soundManager2.volume += 0.1;
    }

    manager2Volume.text = 'Volume: ' + soundManager2.volume;
}

function update ()
{
    soundManager1.update();
    soundManager2.update();
}
