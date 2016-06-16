
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('leon', 'assets/pics/shocktroopers_leon.png');
    game.load.image('toy', 'assets/pics/shocktroopers_toy.png');
    game.load.image('pic', 'assets/pics/spaceship.png');
    game.load.image('block', 'assets/sprites/block.png');

}

function create() {

    var pic = game.add.sprite(0, 0, 'pic');

    var sprite1 = game.add.sprite(0, 0, 'leon');
    var sprite2 = game.add.sprite(0, 0, 'toy');
    var sprite3 = game.add.sprite(0, 0, 'block');

    //  center the picture in the world
    pic.alignIn(game.world.bounds, Phaser.CENTER);

    //  align the two sprites into the bottom corners of the picture
    sprite1.alignIn(pic, Phaser.BOTTOM_RIGHT);
    sprite2.alignIn(pic, Phaser.BOTTOM_LEFT);

    //  And align the block sprite into the top_center, but with a -10 pixel offset
    // sprite3.alignIn(pic, Phaser.TOP_LEFT, -10, -10);
    sprite3.alignIn(pic, Phaser.TOP_CENTER, 0, -10);
    // sprite3.alignIn(pic, Phaser.TOP_RIGHT, -10, -10);

    // sprite3.alignIn(pic, Phaser.LEFT_CENTER, -10, -10);
    // sprite3.alignIn(pic, Phaser.CENTER, -10, -10);
    // sprite3.alignIn(pic, Phaser.RIGHT_CENTER, -10, 0);

    // sprite3.alignIn(pic, Phaser.BOTTOM_LEFT, -10, -10);
    // sprite3.alignIn(pic, Phaser.BOTTOM_CENTER, 0, -10);
    // sprite3.alignIn(pic, Phaser.BOTTOM_RIGHT, -10, -10);

}
