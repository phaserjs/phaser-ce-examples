
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var items;

function preload() {

    game.load.spritesheet('item', 'assets/buttons/number-buttons-90x90.png', 90, 90);
    game.load.image('rect', 'assets/tests/200x100corners.png');
}

function create() {

    // Create item container group.
    items = game.add.group();

    // Add some items and add them to the container group,
    // then you can drag and drop them to remove.
    var item;

    for (var i = 0; i < 6; i++)
    {
        // Directly create sprites from the group.
        item = items.create(90, 16 + 90 * i, 'item', i);

        item.name = 'block' + i;

        // Enable input detection, then it's possible be dragged.
        item.inputEnabled = true;

        // Make this item draggable.
        item.input.enableDrag();

        // Then we make it snap to 90x90 grids.
        item.input.enableSnap(90, 90, false, true);

        // Add a handler to remove it using different options when dropped.
        item.events.onDragStop.add(dropHandler, this);
    }

    // Create a rectangle drop it at this rectangle to
    // remove it from origin group normally or
    // cut it from the group's array entirely.
    var rect = game.add.sprite(390, 0, 'rect');
    rect.scale.setTo(2.0, 3.0);

}

function render() {

    game.debug.text('Group size: ' + items.total, 74, 580);
    game.debug.text('Drop here to remove item from the Group', 394, 24);
    
}

function dropHandler(item, pointer) {

    if (item.x < 90)
    {
        item.x = 90;
    }
    else if (item.x > 400)
    {
        //  Remove the item from the Group.
        items.remove(item);
    }

}
