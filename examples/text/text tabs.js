
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var text;

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

}

function create() {

    game.add.image(0, 0, 'bg');

    //  You can either set the tab size in the style object:
    var style = { font: "20px Courier", fill: "#fff", tabs: 132 };

    text = game.add.text(100, 64, "Armor\tSpells\tDamage\tWeapons", style);

    //  Or you can modify the tabs property directly:
    // text.tabs = 132;

    var text2 = game.add.text(100, 120, "100\tFire\t+50\tAxe\n67\tIce\t+23\tStaff", style);

}
