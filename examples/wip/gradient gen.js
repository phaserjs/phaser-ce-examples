var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('colors', 'assets/misc/colormap.png');
    game.load.spritesheet('arrow', 'assets/misc/arrows.png', 16, 16);

}

var bmd;
var markers;
var swatch;
var isDragging = false;
var arrow1;
var arrow2;

// rgba(52,3,98,1) to rgba(247,130,11,1) chunk 16

function create() {

    game.stage.backgroundColor = '#2d2d2d';

	bmd = game.make.bitmapData(700, 500);
    bmd.addToWorld(50, 50);

    markers = game.add.group();

    createMarker(50);
    createMarker(550);

    arrow1 = markers.children[0];
    arrow2 = markers.children[1];

    game.input.onDown.add(checkClick, this);

    // game.add.image(0, 0, 'colors');

    refresh();

}

function checkClick(pointer) {

    if (pointer.x > 50)
    {
        createMarker(pointer.y);
        markers.sort('y');
        refresh();
    }

}

function createMarker(y) {

    var arrow = markers.create(50 - 18, y, 'arrow', 0);

    arrow.anchor.set(0, 0.5);
    arrow.inputEnabled = true;

    if (markers.total > 2)
    {
        console.log('create marker');
        arrow.input.enableDrag();
        arrow.input.allowHorizontalDrag = false;
        arrow.input.boundsRect = new Phaser.Rectangle(0, 50, 50, 500);
        arrow.events.onDragStart.add(startRefresh, this);
        arrow.events.onDragStop.add(stopRefresh, this);
    }

    arrow.color = Phaser.Color.getRandomColor();
    arrow.webrgb = Phaser.Color.getWebRGB(arrow.color);
    arrow.rgb = Phaser.Color.getRGB(arrow.color);

    // arrow.events.onInputDown.add(pickColor, this);

    console.log(arrow.webrgb);

}

function startRefresh(marker) {

    marker.frame = 1;
    isDragging = true;

}

function stopRefresh(marker) {

    marker.frame = 0;
    isDragging = false;
    markers.sort('y');
    refresh();

}

function refresh() {

    var y = 0;
    var chunk = 8;
    var step;
    var marker1;
    var marker2;
    var distance;

    bmd.cls();

    for (var c = 0; c < markers.children.length - 1; c++)
    {
        marker1 = markers.children[c];
        marker2 = markers.children[c + 1];

        var dy = marker1.y - 50;
        var sy = marker2.y - 50;

        distance = sy - dy;
        y = dy;
        step = Math.floor(distance / chunk);
        remainder = distance - (step * chunk);

        for (var i = 0; i < step; i++)
        {
            var ci = Phaser.Color.interpolateRGB(marker1.rgb.r, marker1.rgb.g, marker1.rgb.b, marker2.rgb.r, marker2.rgb.g, marker2.rgb.b, step, i);
            bmd.ctx.fillStyle = Phaser.Color.getWebRGB(ci);

            bmd.ctx.fillRect(0, dy, 700, chunk);

            dy += chunk;
        }

        //  Fill in the little gap that is left (if any)
        if (remainder > 0)
        {
            bmd.ctx.fillRect(0, dy, 700, remainder);
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

function render() {

}
