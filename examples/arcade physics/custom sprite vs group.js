Vegetable = function (game) {

    frame = game.rnd.between(0, 35);

    //  Just because we don't want a false chilli (frame 17)
    if (frame === 17)
    {
        frame = 1;
    }

    var x = game.rnd.between(100, 770);
    var y = game.rnd.between(0, 570);

    Phaser.Image.call(this, game, x, y, 'veggies', frame);

};

Vegetable.prototype = Object.create(Phaser.Image.prototype);
Vegetable.prototype.constructor = Vegetable;

Chilli = function (game) {

    var x = game.rnd.between(100, 770);
    var y = game.rnd.between(0, 570);

    Phaser.Sprite.call(this, game, x, y, 'veggies', 17);

    game.physics.arcade.enable(this);

};

Chilli.prototype = Object.create(Phaser.Sprite.prototype);
Chilli.prototype.constructor = Chilli;

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

    //  This example will check Sprite vs. Group collision
   
    group = game.add.group();

    for (var i = 0; i < 70; i++)
    {
        if (i < 50)
        {
            //  Vegetables don't have any physics bodies
            group.add(new Vegetable(game));
        }
        else
        {
            //  But a chilli has a physics body
            group.add(new Chilli(game));
        }
    }

    //  Our player
    sprite = game.add.sprite(32, 200, 'phaser');

    game.physics.arcade.enable(sprite);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.overlap(sprite, group, collisionHandler, null, this);

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

function collisionHandler (player, chilli) {

    //  If the player collides with a chilli it gets eaten :)
    chilli.kill();

}

