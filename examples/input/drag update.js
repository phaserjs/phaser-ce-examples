
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('ship', 'assets/sprites/ship.png');
    game.load.image('ball', 'assets/sprites/longarrow.png');

}

var angle = 0;
var dragSprite;
var copySprite;

function create() {

    game.stage.backgroundColor = '#2f0f1c';

    dragSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
    dragSprite.anchor.set(0.5);

    //  Input Enable the sprite
    dragSprite.inputEnabled = true;

    //  Allow dragging
    dragSprite.input.enableDrag();

    //  Drag events
    dragSprite.events.onDragStart.add(dragStart);
    dragSprite.events.onDragUpdate.add(dragUpdate);
    dragSprite.events.onDragStop.add(dragStop);

    copySprite = game.add.sprite(dragSprite.x + 220, dragSprite.y, 'ball');
    copySprite.anchor.set(0, 0.5);
    copySprite.alpha = 0.5;
    copySprite.angle = 180;

    var text = game.add.text(32, 32, "drag the ship", { font: "32px Arial", fill: "#f9b4cf" });
    text.setShadow(6, 6, 'rgba(0,0,0,0.8)', 5);

}

function dragStart() {

    copySprite.alpha = 1;

}

function dragUpdate(sprite, pointer, dragX, dragY, snapPoint) {

    //  As we drag the ship around inc the angle
    angle += 0.01;

    //  This just circles the copySprite around the sprite being dragged
    copySprite.x = dragSprite.x + 220 * Math.cos(angle);
    copySprite.y = dragSprite.y + 220 * Math.sin(angle);

    //  And this points the copySprite at the current pointer
    copySprite.rotation = game.physics.arcade.angleToPointer(copySprite);

}

function dragStop() {

    copySprite.alpha = 0.5;

}
