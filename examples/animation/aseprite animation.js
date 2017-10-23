
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload ()
{
    //  Load the Aseprite atlas:
    game.load.atlas('tank', 'assets/atlas/tank.png', 'assets/atlas/tank.json');
}

function create ()
{
    //  A more suitable underwater background color
    game.stage.backgroundColor = '#1873CE';

    var tank = game.add.sprite(700, 250, 'tank');

    tank.anchor.x = 0.5;
    tank.scale.set(4);
    tank.smoothed = false;

    //  Aseprite exports frames with .ase on the end.
    //  Create 2 animations:
    var move = tank.animations.add('move', Phaser.Animation.generateFrameNames('tank ', 0, 3, '.ase', 1));
    var turn = tank.animations.add('turn', Phaser.Animation.generateFrameNames('tank ', 4, 8, '.ase', 1));

    //  Play it
    move.play(30, true);
    
    //  Move the tank
    var tween = game.add.tween(tank).to({ x: 100 }, 3000, 'Linear', true);

    //  When the tween ends, play the turning animation
    tween.onComplete.add(function () {

        turn.play(8, false);

    }, this);

    //  Set-up a callback for when the turn animation completes (basically flip the tank and send it the other way)
    turn.onComplete.add(function () {

        tank.scale.x *= -1;

        move.play(30, true);

        var destX = (tank.x <= 100) ? 700 : 100;

        var tween = game.add.tween(tank).to({ x: destX }, 3000, 'Linear', true);

        tween.onComplete.add(function () {

            turn.play(8, false);

        }, this);

    }, this);
}
