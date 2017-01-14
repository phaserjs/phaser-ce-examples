
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.path = 'assets/atlas/';

    game.load.multiatlas('megasetHD', 3);

}

var monster;
var f = 0;

function create() {

    //  create a sprite sheet from a frame embedded in a texture atlas
    //  'boom' is the unique local name we'll give the sprite sheet
    //  'megasetHD' is the key of the texture atlas that contains the sprite sheet
    //  'explosion' is the name of the frame within the texture atlas
    //  The rest of the values are the sprite sheet frame sizes and offsets

    game.textures.addSpriteSheetFromAtlas('boom', 'megasetHD', 'explosion', 64, 64, 0, 22);

    //  There is a new texture available called 'boom', which we can assign to game objects:

    monster = game.add.image(0, 0, 'boom', 0);

}

function update() {

    f++;

    if (f === monster.texture.frameTotal)
    {
        f = 0;
    }

    monster.frame = monster.texture.get(f);

}