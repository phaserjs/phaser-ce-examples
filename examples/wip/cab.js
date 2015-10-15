
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser.png');

}

var myGroup;

function create() {

    myGroup = this.game.add.group();

    myGroup.create(50, 50, "phaser");
    myGroup.create(250, 50, "phaser");
    var s = myGroup.create(250, 150, "phaser");
    s.angle = 45;

    // setInterval(function () {
    //     console.log('cab', myGroup.cacheAsBitmap);
    //     myGroup.cacheAsBitmap = !myGroup.cacheAsBitmap;
        // console.log(mySprite.position);
    // }, 1000);

    game.input.onDown.add(gen, this);

}

function gen() {
    myGroup.cacheAsBitmap = !myGroup.cacheAsBitmap;
}
