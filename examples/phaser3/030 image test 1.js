
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('gem', 'assets/sprites/gem.png');

}

var image;

function create() {

    // image = game.add.image(0, 0, 'gem');

    image = new Phaser.GameObject.Image(game, 0, 200, 'gem');

    console.dir(image);

    image.anchor = 0.5;

    game.add.tween(image).to({ x: 700, angle: 90, scale: 2 }, 2000, 'Linear', true, 0, -1, true);

    game.input.onDown.add(click, this);

}

function click () {

    image.y = game.world.randomY;

}

function update () {

    image.transform.update();

}

function render () {

    image.render(game.renderer, image);

}
