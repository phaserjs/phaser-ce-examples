var conf = {
    width: 800,
    height: 600,
    renderer: Phaser.CANVAS,
    parent: 'phaser-example',
    transparent: false,
    antialias: false,
    state: this,
    resolution: 2
};

var game = new Phaser.Game(conf);

function preload() {

    game.load.image('colors', 'assets/misc/gradient-palettes.png');
    game.load.spritesheet('arrow', 'assets/misc/arrows.png', 16, 16);

}

var bmd;
var bmdSprite;
var markers;
var swatchBMD;
var swatch;
var isDragging = false;
var isOnSwatch = false;
var arrow1;
var arrow2;
var currentArrow = null;
var chunk = 8;

// rgba(52,3,98,1) to rgba(247,130,11,1) chunk 16

function create() {

    game.stage.backgroundColor = '#535353';

	bmd = game.make.bitmapData(500, 550);
    bmd.smoothed = false;
    bmdSprite = bmd.addToWorld(30, 20);

    markers = game.add.group();

    createMarker(bmdSprite.y);
    createMarker(bmdSprite.y + bmd.height);

    arrow1 = markers.children[0];
    arrow2 = markers.children[1];

    currentArrow = arrow1;
    currentArrow.frame = 1;

    game.input.onDown.add(checkClick, this);

    swatchBMD = game.make.bitmapData();
    swatchBMD.load('colors');

    swatch = game.add.sprite(800 - 220, 10, swatchBMD);
    swatch.inputEnabled = true;
    swatch.events.onInputDown.add(startSwatch, this);
    swatch.events.onInputUp.add(stopSwatch, this);
    swatch.events.onInputOut.add(stopSwatch, this);

    refresh();

    game.input.addMoveCallback(updateColor, this);

}

function startSwatch(sprite, pointer) {

    isOnSwatch = true;

    updateColor(pointer);

}

function stopSwatch() {

    isOnSwatch = false;

}

function updateColor(pointer) {

    if (isOnSwatch)
    {
        var x = pointer.x - swatch.x;
        var y = pointer.y - swatch.y;
        var color = swatchBMD.getPixelRGB(x, y);

        currentArrow.color = Phaser.Color.getColor32(color.a, color.r, color.g, color.b);
        currentArrow.webrgb = Phaser.Color.getWebRGB(currentArrow.color);
        currentArrow.rgb = Phaser.Color.getRGB(currentArrow.color);

        refresh();
    }

}

function makeCurrent(sprite) {

    currentArrow.frame = 0;

    currentArrow = sprite;

    currentArrow.frame = 1;

}

function checkClick(pointer) {

    if (pointer.x > bmdSprite.x && pointer.x <= bmdSprite.right)
    {
        createMarker(pointer.y);
        markers.sort('y');
        refresh();
    }

}

function createMarker(y) {

    var arrow = markers.create(bmdSprite.x - 18, y, 'arrow', 0);

    arrow.anchor.set(0, 0.5);
    arrow.inputEnabled = true;

    if (markers.total > 2)
    {
        arrow.input.enableDrag();
        arrow.input.allowHorizontalDrag = false;
        arrow.input.boundsRect = new Phaser.Rectangle(0, 50, 50, 500);
        arrow.events.onDragStart.add(startRefresh, this);
        arrow.events.onDragStop.add(stopRefresh, this);
    }

    arrow.color = Phaser.Color.getRandomColor();
    arrow.webrgb = Phaser.Color.getWebRGB(arrow.color);
    arrow.rgb = Phaser.Color.getRGB(arrow.color);

    arrow.events.onInputDown.add(pickColor, this);

    if (markers.total > 2)
    {
        makeCurrent(arrow);
    }

}

function pickColor(arrow) {

    makeCurrent(arrow);

}

function selectColor(sprite, pointer) {

    var x = pointer.x - swatch.x;
    var y = pointer.y - swatch.y;
    var color = swatchBMD.getPixelRGB(x, y);

    currentArrow.color = Phaser.Color.getColor32(color.a, color.r, color.g, color.b);
    currentArrow.webrgb = Phaser.Color.getWebRGB(currentArrow.color);
    currentArrow.rgb = Phaser.Color.getRGB(currentArrow.color);

    refresh();

}

function startRefresh(sprite) {

    makeCurrent(sprite);

    isDragging = true;

}

function stopRefresh(sprite) {

    isDragging = false;
    markers.sort('y');
    refresh();

}

function refresh() {

    var y = 0;
    var step;
    var marker1;
    var marker2;
    var distance;

    bmd.cls();

    for (var c = 0; c < markers.children.length - 1; c++)
    {
        marker1 = markers.children[c];
        marker2 = markers.children[c + 1];

        var dy = marker1.y - bmdSprite.y;
        var sy = marker2.y - bmdSprite.y;

        distance = sy - dy;
        y = dy;
        step = Math.floor(distance / chunk);
        remainder = distance - (step * chunk);

        for (var i = 0; i < step; i++)
        {
            var ci = Phaser.Color.interpolateRGB(marker1.rgb.r, marker1.rgb.g, marker1.rgb.b, marker2.rgb.r, marker2.rgb.g, marker2.rgb.b, step, i);
            bmd.ctx.fillStyle = Phaser.Color.getWebRGB(ci);

            bmd.ctx.fillRect(0, dy, bmd.width, chunk);

            dy += chunk;
        }

        //  Fill in the little gap that is left (if any)
        if (remainder > 0)
        {
            bmd.ctx.fillRect(0, dy, bmd.width, remainder);
        }
    }

    bmd.dirty = true;

}

function update() {

    if (isDragging)
    {
        refresh();
    }

}
