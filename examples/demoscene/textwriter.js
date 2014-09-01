
//  10 x 8
// var game = new Phaser.Game(320, 256, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
var game = new Phaser.Game(320*2, 256*2, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('knightHawks', 'assets/fonts/retroFonts/KNIGHT3.png');
    game.load.image('raster', 'assets/demoscene/raster-blue.png');

}

var font;
var letters = [];
var pos = [];

var data;
var scale = 2;
var page = -1;

var scroller = [ 
                "----------",
                "- PHASER -", 
                "----------", 
                "- 2.1.0  -", 
                "- IS IN  -", 
                "- DA     -", 
                "- HOUSE! -", 
                "----------", 

                "THIS IS   ",
                "  PHOTON  ",
                "  STORM   ", 
                " BRINGING ", 
                " YOU HIS  ", 
                "TEXTWRITER", 
                "EFFECT IN ", 
                "PHASER ...", 

                "I WONDER  ",
                "  IF THIS ",
                "  WILL    ", 
                "   WORK   ", 
                " PROPERLY ", 
                "OR IF THE ", 
                "STRANGE   ", 
                "BUGSSSS   ", 
                ];

function create() {

    font = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6 + "*", 10, 1, 1);

    //  There can only be 80 letters on-screen at once (10x8) so generate them all now

    //  Scale 1:1
    var x = 0;
    var y = 0;
    // var scale = 1;
    // var tx = 32;
    // var ty = 32;
    // var hx = 16;
    // var hy = 16;

    //  Scale 2:1
    scale = 2;
    var tx = 64;
    var ty = 64;
    var hx = 32;
    var hy = 32;

    game.stage.smoothed = false;

    //  In reverse so they overlap in the correct order
    for (var i = 0; i < 80; i++)
    {
        var letter = game.add.sprite(game.world.centerX, game.world.centerY, 'knightHawks');

        letter.scale.set(0);
        letter.anchor.set(0.5);
        letter.animations.loadFrameData(font.frameData, 48);
        this.world.sendToBack(letter);

        letters.push(letter);
        pos.push( { x: x + hx, y: y + hy } ); // add 16 because of the anchor

        x += tx;

        if (x === game.width)
        {
            x = 0;
            y += ty;
        }
    }

    bringIn();

}

function setLetters() {

    page++;

    if (page === 3)
    {
        page = 0;
    }

    var i = 0;

    for (var y = 0; y < 8; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            letters[i].frame = font.grabData[scroller[(page * 8) + y].charCodeAt(x)];
            i++;
        }
    }

}

function bringIn() {

    setLetters();

    var delay = 0;
    var speed = 300;

    for (var i = 0; i < 80; i++)
    {
        if (page % 2 === 1)
        {
            console.log('ease');
            game.add.tween(letters[i].position).to( { x: pos[i].x, y: pos[i].y }, speed, Phaser.Easing.Back.Out, true, delay);
            game.add.tween(letters[i].scale).to( { x: scale, y: scale }, speed, Phaser.Easing.Back.Out, true, delay);
        }
        else
        {
            console.log('sinus');
            game.add.tween(letters[i].position).to( { x: pos[i].x, y: pos[i].y }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
            game.add.tween(letters[i].scale).to( { x: scale, y: scale }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        }

        delay += 100;
    }

    game.time.events.add(delay + 2000, takeAway, this);

}

function takeAway() {

    var delay = 0;
    var speed = 200;

    for (var i = 79; i >= 0; i--)
    {
        game.add.tween(letters[i].position).to( { x: game.world.centerX, y: game.world.centerY }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        game.add.tween(letters[i].scale).to( { x: 0, y: 0 }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        delay += 50;
    }

    game.time.events.add(delay + 200, bringIn, this);

}

function update() {

}
