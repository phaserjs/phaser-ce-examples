
var game = new Phaser.Game(800, 600, Phaser.WEBGL_MULTI, 'phaser-example', { preload: preload, create: create});

function preload() {

    game.load.image('treasure_trap', 'assets/sprites/treasure_trap.png');
    game.load.image('bunny', 'assets/sprites/bunny.png');
    game.load.image('cokecan', 'assets/sprites/cokecan.png');
    game.load.image('ilkke', 'assets/sprites/ilkke.png');

}

function create() {
    game.renderer.setTexturePriority(['treasure_trap', 'bunny', 'cokecan', 'ilkke']);

    //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
    var spriteA = game.add.sprite(0, 0, 'treasure_trap');
    var spriteB = game.add.sprite(127, 0, 'bunny');
    var spriteC = game.add.sprite(500, 0, 'cokecan');
    var spriteD = game.add.sprite(580, 0, 'ilkke');
    spriteA.cacheAsBitmap = true;
    spriteB.cacheAsBitmap = true;
    spriteC.cacheAsBitmap = true;
    spriteD.cacheAsBitmap = true;

}
