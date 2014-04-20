
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('knightHawks', 'assets/fonts/retroFonts/knighthawks_font.png');
    game.load.image('knightHawksFilled', 'assets/fonts/retroFonts/knighthawks_font_filled.png');
    game.load.image('raster', 'assets/demoscene/pink-raster.png');

}

var font;
var image;
var bmd;

function create() {

    font = game.add.retroFont('knightHawks', 32, 25, Phaser.RetroFont.TEXT_SET2, 10, 0, 0);
    font.text = 'phaser was here';

    bmd = game.add.bitmapData(800, 600);

    // image = game.add.image(0, 0, font);

    // bmd.context.fillStyle = 'rgb(255,0,0)';
    // bmd.context.fillRect(0,0,100,100);
    // bmd.dirty = true;

    //  works
    // alphaMask(bmd, 'raster', 'knightHawksFilled', 'source-atop');
    // bmd.context.drawImage(game.cache.getImage('knightHawks'), 0, 0);

    bmd.alphaMask('raster', 'knightHawksFilled');
    bmd.context.drawImage(game.cache.getImage('knightHawks'), 0, 0);

    //  Create Alpha Mask from image. Give it a source colour and it will create a new image the same size
    //  in the cache that is JUST those pixels from it.
    //  Then we can do the above op in 1 pass without needing 2 different images, although you'll take the
    //  hit scanning the pixels on start-up.



    image = game.add.image(0, 0, bmd);

}

function alphaMask (bmd, source, mask, op) {

        var temp = bmd.context.globalCompositeOperation;

        if (typeof mask === 'string')
        {
            mask = bmd.game.cache.getImage(mask);
        }

        if (mask)
        {
            bmd.context.drawImage(mask, 0, 0);
        }

        bmd.context.globalCompositeOperation = op;

        if (typeof source === 'string')
        {
            source = bmd.game.cache.getImage(source);
        }

        if (source)
        {
            bmd.context.drawImage(source, 0, 0);
        }

        bmd.context.globalCompositeOperation = temp;

}

function update() {

}
