// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    var graphics = game.add.graphics(300, 200);

// graphics.position.x = 300;
// graphics.position.y = 200;
// stage.addChild(graphics);

    // graphics.beginFill(0);
    // graphics.beginFill(0xFF3300);

    graphics.lineStyle(1, 0xff0000, 1);
    graphics.moveTo(0, 0);  
    graphics.lineTo(100, 0);

    graphics.lineStyle(1, 0x00ff00, 1);
    graphics.moveTo(100, 0);  
    graphics.lineTo(100, 100);

    graphics.lineStyle(1, 0x0000ff, 1);
    graphics.moveTo(100, 100);  
    graphics.lineTo(0, 100);

    graphics.lineStyle(1, 0xff00ff, 1);
    graphics.moveTo(0, 100);  
    graphics.lineTo(0, 0);

    // graphics.endFill();


}
