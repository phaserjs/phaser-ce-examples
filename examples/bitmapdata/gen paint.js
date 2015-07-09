
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', this);

//  Dimensions
var previewSize = 4;
var spriteWidth = 8;
var spriteHeight = 8;

//  UI
var ui;
var paletteArrow;
var coords;
var size;
var sizeUp;
var sizeDown;
var previewSizeUp;
var previewSizeDown;
var previewSizeText;
var saveIcon;
var saveText;
var rightCol = 532;

//  Drawing Area
var canvas;
var canvasBG;
var canvasGrid;
var canvasSprite;
var canvasZoom = 32;

//  Sprite Preview
var preview;
var previewBG;

//  Keys + Mouse
var keys;
var isDown = false;
var isErase = false;

//  Palette
var ci = 0;
var color = 0;
var palette = 0;
var pmap = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];

//  Data
var data = [];

function resetData() {

    data = [];

    for (var y = 0; y < spriteHeight; y++)
    {
        var a = [];

        for (var x = 0; x < spriteWidth; x++)
        {
            a.push('.');
        }

        data.push(a);
    }

}

function createUI() {

    game.create.grid('uiGrid', 32 * 16, 32, 32, 32, 'rgba(255,255,255,0.5)');

    //  Create some icons
    var arrow = [
        '  22  ',
        ' 2222 ',
        '222222',
        '  22  ',
        '  22  '
    ];

    var plus = [
        '2222222',
        '2.....2',
        '2..2..2',
        '2.222.2',
        '2..2..2',
        '2.....2',
        '2222222'
    ];

    var minus = [
        '2222222',
        '2.....2',
        '2.....2',
        '2.222.2',
        '2.....2',
        '2.....2',
        '2222222'
    ];

    var disk = [
        'DDDDDDDDDD',
        'DED1111DED',
        'DED1111DDD',
        'DEDDDDDDED',
        'DEEEEEEEED',
        'DEFFFFFFED',
        'DEFF222FED',
        'DEFF222FED',
        'DEFF222FED',
        'DDDDDDDDDD'
    ];

    game.create.texture('arrow', arrow, 2);
    game.create.texture('plus', plus, 3);
    game.create.texture('minus', minus, 3);
    game.create.texture('save', disk, 4);

    ui = game.make.bitmapData(800, 32);

    drawPalette();

    ui.addToWorld();

    var style = { font: "20px Courier", fill: "#fff", tabs: 80 };
    coords = game.add.text(rightCol, 8, "X: 0\tY: 0", style);
    size = game.add.text(rightCol, 40, "W: " + spriteWidth + "\tH: " + spriteHeight, style);
    previewSizeText = game.add.text(rightCol, 160, "Size: " + previewSize, style);
    saveText = game.add.text(rightCol, 520, "Saved to console.log", style);
    saveText.alpha = 0;

    paletteArrow = game.add.sprite(8, 36, 'arrow');

    sizeUp = game.add.sprite(rightCol + 170, 40, 'plus');
    sizeUp.inputEnabled = true;
    sizeUp.input.useHandCursor = true;
    sizeUp.events.onInputDown.add(increaseSize, this);

    sizeDown = game.add.sprite(rightCol + 210, 40, 'minus');
    sizeDown.inputEnabled = true;
    sizeDown.input.useHandCursor = true;
    sizeDown.events.onInputDown.add(decreaseSize, this);

    previewSizeUp = game.add.sprite(rightCol + 170, 160, 'plus');
    previewSizeUp.inputEnabled = true;
    previewSizeUp.input.useHandCursor = true;
    previewSizeUp.events.onInputDown.add(increasePreviewSize, this);

    previewSizeDown = game.add.sprite(rightCol + 210, 160, 'minus');
    previewSizeDown.inputEnabled = true;
    previewSizeDown.input.useHandCursor = true;
    previewSizeDown.events.onInputDown.add(decreasePreviewSize, this);

    saveIcon = game.add.sprite(750, 550, 'save');
    saveIcon.inputEnabled = true;
    saveIcon.input.useHandCursor = true;
    saveIcon.events.onInputDown.add(save, this);

}

function createDrawingArea() {

    game.create.grid('drawingGrid', 16 * canvasZoom, 16 * canvasZoom, canvasZoom, canvasZoom, 'rgba(0,191,243,0.8)');

    canvas = game.make.bitmapData(spriteWidth * canvasZoom, spriteHeight * canvasZoom);
    canvasBG = game.make.bitmapData(canvas.width + 2, canvas.height + 2);

    canvasBG.rect(0, 0, canvasBG.width, canvasBG.height, '#fff');
    canvasBG.rect(1, 1, canvasBG.width - 2, canvasBG.height - 2, '#000');

    var x = 10;
    var y = 64;

    canvasBG.addToWorld(x, y);
    canvasSprite = canvas.addToWorld(x + 1, y + 1);
    canvasGrid = game.add.sprite(x + 1, y + 1, 'drawingGrid');
    canvasGrid.crop(new Phaser.Rectangle(0, 0, spriteWidth * canvasZoom, spriteHeight * canvasZoom));

}

function resizeCanvas() {

    canvas.resize(spriteWidth * canvasZoom, spriteHeight * canvasZoom);
    canvasBG.resize(canvas.width + 2, canvas.height + 2);

    canvasBG.rect(0, 0, canvasBG.width, canvasBG.height, '#fff');
    canvasBG.rect(1, 1, canvasBG.width - 2, canvasBG.height - 2, '#000');

    canvasGrid.crop(new Phaser.Rectangle(0, 0, spriteWidth * canvasZoom, spriteHeight * canvasZoom));
    
}

function createPreview() {

    preview = game.make.bitmapData(spriteWidth * previewSize, spriteHeight * previewSize);
    previewBG = game.make.bitmapData(preview.width + 2, preview.height + 2);

    previewBG.rect(0, 0, previewBG.width, previewBG.height, '#fff');
    previewBG.rect(1, 1, previewBG.width - 2, previewBG.height - 2, '#000');

    var x = rightCol;
    var y = 192;

    previewBG.addToWorld(x, y);
    preview.addToWorld(x + 1, y + 1);

}

function resizePreview() {

    preview.resize(spriteWidth * previewSize, spriteHeight * previewSize);
    previewBG.resize(preview.width + 2, preview.height + 2);

    previewBG.rect(0, 0, previewBG.width, previewBG.height, '#fff');
    previewBG.rect(1, 1, previewBG.width - 2, previewBG.height - 2, '#000');
    
}

function refresh() {

    //  Update both the Canvas and Preview
    canvas.clear();
    preview.clear();

    for (var y = 0; y < spriteHeight; y++)
    {
        for (var x = 0; x < spriteWidth; x++)
        {
            var i = data[y][x];

            if (i !== '.' && i !== ' ')
            {
                color = game.create.palettes[palette][i];
                canvas.rect(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
                preview.rect(x * previewSize, y * previewSize, previewSize, previewSize, color);
            }
        }
    }

}

function createEventListeners() {

    //  Event listeners

    keys = game.input.keyboard.addKeys(
        {
            'save': Phaser.Keyboard.S,
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT,
            'changePalette': Phaser.Keyboard.P,
            'nextColor': Phaser.Keyboard.PERIOD,
            'prevColor': Phaser.Keyboard.COMMA
        }
    );

    keys.save.onDown.add(save, this);
    keys.up.onDown.add(shiftUp, this);
    keys.down.onDown.add(shiftDown, this);
    keys.left.onDown.add(shiftLeft, this);
    keys.right.onDown.add(shiftRight, this);
    keys.changePalette.onDown.add(changePalette, this);
    keys.nextColor.onDown.add(nextColor, this);
    keys.prevColor.onDown.add(prevColor, this);

    game.input.mouse.capture = true;
    game.input.onDown.add(onDown, this);
    game.input.onUp.add(onUp, this);
    game.input.addMoveCallback(paint, this);

}

function drawPalette() {

    //  Draw the palette to the UI bmd
    ui.clear(0, 0, 32 * 16, 32);

    var x = 0;

    for (var clr in game.create.palettes[palette])
    {
        ui.rect(x, 0, 32, 32, game.create.palettes[palette][clr]);
        x += 32;
    }

    ui.copy('uiGrid');

}

function changePalette() {

    palette++;

    if (!game.create.palettes[palette])
    {
        palette = 0;
    }

    drawPalette();
    refresh();

}

function setColor(i) {

    if (i < 0)
    {
        i = 15;
    }
    else if (i >= 16)
    {
        i = 0;
    }

    colorIndex = i;
    color = game.create.palettes[palette][pmap[colorIndex]];

    paletteArrow.x = (i * 32) + 8;

}

function nextColor() {

    var i = colorIndex + 1;
    setColor(i);

}

function prevColor() {

    var i = colorIndex - 1;
    setColor(i);

}

function increaseSize() {

    if (spriteWidth === 16)
    {
        return;
    }

    spriteWidth++;
    spriteHeight++;

    resetData();
    resizeCanvas();
    resizePreview();

    size.text = "W: " + spriteWidth + "\tH: " + spriteHeight;

}

function decreaseSize() {

    if (spriteWidth === 4)
    {
        return;
    }

    spriteWidth--;
    spriteHeight--;

    resetData();
    resizeCanvas();
    resizePreview();

    size.text = "W: " + spriteWidth + "\tH: " + spriteHeight;

}

function increasePreviewSize() {

    if (previewSize === 16)
    {
        return;
    }

    previewSize++;
    previewSizeText.text = "Size: " + previewSize;

    resizePreview();
    refresh();

}

function decreasePreviewSize() {

    if (previewSize === 1)
    {
        return;
    }

    previewSize--;
    previewSizeText.text = "Size: " + previewSize;

    resizePreview();
    refresh();

}

function create() {

    //   So we can right-click to erase
    document.body.oncontextmenu = function() { return false; };

    Phaser.Canvas.setUserSelect(game.canvas, 'none');
    Phaser.Canvas.setTouchAction(game.canvas, 'none');

    game.stage.backgroundColor = '#505050';

    createUI();
    createDrawingArea();
    createPreview();
    createEventListeners();

    resetData();
    setColor(2);

}

function save() {

    var output = "var data = [\n";

    for (var y = 0; y < spriteHeight; y++)
    {
        output = output.concat("\t'");
        output = output.concat(data[y].join(''));

        if (y < spriteHeight - 1)
        {
            output = output.concat("',\n");
        }
        else
        {
            output = output.concat("'\n");
        }
    }
    
    output = output.concat("];\n");
    output = output.concat("game.create.texture('yourKey', data, " + previewSize + ", " + previewSize + ", " + palette + ");\n");

    console.log(output);

    saveText.alpha = 1;
    game.add.tween(saveText).to( { alpha: 0 }, 2000, "Linear", true);

}

function shiftLeft() {

    canvas.moveH(-canvasZoom);
    preview.moveH(-previewSize);

    for (var y = 0; y < spriteHeight; y++)
    {
        var r = data[y].shift();
        data[y].push(r);
    }

}

function shiftRight() {

    canvas.moveH(canvasZoom);
    preview.moveH(previewSize);

    for (var y = 0; y < spriteHeight; y++)
    {
        var r = data[y].pop();
        data[y].splice(0, 0, r);
    }

}

function shiftUp() {

    canvas.moveV(-canvasZoom);
    preview.moveV(-previewSize);

    //  0 = [1,1,1,1,1,1,1,1];
    //  1 = [2,0,0,0,0,0,0,2];
    //  2 = [3,0,0,0,0,0,0,3];
    //  
    //  after:
    //  
    //  0 = [2,0,0,0,0,0,0,2];
    //  1 = [3,0,0,0,0,0,0,3];
    //  2 = [1,1,1,1,1,1,1,1];

    var top = data.shift();
    data.push(top);

}

function shiftDown() {

    canvas.moveV(canvasZoom);
    preview.moveV(previewSize);

    var bottom = data.pop();
    data.splice(0, 0, bottom);

}

function onDown(pointer) {

    if (pointer.y <= 32)
    {
        setColor(game.math.snapToFloor(pointer.x, 32) / 32);
    }
    else
    {
        isDown = true;

        if (pointer.rightButton)
        {
            isErase = true;
        }
        else
        {
            isErase = false;
        }

        paint(pointer);
    }

}

function onUp() {
    isDown = false;
}

function paint(pointer) {

    //  Get the grid loc from the pointer
    var x = game.math.snapToFloor(pointer.x - canvasSprite.x, canvasZoom) / canvasZoom;
    var y = game.math.snapToFloor(pointer.y - canvasSprite.y, canvasZoom) / canvasZoom;

    if (x < 0 || x >= spriteWidth || y < 0 || y >= spriteHeight)
    {
        return;
    }

    coords.text = "X: " + x + "\tY: " + y;

    if (!isDown)
    {
        return;
    }

    if (isErase)
    {
        data[y][x] = '.';
        canvas.clear(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
        preview.clear(x * previewSize, y * previewSize, previewSize, previewSize, color);
    }
    else
    {
        data[y][x] = pmap[colorIndex];
        canvas.rect(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
        preview.rect(x * previewSize, y * previewSize, previewSize, previewSize, color);
    }

}
