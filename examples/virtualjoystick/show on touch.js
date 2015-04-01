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

};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');
        this.load.image('ball', 'assets/virtualjoystick/beball1.png');
        this.load.image('bg', 'assets/virtualjoystick/sky5.png');

    },

    create: function () {

        this.add.image(0, 0, 'bg');

        this.sprite = this.add.sprite(400, 200, 'ball');
        this.physics.arcade.enable(this.sprite);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(0, 0, 200, 'arcade');
        this.stick.showOnTouch = true;

    },

    update: function () {

        var maxSpeed = 400;

        if (this.stick.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.sprite.body.velocity);
        }
        else
        {
            this.sprite.body.velocity.set(0);
        }

    }

};

game.state.add('Game', PhaserGame, true);
