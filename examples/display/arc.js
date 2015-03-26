var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

function create() {

    var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

    //  Our first arc will be a line only
    graphics.lineStyle(8, 0xffd900);

    // graphics.arc(0, 0, 135, game.math.degToRad(0), game.math.degToRad(90), false);
    graphics.arc(0, 0, 135, 0, 1.5707963267948966, false);
    
    //  As we wish to draw a 2nd arc on the SAME Graphics object, we need to move the drawing operation
    // graphics.moveTo(-100, -100);

    //  This will reset the lineStyle
    graphics.lineStyle(0);

    //  And this draws a filled arc
    graphics.beginFill(0xFF3300);

    //  Note the 'true' at the end, this tells it to draw anticlockwise
    graphics.arc(-100, -100, 135, game.math.degToRad(0), game.math.degToRad(90), true);

    graphics.endFill();

}
