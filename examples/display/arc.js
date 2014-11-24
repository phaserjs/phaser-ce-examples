var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

function create() {

    var graphics = game.add.graphics(0, 0);

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    // graphics.lineStyle(10, 0xffd900, 1);
    
    graphics.lineStyle(4, 0xFF0000, 0.7); 
    // graphics.currentPath = {shape: {points: []}};
    graphics.arc(0, 0, 35, Math.PI / 4, Math.PI / 4 - (Math.PI / 2) * 50, true);

}
