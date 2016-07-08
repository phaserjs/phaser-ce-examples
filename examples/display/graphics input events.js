var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create });

var graphics;

function create() {

    graphics = game.add.graphics(300, 200);

    drawShape(0x027a71, 0x02fdeb);

    graphics.inputEnabled = true;
    graphics.input.useHandCursor = true;

    graphics.events.onInputDown.add(onDown, this);
    graphics.events.onInputUp.add(onUp, this);
    graphics.events.onInputOver.add(onOver, this);
    graphics.events.onInputOut.add(onOut, this);

}

function drawShape(fill, style) {

    graphics.clear();

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

function onOver() {

    drawShape(0xab3602, 0xeb6702);

}

function onDown() {

    drawShape(0x717a02, 0xebfd02);

}

function onUp() {

    drawShape(0x027a71, 0x02fdeb);

}

function onOut() {

    drawShape(0x027a71, 0x02fdeb);

}
