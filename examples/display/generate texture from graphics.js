var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var sprite;

function create() {

    //  Create a nice and complex graphics object
    var graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    
    graphics.moveTo(50,50);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(250, 220);
    graphics.lineTo(50, 220);
    graphics.lineTo(50, 50);
    graphics.endFill();
    
    graphics.lineStyle(10, 0xFF0000, 0.8);
    graphics.beginFill(0xFF700B, 1);
    
    graphics.moveTo(210,300);
    graphics.lineTo(450,320);
    graphics.lineTo(570,350);
    graphics.quadraticCurveTo(600, 0, 480,100);
    graphics.lineTo(330,120);
    graphics.lineTo(410,200);
    graphics.lineTo(210,300);
    graphics.endFill();
    
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect(50, 250, 100, 100);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 0.5);
    graphics.drawCircle(470, 200, 200);
    graphics.endFill();

    graphics.lineStyle(20, 0x33FF00);
    graphics.moveTo(30,30);
    graphics.lineTo(600, 300);

    //  Then generate a texture from it and apply the texture to the sprite
    sprite = game.add.sprite(400, 300, graphics.generateTexture());
    sprite.anchor.set(0.5);

    //  And destroy the original graphics object
    graphics.destroy();

}

function update() {

    sprite.rotation += 0.01;

}
