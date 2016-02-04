
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { create: create });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var masked=false;

function create() {

    var graphics2 = game.add.graphics(0,0);
    graphics2.beginFill(0xff0000, .5);
    graphics2.drawRect(0,0, 800, 600);
    
    var graphics = game.add.graphics(0,0);
    graphics.beginFill(0x00ff00, .5);
    // boxes
    graphics.drawRect(204-24,0, 24, 432);
    graphics.drawRect(12,484,128-12,24);

    // curve
    graphics.moveTo(128,484);
    graphics.lineTo(128,508);
    graphics.quadraticCurveTo(204, 508, 204,432);
    graphics.lineTo(180,432);
    graphics.quadraticCurveTo(180, 484, 128,484);

    // graphics.cacheAsBitmap = true;

    var style = { font: "32px Arial", fill: "#ff0044" };
    var txt = game.add.text(400,0,"click to set/unset mask", style)

    game.input.onDown.add(function() {
        
        if(!masked) {
            graphics2.mask = graphics;    
        }
        else
        {
            graphics2.mask=null;     
        }
        
        masked=!masked;
        
        
    }, this)

}
