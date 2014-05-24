
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('pic', 'assets/pics/lance-overdose-loader_eye.png');

}

var sprite;
var point;
var dec = false;

function create() {

    game.stage.backgroundColor = '#0072bc';

    point = new Phaser.Point(300, 300);

    sprite = game.add.sprite(point.x, point.y, 'pic');

    game.input.onDown.add(updateAnchor, this);

}

function update() {

    // Un-comment this to see the effect of rotation combined with the anchor
    // sprite.rotation += 0.01;

}

function updateAnchor() {

    if (dec)
    {
        sprite.anchor.x -= 0.1;
        sprite.anchor.y -= 0.1;

        if (sprite.anchor.x <= 0)
        {
            dec = false;
        }
    }
    else
    {
        sprite.anchor.x += 0.1;
        sprite.anchor.y += 0.1;

        if (sprite.anchor.x >= 1)
        {
            dec = true;
        }
    }

}

function render() {

    game.debug.geom(point, 'rgb(255,0,255)');

    game.debug.text('Anchor X: ' + sprite.anchor.x.toFixed(1) + ' Y: ' + sprite.anchor.y.toFixed(1), 32, 32);
    game.debug.text('Sprite X: ' + sprite.x + ' Y: ' + sprite.y, 32, 64);
    game.debug.text('Click to adjust the anchor', 32, 96);

}
