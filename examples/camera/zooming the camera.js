
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

var card;
var cursors;
var zooming = false;
var zoomAmount = 0;

var size = new Phaser.Rectangle();

function create() {

    //  1920 x 1200 (960 x 600)
    game.world.setBounds(-960, -600, 1920, 1200);

    size.setTo(-960, -600, 1920, 1200);

    game.add.sprite(-960, -600, 'backdrop');

    // card = game.add.sprite(200.5, 200.5, 'card');

    cursors = game.input.keyboard.createCursorKeys();

    //  world center is 0x0, top-left is -960x-600
    game.camera.focusOnXY(-960, -600);

    // game.world.pivot.x = game.world.width / 2;
    // game.world.pivot.y = game.world.height / 2;
    // console.log(game.world.pivot);

    // game.camera.bounds = null;

    game.input.onDown.add(startZoom, this);
    game.input.onUp.add(stopZoom, this);

}

function startZoom(pointer) {

    zooming = true;

    if (pointer.button === Phaser.Mouse.LEFT_BUTTON)
    {
        zoomAmount = 0.005;
    }
    else
    {
        zoomAmount = -0.005;
    }

}

function stopZoom(pointer) {

    zooming = false;

}

function update() {

    if (zooming)
    {
        game.camera.scale.x += zoomAmount;
        game.camera.scale.y += zoomAmount;

        game.camera.bounds.x = size.x * game.camera.scale.x;
        game.camera.bounds.y = size.y * game.camera.scale.y;
        game.camera.bounds.width = size.width * game.camera.scale.x;
        game.camera.bounds.height = size.height * game.camera.scale.y;

        console.log(game.camera.view);
        // console.log(game.camera.bounds);
        // console.log(game.input.activePointer.worldX, game.input.activePointer.worldY);

        // game.camera.focusOnXY(game.input.activePointer.worldX, game.input.activePointer.worldY);

        // game.world.position.x = -game.input.activePointer.worldX * game.camera.scale.x;
        // game.world.position.y = -game.input.activePointer.worldY * game.camera.scale.y;

        // game.world.pivot.x = game.input.activePointer.worldX * game.camera.scale.x;
        // game.world.pivot.y = game.input.activePointer.worldY * game.camera.scale.y;

    }

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

function render() {

    // game.debug.cameraInfo(game.camera, 500, 32);
    // game.debug.spriteCoords(card, 32, 32);
    // game.debug.physicsBody(card.body);

}
