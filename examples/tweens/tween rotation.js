
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('arrow', 'assets/sprites/longarrow.png');
    game.load.image('beball', 'assets/sprites/beball1.png');

}

var target;
var arrow;

function create() {

    game.stage.backgroundColor = '#2384e7';

    target = game.add.sprite(600, 200, 'beball');
    target.anchor.set(0.5);

    arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    arrow.anchor.set(0.1, 0.5);

    var angleTo = arrow.position.angle(target.position);
    var diffAngle = rotateToAngle(0, angleTo);

    game.add.tween(arrow).to({ rotation: diffAngle }, 1000, 'Linear', true);

    game.input.onDown.add(rotate, this);

}

function rotate () {

    target.x = game.world.randomX;
    target.y = game.world.randomY;

    var angleTo = arrow.position.angle(target.position);
    var diffAngle = rotateToAngle(arrow.rotation, angleTo);

    game.add.tween(arrow).to({ rotation: diffAngle }, 1000, 'Linear', true);

}

function rotateToAngle (currentAngle, targetAngle) {

    if (currentAngle === targetAngle)
    {
        return currentAngle;
    }

    if (!Math.abs(targetAngle - currentAngle) <= 0 && !Math.abs(targetAngle - currentAngle) >= Phaser.Math.PI2)
    {
        if (Math.abs(targetAngle - currentAngle) > Math.PI)
        {
            if (targetAngle < currentAngle)
            {
                targetAngle += Phaser.Math.PI2;
            }
            else
            {
                targetAngle -= Phaser.Math.PI2;
            }
        }
    }

    return targetAngle;

}
