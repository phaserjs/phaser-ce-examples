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
    this.bullets;
    this.bulletTime = 0;

    this.pad;

    this.stick1;
    this.stick2;

};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');
        this.load.image('ship', 'assets/virtualjoystick/thrust.png');
        this.load.image('stars', 'assets/virtualjoystick/starfield.jpg');
        this.load.image('bullet', 'assets/virtualjoystick/bullet2.png');

    },

    create: function () {

        this.add.tileSprite(0, 0, this.game.width, this.game.height, 'stars');

        this.bullets = this.add.physicsGroup();
        this.bullets.createMultiple(40, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);

        this.sprite = this.add.sprite(300, 300, 'ship');
        this.sprite.anchor.set(0.5);

        this.physics.arcade.enable(this.sprite);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick1 = this.pad.addStick(0, 0, 100, 'arcade');
        this.stick1.scale = 0.6;
        this.stick1.alignBottomLeft(48);

        this.stick2 = this.pad.addStick(0, 0, 100, 'arcade');
        this.stick2.scale = 0.6;
        this.stick2.alignBottomRight(48);

    },

    update: function () {

        var maxSpeed = 300;

        if (this.stick1.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick1.rotation, this.stick1.force * maxSpeed, this.sprite.body.velocity);
            this.sprite.rotation = this.stick1.rotation;
        }
        else
        {
            this.sprite.body.velocity.set(0);
        }

        if (this.stick2.isDown)
        {
            this.fireBullet();
        }

        this.screenWrap(this.sprite);

        this.bullets.forEachExists(this.screenWrap, this);

    },

    fireBullet: function () {

        if (this.time.time > this.bulletTime)
        {
            var bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.sprite.body.x + 16, this.sprite.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = this.stick2.rotation;
                this.physics.arcade.velocityFromRotation(this.stick2.rotation, 400, bullet.body.velocity);
                this.bulletTime = this.time.time + 50;
            }
        }

    },

    screenWrap: function (sprite) {

        if (sprite.x < 0)
        {
            sprite.x = game.width;
        }
        else if (sprite.x > game.width)
        {
            sprite.x = 0;
        }

        if (sprite.y < 0)
        {
            sprite.y = game.height;
        }
        else if (sprite.y > game.height)
        {
            sprite.y = 0;
        }

    }

};

game.state.add('Game', PhaserGame, true);
