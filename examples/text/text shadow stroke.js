
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('lulu', 'assets/pics/shocktroopers_lulu2.png');

}

function create() {

    game.stage.backgroundColor = 0xbdbdbd;

    game.add.image(660, 412, 'lulu');
    
    var text1 = game.add.text(20, 50, "Shadow Stroke", { font: "74px Arial Black", fill: "#c51b7d" });
    text1.stroke = "#de77ae";
    text1.strokeThickness = 16;
    //  Apply the shadow to the Stroke only
    text1.setShadow(2, 2, "#333333", 2, true, false);

    var text2 = game.add.text(20, 180, "Shadow Fill", { font: "74px Arial Black", fill: "#c51b7d" });
    text2.stroke = "#de77ae";
    text2.strokeThickness = 16;
    //  Apply the shadow to the Fill only
    text2.setShadow(2, 2, "#333333", 2, false, true);

    var text3 = game.add.text(20, 310, "Shadow Both", { font: "74px Arial Black", fill: "#c51b7d" });
    text3.stroke = "#de77ae";
    text3.strokeThickness = 16;
    //  Apply the shadow to the Stroke and the Fill (this is the default)
    text3.setShadow(2, 2, "#333333", 2, true, true);

    var text4 = game.add.text(20, 440, "Shadow None", { font: "74px Arial Black", fill: "#c51b7d" });
    text4.stroke = "#de77ae";
    text4.strokeThickness = 16;
    //  Apply the shadow to neither stroke nor fill, if you don't need a shadow then don't call setShadow at all :)
    text4.setShadow(2, 2, "#333333", 2, false, false);

}
