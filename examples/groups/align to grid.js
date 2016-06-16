
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var sprites;

function preload() {

    game.load.image('ufo', 'assets/sprites/ufo.png');
    game.load.image('diamond', 'assets/sprites/diamond.png');
    game.load.image('diamond', 'assets/sprites/diamond.png');
    game.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', 32, 24);
    game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);
    game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    
}

function create() {

    // grid: function (key, width, height, cellWidth, cellHeight, color) {
    game.add.sprite(0, 0, game.create.grid('grid', 160*5,160*3,160,160,'rgba(0,250,0,1)'));

    sprites = game.add.group();

    //  Creates 20 sprites FOR EACH FRAME (so 100 sprites in total)
    // sprites.createMultiple(20, 'diamonds', [0, 1, 2, 3, 4], true);
    
    // sprites.createMultiple(20, ['diamonds', 'balls'], [0, 1, 2], true);

    // sprites.createMultiple(50, ['ufo', 'diamond'], 0, true);

    // sprites.createMultiple(100, 'ufo', 0, true);

    sprites.createMultiple(5, 'seacreatures', ['blueJellyfish0000', 'crab10000', 'flyingFish0000'], true);

    // sprites.align(5, 3, 160, 160, Phaser.TOP_RIGHT);
    // sprites.align(5, 3, 160, 160, Phaser.MIDDLE_CENTER);
    // sprites.align(5, 3, 160, 160, Phaser.BOTTOM_LEFT);

    // sprites.x = 10;
    // sprites.y = 100;

}
