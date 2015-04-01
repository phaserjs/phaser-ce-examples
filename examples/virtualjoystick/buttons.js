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

    this.fx;

    this.pad;

    this.buttonA;
    this.buttonB;
    this.buttonC;

};

PhaserGame.prototype = {

    preload: function () {

        this.load.atlas('generic', 'assets/virtualjoystick/skins/generic-joystick.png', 'assets/virtualjoystick/skins/generic-joystick.json');
        this.load.image('bg', 'assets/virtualjoystick/barbarian_loading.png');
        this.load.audio('sfx', [ 'assets/virtualjoystick/magical_horror_audiosprite.mp3', 'assets/virtualjoystick/magical_horror_audiosprite.ogg' ]);

    },

    create: function () {

        var bg = this.add.image(this.world.centerX, 32, 'bg');
        bg.anchor.x = 0.5;

        this.fx = game.add.audio('sfx');
        this.fx.allowMultiple = true;

        this.fx.addMarker('charm', 0, 2.7);
        this.fx.addMarker('curse', 4, 2.9);
        this.fx.addMarker('fireball', 8, 5.2);
        this.fx.addMarker('spell', 14, 4.7);
        this.fx.addMarker('soundscape', 20, 18.8);

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.buttonA = this.pad.addButton(200, 520, 'generic', 'button1-up', 'button1-down');
        this.buttonA.onDown.add(this.pressButtonA, this);
        this.buttonA.addKey(Phaser.Keyboard.A);

        this.buttonB = this.pad.addButton(400, 500, 'generic', 'button2-up', 'button2-down');
        this.buttonB.onDown.add(this.pressButtonB, this);
        this.buttonB.addKey(Phaser.Keyboard.B);

        this.buttonC = this.pad.addButton(600, 520, 'generic', 'button3-up', 'button3-down');
        this.buttonC.onDown.add(this.pressButtonC, this);
        this.buttonC.addKey(Phaser.Keyboard.C);

    },

    pressButtonA: function () {

        this.fx.play('charm');

    },

    pressButtonB: function () {

        this.fx.play('spell');

    },

    pressButtonC: function () {

        this.fx.play('fireball');

    }

};

game.state.add('Game', PhaserGame, true);
