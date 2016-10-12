
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('gem', 'assets/sprites/gem.png');

}

var image;

function create() {

    image = game.add.image(0, 0, 'gem');

    image.data.set('name', 'Red GemStone');
    image.data.set('value_armor', true);
    image.data.set('armor_head', 50);
    image.data.set('armor_body', 250);
    image.data.set('armor_feet', 15);

    //  Query lets you run a regular expression against the keys,
    //  and get an object back with them all in.
    //  Here we're checking for keys matching 'armor' at the start
    console.log(image.data.query(/^armor/));

}
