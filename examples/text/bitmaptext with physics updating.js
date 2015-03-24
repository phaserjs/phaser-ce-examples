
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
    game.load.bitmapFont('stack', 'assets/fonts/bitmapFonts/shortStack.png', 'assets/fonts/bitmapFonts/shortStack.xml');

}

var text1;
var text2;
var words = [ 'Ouch!', 'bump', 'eek', 'look out', 'careful', 'mind out', 'watch it!', 'OI!', 'Owww', 'Grrrr', 'that hurt', 'bully'];

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    text1 = game.add.bitmapText(200, 100, 'desyrel', 'BitmapText', 64);
    text2 = game.add.bitmapText(400, 400, 'stack', 'with Physics', 32);

    game.physics.arcade.enable([ text1, text2 ]);

    text1.body.velocity.setTo(200, 200);
    text1.body.collideWorldBounds = true;
    text1.body.bounce.set(1);

    text2.body.velocity.setTo(-100, -100);
    text2.body.collideWorldBounds = true;
    text2.body.bounce.set(1);

}

function update() {

    game.physics.arcade.collide(text1, text2, onCollide);

}

function onCollide() {

    text1.text = game.rnd.pick(words);

}

function render() {
    // game.debug.body(text1);
}