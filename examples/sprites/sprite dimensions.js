
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

function preload() {

    game.load.image('disk', 'assets/sprites/darkwing_crazy.png');
    game.load.atlas('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');

}

function create() {

    var sprite1 = game.add.sprite(0, 0, 'disk');

    console.log('sprite1');
    console.log(sprite1.width, sprite1.height);

    var sprite2 = game.add.sprite(200, 0, 'disk');
    sprite2.scale.set(0.5);

    console.log('sprite2');
    console.log(sprite2.width, sprite2.height);
    console.log(sprite2.texture.width, sprite2.texture.height);

    var sprite3 = game.add.sprite(400, 0, 'bot', 'run06');
    sprite3.scale.set(2);

    console.log('sprite3');
    console.log(sprite3.width, sprite3.height);
    console.log(sprite3.texture.width, sprite3.texture.height);
    
}
