
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');
    
}

function create() {

    //  This is just a visual debug grid, it's not needed for the actual Group.align to work
    game.add.sprite(0, 0, game.create.grid('grid', 160 * 5, 160 * 3, 160, 160, 'rgba(0, 250, 0, 1)'));

    var group = game.add.group();

    group.createMultiple(5, 'seacreatures', ['blueJellyfish0000', 'crab10000', 'flyingFish0000'], true);

    //  Try changing the position constant to see the difference:
    group.align(5, 3, 160, 160, Phaser.CENTER);
    // group.align(5, 3, 160, 160, Phaser.TOP_RIGHT);
    // group.align(5, 3, 160, 160, Phaser.BOTTOM_LEFT);

}
