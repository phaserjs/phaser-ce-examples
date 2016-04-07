var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

function create() {

    var graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xa9a904);
    graphics.lineStyle(4, 0xfd02eb, 1);
    
    graphics.moveTo(0, 0);
    graphics.lineTo(125, 0);
    graphics.lineTo(125, 100);
    graphics.lineTo(62, 50);
    graphics.lineTo(0, 100);
    graphics.lineTo(0, 0);
    graphics.endFill();
    
    game.physics.arcade.enable(graphics);

    graphics.body.velocity.x = 100;
    graphics.body.gravity.y = 100;
    graphics.body.bounce.set(1);
    graphics.body.collideWorldBounds = true;

}
