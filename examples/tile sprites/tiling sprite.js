var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var tilesprite;
var cursors;

function preload() {
    // Load starfield image
    game.load.image('starfield', 'assets/misc/starfield.jpg');
}

function create() {

/**
* 
*  A TileSprite is a Sprite that has a repeating texture. 
*  The texture can be scrolled and scaled independently of the TileSprite itself.
*  Textures will automatically wrap and are designed so that you can create game
*  backdrops using seamless textures as a source.
*
**/
    // Create a tilesprite (x, y, width, height, key)
    tileSprite = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    cursors = game.input.keyboard.createCursorKeys();
    game.debug.text('Press down arrow keys to move the tileSprite', 20, 20);
}

function update() {

    // Move tilesprite position by pressing arrow keys
    if (cursors.left.isDown)
    {
        tileSprite.tilePosition.x += 8;
    }
    else if (cursors.right.isDown)
    {
        tileSprite.tilePosition.x -= 8;
    }

    if (cursors.up.isDown)
    {
        tileSprite.tilePosition.y += 8;
    }
    else if (cursors.down.isDown)
    {
        tileSprite.tilePosition.y -= 8;
    }

}
