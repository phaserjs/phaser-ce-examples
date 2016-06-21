
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var audioJSON = {
    spritemap: {
        'part1': {
            start: 1,
            end: 20,
            loop: false
        },
        'part2': {
            start: 21,
            end: 60,
            loop: false
        }
    }
};

function preload() {

    game.load.image('disk', 'assets/sprites/ra_dont_crack_under_pressure.png');
    game.load.audiosprite('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg'], null, audioJSON);

}

var s;
var music;

function create() {

    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    music = game.add.audioSprite('boden');
    music.play('part2');

    s = game.add.sprite(game.world.centerX, game.world.centerY, 'disk');
    s.anchor.setTo(0.5, 0.5);

}

function update() {
    s.rotation += 0.01;
}

function render() {
}

