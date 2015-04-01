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

        this.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');
        this.load.image('bg', 'assets/virtualjoystick/space1.png');

    },

    create: function () {

        this.add.image(0, 0, 'bg');

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(0, 700, 100, 'arcade');

        this.buttonA = this.pad.addButton(500, 700, 'arcade', 'button1-up', 'button1-down');
        this.buttonB = this.pad.addButton(615, 700, 'arcade', 'button2-up', 'button2-down');
        this.buttonC = this.pad.addButton(730, 700, 'arcade', 'button3-up', 'button3-down');

        //  And now tween them into position
        this.add.tween(this.stick).to( { posX: 140, posY: 460 }, 2000, "Back.easeOut", true, 500);

        this.add.tween(this.buttonA).to( { posX: 500, posY: 520 }, 2000, "Elastic.easeOut", true, 1000);
        this.add.tween(this.buttonB).to( { posX: 615, posY: 450 }, 2000, "Elastic.easeOut", true, 1500);
        this.add.tween(this.buttonC).to( { posX: 730, posY: 520 }, 2000, "Elastic.easeOut", true, 2000);

    },

    update: function () {
    }

};

game.state.add('Game', PhaserGame, true);
