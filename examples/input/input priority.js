
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('manga', 'assets/pics/manga-girl.png');
    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

function create() {

    game.stage.backgroundColor = '#4b0049';

    //  Note the input.priorityID values below.

    //  Even though the card and disk sprites visually appear on-top of the manga sprite,
    //  because they have lower priorityIDs the manga sprite gets priority in all input events.

    //  Without the priorityID, input priority is given to the sprite at the top of the display list
    //  (in this case to card).

    var manga = game.add.sprite(100, 100, 'manga');
    manga.inputEnabled = true;
    manga.input.enableDrag(false, false, true); // true = run a pixel perfect check ONLY when you click on the Sprite
    // manga.input.pixelPerfectOver = true;
    manga.input.priorityID = 2;

    var disk = game.add.sprite(200, 200, 'disk');
    disk.alpha = 0.7;
    disk.inputEnabled = true;
    disk.input.enableDrag(false, false, true);
    // disk.input.pixelPerfectOver = true;
    disk.input.priorityID = 1;

    var card = game.add.sprite(300, 300, 'card');
    card.inputEnabled = true;
    card.input.enableDrag(false, false, true);
    // card.input.pixelPerfectOver = true;
    card.input.priorityID = 0;

}

function render() {

    game.debug.text("Drag the Sprites", 32, 32);

}
