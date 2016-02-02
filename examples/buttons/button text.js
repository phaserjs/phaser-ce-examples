
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/number-buttons-90x90.png', 90,90);
    game.load.image('background','assets/misc/starfield.jpg');

}

var button;
var background;

function create() {

    var buttonStyle = { font: "32px Arial", fill: "#ffffff" };

    var button1 = game.add.button( 0, 0 );
    var buttonLabel1 = game.make.text( 0, 0, "Button1", buttonStyle );
    button1.addChild( buttonLabel1 );

    var button2 = game.add.button( 0, 32 );
    var buttonLabel2 = game.make.text( 64, 256, "Button2", buttonStyle );
    button2.addChild( buttonLabel2 );

    var button3 = game.add.button( 0, 64 );

    // game.add.tween( button2.position ).to( { x: 256 }, 2500, Phaser.Easing.Linear.None, true );
    //game.add.tween( buttonLabel2.position ).to( { y: 128 }, 1500, Phaser.Easing.Linear.None, true );
}

function actionOnClick () {
    
    //  Manually changing the frames of the button, i.e, how it will look when you play with it
    // button.setFrames(4, 3, 5);

}
