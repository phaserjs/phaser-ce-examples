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

    this.sprite;

    this.pad;

    this.stick;

    this.buttonA;
    this.buttonB;
    this.buttonC;

};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('generic', 'assets/virtualjoystick/skins/generic-joystick.png', 'assets/virtualjoystick/skins/generic-joystick.json');
        this.load.image('ship', 'assets/virtualjoystick/thrust.png');
        this.load.image('bg', 'assets/virtualjoystick/starfield2.jpg');

    },

    create: function () {

        this.add.image(0, 0, 'bg');

        this.sprite = this.add.sprite(400, 200, 'ship');
        this.sprite.texture.baseTexture.scaleMode = PIXI.NEAREST;
        this.sprite.scale.set(2);
        this.sprite.anchor.set(0.5);
        this.physics.arcade.enable(this.sprite);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(0, 0, 200, 'generic');
        this.stick.alignBottomLeft(20);

        this.buttonA = this.pad.addButton(500, 520, 'generic', 'button1-up', 'button1-down');
        this.buttonA.onDown.add(this.pressButtonA, this);

        this.buttonB = this.pad.addButton(615, 450, 'generic', 'button2-up', 'button2-down');
        this.buttonB.onDown.add(this.pressButtonB, this);

        this.buttonC = this.pad.addButton(730, 520, 'generic', 'button3-up', 'button3-down');
        this.buttonC.onDown.add(this.pressButtonC, this);

    },

    pressButtonA: function () {

        this.sprite.tint = Math.random() * 0xFFFFFF;

    },

    pressButtonB: function () {

        this.sprite.scale.set(Math.random() * 4);

    },

    pressButtonC: function () {

        this.sprite.scale.set(1);
        this.sprite.tint = 0xFFFFFF;

    },

    update: function () {

        var maxSpeed = 400;

        if (this.stick.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.sprite.body.velocity);
            this.sprite.rotation = this.stick.rotation;
        }
        else
        {
            this.sprite.body.velocity.set(0);
        }

    }

};

game.state.add('Game', PhaserGame, true);
