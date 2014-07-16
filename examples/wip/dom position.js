//  Let's create a DOM element to position

$("body").append( "<input type=\"text\" value=\"look at me!\" />" );

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/dr_death-e605-endpart.png');

}

var sprite;

function create() {

    var p1 = game.add.sprite(0, 0, 'pic');

}

function update() {
}

function render() {
}
