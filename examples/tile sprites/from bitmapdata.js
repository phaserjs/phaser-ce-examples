
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var tilesprite;
var cursors;

function preload() {

    // game.load.image('starfield', 'assets/misc/starfield.jpg');
    // game.load.image('starfield', 'assets/tstest.png');

}

function create() {

    var bmd = game.add.bitmapData(400, 100);
    bmd.fill(255, 255, 0, 1);

    var text = game.make.text(0, 0, "hello!" );
    bmd.draw(text, 0, 0);

    var ts = game.add.tileSprite(10, 10, 400, 100, bmd);

    game.input.onDown.addOnce(function() { ts.destroy(true, true); });

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        tilesprite.tilePosition.x += 8;
    }
    else if (cursors.right.isDown)
    {
        tilesprite.tilePosition.x -= 8;
    }

    if (cursors.up.isDown)
    {
        tilesprite.tilePosition.y += 8;
    }
    else if (cursors.down.isDown)
    {
        tilesprite.tilePosition.y -= 8;
    }

}
