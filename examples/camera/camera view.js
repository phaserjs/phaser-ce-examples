
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

var card;
var cursors;
var moving = 0;

function create() {

    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    card = game.add.sprite(200, 200, 'card');

    cursors = game.input.keyboard.createCursorKeys();

    game.input.onDown.add(toggle, this);

}

function toggle() {

    moving = (moving === 0) ? moving = 1 : moving = 0;

}

function update() {

    if (moving === 0)
    {
        if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
    }
    else
    {
        if (cursors.left.isDown)
        {
            card.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            card.x += 4;
        }

        if (cursors.up.isDown)
        {
            card.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            card.y += 4;
        }
    }

}

function render() {

    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteInfo(card, 32, 32);

    game.debug.text('Click to toggle sprite / camera movement with cursors', 32, 550);

}
