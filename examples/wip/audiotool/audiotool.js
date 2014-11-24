
var game = new Phaser.Game(1024, 600, Phaser.CANVAS, 'ss', { create: create });

var images = [];

function create() {

    game.stage.backgroundColor = '#ffffff';

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

}

function buildSpriteSheet() {

    images = images.sort();

    console.log(images);

    // bmd.canvas.toBlob(function(blob) {
    //     saveAs(blob, "spritesheet.png");
    // });

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

                    // var img = document.createElement('img');
                    // img.src = e.target.result;
                    // images.push(theFile.name);
                    // game.cache.addImage(theFile.name, '', img);
                    // console.log(theFile.name, 'last');
                    buildSpriteSheet();

                };
            }
            else
            {
                return function(e) {

                    // var img = document.createElement('img');
                    // img.src = e.target.result;
                    // images.push(theFile.name);
                    // game.cache.addImage(theFile.name, '', img);
                    // console.log(theFile.name);

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
