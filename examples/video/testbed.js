
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    //  To load an audio file use the following structure.
    //  As with all load operations the first parameter is a unique key, which must be unique between all audio files.

    //  The second parameter is an array containing the same audio file but in different formats.
    //  In this example the music is provided as an mp3 and a ogg (Firefox will want the ogg for example)

    //  The loader works by checking if the browser can support the first file type in the list (mp3 in this case). If it can, it loads it, otherwise
    //  it moves to the next file in the list (the ogg). If it can't load any of them the file will error.

    //  Both work now :)
    game.load.video('chrome', 'assets/video/output.webm');
    // game.load.video('chrome', 'assets/video/chrome.webm');

    // game.load.video('chrome', 'http://gametest.mobi/insideout/fear/v5/assets/hd/videos/intro.mp4?t=' + Date.now());

    // game.load.video('chrome', 'assets/video/liquid2.mp4');
    // game.load.audio('boden', 'assets/audio/tommy_in_goa.mp3');

}

var video;
var sprite;
var music;

function create() {

    console.log('create');

    game.stage.backgroundColor = '#232323';

    // console.log(game.cache.getVideo('chrome'));

    video = game.add.video('chrome');

    sprite = video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);

    video.play();

    // music = game.sound.play('boden');

    // game.input.onDown.add(play, this);
    // game.input.onDown.add(pause, this);
    // game.input.onDown.add(speed, this);
    // game.input.onDown.add(seek, this);

}

function play() {

    // ffmpeg -i %02d.png -i audio.wav output.webm

    // console.log('play');
    // video.play(true, 1);
    // video.play();

}

function pause() {

    video.paused = (video.paused) ? false : true;

}

function speed() {

    video.playbackRate++;

}

function seek() {

    video.currentTime = 0;

}

function update() {

    // sprite.rotation += 0.01;

}

function render() {

    // if (music.isDecoding)
    // {
    //     game.debug.text("Decoding MP3 ...", 300, 32);
    // }

    // game.debug.text(video.progress, 32, 32);
    // game.debug.text(video.playing, 32, 32);
    game.debug.text(video.currentTime, 32, 32);
    game.debug.text(video.duration, 32, 64);

}
