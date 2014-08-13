CustomText = function (game, x, y, text) {

    Phaser.Text.call(this, game, x, y, text, { font: "65px Arial", fill: "#ff0044", align: "center" });

    this.anchor.set(0.5);

    this.rotateSpeed = 1;

};

CustomText.prototype = Object.create(Phaser.Text.prototype);
CustomText.prototype.constructor = CustomText;

CustomText.prototype.update = function() {

    this.angle += this.rotateSpeed;

};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    var text = new CustomText(game, game.world.centerX, game.world.centerY, 'Hello World!');

    game.add.existing(text);

}