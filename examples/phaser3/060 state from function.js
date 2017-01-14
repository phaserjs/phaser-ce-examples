var MyGame = {};

MyGame.Boot = function ()
{
    this.bob = null;
};

MyGame.Boot.prototype.constructor = MyGame.Boot;

MyGame.Boot.prototype = {

    preload: function ()
    {
        this.load.image('face', 'assets/pics/bw-face.png');
    },

    create: function ()
    {
        this.bob = this.add.image(400, 300, 'face');
        this.bob.anchor = 0.5;
    },

    update: function ()
    {
        if (this.bob)
        {
            this.bob.rotation += 0.01;
        }
    }
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
