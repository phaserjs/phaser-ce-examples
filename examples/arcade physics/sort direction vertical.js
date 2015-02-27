
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);

}

var sprite;
var group;
var cursors;

function create() {

    game.world.setBounds(0, 0, 800, 3000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    sprite = game.add.sprite(400, 2900, 'phaser');

    // game.physics.arcade.sortDirection = Phaser.Physics.Arcade.TOP_BOTTOM;
    game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP;

    game.physics.arcade.enable(sprite);
    
    group = game.add.physicsGroup(Phaser.Physics.ARCADE);

    for (var i = 0; i < 500; i++)
    {
        var c = group.create(game.rnd.integerInRange(64, 800-64), game.rnd.integerInRange(100, 2900), 'veggies', game.rnd.integerInRange(0, 35));
        c.name = 'veg' + i;
        c.body.immovable = true;
    }

    for (var i = 0; i < 20; i++)
    {
        //  Here we'll create some chillis which the player can pick-up. They are still part of the same Group.
        var c = group.create(game.rnd.integerInRange(64, 800-64), game.rnd.integerInRange(0, 2000), 'veggies', 17);
        c.body.immovable = true;
    }

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide(sprite, group, collisionHandler, null, this);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 200;
    }

}

function collisionHandler (player, veg) {

    //  If the player collides with the chillis then they get eaten :)
    //  The chilli frame ID is 17

    if (veg.frame === 17)
    {
        veg.kill();
    }

}

