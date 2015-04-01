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
        this.load.image('sea', 'assets/virtualjoystick/sea.png');
        this.load.image('sub', 'assets/virtualjoystick/sub.png');

    },

    create: function () {

        this.add.sprite(0, 0, 'sea');

        this.sub = this.add.sprite(400, 350, 'sub');
        this.sub.anchor.x = 0.5;

        this.physics.arcade.enable(this.sub);

        this.sub.body.collideWorldBounds = true;
        this.sub.alpha = 0.5;

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(0, 0, 100, 'arcade');
        this.stick.scale = 0.6;
        this.stick.alignBottomLeft(16);

        //  Called when the stick is no longer being used
        this.stick.onDown.add(this.startSub, this);

        //  Only called when the stick MOVES
        // this.stick.onMove.add(this.moveSub, this);

        //  Called constantly while the stick is active
        this.stick.onUpdate.add(this.moveSub, this);

        //  Called when the stick is no longer being used
        this.stick.onUp.add(this.stopSub, this);

    },

    startSub: function () {

        this.sub.alpha = 1;

    },

    moveSub: function (stick, force, forceX, forceY) {

        this.sub.body.velocity.x = this.stick.forceX * 200;
        this.sub.body.velocity.y = this.stick.forceY * 120;

        if (this.sub.y < 116)
        {
            this.sub.y = 116;
        }

    },

    stopSub: function () {

        this.sub.body.velocity.set(0);
        this.sub.alpha = 0.5;

    }

};

game.state.add('Game', PhaserGame, true);
