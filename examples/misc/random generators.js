
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {create: create });

function create() {

    game.stage.backgroundColor = '#454645';

    var style = { font: "14px Arial", fill: "#ff0044", align: "center" };

    game.add.text(32, 30, 'Integer: ' + game.rnd.integer(), style);
    game.add.text(32, 60, 'Frac: ' + game.rnd.frac(), style);
    game.add.text(32, 90, 'Real: ' + game.rnd.real(), style);
    game.add.text(32, 120, 'Integer in Range (100-200): ' + game.rnd.integerInRange(100, 200), style);

}
