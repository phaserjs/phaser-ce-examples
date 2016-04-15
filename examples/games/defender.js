var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload () {

    game.load.image('player', 'assets/sprites/shmup-ship2.png');
    game.load.image('star', 'assets/demoscene/star2.png');
    game.load.image('baddie', 'assets/sprites/space-baddie.png');
    game.load.image('lazer', 'assets/games/defender/lazer2.png');

}

var stars;
var baddies;
var lazers;
var player;
var cursors;
var fireButton;
var bulletTime = 0;

function create () {

    game.world.setBounds(0, 0, 800*4, 600);

    stars = game.add.group();

    for (var i = 0; i < 128; i++)
    {
        stars.create(game.world.randomX, game.world.randomY, 'star');
    }

    baddies = game.add.group();

    for (var i = 0; i < 16; i++)
    {
        baddies.create(game.world.randomX, game.world.randomY, 'baddie');
    }

    lazers = game.add.group();

    player = game.add.sprite(100, 300, 'player');
    player.anchor.x = 0.5;

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {

    if (cursors.left.isDown)
    {
        player.x -= 8;
        player.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        player.x += 8;
        player.scale.x = 1;
    }

    if (cursors.up.isDown)
    {
        player.y -= 8;
    }
    else if (cursors.down.isDown)
    {
        player.y += 8;
    }

    if (fireButton.isDown)
    {
        fireBullet();
    }

    lazers.forEachAlive(updateBullets, this);

}

function updateBullets (lazer) {

    if (lazer.scale.x === 1)
    {
        lazer.x += 22;

        if (lazer.x > game.world.width)
        {
            lazer.kill();
        }
    }
    else
    {
        lazer.x -= 22;

        if (lazer.x < 0)
        {
            lazer.kill();
        }
    }

    if (lazer.cropRect.width < 244)
    {
        lazer.cropRect.x -= 16;
        lazer.cropRect.width += 16;
        lazer.updateCrop();
    }

}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        lazer = lazers.getFirstDead(true, player.x + 80 * player.scale.x, player.y + 16, 'lazer');

        lazer.scale.x = player.scale.x;

        if (lazer.scale.x === 1)
        {
            lazer.anchor.x = 1;
        }
        else
        {
            lazer.anchor.x = 0;
        }

        //  Lazers start out with a width of 96 and expand over time
        lazer.crop(new Phaser.Rectangle(244-96, 0, 96, 2), true);

        bulletTime = game.time.now + 20;
    }

}
