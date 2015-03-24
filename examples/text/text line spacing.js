var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    game.stage.backgroundColor = '#5d5d5d';

    var haiku = "Turtles and mushrooms\nYou are in the wrong castle\nFireball mustache";

    var text = game.add.text(100, 64, haiku,  { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)' });
    text.lineSpacing = -20;

    var haiku2 = "Green hat, Master Sword\nMonsters and chickens beware\nMoney making game";

    var text2 = game.add.text(100, 300, haiku2,  { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)' });
    text2.lineSpacing = 40;

}
