
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('hotdog', 'assets/sprites/hotdog.png');

}

function create() {

    //  You can set the background color of your game in the following ways:

    game.stage.backgroundColor = "#4488AA";
    // game.stage.backgroundColor = 0x4488aa;
    // game.stage.backgroundColor = 'rgb(68, 136, 170)';
    // game.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';

    game.add.image(game.world.centerX, game.world.centerY, 'hotdog').anchor.set(0.5);

    //  Click for a new background color
    game.input.onDown.add(changeColor, this);

}

function changeColor() {

    var c = Phaser.Color.getRandomColor(50, 255, 255);

    game.stage.backgroundColor = c;

    game.fd.record(4);

}
