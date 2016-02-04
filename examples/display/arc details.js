var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create, update: update });

var info;
var graphics1;
var graphics2;
var angle = { min: 0, max: 0 };

function create() {

    game.stage.backgroundColor = 0x2d2d2d;

    graphics1 = game.add.graphics(0, 0);
    graphics2 = game.add.graphics(0, 0);

    var style = { font: "24px Arial", fill: "#ffffff", align: "center" };

    info = game.add.text(32, 32, 'Arc', style);

    game.add.text(130, 500, 'Clockwise', style);
    game.add.text(530, 500, 'Anticlockwise', style);

    this.add.tween(angle).to( { max: 360 }, 6000, "Linear", true, 0, -1, true);

}

function update() {

    info.text = "Arc maxAngle: " + Math.round(angle.max);

    graphics1.clear();
    graphics1.lineStyle(2, 0xffffff);
    graphics1.beginFill(0x00bff3);
    graphics1.arc(200, 300, 160, angle.min, game.math.degToRad(angle.max), false);
    graphics1.endFill();

    graphics2.clear();
    graphics2.lineStyle(2, 0xffffff);
    graphics2.beginFill(0xa000f3);
    graphics2.arc(600, 300, 160, angle.min, game.math.degToRad(angle.max), true, 128);
    graphics2.endFill();

}