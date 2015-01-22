var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

function create() {

    var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

    // set a fill and line style
    graphics.beginFill(0xFF3300);

    graphics.lineStyle(8, 0xffd900);
    
    graphics.arc(0, 0, 135, Math.PI / 4, Math.PI / 4 - (Math.PI / 2) * 50, true);

}
