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

    this.background = null;

    this.player = null;
    this.speed = 300;

    this.weapon1;
    this.weapon2;
    this.weapon3;

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
        this.load.image('background', 'assets/virtualjoystick/back.png');
        this.load.image('player', 'assets/virtualjoystick/ship.png');
        this.load.image('bullet2', 'assets/virtualjoystick/bullet2.png');
        this.load.image('bullet9', 'assets/virtualjoystick/bullet9.png');
        this.load.image('bullet10', 'assets/virtualjoystick/bullet10.png');

    },

    create: function () {

        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-40, 0);

        this.weapon1 = new Weapon.SingleBullet(this.game);
        this.weapon2 = new Weapon.Rockets(this.game);
        this.weapon3 = new Weapon.ScaleBullet(this.game);

        this.player = this.add.sprite(64, 200, 'player');

        this.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(80, 520, 100, 'arcade');
        this.stick.deadZone = 0;
        this.stick.scale = 0.5;

        this.buttonA = this.pad.addButton(450, 520, 'arcade', 'button1-up', 'button1-down');
        this.buttonA.onDown.add(this.fireBullet, this);
        this.buttonA.scale = 0.9;
        this.buttonA.repeatRate = 100;
        this.buttonA.addKey(Phaser.Keyboard.CONTROL);

        this.buttonB = this.pad.addButton(590, 420, 'arcade', 'button2-up', 'button2-down');
        this.buttonB.onDown.add(this.fireRocket, this);
        this.buttonB.scale = 0.9;
        this.buttonB.repeatRate = 500;
        this.buttonB.addKey(Phaser.Keyboard.Z);

        this.buttonC = this.pad.addButton(720, 520, 'arcade', 'button3-up', 'button3-down');
        this.buttonC.onDown.add(this.fireSpreadShot, this);
        this.buttonC.scale = 0.9;
        this.buttonC.addKey(Phaser.Keyboard.SPACEBAR);

    },

    fireBullet: function () {

        this.weapon1.fire(this.player);

    },

    fireRocket: function () {

        this.weapon2.fire(this.player);

    },

    fireSpreadShot: function () {

        this.weapon3.fire(this.player);

    },

    update: function () {

        var maxSpeed = 300;

        if (this.stick.isDown)
        {
            this.physics.arcade.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.player.body.velocity);
        }
        else
        {
            this.player.body.velocity.set(0);
        }

    }

};

var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function () {

    if (this.tracking)
    {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0)
    {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

};

var Weapon = {};

////////////////////////////////////////////////////
//  A single bullet is fired in front of the ship //
////////////////////////////////////////////////////

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet2'), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

};

///////////////////////////////////////////////////////////////////
//  Rockets that visually track the direction they're heading in //
///////////////////////////////////////////////////////////////////

Weapon.Rockets = function (game) {

    Phaser.Group.call(this, game, game.world, 'Rockets', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 400;

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bullet10'), true);
    }

    this.setAll('tracking', true);

    return this;

};

Weapon.Rockets.prototype = Object.create(Phaser.Group.prototype);
Weapon.Rockets.prototype.constructor = Weapon.Rockets;

Weapon.Rockets.prototype.fire = function (source) {

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -700);
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 700);

};

////////////////////////////////////////////////////////////////////////
//  A single bullet that scales in size as it moves across the screen //
////////////////////////////////////////////////////////////////////////

Weapon.ScaleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Scale Bullet', false, true, Phaser.Physics.ARCADE);

    this.bulletSpeed = 800;

    for (var i = 0; i < 32; i++)
    {
        this.add(new Bullet(game, 'bullet9'), true);
    }

    this.setAll('scaleSpeed', 0.05);

    return this;

};

Weapon.ScaleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScaleBullet.prototype.constructor = Weapon.ScaleBullet;

Weapon.ScaleBullet.prototype.fire = function (source) {

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

};

game.state.add('Game', PhaserGame, true);
