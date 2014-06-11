
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/dr_death-e605-endpart.png');

}

var sprite;

function create() {

    var p1 = game.add.sprite(0, 0, 'pic');

    // console.log(p1.texture);

    // p1.texture.frame.x = 0;
    p1.texture.frame.width = 200;

    var p2 = game.add.sprite(360, 0, 'pic');

    // console.log(p2.texture);

}

function update() {


}

function render() {

}
