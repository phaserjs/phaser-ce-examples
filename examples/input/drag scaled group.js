
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('grid', 'assets/tests/debug-grid-1920x1920.png');
    game.load.image('atari', 'assets/sprites/atari800xl.png');

}

function create() {

    game.add.sprite(0, 0, 'grid');

    var group = game.add.group();
    group.scale.set(1.5);
    // group.scale.set(0.8);

    var atari1 = group.create(100, 100, 'atari');
    atari1.scale.set(0.7);
    atari1.inputEnabled = true;

    // atari1.input.enableDrag(false);
    atari1.input.enableDrag(true);

    var atari2 = game.add.sprite(500, 300, 'atari');
    atari2.inputEnabled = true;
    atari2.input.enableDrag(true);


}
