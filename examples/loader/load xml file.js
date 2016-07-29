
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    //  Phaser can load XML files.

    //  It does this using an XMLHttpRequest.
    
    //  If loading a file from outside of the domain in which the game is running 
    //  a 'Access-Control-Allow-Origin' header must be present on the server.
    //  No parsing of the text file is performed, it's literally just the raw data.

    game.load.xml('octopus', 'assets/sprites/octopus.xml');

}

var text;

function create() {

    game.stage.backgroundColor = '#0072bc';

    var xml = game.cache.getXML('octopus');

    console.log(xml);

    // text = xml.split('\n');

}

function render() {

    for (var i = 0; i < 30; i++)
    {
        // game.debug.text(text[i], 32, i * 20);
    }

}
