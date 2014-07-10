var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var clicks = 0;

function create() {

    var text = game.add.text(game.world.centerX, game.world.centerY, "click and drag me", { font: "65px Arial", fill: "#ff0044", align: "center" });

    text.anchor.set(0.5);

    text.inputEnabled = true;

    text.input.enableDrag();

    text.events.onInputOver.add(over, this);
    text.events.onInputOut.add(out, this);

    text.events.onInputDown.add(down, this);
    text.events.onInputUp.add(up, this);

}

function over(item) {

    item.fill = "#ffff44";
    item.text = "clicked " + clicks + " times";

}

function out(item) {

    item.fill = "#ff0044";
    item.text = "click and drag me";

}

function down(item) {

    clicks++;

    item.text = "clicked " + clicks + " times";

}

function up(item) {

    item.text = "thanks for clicking!";

}