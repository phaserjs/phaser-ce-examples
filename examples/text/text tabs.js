
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var text;

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

}

function create() {

    game.add.image(0, 0, 'bg');

    //  You can either set the tab size in the style object:
    var style = { font: "20px Courier", fill: "#fff", align: "right", tab: 132 };

    // var heading = [ 'Name', 'Damage', 'Speed', 'Notes' ];

    text = game.add.text(100, 64, "Armor\tSpells\tDamage\tWeapons", style);

    //  Or you can modify the tab property directly:
    // text.tab = 132;

    var swords = [];

    var text2 = game.add.text(100, 120, "100\tFire\t+50\tAxe\n67\tIce\t+23\tStaff", style);

}
