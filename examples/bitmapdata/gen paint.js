
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var canvas;
var grid;
var ui;
var preview;

var isDown = false;
var pal = [];
var color = 0;
var zoom = 32;
var size = 8;

var keys;

function create() {

    Phaser.Canvas.setUserSelect(game.canvas, 'none');
    Phaser.Canvas.setTouchAction(game.canvas, 'none');

    canvas = game.make.bitmapData(16 * zoom, 16 * zoom);
    ui = game.make.bitmapData(800, zoom);
    grid = game.make.bitmapData((16 * zoom)+1, (16 * zoom)+1);
    preview = game.make.bitmapData(16 * size, 16 * size);

    //  Draw the palette to it
    var x = 0;

    for (var clr in grid.palettes.arne)
    {
        ui.rect(x, 0, 32, 32, grid.palettes.arne[clr]);
        pal.push(grid.palettes.arne[clr]);
        x += 32;
    }

    color = pal[0];

    ui.grid(32, 32, 'rgba(255,255,255,0.5)');
    grid.grid(zoom, zoom, 'rgba(0,191,243,0.8)');

    canvas.addToWorld(zoom, zoom * 2);
    grid.addToWorld(zoom, zoom * 2);
    ui.addToWorld();
    preview.addToWorld(600, zoom * 2);

    canvas.rect(0, 0, canvas.width, canvas.height, 'rgba(0,191,243,0.2)');

    keys = game.input.keyboard.addKeys(
        [ Phaser.Keyboard.S, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT ],
        [ 'save', 'up', 'down', 'left', 'right' ]
    );

    //  Event listeners

    keys.save.onDown.add(save, this);
    keys.up.onDown.add(shiftUp, this);
    keys.down.onDown.add(shiftDown, this);
    keys.left.onDown.add(shiftLeft, this);
    keys.right.onDown.add(shiftRight, this);

    game.input.onDown.add(onDown, this);
    game.input.onUp.add(onUp, this);
    game.input.addMoveCallback(paint, this);

}

function save() {

    console.log('save!');

}

function shiftLeft() {

    canvas.moveH(-32);

}

function shiftRight() {

    canvas.moveH(32);

}

function shiftUp() {

    canvas.moveV(-32);

}

function shiftDown() {

    canvas.moveV(32);

}

function onDown(pointer) {

    if (pointer.y <= 32)
    {
        //  Pick colour
        var x = game.math.snapToFloor(pointer.x, zoom) / zoom;

        if (x < 16)
        {
            color = pal[x];
        }
    }
    else
    {
        isDown = true;
        paint(pointer);
    }

}

function onUp() {
    isDown = false;
}

function paint(pointer) {

    if (!isDown)
    {
        return;
    }

    //  Get the grid loc from the pointer
    var x = game.math.snapToFloor(pointer.x - zoom, zoom);
    var y = game.math.snapToFloor(pointer.y - (zoom*2), zoom);

    canvas.rect(x, y, zoom, zoom, color);

    x /= zoom;
    y /= zoom;

    // console.log(x, y);

    preview.rect(x * size, y * size, size, size, color);

}

function update() {


}
