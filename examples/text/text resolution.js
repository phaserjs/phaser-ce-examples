var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    game.stage.backgroundColor = '#5d5d5d';

    var haiku = "Turtles and mushrooms\nYou are in the wrong castle\nFireball mustache";

    var text = game.add.text(32, 64, haiku,  { font: "48px Arial", fill: '#ffffff' });

    //  You'll only notice the difference on a retina / high-dpi display

    text.resolution = 2;
    text.updateText();

}
