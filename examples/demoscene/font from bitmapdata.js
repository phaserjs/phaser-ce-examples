
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('knightHawks', 'assets/demoscene/knighthawks.png');
    game.load.image('raster', 'assets/demoscene/multi-color-raster.png');

}

var retroFont;
var font;
var alpha;
var raster;

var mask = new Phaser.Rectangle();

function create() {

    //  This generates the FrameData object we need, based on the font set
    retroFont = game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);

    //  This creates our display font with the rasters running through it
    font = game.make.bitmapData();
    alpha = game.make.bitmapData();
    raster = game.make.bitmapData();

    //  Load the font
    font.load('knightHawks');

    //  Extract all the pink pixels into the alpha bmd
    font.extract(alpha, 237, 0, 140, 255, true);

    raster.resize(font.width, font.height);

    //  Display the 4 stages of the process
    game.add.image(0, 0, 'knightHawks');
    game.add.image(360, 0, alpha);
    game.add.image(0, 200, raster);
    game.add.image(360, 200, font);

    //  Tween the rasters
    mask.setTo(0, 0, font.width, game.cache.getImage('raster').height);

    console.log(font.texture.frame);

    //  Now create a few Sprites using the bitmapData as it's texture
    var s1 = game.add.sprite(32, 500, font);
    s1.animations.copyFrameData(retroFont.frameData, 1);

    var s2 = game.add.sprite(100, 500, font);
    s2.animations.copyFrameData(retroFont.frameData, 2);

    // console.log(s1.animations._frameData);
    // console.log(s2.animations._frameData);
    // console.log(s1._frame);
    // console.log(s2._frame);

    console.log(font.texture.frame);

    game.add.tween(mask).to( { y: -(mask.height - font.height) }, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);

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

function update() {

    raster.cls();
    raster.alphaMask('raster', alpha, mask);
    font.draw(raster);

}
