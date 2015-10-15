
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var data = [];
var polyline = [];
var tracing = false;
var current;
var dropZone;
var bmd;

function create() {

    game.stage.backgroundColor = 0x000000;

    //  When the current line is done it'll get rendered to this bmd
    bmd = game.make.bitmapData(800, 600);
    bmd.addToWorld();

    keys = game.input.keyboard.addKeys(
        {
            'close': Phaser.Keyboard.SPACEBAR,
            'save': Phaser.Keyboard.S
        }
    );

    keys.close.onDown.add(closeLine, this);
    keys.save.onDown.add(save, this);

    game.input.onDown.add(onDown, this);
    game.input.onUp.add(onUp, this);
    game.input.addMoveCallback(trace, this);

}

function save() {

    console.clear();

    var s = 'var data = [\n';

    for (var i = 0; i < polyline.length; i++)
    {
        s += '\t[ ' + polyline[i].start.x + ', ' + polyline[i].start.y + ', ' + polyline[i].end.x + ', ' + polyline[i].end.y + ' ]';

        if (i === polyline.length - 1)
        {
            s += '\n';
        }
        else
        {
            s += ',\n';
        }
    }

    s += '];';
    
    console.log(s);

}

function closeLine() {

    if (current)
    {
        current = null;
        tracing = false;
    }

}

function onDown(pointer) {

    if (tracing)
    {
        //  End line
        var x = current.end.x;
        var y = current.end.y;

        polyline.push(current.clone());

        bmd.line(current.start.x, current.start.y, current.end.x, current.end.y, '#00ff00');

        //  If it closes the line then quit
        if (x === dropZone.x && y === dropZone.y)
        {
            data.push(polyline.slice(0));
            polyline = [];
            current = null;
            tracing = false;
            redraw();
        }
        else
        {
            current = new Phaser.Line(x, y, pointer.x, pointer.y);
        }
    }
    else
    {
        current = new Phaser.Line(pointer.x, pointer.y, pointer.x, pointer.y);
        dropZone = new Phaser.Circle(pointer.x, pointer.y, 16);
        tracing = true;
    }

}

function redraw() {

    // console.log(data);

    bmd.cls();
    bmd.ctx.fillStyle = '#00aa00';

    for (var i = 0; i < data.length; i++)
    {
        var path = data[i];

        bmd.ctx.beginPath();

        bmd.ctx.moveTo(path[0].start.x, path[0].start.y);

        for (var n = 0; n < path.length; n++)
        {
            bmd.ctx.lineTo(path[n].end.x, path[n].end.y);
        }

        bmd.ctx.closePath();

        bmd.ctx.fill();
    }

}

function onUp(pointer) {


    
}

function trace(pointer) {

    if (current)
    {
        if (dropZone.contains(pointer.x, pointer.y) && polyline.length > 1)
        {
            current.end.setTo(dropZone.x, dropZone.y);
        }
        else
        {
            current.end.setTo(pointer.x, pointer.y);
        }
    }

}

function update() {

}

function render() {

    if (current)
    {
        if (dropZone.contains(current.end.x, current.end.y))
        {
            game.debug.geom(current, '#ffff00');
        }
        else
        {
            game.debug.geom(current, '#00ff00');
        }
    }

}

