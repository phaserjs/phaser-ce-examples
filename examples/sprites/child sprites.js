
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var parent;

function preload() {

    game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var parent;

function create() {

    // parent = game.add.sprite(100, 100, 'mushroom');

    // parent.addChild(game.make.sprite(0, 0, 'mummy'));
    // parent.addChild(game.make.sprite(100, 0, 'mummy'));
    // parent.addChild(game.make.sprite(200, 200, 'mummy'));
    // parent.addChild(game.make.sprite(0, 100, 'mummy'));

    parent = game.add.group();
    parent.create(0, 0, 'mushroom');
    parent.create(100, 0, 'mushroom');
    parent.create(100, 100, 'mushroom');
    parent.create(0, 100, 'mushroom');

    var graphics = game.add.graphics(0, 0);

    // graphics.lineStyle(2, 0xffd900, 1);

    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(300, 300, 100);

    parent.add(graphics);


}

function update() {

    parent.x += 0.1;

}

function render() {

    game.debug.text(parent.width, 32, 32);
    game.debug.geom(parent.getBounds());

}