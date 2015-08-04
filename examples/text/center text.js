
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });

var text;

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

}

function create() {

    game.add.image(0, 0, 'bg');

    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 100, 800, 100);

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    text = game.add.text(0, 0, "phaser 2.4 text bounds", style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    text.setTextBounds(0, 100, 800, 100);

}

function render() {

    // game.debug.geom(text.textBounds);

}