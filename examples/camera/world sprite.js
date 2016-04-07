
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

var card;
var cursors;

function create() {

    game.forceSingleUpdate = true;

    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    card = game.add.sprite(200, 200, 'card');
    card.anchor.set(0.5);

    game.physics.enable(card, Phaser.Physics.ARCADE);
    card.body.collideWorldBounds = true;

    game.camera.follow(card);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    card.body.velocity.x = 0;
    card.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        // card.x -= 4;
        card.body.velocity.x = -240;
    }
    else if (cursors.right.isDown)
    {
        // card.x += 4;
        card.body.velocity.x = 240;
    }

    if (cursors.up.isDown)
    {
        // card.y -= 4;
        card.body.velocity.y = -240;
    }
    else if (cursors.down.isDown)
    {
        // card.y += 4;
        card.body.velocity.y = 240;
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(card, 32, 32);

    game.debug.rectangle({x:400+game.camera.x,y:0+game.camera.y,width:1,height:600});
    game.debug.rectangle({x:0+game.camera.x,y:300+game.camera.y,width:800,height:1});

}
