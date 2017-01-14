
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('atlas', 'assets/sprites/phaser3-test1.png', 'assets/sprites/phaser3-test1.json');

}

var img1;
var img2;
var img3;

function create() {

    img1 = game.add.image(0, 0, 'atlas', 'hello', game.stage);
    img2 = game.add.image(510, 240, 'atlas', 'contra3', game.stage);
    img3 = game.add.image(80, 40, 'atlas', 'titan_mech', game.stage);

}
