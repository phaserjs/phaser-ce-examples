var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render:render });

function preload() {

    game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);

}

var sprite;
var cursors;

function create() {

    // game.enableStep();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite = game.add.sprite(400, 100, 'gameboy', 2);

    sprite.anchor.set(0.5, 0);

    game.physics.arcade.enable(sprite);

    game.input.onDown.add(moveSprite, this);

    game.add.tween(sprite.body).to( { y: 400 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
    // game.add.tween(sprite).to( { y: 400 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

    cursors = game.input.keyboard.createCursorKeys();

}

function moveSprite(pointer) {

    console.log('move to ', pointer.x, pointer.y, sprite.body.phase);

    // sprite.scale.x = -2;

    sprite.x = pointer.x;


    // sprite.y = pointer.y;
    // sprite.body._reset = true;
    // sprite._cache[4] = 1;

    // sprite.body.x = pointer.x;
    // sprite.body.y = pointer.y;

}

function update() {

    if (cursors.left.isDown)
    {
        sprite.scale.x = -1;
        sprite.x -= 3;
        // sprite.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.scale.x = 1;
        sprite.x += 3;
        // sprite.body.velocity.x = 300;
    }
    else
    {
        sprite.body.velocity.x = 0;
    }

}

function render() {

    game.debug.text(sprite.body._dx, 32, 32);
    game.debug.text(sprite.body._dy, 32, 64);
    game.debug.body(sprite);

}
