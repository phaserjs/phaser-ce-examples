
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('arrow', 'assets/sprites/arrow.png');

}

var arrow1;
var arrow2;
var arrow3;
var arrow4;

function create() {

    game.stage.backgroundColor = '#3e5f96';

    arrow1 = game.add.sprite(200, 150, 'arrow');
    arrow1.pivot.x = 100;

    arrow2 = game.add.sprite(600, 150, 'arrow');
    arrow2.pivot.y = 100;

    arrow3 = game.add.sprite(200, 450, 'arrow');
    arrow3.pivot.x = 100;
    arrow3.pivot.y = 100;

    arrow4 = game.add.sprite(600, 450, 'arrow');
    arrow4.pivot.x = 100;
    arrow4.anchor.set(0.5);

}

function update() {

    arrow1.rotation += 0.05;
    arrow2.rotation += 0.05;
    arrow3.rotation += 0.05;
    arrow4.rotation += 0.05;

}

function render() {

    game.debug.geom(new Phaser.Point(arrow1.x, arrow1.y), '#ffff00');
    game.debug.geom(new Phaser.Point(arrow2.x, arrow2.y), '#ffff00');
    game.debug.geom(new Phaser.Point(arrow3.x, arrow3.y), '#ffff00');
    game.debug.geom(new Phaser.Point(arrow4.x, arrow4.y), '#ffff00');

}