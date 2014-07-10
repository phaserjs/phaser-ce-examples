// Try this demo on Chrome with an XBOX 360 controller.
// Use left and right triggers.

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload() {

    game.load.spritesheet('controller-indicator', 'assets/misc/controller-indicator.png', 16,16);

}

var pad;
var leftTriggerButton;
var leftTriggerGfx;
var rightTriggerGfx;

var indicator;

function create() {

    game.stage.backgroundColor = '#736357';

    setupScene();

    game.input.gamepad.start();

    pad = game.input.gamepad.pad1;

    pad.addCallbacks(this, { onConnect: addButtons });

}

function addButtons() {

    leftTriggerButton = pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);

    leftTriggerButton.onDown.add(onLeftTrigger);
    leftTriggerButton.onUp.add(onLeftTrigger);
    leftTriggerButton.onFloat.add(onLeftTrigger);

    rightTriggerButton = pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

    rightTriggerButton.onDown.add(onRightTrigger);
    rightTriggerButton.onUp.add(onRightTrigger);
    rightTriggerButton.onFloat.add(onRightTrigger);

}

function onLeftTrigger(button, value) {

    leftTriggerGfx.clear();
    leftTriggerGfx.beginFill(0xFF700B, 1);
    leftTriggerGfx.lineStyle(2, 0xFFFFFF, 1);
    leftTriggerGfx.drawRect(0, -value*500, 50, value*500 + 5);
    leftTriggerGfx.endFill();
}

function onRightTrigger(buttonCode, value) {

    rightTriggerGfx.clear();
    rightTriggerGfx.beginFill(0xFF700B, 1);
    rightTriggerGfx.lineStyle(2, 0xFFFFFF, 1);
    rightTriggerGfx.drawRect(0, -value*500, 50, value*500 + 5);
    rightTriggerGfx.endFill();
}

function update() {

    if (game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected)
    {
        indicator.animations.frame = 0;
    }
    else
    {
        indicator.animations.frame = 1;
    }

}

function setupScene() {

    indicator = game.add.sprite(10,10, 'controller-indicator');
    indicator.scale.x = indicator.scale.y = 2;
    indicator.animations.frame = 0;

    leftTriggerGfx = game.add.graphics(300,550);
    leftTriggerGfx.beginFill(0xFF700B, 1);
    leftTriggerGfx.lineStyle(2, 0xFFFFFF, 1);
    leftTriggerGfx.drawRect(0, 0, 50, 5);
    leftTriggerGfx.endFill();

    rightTriggerGfx = game.add.graphics(450,550);
    rightTriggerGfx.beginFill(0xFF700B, 1);
    rightTriggerGfx.lineStyle(2, 0xFFFFFF, 1);
    rightTriggerGfx.drawRect(0, 0, 50, 5);
    rightTriggerGfx.endFill();

}
