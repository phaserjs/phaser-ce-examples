
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
