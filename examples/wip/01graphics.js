var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create, render: render });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

var graphics;

function create() {

    graphics = game.add.graphics(100, 100);

    // drawShape(0x027a71, 0x02fdeb);
    drawShape2();

    graphics.scale.set(0);

    game.add.tween(graphics.scale).to({ x: 1, y: 1 }, 3000, 'Linear', true);

}

function drawShape2() {

    graphics.lineStyle(2, 0xff0000, 1);
    graphics.drawCircle(50, 50, 100);

}

function drawShape(fill, style) {

    graphics.beginFill(fill);
    graphics.lineStyle(4, style, 1);

    graphics.moveTo(0, 0);
    graphics.lineTo(250, 0);
    graphics.lineTo(250, 200);
    graphics.lineTo(125, 100);
    graphics.lineTo(0, 200);
    graphics.lineTo(0, 0);

    graphics.endFill();

}

function render() {

    game.debug.text(graphics.width + ' x ' + graphics.height, 32, 32);

}