
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('picture7', 'assets/pics/slayer-sorry_im_the_beast.png');

}

// var timer;
// var total = 0;

function create() {

    // game.stage.backgroundColor = '#000';

}

function updateCounter() {

}

function render() {

    game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);

}
