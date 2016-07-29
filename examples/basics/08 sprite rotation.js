var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('arrow', 'assets/sprites/longarrow-white.png');

}

var arrow;

function create() {

    //  The code isn't too important for this example
    //  What we're showing here is the angles, in degrees and radians,
    //  that a Phaser sprite uses when rotating.
    //  
    //  You can rotate a sprite by setting either property.
    //  
    //  `angle` is in degrees, from -180 to 180.
    //  `rotation` is in radians, from -PI to PI
    //  
    //  For example:
    //  
    //  sprite.angle = 45
    //  
    //  is the same as:
    //  
    //  sprite.rotation = 0.785

    game.stage.backgroundColor = '#000000';

    var labelStyle = { font: "16px courier", fill: "#00ff00", align: "center" };

    //  Create a large circle, then draw the angles on it

    var circle = new Phaser.Circle(400, 300, 450);
    var labelCircle = new Phaser.Circle(400, 300, 530);

    var graphics = game.add.graphics(0, 0);

    graphics.lineStyle(2, 0x00ff00, 1);

    graphics.drawCircle(circle.x, circle.y, circle.diameter);

    for (var a = 0; a < 360; a += 22.5)
    {
        graphics.moveTo(400, 300);

        var p = circle.circumferencePoint(a, true);

        graphics.lineTo(p.x, p.y);

        var lp = labelCircle.circumferencePoint(a, true);

        var na = a;

        if (a > 180)
        {
            na -= 360;
        }

        var rads = String(Phaser.Math.degToRad(na)).substr(0, 5);
        var info = na + "°\n" + rads;

        var label = game.add.text(lp.x, lp.y, info, labelStyle);
        label.centerX = lp.x;
        label.centerY = lp.y;
    }

    arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    arrow.anchor.set(0, 0.5);
    arrow.tint = 0xff0000;

}

function update() {

    arrow.angle += 0.2;

}

function render() {

    game.debug.text('Sprite Rotation', 24, 32);
    game.debug.text('Angle: ' + arrow.angle.toFixed(2), 24, 64);
    game.debug.text('Rotation: ' + arrow.rotation.toFixed(2), 24, 96);

}