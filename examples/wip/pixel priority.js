
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('shock', 'assets/pics/shocktroopers_lulu.png');
    game.load.image('atari', 'assets/sprites/atari800.png');

}

function create() {

    //  High Priority, not pixel perfect - SHOULD ALWAYS BE PICKED UP
    var shock = game.add.sprite(250, 200, 'shock');
    shock.inputEnabled = true;
    shock.input.enableDrag();
    shock.input.priorityID = 1;

    //  Pixel Perfect but lower priority, so should not be dragged if the input got 'shock' first
    var atari = game.add.sprite(100, 200, 'atari');
    atari.alpha = 0.7;
    atari.inputEnabled = true;
    // atari.input.pixelPerfectClick = true; // assigned before enableDrag = works, after = fails
    // atari.input.enableDrag();
    atari.input.enableDrag(false, false, true); // true = pixel perfect
    atari.input.priorityID = 3;

}
