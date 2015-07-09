var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

var test;

function create() {

    test = game.add.sprite();

    game.time.events.repeat(50, 1000, createGraphics, this);

}

function createGraphics() {

    var graphics = game.make.graphics();

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    
    // draw a shape
    graphics.moveTo(50,50);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(250, 220);
    graphics.lineTo(50, 220);
    graphics.lineTo(50, 50);
    graphics.endFill();
    
    // set a fill and line style again
    graphics.lineStyle(10, 0xFF0000, 0.8);
    graphics.beginFill(0xFF700B, 1);

    test.setTexture(graphics.generateTexture());

    graphics.destroy();

    test.x = game.world.randomX;

}