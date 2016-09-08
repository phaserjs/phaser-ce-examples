
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('arrow', 'assets/sprites/longarrow.png');
    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var arrow;
var sprite1;
var sprite2;
var sprite3;
var sprite4;
var sprite5;
var sprite6;

var target;

var t;
var a;

function create() {

    game.stage.backgroundColor = '#363636';

    arrow = game.add.sprite(400, 300, 'arrow');
    arrow.anchor.setTo(0.1, 0.5);

    sprite1 = game.add.sprite(200, 200, 'ball');
    sprite1.anchor.set(0.5);

    sprite2 = game.add.sprite(100, 500, 'ball');
    sprite2.anchor.set(0.5);

    sprite3 = game.add.sprite(300, 100, 'ball');
    sprite3.anchor.set(0.5);

    sprite4 = game.add.sprite(600, 400, 'ball');
    sprite4.anchor.set(0.5);

    sprite5 = game.add.sprite(500, 200, 'ball');
    sprite5.anchor.set(0.5);

    sprite6 = game.add.sprite(300, 450, 'ball');
    sprite6.anchor.set(0.5);

    target = sprite6;
    target.tint = 0xff0000;

}

function update() {

    var a = game.physics.arcade.angleBetween(arrow, target);
    var t = game.math.rotateToAngle(arrow.rotation, a, 0.01);

    if (t === arrow.rotation)
    {
        target.tint = 0xffffff;
        target = game.rnd.pick([sprite1, sprite2, sprite3, sprite4, sprite5, sprite6]);
        target.tint = 0xff0000;
    }
    else
    {
        arrow.rotation = t;
    }

}
