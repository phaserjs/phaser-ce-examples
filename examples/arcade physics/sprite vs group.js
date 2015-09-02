
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);

}

var sprite;
var group;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    sprite = game.add.sprite(32, 200, 'phaser');

    game.physics.arcade.enable(sprite);
    
    group = game.add.physicsGroup();

    for (var i = 0; i < 50; i++)
    {
        var c = group.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'veggies', game.rnd.between(0, 35));
        c.body.mass = -100;
    }

    for (var i = 0; i < 20; i++)
    {
        var c = group.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'veggies', 17);
    }

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (game.physics.arcade.collide(sprite, group, collisionHandler, processHandler, this))
    {
        console.log('boom');
    }

    // game.physics.arcade.overlap(sprite, group, collisionHandler, null, this);

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

function processHandler (player, veg) {

    return true;

}

function collisionHandler (player, veg) {

    if (veg.frame == 17)
    {
        veg.kill();
    }

}
