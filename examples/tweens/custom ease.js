
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('logo', 'assets/sprites/phaser.png');
    
}

function create() {

    var sprite1 = game.add.sprite(100, 100, 'logo');
    var sprite2 = game.add.sprite(300, 100, 'logo');
    var sprite3 = game.add.sprite(500, 100, 'logo');

    //  Inject a custom ease into Phaser

    game.tweens.easeMap['Custom.easeIn'] = function (k) {
        return k * k;
    };

    game.tweens.easeMap['Custom.easeOut'] = function (k) {
        return k * ( 2 - k );
    };

    game.tweens.easeMap['Custom.easeInOut'] = function (k) {
        if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
        return - 0.5 * ( --k * ( k - 2 ) - 1 );
    };

    game.add.tween(sprite1).to( { y: 400 }, 2000, "Custom.easeIn", true, 0, 1000, true);
    game.add.tween(sprite2).to( { y: 400 }, 2000, "Custom.easeOut", true, 0, 1000, true);
    game.add.tween(sprite3).to( { y: 400 }, 2000, "Custom.easeInOut", true, 0, 1000, true);

}
