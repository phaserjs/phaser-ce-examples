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

    this.stick1;
    this.stick2;
    this.stick3;

};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');
        this.load.image('bg', 'assets/virtualjoystick/fog.png');
        this.load.image('ball', 'assets/virtualjoystick/beball1.png');

    },

    create: function () {

        var bg = this.add.image(0, 0, 'bg');

        this.sprite = this.add.sprite(600, 200, 'ball');
        this.physics.arcade.enable(this.sprite);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        //  Un-scaled Stick
        this.stick1 = this.pad.addStick(0, 0, 100, 'arcade');
        this.stick1.alignBottomLeft();

        //  Stick scaled to 50%
        this.stick2 = this.pad.addStick(0, 0, 100, 'arcade');
        this.stick2.scale = 0.5;
        this.stick2.alignBottomRight();

        //  Stick scaled to 150%
        this.stick3 = this.pad.addStick(350, 200, 100, 'arcade');
        this.stick3.scale = 1.5;

    },

    update: function () {

        var maxSpeed = 400;

        if (this.stick1.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick1.rotation, this.stick1.force * maxSpeed, this.sprite.body.velocity);
        }
        else if (this.stick2.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick2.rotation, this.stick2.force * maxSpeed, this.sprite.body.velocity);
        }
        else if (this.stick3.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick3.rotation, this.stick3.force * maxSpeed, this.sprite.body.velocity);
        }
        else
        {
            this.sprite.body.velocity.set(0);
        }

    }

};

game.state.add('Game', PhaserGame, true);
