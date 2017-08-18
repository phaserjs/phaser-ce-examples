
var bmd;
var fringe;
var fogCircle;
var cursors;
var speed = 4;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload ()
{
    game.load.image('pic', 'assets/pics/Bounty_Hunter_by_Anathematixs_Desire.png');
}

function create ()
{
    game.add.image(0, 0, 'pic');

    fogCircle = new Phaser.Circle(800, 800, 1600);

    fringe = 64;

    //  Create a new bitmap data the same size as our game
    bmd = game.make.bitmapData(800, 600);

    updateFogOfWar();

    bmd.addToWorld();

    cursors = game.input.keyboard.createCursorKeys();
}

function update ()
{
    if (cursors.left.isDown)
    {
        fogCircle.x -= speed;
        updateFogOfWar();
    }
    else if (cursors.right.isDown)
    {
        fogCircle.x += speed;
        updateFogOfWar();
    }

    if (cursors.up.isDown)
    {
        fogCircle.y -= speed;
        updateFogOfWar();
    }
    else if (cursors.down.isDown)
    {
        fogCircle.y += speed;
        updateFogOfWar();
    }
}

function updateFogOfWar ()
{
    var gradient = bmd.context.createRadialGradient(fogCircle.x, fogCircle.y, fogCircle.radius, fogCircle.x, fogCircle.y, fogCircle.radius - fringe);

    gradient.addColorStop(0, 'rgba(255,255,255,0.8');
    gradient.addColorStop(0.4, 'rgba(0,0,0,0.5');
    gradient.addColorStop(1, 'rgba(0,0,0,0');

    bmd.clear();
    bmd.context.fillStyle = gradient;
    bmd.context.fillRect(0, 0, 800, 600);
}