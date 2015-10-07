
var game = new Phaser.Game(800, 300, Phaser.CANVAS, 'phaser-example', { render: render });

function create () {
}

function render () {

    game.debug.text('Navigator: ' + navigator.userAgent, 32, 32);
    game.debug.text('iOS: ' + game.device.iOS, 32, 64);
    game.debug.text('Mobile Safari: ' + game.device.mobileSafari, 32, 98);
    game.debug.text('WebApp: ' + game.device.webApp, 32, 128);
    game.debug.text('nav: ' + navigator['standalone'], 32, 128+32);
    game.debug.text('app: ' + game.device.iOSVersion, 32, 128+64);

}
