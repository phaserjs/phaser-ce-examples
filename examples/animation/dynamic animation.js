
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('orb', 'assets/sprites/orb-blue.png');

}

function create() {

    game.stage.backgroundColor = '#ef3d45';

    //  We're going to dynamically create an animation.
    //  It will consist of 16 frames, each 22x22 pixels in size.
    //  
    //  So the overall dimensions will be 352x22

    var orb = game.make.sprite(0, 0, 'orb');

    //  First create a BitmapData object at the size we need

    var bmd = game.add.bitmapData(352, 22);

    //  Next draw the orb image into the BitmapData 16 times (once for each frame)

    var x = 0;
    var y = -22;

    for (var i = 0; i < 16; i++)
    {
        bmd.draw(orb, x, y);
        x += 22;
        y += 3;
    }

    //  Add it to the display just so you can see what the final sprite sheet looks like
    game.add.image(0, 0, bmd);

    //  And now add it to the cache, so any sprite can use it
    //  The parameters can be found in the API docs, but the important parts are to leave the URL blank and pass the bmd.canvas as the data value
    //  The 22x22 is the frame size and 16 the quantity of frames
    game.cache.addSpriteSheet('dynamic', '', bmd.canvas, 22, 22, 16, 0, 0);

    //  Let's create a bunch of sprites all using the same new animation data
    for (i = 0; i < 16; i++)
    {
        var test = game.add.sprite(200, 100 + (i * 22), 'dynamic');
        test.animations.add('float');
        // test.play('float', 20 + i, true); // uncomment this line and comment out the line below for some trippy fun :)
        test.play('float', 20, true);
    }

}
