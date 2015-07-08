
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Finger Paint']
    }

};

var text;

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

function create() {

    game.add.image(0, 0, 'bg');

}

function createText() {

    //  You can either set the tab size in the style object:
    var style = { font: "28px Finger Paint", fill: "#fff", tabs: [ 150, 150, 200 ] };

    text = game.add.text(32, 64, "Armor\tSpells\tDamage\tWeapons", style);
    text.setShadow(-3, 3, 'rgba(0,0,0,0.5)', 0);

    var text2 = game.add.text(32, 180, "100\tFire\t+50\tAxe\n67\tIce\t+23\tStaff", style);
    text2.setShadow(-3, 3, 'rgba(0,0,0,0.5)', 0);

}
