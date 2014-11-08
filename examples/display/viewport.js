
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

function create() {

    game.stage.backgroundColor = '#440e62';

}

function update() {

}

function render () {

    var x = 32;
    var y = 0;
    var yi = 32;

    game.debug.text('Viewport', x, y += yi);

    game.debug.text('Viewport Width: ' + game.scale.viewportWidth, x, y += yi);
    game.debug.text('window.innerWidth: ' + window.innerWidth, x, y += yi);
    game.debug.text('window.outerWidth: ' + window.outerWidth, x, y += yi);

    game.debug.text('Viewport Height: ' + game.scale.viewportHeight, x, y += yi);
    game.debug.text('window.innerHeight: ' + window.innerHeight, x, y += yi);
    game.debug.text('window.outerHeight: ' + window.outerHeight, x, y += yi);

    game.debug.text('Document', x, y += yi*2);

    game.debug.text('Document Width: ' + game.scale.documentWidth, x, y += yi);
    game.debug.text('Document Height: ' + game.scale.documentHeight, x, y += yi);

    //  Device: How to get device size.

    //  Use window.screen.width for device width and window.screen.height for device height. 
    //  .availWidth and .availHeight give you the device size minus UI taskbars. (Try on an iPhone.) 
    //  Device size is static and does not change when the page is resized or rotated.

    x = 350;
    y = 0;

    game.debug.text('Device', x, y += yi);

    game.debug.text('window.screen.width: ' + window.screen.width, x, y += yi);
    game.debug.text('window.screen.availWidth: ' + window.screen.availWidth, x, y += yi);
    game.debug.text('window.screen.height: ' + window.screen.height, x, y += yi);
    game.debug.text('window.screen.availHeight: ' + window.screen.availHeight, x, y += yi);

}
