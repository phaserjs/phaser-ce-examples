
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('greenie', 'assets/sprites/wizball.png');
    game.load.audio('wizball', ['assets/audio/oedipus_wizball_highscore.mp3', 'assets/audio/oedipus_wizball_highscore.ogg']);

}

var s;
var music;

function create() {

    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    music = game.add.audio('wizball');

    music.play();

    s = game.add.sprite(game.world.centerX, game.world.centerY, 'greenie');
    s.anchor.set(0.5);

    game.input.onDown.add(restartMusic, this);

}

function restartMusic() {

    music.restart();

}

function update() {

    s.rotation += 0.01;

}

function render() {

    game.debug.soundInfo(music, 20, 32);

}

