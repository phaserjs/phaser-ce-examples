
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    game.load.image('undersea', 'assets/pics/undersea.jpg');
    game.load.image('coral', 'assets/pics/seabed.png');

}

var greenJellyfish;
var stingray;

function create() {

    game.add.image(0, 0, 'undersea');

    greenJellyfish = game.add.sprite(330, 100, 'seacreatures');
    greenJellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true);
    greenJellyfish.animations.play('swim');

    stingray = game.add.sprite(80, 190, 'seacreatures');
    stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
    stingray.animations.play('swim');

    game.add.image(0, 466, 'coral');

    game.add.tween(greenJellyfish).to({ y: 250 }, 4000, "Quad.easeInOut", true, 0, 1000, true);

    game.time.events.loop(Phaser.Timer.SECOND * 2, changeTint, this);

}

function changeTint() {

    greenJellyfish.tint = Math.random() * 0xffffff;
    stingray.tint = Math.random() * 0xffffff;

}