
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', this);

var canvas;
var grid;
var ui;
var preview;
var paletteArrow;

var isDown = false;
var pal = [];
var color = 0;
var ci = 0;
var zoom = 32;
var size = 8;
var palette = 0;

var data = [];

var keys;

function create() {

    for (var y = 0; y < 16; y++)
    {
        var s = '................';
        data.push(s);
    }

    Phaser.Canvas.setUserSelect(game.canvas, 'none');
    Phaser.Canvas.setTouchAction(game.canvas, 'none');

    //  Create some grid textures
    game.create.grid('uiGrid', 32 * 16, zoom, 32, 32, 'rgba(255,255,255,0.5)');
    game.create.grid('drawingGrid', 16 * zoom, 16 * zoom, 32, 32, 'rgba(0,191,243,0.8)');

    //  Create some icons
    var arrow = [
        '  22  ',
        ' 2222 ',
        '222222',
        '  22  ',
        '  22  '
    ];

    game.create.texture('arrow', arrow, 2);



    canvas = game.make.bitmapData(16 * zoom, 16 * zoom);
    ui = game.make.bitmapData(800, zoom);
    preview = game.make.bitmapData(16 * size, 16 * size);

    //  Draw the palette to it
    var x = 0;

    for (var clr in game.create.palettes[palette])
    {
        ui.rect(x, 0, 32, 32, game.create.palettes[palette][clr]);
        pal.push(game.create.palettes[palette][clr]);
        x += 32;
    }

    ui.copy('uiGrid');

    color = pal[0];
    ci = 0;

    canvas.addToWorld(0, zoom * 2);
    game.add.image(0, zoom * 2, 'drawingGrid');
    ui.addToWorld();
    preview.addToWorld(600, zoom * 2);

    paletteArrow = game.add.sprite(8, 36, 'arrow');

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


}

function shiftLeft() {

    canvas.moveH(-zoom);
    preview.moveH(-size);

}

function shiftRight() {

    canvas.moveH(zoom);
    preview.moveH(size);

}

function shiftUp() {

    canvas.moveV(-zoom);
    preview.moveV(-size);

}

function shiftDown() {

    canvas.moveV(zoom);
    preview.moveV(size);

}

function onDown(pointer) {

    if (pointer.y <= 32)
    {
        //  Pick color
        var x = game.math.snapToFloor(pointer.x, zoom) / zoom;

        if (x < 16)
        {
            color = pal[x];
            ci = x;
        }

        paletteArrow.x = (x * 32) + 8;
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

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function paint(pointer) {

    if (!isDown)
    {
        return;
    }

    //  Get the grid loc from the pointer
    var x = game.math.snapToFloor(pointer.x, zoom);
    var y = game.math.snapToFloor(pointer.y - (zoom*2), zoom);

    canvas.rect(x, y, zoom, zoom, color);

    x /= zoom;
    y /= zoom;

    console.log(x, y);

    var s = data[y];
    var s2 = s.replaceAt(x, ci);
    data[y] = s2;

    console.table(data);

    preview.rect(x * size, y * size, size, size, color);

}

function update() {


}
