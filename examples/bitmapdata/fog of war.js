
var bmd;
var fringe;
var fogCircle;
var cursors;
var speed = 4;
var player;

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload ()
{
    game.load.image('map', 'assets/misc/ccmap.png');
    game.load.image('plane', 'assets/sprites/ww2-plane.png');
}

function create ()
{
    game.world.resize(2208, 1368);

    game.add.image(0, 0, 'map');

    //  A random player that will move around the map, the fog follows the player, not the camera
    player = game.add.image(300, 400, 'plane');
    player.anchor.setTo(0.5);

    fogCircle = new Phaser.Circle(800, 800, 800);

    fringe = 64;

    //  Create a new bitmap data the same size as our game
    bmd = game.make.bitmapData(800, 600);

    updateFogOfWar();

    var fogSprite = bmd.addToWorld();

    fogSprite.fixedToCamera = true;

    cursors = game.input.keyboard.createCursorKeys();

    var tween = game.add.tween(player).to({ x: 2000, y: 800 }, 15000, "Linear", true, 0, -1, true);

    tween.onLoop.add(function (sprite, tween) {
        sprite.scale.x *= -1
    }, 0, this);
}

function update ()
{
    fogCircle.x = player.x;
    fogCircle.y = player.y;

    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

    updateFogOfWar();
}

function updateFogOfWar ()
{
    var gradient = bmd.context.createRadialGradient(
        fogCircle.x - game.camera.x,
        fogCircle.y - game.camera.y,
        fogCircle.radius,
        fogCircle.x - game.camera.x,
        fogCircle.y - game.camera.y,
        fogCircle.radius - fringe
    );

    gradient.addColorStop(0, 'rgba(0,0,0,0.8');
    gradient.addColorStop(0.4, 'rgba(0,0,0,0.5');
    gradient.addColorStop(1, 'rgba(0,0,0,0');

    bmd.clear();
    bmd.context.fillStyle = gradient;
    bmd.context.fillRect(0, 0, 800, 600);
}