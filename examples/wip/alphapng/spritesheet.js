
var game = new Phaser.Game("98%", 600, Phaser.CANVAS, 'ss', { create: create });

var images = [];

var bmd;
var bmd2;
var sprite;
var sprite2;

function create() {

    game.stage.backgroundColor = '#ffffff';

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

}

function scanForAlpha() {

    var i = 0;

    var width = game.cache.getImage(images[i]).width;
    var height = game.cache.getImage(images[i]).height;

    if (bmd)
    {
        bmd.cls();
        bmd.resize(width, height);
    }
    else
    {
        bmd = game.make.bitmapData(width, height);
        sprite = bmd.addToWorld();
    }

    if (bmd2)
    {
        bmd2.cls();
        bmd2.resize(width, height);
    }
    else
    {
        bmd2 = game.make.bitmapData(width, height);
        sprite2 = bmd2.addToWorld();
    }

    sprite2.x = width + 16;

    bmd.draw(images[i], 0, 0);
    bmd.update();

    bmd2.draw(images[i], 0, 0);
    bmd2.update();

    bmd2.processPixelRGB(forEachPixel, this);

    //  File Save
    // bmd2.canvas.toBlob(function(blob) {
        // saveAs(blob, filename);
    // });

}

function forEachPixel (pixel) {

    /**
    * This callback will be sent a single object with 6 properties: `{ r: number, g: number, b: number, a: number, color: number, rgba: string }`.
    * Where r, g, b and a are integers between 0 and 255 representing the color component values for red, green, blue and alpha.
    * The `color` property is an Int32 of the full color. Note the endianess of this will change per system.
    * The `rgba` property is a CSS style rgba() string which can be used with context.fillStyle calls, among others.
    * The callback must return either `false`, in which case no change will be made to the pixel, or a new color object.
    * If a new color object is returned the pixel will be set to the r, g, b and a color values given within it.
    */

    //  The incoming pixel values
    var r = pixel.r;
    var g = pixel.g;
    var b = pixel.b;
    var a = pixel.a;

    if (a === 0)
    {
        if (r !== 0 || g !== 0 || b !== 0)
        {
            pixel.r = 255;
            pixel.a = 255;
        }
    }

    return pixel;

}

function trimSprites() {

    images = images.sort();

    console.log(images);

    for (var i = 0; i < images.length; i++)
    {
        var width = game.cache.getImage(images[i]).width;
        var height = game.cache.getImage(images[i]).height;

        if (bmd)
        {
            bmd.cls();
            bmd.resize(width, height);
        }
        else
        {
            bmd = game.make.bitmapData(width, height);
            bmd.addToWorld();
        }

        bmd.draw(images[i], 0, 0);

        bmd.update();

        var trim = bmd.getBounds();

        if (bmd2)
        {
            bmd2.cls();
            bmd2.resize(trim.width, trim.height);
        }
        else
        {
            bmd2 = game.make.bitmapData(trim.width, trim.height);
            bmd2.addToWorld(width, 0);
        }

        bmd2.copyRect(bmd, trim, 0, 0);

        var filename = trim.x + "x" + trim.y + "_" + images[i];

        //  File Save
        bmd2.canvas.toBlob(function(blob) {
            saveAs(blob, filename);
        });
    }

}

function handleFileSelect(evt) {

    images = [];

    evt.stopPropagation();
    evt.preventDefault();

    // FileList object.
    var files = evt.dataTransfer.files; 

    // files is a FileList of File objects. List some properties.
    var output = [];

    for (var i = 0, f; f = files[i]; i++)
    {
        if (!f.type.match('image.*'))
        {
            // Only process image files.
            continue;
        }

        var reader = new FileReader();

        var last = false;

        if (i === files.length - 1)
        {
            last = true;
        }

        reader.onload = (function(theFile, last) {

            if (last)
            {
                return function(e) {

                    var img = document.createElement('img');
                    img.src = e.target.result;
                    images.push(theFile.name);
                    game.cache.addImage(theFile.name, '', img);
                    console.log(theFile.name, 'last');
                    scanForAlpha();

                };
            }
            else
            {
                return function(e) {

                    var img = document.createElement('img');
                    img.src = e.target.result;
                    images.push(theFile.name);
                    game.cache.addImage(theFile.name, '', img);
                    console.log(theFile.name);

                };
            }

        })(f, last);

        reader.readAsDataURL(f);

    }

}

function handleDragOver(evt) {

    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

}
