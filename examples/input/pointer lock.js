
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var sprite;

function create() {

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');

    game.canvas.addEventListener('mousedown', requestLock);

    game.input.addMoveCallback(move, this);

}

function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(pointer, x, y) {

    if (game.input.mouse.locked)
    {
        sprite.x += game.input.mouse.event.webkitMovementX;
        sprite.y += game.input.mouse.event.webkitMovementY;
    }

}

function update() {
}
