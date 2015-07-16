
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);

}

var cursors;
var player;
var left;
var right;

function create() {

    game.stage.backgroundColor = '#ff00ff';

    player = game.add.sprite(48, 48, 'player', 1);
    player.smoothed = false;
    player.scale.set(4);

    left = player.animations.add('left', [8,9], 10, true);
    right = player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    left.enableUpdate = true;
    right.enableUpdate = true;

    // left.onUpdate.add(function(anim, f) { console.log('l', f); });
    // right.onUpdate.add(function(anim, f) { console.log('r', f); });

    game.physics.enable(player, Phaser.Physics.ARCADE);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    player.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.play('down');
    }
    else
    {
        player.animations.stop();
    }

}

function render() {

    game.debug.text(player.frame, 32, 32);

    // game.debug.body(player);

}
