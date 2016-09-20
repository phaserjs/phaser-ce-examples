
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() { 
    // New way of loading compressed textures
    game.load.image('factory', {
        s3tc: 'assets/textures/compressed/factory_dxt1.pvr',
        pvrtc: 'assets/textures/compressed/factory_pvrtc.pvr',
        // Ture color is the default fallback texture
        truecolor: 'assets/textures/factory.png'
    });

    // Old way is still supported
    game.load.image('factory_1', 'assets/textures/factory.png');
}

function create() {
    // Loaded using dynamic texture selection depending on
    // WebGL support
    var mysprite = game.add.sprite(0, 0, 'factory');

    // Loaded using the original way.
    game.add.sprite(100, 100, 'factory_1');

    // Checking which compressed texture was loaded.
    var c = mysprite.texture.baseTexture.source.compressionAlgorithm;
    if (c)
        alert('Compression algorithm is ' + c + '.');
    else
        alert('No compression algorithm.');
}
