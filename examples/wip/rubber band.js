
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);

}

var balls;

var draggingBand = false;
var draggingSprite = null;
var dragPoint;
var dragDelta;

var band;
var bandDisplay;

var selection = [];
var target = null;

function create() {

    game.stage.backgroundColor = '#08538a';

    balls = game.add.group();

    for (var i = 0; i < 40; i++)
    {
        var sprite = balls.create(game.world.randomX, game.world.randomY, 'balls', 1);
        sprite.inputEnabled = true;
        // sprite.input.enableDrag();
        sprite.events.onDragStart.add(startDrag, this);
        sprite.events.onDragStop.add(stopDrag, this);
    }

    band = new Phaser.Rectangle();

    bandDisplay = game.add.graphics(0, 0);
    bandDisplay.lineStyle(1, 0xffffff, 1);

    dragPoint = new Phaser.Point;
    dragDelta = new Phaser.Point;

    game.input.onDown.add(startRubberBand, this);
    game.input.onUp.add(stopRubberBand, this);
    game.input.addMoveCallback(updatePointer, this);

}

function startRubberBand (pointer) {

    //  Check this, otherwise they've clicked on a Sprite
    if (pointer.targetObject === null)
    {
        draggingBand = true;

        band.x = pointer.x;
        band.y = pointer.y;
        band.width = 1;
        band.height = 1;

        selection.length = 0;
        balls.forEach(clearSelection, this);
    }

}

function clearSelection (item) {

    item.frame = 1;
    item.input.disableDrag();

}

function stopRubberBand (pointer) {

    draggingBand = false;

    //  Normalise the rubber band, so the intersects check works
    if (band.width < 0)
    {
        band.x += band.width;
        band.width = Math.abs(band.width);
    }

    if (band.height < 0)
    {
        band.y += band.height;
        band.height = Math.abs(band.height);
    }

    if (!band.empty)
    {
        //  Get all the sprites inside or touching the rubber band
        balls.forEach(addToSelection, this);
    }
    
}

function addToSelection (item) {

    var bounds = item.getBounds();

    if (Phaser.Rectangle.intersects(bounds, band))
    {
        item.frame = 0;
        item.input.enableDrag();
        item.originPoint = new Phaser.Point(item.x, item.y);

        selection.push(item);
    }

}

function updatePointer (pointer) {

    if (draggingBand)
    {
        band.width = pointer.x - band.x;
        band.height = pointer.y - band.y;
    }
    else if (draggingSprite !== null)
    {
        dragDelta.set(pointer.x - dragPoint.x, pointer.y - dragPoint.y);

        for (var i = 0; i < selection.length; i++)
        {
            if (selection[i] !== draggingSprite)
            {
                selection[i].x = selection[i].originPoint.x + dragDelta.x;
                selection[i].y = selection[i].originPoint.y + dragDelta.y;
            }
        }
    }

}

function startDrag (sprite, pointer) {

    if (selection.indexOf(sprite) > -1)
    {
        dragPoint.set(sprite.x, sprite.y);
        draggingSprite = sprite;
    }

}

function stopDrag (sprite, pointer) {

    draggingSprite = null;
    
}

function update() {
}

function render() {

    bandDisplay.clear();

    if (draggingBand)
    {
        bandDisplay.lineStyle(1, 0xffffff, 1);
        bandDisplay.beginFill(0xffffff, 0.1);
        bandDisplay.drawRect(band.x, band.y, band.width, band.height);
    }

    // game.debug.text(dragPoint, 32, 32);
    // game.debug.text(dragDelta, 32, 64);

}
