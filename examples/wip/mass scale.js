var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

function preload() {

    game.load.image('disk', 'assets/sprites/darkwing_crazy.png');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    for (var i = 0; i < 15; i++)
    {
        //  Create 15 sprites at random x/y locations
        var sprite = game.add.sprite(game.world.randomX, game.world.randomY, 'disk');
        //  Pick a random number between -2 and 6
        var rand = game.rnd.realInRange(-2, 6);

        //  Set the scale of the sprite to the random value
        game.physics.enable(sprite,Phaser.Physics.ARCADE);
        sprite.anchor.setTo(0.5,0.5);
       
sprite.scale.setTo(1, 2);

        //  You can also scale sprites like this:
        //  sprite.scale.x = value;
        //  sprite.scale.y = value;

    }
    
}