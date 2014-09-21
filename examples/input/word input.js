var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var word = "phaser";
var correct = [];
var bmd;

function create() {
   
    //  Here we'll create a simple array where each letter of the word to enter represents one element:
    for (var i = 0; i < word.length; i++)
    {
        correct[word[i]] = false;
    }

    //  This is our BitmapData onto which we'll draw the word being entered
    bmd = game.make.bitmapData(800, 200);
    bmd.context.font = '64px Arial';
    bmd.context.fillStyle = '#ffffff';
    bmd.context.fillText(word, 64, 64);
    bmd.addToWorld();

    //  Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

}

function keyPress(char) {

    //  Clear the BMD
    bmd.cls();

    //  Set the x value we'll start drawing the text from
    var x = 64;

    //  Loop through each letter of the word being entered and check them against the key that was pressed
    for (var i = 0; i < word.length; i++)
    {
        var letter = word.charAt(i);

        //  If they pressed one of the letters in the word, flag it as correct
        if (char === letter)
        {
            correct[letter] = true;
        }

        //  Now draw the word, letter by letter, changing colour as required
        if (correct[letter])
        {
            bmd.context.fillStyle = '#00ff00';
        }
        else
        {
            bmd.context.fillStyle = '#ffffff';
        }

        bmd.context.fillText(letter, x, 64);

        x += bmd.context.measureText(letter).width;
    }

}
