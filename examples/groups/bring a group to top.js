
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('beast', 'assets/pics/shadow_of_the_beast2_karamoon.png');
    game.load.image('snot', 'assets/pics/nslide_snot.png');
    game.load.image('atari1', 'assets/sprites/atari130xe.png');
    game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');

}

var group1;
var group2;

function create() {

    //  Create a background image
    var bg = game.add.sprite(0, 0, 'beast');
    bg.width = 800;

    //  Create a Group that will sit above the background image
    group1 = game.add.group();

    //  Create a Group that will sit above Group 1
    group2 = game.add.group();

    //  Now let's create some random sprites and enable them all for drag and 'bring to top'
    for (var i = 0; i < 10; i++)
    {
        var tempSprite = game.add.sprite(game.world.randomX, game.world.randomY, 'atari1');

        tempSprite.name = 'atari' + i;
        tempSprite.inputEnabled = true;
        tempSprite.input.enableDrag(false, true);

        group1.add(tempSprite);

        //  Sonics

        var tempSprite=game.add.sprite(game.world.randomX, game.world.randomY, 'sonic');

        tempSprite.name = 'sonic' + i;
        tempSprite.inputEnabled = true;
        tempSprite.input.enableDrag(false, true);

        group2.add(tempSprite);
    }

    //  Create a foreground image - everything should appear behind this, even when dragged
    var snot = game.add.sprite(game.world.centerX, game.world.height, 'snot');
    snot.anchor.setTo(0.5, 1);

}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.ONE))
    {
        game.world.bringToTop(group1);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.TWO))
    {
        game.world.bringToTop(group2);
    }

}

function render() {
    game.debug.inputInfo(32, 32);
}
