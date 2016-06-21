
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    // game.load.image('ufo', 'assets/sprites/ufo.png');
    // game.load.image('diamond', 'assets/sprites/diamond.png');
    // game.load.image('diamond', 'assets/sprites/diamond.png');
    game.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', 32, 24);
    // game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);
    // game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    
}

function create() {

    var group = game.add.group();

    //  Creates 24 sprites FOR EACH FRAME
    group.createMultiple(24, 'diamonds', [0, 1, 2, 3, 4], true);
    
    // sprites.createMultiple(20, ['diamonds', 'balls'], [0, 1, 2], true);

    //  Align the sprites into rows of 12, by however many we need (the -1 argument)
    //  With 48x48 pixel spacing per sprite
    group.align(12, -1, 48, 48);

    group.x = 100;
    group.y = 64;

}
