
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var marker;
var quadTree;
var rects = [];

function create() {

    quadTree = new Phaser.QuadTree(0, 0, 800, 600, 10, 4, 0);

    for (var i = 0; i < 48; i++)
    {
        var x = game.world.randomX;
        var y = game.world.randomY;

        if (x > 760)
        {
            x = 760;
        }

        if (y > 560)
        {
            y = 560;
        }

        var rect = new Phaser.Rectangle(x, y, 32, 32);
        rect.id = i;
        rect.flagged = false;
        rects.push(rect);
        quadTree.insert(rect);
    }

    marker = new Phaser.Rectangle(0, 0, 128, 128);

    game.input.onDown.add(retrieve, this);

}

function retrieve() {

    for (var i = 0; i < rects.length; i++)
    {
        rects[i].flagged = false;
    }

    var found = quadTree.retrieve(marker);

    console.log(found);

    for (var i = 0; i < found.length; i++)
    {
        found[i].flagged = true;
    }

}

function update() {

    marker.x = game.input.x;
    marker.y = game.input.y;

}

function render() {

    game.debug.quadTree(quadTree);

    for (var i = 0; i < rects.length; i++)
    {
        if (rects[i].flagged)
        {
            game.debug.geom(rects[i], '#ff0000');
        }
        else
        {
            game.debug.geom(rects[i]);
        }

        game.debug.text(rects[i].id, rects[i].x + 4, rects[i].y + 16);
    }

    game.debug.geom(marker, '#00bff3', false);

}
