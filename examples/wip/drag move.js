var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});

var graphics;
var bmd;

function preload() {
    game.load.image('block', 'assets/sprites/block.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    block = game.add.sprite(100, 100, 'block');
    block1 = game.add.sprite(100, 300, 'block');

    block.originX = block.x;
    block.originY = block.y;
    block1.originX = block1.x;
    block1.originY = block1.y;

    block.inputEnabled = true;
    block1.inputEnabled = true;

    block.input.enableDrag(false, false);
    block1.input.enableDrag(false, true);

    block.events.onDragStop.add(blockDragStop, this);
    block1.events.onDragStop.add(blockDragStop, this);

    // Text

    var text1 = "input.enableDrag(false, false);";
    var text2 = "input.enableDrag(false, true) - Not working";

    var style = { font: "15px Arial", fill: "#ffffff", align: "left" };

    var t1 = game.add.text(100, 210, text1, style);
    var t2 = game.add.text(100, 410, text2, style);

}

function blockDragStop(item, pointer) {

    console.log('onDragStop');

    game.add.tween(item).to({x: item.originX, y: item.originY }, 400, Phaser.Easing.Back.Out, true);

}

function update() {
}
