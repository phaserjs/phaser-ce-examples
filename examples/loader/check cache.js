
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  Load different types of assets in ...

    game.load.image('image', 'assets/sprites/phaser2.png');
    game.load.text('html', 'http://phaser.io');
    game.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.audio('sfx', [ 'assets/audio/SoundEffects/squit.mp3', 'assets/audio/SoundEffects/squit.ogg' ]);

}

function create() {

    //   Here we can check if they are in the cache or not
    var image = game.cache.checkImageKey('image');
    var text = game.cache.checkTextKey('html');
    var tilemap = game.cache.checkTilemapKey('mario');
    var audio = game.cache.checkSoundKey('sfx');

    //  Here we'll check for a key that we know doesn't exist on purpose
    var broken = game.cache.checkImageKey('playerHead');

    game.add.text(40, 40, 'Check Image Key: ' + image, { fill: '#ffffff' });
    game.add.text(40, 80, 'Check Text Key: ' + text, { fill: '#ffffff' });
    game.add.text(40, 120, 'Check Tilemap Key: ' + tilemap, { fill: '#ffffff' });
    game.add.text(40, 160, 'Check Audio Key: ' + audio, { fill: '#ffffff' });
    game.add.text(40, 200, 'Check Image 2 Key: ' + broken, { fill: '#ffffff' });

}
