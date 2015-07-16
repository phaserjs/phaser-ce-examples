/**
 * @file Demonstrates how to add text character-by-character using Phaser.
 * @author Melissa Viernes <melissa.b.viernes@gmail.com> @melkybee
 */

// Phaser game setup
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create }),

    // Phaser text object
    text,
    
    // Custom text to add onto the screen
    txt = 'Hello world! :-)',
    
    // Amount of time in between the characters being added
    time = 0.6,
    
    // Text style
    txtStyle = {
        font: '65px Arial',
        fill: '#ff0044',
        align: 'center'
    };

/**
 * Game state for create
 */
function create() {
    // Add text object to center of the world
    text = game.add.text(game.world.centerX, game.world.centerY, '', txtStyle);
    text.anchor.setTo(0.5, 0.5);
    
    // Add custom text, character by character
    addCharByChar(txt, time);
}

/**
 * Add text, character by character
 * @param {string} txt  - The custom text to add onto the screen.
 * @param {Number} time - The amount of time (seconds) in between the characters being added.
 */
function addCharByChar(txt, time) {
    var i,
        txtLen = txt.length,
        totalTime = 0;
    for (i = 0; i < txtLen; i++) {  // loop through each character of the custom text
        game.time.events.add(Phaser.Timer.SECOND * totalTime, function() {
            this.text.text += this.txt[this.i];  // add the next character
        }, { text: text, txt: txt, i: i });  // for scoping purposes
        totalTime += time;  // the next character will appear at this time
    }
}
