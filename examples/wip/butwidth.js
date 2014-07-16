
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlasJSONHash('q', 'wip/sprites.png', 'wip/sprites.js')

}

function create() {

    var player = game.add.button(128, 128, 'q');
    // player.frameName = 'slider.png'
    player.frameName = 'menu_button.png'

    console.log('pw1', player.width);

    var button = game.add.button(200, 200, 'q');
    // button.frameName = 'menu_button.png'
    button.frameName = 'slider.png'

    console.log('pw2', player.width);
    console.log('bw1', button.width);

}

