
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('einstein', 'assets/pics/ra_einstein.png');

}

var image;

function create() {

    image = game.add.image(400, 300, 'einstein', null, game.stage);

    image.name = 'bob';

    console.log(image);

}

function render() {

    // debugger;

}