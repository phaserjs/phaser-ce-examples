
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('manga', 'assets/pics/manga-girl.png');
    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

function create() {

    game.stage.backgroundColor = '#4b0049';

    var disk = game.add.sprite(200, 200, 'disk');
    disk.inputEnabled = true;

    var manga = game.add.sprite(70, 100, 'manga');
    manga.inputEnabled = true;

    var card = game.add.sprite(300, 300, 'card');
    card.inputEnabled = true;

    //  Set our own custom input candidate handler
    game.input.setInteractiveCandidateHandler(handler, this);

}

function handler (pointer, candidates, favorite) {

    if (candidates.length > 1)
    {
        //  We're going to always return the 'disk' object if it's part of the candidates
        //  Even though it's at the back of the display list, and doesn't use priorityIDs
        for (var i = 0; i < candidates.length; i++)
        {
            if (candidates[i].sprite.key === 'disk')
            {
                return candidates[i];
            }
        }

        return favorite;
    }
    else
    {
        return favorite;
    }

}

function render() {

    var name = (game.input.activePointer.targetObject) ? game.input.activePointer.targetObject.sprite.key : 'none';

    game.debug.text("Pointer Target: " + name, 32, 32);

}
