
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  Phaser can load Binary files.

    //  It does this using an XMLHttpRequest.
    
    //  If loading a file from outside of the domain in which the game is running 
    //  a 'Access-Control-Allow-Origin' header must be present on the server.
    //  No parsing of the text file is performed, it's literally just the raw data.

    game.load.binary('mod', 'assets/audio/protracker/global_trash_3_v2.mod', binaryLoadCallback, this);

}

function binaryLoadCallback(key, data) {

    //  Convert our binary file into a Uint8Array
    //  We must return the data value or nothing will be added to the cache, even if you don't modify it.
    return new Uint8Array(data);

}

function create() {

    game.stage.backgroundColor = '#0072bc';

    //  Get our binary file into a local buffer var
    var buffer = game.cache.getBinary('mod');

    //   getString scans the binary file between the two values given, 
    //   returning the characters it finds there as a string

    var signature = getString(buffer, 1080, 1084);

    var text = game.add.text(32, 32, "Signature: " + signature, { fill: '#ffffff' });
    text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

    var title = getString(buffer, 0, 20)
    var text2 = game.add.text(32, 64, "Title: " + title, { fill: '#ffffff' });
    text2.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

}

function getString(buffer, start, end) {

    var output = '';

    for (var i = start; i < end; i++)
    {
        output += String.fromCharCode(buffer[i]);
    }

    return output;

}
