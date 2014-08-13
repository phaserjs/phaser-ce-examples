
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    game.load.image('undersea', 'assets/pics/undersea.jpg');

}

var greenJellyfish;

function create() {

    game.add.image(0, 0, 'undersea');

    greenJellyfish = game.add.sprite(330, 100, 'seacreatures', 'greenJellyfish0000');

    game.input.onDown.add(changeFrame, this);

}

function changeFrame() {

    greenJellyfish.frameName = 'greenJellyfish0010';

}
