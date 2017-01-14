var MyGame = {};

MyGame.Boot = function ()
{
    Phaser.State.call(this);

    this.bob = null;
};

MyGame.Boot.prototype = Object.create(Phaser.State.prototype);
MyGame.Boot.prototype.constructor = MyGame.Boot;

MyGame.Boot.prototype.preload = function ()
{
    this.load.image('face', 'assets/pics/bw-face.png');
};

MyGame.Boot.prototype.create = function ()
{
    this.bob = this.add.image(0, 0, 'face');
};

window.onload = function() {

    //  All of the following different methods of adding a State work

    //  Method 1 - Passed in the constructor

    var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', MyGame.Boot);

    //  Method 2 - Given to StateManager.add with autoStart true

    // var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example');
    // game.state.add('Boot', MyGame.Boot, true);

    //  Method 3 - Given to StateManager.add and then started

    // var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example');
    // game.state.add('Boot', MyGame.Boot);
    // game.state.start('Boot');

};
