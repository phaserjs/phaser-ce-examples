
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/dr_death-e605-endpart.png');

}

var sprite;

function create() {

    var group = game.add.group();

    group.create(100, 100, 'pic');

    group.alpha = 0;

    // sprite = game.add.sprite(0, 0, 'pic');

}

function update() {


}

function render() {

}
