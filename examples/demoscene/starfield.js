var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

var distance = 300;
var speed = 4;
var stars;

var max = 200;
var xx = [];
var yy = [];
var zz = [];


function preload() {
    game.load.image('disk', 'assets/demoscene/bread-lsd.png');
    game.load.image('ball', 'assets/sprites/mushroom2.png');
}

var parent;
var child;

function create() {
    parent = game.add.sprite(0, 0, 'disk');
    parent.name = 'disk';

    //  Even though the parent will scale, the child will remain at its own scale (and this is carried on down to any of its children)
    game.add.tween(parent.scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
}

function update() {

}

