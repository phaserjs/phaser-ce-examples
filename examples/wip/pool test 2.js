var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

var group;

function create() {

    group = game.add.group();

    addText();

    game.input.onDown.add(removeRandom, this);

}

function removeRandom() {

    var text = group.getFirstExists();

    text.destroy();

}

function addText() {

    var text = game.make.text(game.rnd.between(0, 760), game.rnd.between(0, 580), "phaser " + PIXI.CanvasPool.getTotal(), { font: "32px Arial", fill: "#ff0044" });

    group.add(text);

    game.time.events.add(1000, addText, this);

}

function render() {

    game.debug.text("CanvasPool - total: " + PIXI.CanvasPool.getTotal() + " available: " + PIXI.CanvasPool.getFree(), 32, 32);

}