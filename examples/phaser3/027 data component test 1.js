
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('gem', 'assets/sprites/gem.png');

}

var image;

function create() {

    image = game.add.image(0, 0, 'gem');

    image.data.set('name', 'Red GemStone');
    image.data.set('level', 2);
    image.data.set('value', 650);
    image.data.set('owner', 'Michael');

    console.log(image.data.get('name'));
    console.dir(image.data.getAll());

    image.data.pop('value');

    console.dir(image.data.getAll());

}
