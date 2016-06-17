
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/pics/spaceship.png');
    game.load.image('pangball', 'assets/sprites/32x32.png');

}

function create() {

    var pic = game.add.sprite(0, 0, 'pic');

    game.world.createMultiple(12, 'pangball', 0, true);

    //  Center the picture in the world
    pic.alignIn(game.world.bounds, Phaser.CENTER);

    //  Align all of the sprites around the picture
    game.world.getChildAt(1).alignTo(pic, Phaser.TOP_LEFT);
    game.world.getChildAt(2).alignTo(pic, Phaser.TOP_CENTER);
    game.world.getChildAt(3).alignTo(pic, Phaser.TOP_RIGHT);
    game.world.getChildAt(4).alignTo(pic, Phaser.LEFT_TOP);
    game.world.getChildAt(5).alignTo(pic, Phaser.LEFT_CENTER);
    game.world.getChildAt(6).alignTo(pic, Phaser.LEFT_BOTTOM);
    game.world.getChildAt(7).alignTo(pic, Phaser.RIGHT_TOP);
    game.world.getChildAt(8).alignTo(pic, Phaser.RIGHT_CENTER);
    game.world.getChildAt(9).alignTo(pic, Phaser.RIGHT_BOTTOM);
    game.world.getChildAt(10).alignTo(pic, Phaser.BOTTOM_LEFT);
    game.world.getChildAt(11).alignTo(pic, Phaser.BOTTOM_CENTER);
    game.world.getChildAt(12).alignTo(pic, Phaser.BOTTOM_RIGHT);

}
