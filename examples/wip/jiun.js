
var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update }, null, false, false);

// The problem occurs when using Phaser.AUTO (so it swich to WEBGL), it adds BLUR.
// When I add null, false, false (so I would like pixel-art look and feel) it makes the text deteriorated instead of BLURRED.

// No blur or whatever with Phaser.CANVAS, it works.

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Gabriela']
    }

};


var text;
var count;

function preload() {

    game.load.image('background', 'wip/bg01.jpg');
    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

function create() {

    count = 0;
    var background = game.add.sprite(0, 0, 'background');

    background.width = 1024;
    background.height = 640;

}

function createText() {


    text = game.add.text(game.world.centerX, game.world.centerY, "Looking for players\n " + count +" Remaining before start", {
        font: "18px Gabriela",
        fill: "#ffffff",
        align: "center",
    });

    text.anchor.setTo(0.5, 0);
    text.setShadow(0, 0, 'rgba(0,0,0,0.8)', 3);
    text.stroke = 'rgba(0,0,0,0.5)';
    text.strokeThickness = 2;
    text.x = 512;
    text.y = 5;

}

function update() {

    game.input.onDown.addOnce(updateText, this);

}


function updateText() {

    count++;

    text.setText("Looking for players\n " + count +" Remaining before start");

}
