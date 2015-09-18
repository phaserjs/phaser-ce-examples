/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Virtual Joystick Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/virtualjoystick
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var PhaserGame = function () {

    this.sprite = undefined;

    this.pad = undefined;

    this.stick = undefined;

    this.buttonA = undefined;

};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('generic', 'assets/virtualjoystick/skins/generic-joystick.png', 'assets/virtualjoystick/skins/generic-joystick.json');
        this.load.image('ship', 'assets/virtualjoystick/thrust.png');
        this.load.image('bg', 'assets/virtualjoystick/sky2.png');

    },

    create: function () {

        this.add.image(0, 0, 'bg');

        this.sprite = this.add.sprite(400, 350, 'ship');
        this.sprite.texture.baseTexture.scaleMode = PIXI.NEAREST;
        this.sprite.scale.set(2);
        this.sprite.anchor.set(0.5);
        this.sprite.angle = -90;
        this.physics.arcade.enable(this.sprite);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(0, 0, 200, 'generic');
        this.stick.alignBottomLeft(20);
        this.stick.motionLock = Phaser.VirtualJoystick.HORIZONTAL;

        this.buttonA = this.pad.addButton(500, 520, 'generic', 'button1-up', 'button1-down');
        this.buttonA.alignBottomRight(20);

    },

    update: function () {

        var maxSpeed = 400;

        if (this.stick.isDown)
        {
            this.sprite.body.velocity.x = this.stick.forceX * maxSpeed;
        }
        else
        {
            this.sprite.body.velocity.x = 0;
        }

    }

};

game.state.add('Game', PhaserGame, true);
