
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var rect;

function preload () {
    
    game.load.image('rect', 'assets/sprites/block.png');

}

function create () {
    rect = game.add.sprite(game.world.centerX, game.world.centerY, 'rect');
    rect.y = game.height;
}

function update() {

    rect.y -= 1;
    // rect.y = (game.height + rect.y) % game.height;

}