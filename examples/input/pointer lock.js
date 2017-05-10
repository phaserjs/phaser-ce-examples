
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

function move(pointer, x, y, click) {

    //  If the cursor is locked to the game, and the callback was not fired from a 'click' event
    //  (such as a mouse click or touch down) - as then it might contain incorrect movement values
    if (game.input.mouse.locked && !click)
    {
        sprite.x += game.input.mouse.event.movementX;
        sprite.y += game.input.mouse.event.movementY;
    }

}

function update() {
}
