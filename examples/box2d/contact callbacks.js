/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('firstaid', 'assets/sprites/firstaid.png');
    game.load.image('enemy', 'assets/sprites/shmup-baddie3.png');
    game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

}

var ship;
var cursors;
var shipHP = 100;
var enemyHP = 100;
var shipHPCaption;
var enemyHPCaption;

function create() {

    game.stage.backgroundColor = '#124184';
    
    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);

    var enemy = game.add.sprite(400,300,'enemy');
    game.physics.box2d.enable(enemy);
    enemy.body.setCircle(25);
    enemy.body.static = true;
    
    var healths = game.add.group();
    healths.enableBody = true;
    healths.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 10; i++)
    {
        var sprite = healths.create(game.world.randomX, game.world.randomY, 'firstaid');
        sprite.body.setCollisionCategory(2); // this is a bitmask
        sprite.body.sensor = true;
    }

    ship = game.add.sprite(200, 200, 'ship');
    ship.scale.set(2);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');

    // Create our physics body - a 28px radius circle.
    game.physics.box2d.enable(ship);
    ship.body.fixedRotation = true;
    ship.body.setCircle(28);

    // A body specific callback.
    ship.body.setBodyContactCallback(enemy, enemyCallback, this);
    
    // A callback to match fixtures of category 2 (bitmask!)
    ship.body.setCategoryContactCallback(2, healthCallback, this);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    game.add.text(5,  5, 'Use arrow keys to move. Bump into the enemy to attack it.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5,  25, 'Attacking the enemy will cause you to lose health.', { fill: '#ffffff', font: '14pt Arial' });
    shipHPCaption = game.add.text(5, 45, 'Ship health: ' + shipHP, { fill: '#aaffaa', font: '14pt Arial' });
    enemyHPCaption = game.add.text(5, 65, 'Enemy health: ' + shipHP, { fill: '#ffaaaa', font: '14pt Arial' });
    
}

// This function will be triggered when the ship begins or ends touching the enemy.
function enemyCallback(body1, body2, fixture1, fixture2, begin) {

    // This callback is also called for EndContact events, which we are not interested in.
    if (!begin)
    {
        return;
    }

    // body1 is the ship because it's the body that owns the callback
    // body2 is the body it impacted with, in this case the enemy
    // fixture1 is the fixture of body1 that was touched
    // fixture2 is the fixture of body2 that was touched

    shipHP -= 23;
    enemyHP -= 15;
    
    if (shipHP <= 0)
    {
        ship.destroy();
    }    

    if (enemyHP <= 0)
    {
        body2.sprite.destroy();
    }

    shipHPCaption.text = 'Ship health: ' + (shipHP > 0 ? shipHP : 'dead!');
    enemyHPCaption.text = 'Enemy health: ' + (enemyHP > 0 ? enemyHP : 'dead!');
}

// This function will be triggered when the ship begins or ends touching a health pickup.
function healthCallback(body1, body2, fixture1, fixture2, begin) {

    // This callback is also called for EndContact events, which we are not interested in.
    if (!begin)
    {
        return;
    }
    
    // body1 is the ship because it's the body that owns the callback
    // body2 is the body it impacted with, in this case the health
    // fixture1 is the fixture of body1 that was touched
    // fixture2 is the fixture of body2 that was touched

    // Only pick up health when not at full health
    if (shipHP < 100)
    {
        shipHP += 8;

        if (shipHP > 100)
        {
            shipHP = 100;
        }
    
        shipHPCaption.text = 'Ship health: ' + shipHP;
        body2.sprite.destroy();
    }

}

function update() {

    ship.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        ship.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        ship.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
        ship.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        ship.body.moveDown(200);
    }
}

function render() {

    game.debug.box2dWorld();
    
}
