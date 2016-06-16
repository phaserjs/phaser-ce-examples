
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('leon', 'assets/pics/shocktroopers_leon.png');
    game.load.image('toy', 'assets/pics/shocktroopers_toy.png');
    game.load.image('pic', 'assets/pics/spaceship.png');

}

function create() {

    var pic = game.add.sprite(0, 0, 'pic');

    var sprite1 = game.add.sprite(0, 0, 'leon');
    var sprite2 = game.add.sprite(0, 0, 'toy');

    //  center the picture in the world
    pic.alignTo(game.world.bounds, Phaser.MIDDLE_CENTER);

    //  align the two sprites into the bottom corners of the picture
    sprite1.alignTo(pic, Phaser.BOTTOM_RIGHT);
    sprite2.alignTo(pic, Phaser.BOTTOM_LEFT);

}
