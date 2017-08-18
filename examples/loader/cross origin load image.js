
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.crossOrigin = 'anonymous';

    game.load.baseURL = 'http://media.monsoon.co.uk/assets/js/game/v9/';

    game.load.image('imageKey', 'assets/images/bg_sky.jpg');

}

function create() {

    game.add.sprite(0, 0, 'imageKey');

}
