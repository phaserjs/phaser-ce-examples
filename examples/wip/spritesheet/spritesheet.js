
var game = new Phaser.Game(1024, 600, Phaser.CANVAS, 'ss', { create: create });

var images = [];
var bmd;
var bmd2;

function create() {

    game.stage.backgroundColor = '#ffffff';

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    var dropZone2 = document.getElementById('drop_zone2');
    dropZone2.addEventListener('dragover', handleDragOver, false);
    dropZone2.addEventListener('drop', handleFileSelectTrim, false);

}

function trimSprites() {

    images = images.sort();

    console.log(images);

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
        bmd.addToWorld();
    }

    bmd.draw(images[i], 0, 0);

    bmd.update();

    // console.log(bmd.getFirstPixel(0));

    console.log(bmd.getBounds());

}

function OLDtrimSprites() {

    images = images.sort();

    console.log(images);

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
        bmd.addToWorld();
    }

    bmd.draw(images[i], 0, 0);

    bmd.update();

    var trim = new Phaser.Rectangle();
    var pixel = Phaser.Color.createColor();

    //  Scan from the top

    var x = 0;
    var y = 0;

    do {

        Phaser.Color.unpackPixel(bmd.getPixel32(x, y), pixel);
        x++;

        if (x === width)
        {
            x = 0;
            y++;
        }

    }
    while (pixel.a === 0);

    trim.y = y;

    //  Scan from the left

    var x = 0;
    var y = 0;

    do {

        Phaser.Color.unpackPixel(bmd.getPixel32(x, y), pixel);
        y++;

        if (y === height)
        {
            y = 0;
            x++;
        }

    }
    while (pixel.a === 0);

    trim.x = x;

    //  Scan from the bottom

    var x = 0;
    var y = height;

    do {

        Phaser.Color.unpackPixel(bmd.getPixel32(x, y), pixel);
        x++;

        if (x === width)
        {
            x = 0;
            y--;
        }

    }
    while (pixel.a === 0);

    trim.height = (y - trim.y) + 1;

    //  Scan from the right

    var x = width;
    var y = 0;

    do {

        Phaser.Color.unpackPixel(bmd.getPixel32(x, y), pixel);
        y++;

        if (y === height)
        {
            y = 0;
            x--;
        }

    }
    while (pixel.a === 0);

    trim.width = (x - trim.x) + 1;

    console.log('trim area', trim);

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

function trimDebug() {

    for (var y = 0; y < height; y++)
    {
        for (var x = 0; x < width; x++)
        {
            Phaser.Color.unpackPixel(bmd.getPixel32(x, y), pixel);

            if (pixel.a > 0)
            {
                bmd.setPixel32(x, y, 0, 255, 0, 255, false);
            }
        }
    }

    bmd.context.putImageData(bmd.imageData, 0, 0);
    bmd.dirty = true;

}

function buildSpriteSheet() {

    images = images.sort();

    console.log(images);

    var width = 0;
    var height = 0;

    for (var i = 0; i < images.length; i++)
    {
        width += game.cache.getImage(images[i]).width;

        if (game.cache.getImage(images[i]).height > height)
        {
            height = game.cache.getImage(images[i]).height;
        }
    }

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

    var x = 0;

    for (var i = 0; i < images.length; i++)
    {
        bmd.draw(images[i], x, 0);
        x += game.cache.getImage(images[i]).width;
    }

    //  File Save
    bmd.canvas.toBlob(function(blob) {
        saveAs(blob, "spritesheet.png");
    });

}

function handleFileSelectTrim(evt) {

    images = [];

    evt.stopPropagation();
    evt.preventDefault();

    // FileList object.
    var files = evt.dataTransfer.files; 

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
                    trimSprites();

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
                    buildSpriteSheet();

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
