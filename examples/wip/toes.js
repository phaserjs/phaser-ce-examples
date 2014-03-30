
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('atari', 'assets/sprites/phaser-dude.png');
    game.load.image('block', 'assets/sprites/atari130xe.png');
    game.load.image('50', 'assets/sprites/50x50.png');

}


var _player;
var _collisionGroup;
var cursors;

function create() {

    // game.add.image(0, 0, '50');
    // game.add.image(50, 50, '50');

    game.physics.startSystem( Phaser.Physics.ARCADE );

    // game.enableStep();

    _collisionGroup = game.add.group();
    _collisionGroup.enableBody = true;
    _collisionGroup.physicsBodyType = Phaser.Physics.ARCADE;

    for ( var i = 0; i < 10; i++ )
    {
        var block = _collisionGroup.create( i * 220, 300, 'block' );
        block.name = 'block' + i;
        block.body.immovable = true;
        block.body.allowGravity = false;
    }
    
    _player = game.add.sprite( 100, 240, '50', 0 );
    // _player.anchor.setTo( 0.5, 0.5 );

    game.physics.enable( _player, Phaser.Physics.ARCADE );
    _player.name = 'player';
    // _player.body.velocity.x = 50;
    // _player.debug = true;
    game.physics.arcade.gravity.y = 500;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    game.physics.arcade.collide( _player, _collisionGroup );

    _player.body.velocity.x = 0;
    // _player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        _player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        _player.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        _player.body.velocity.y = -200;
    }

}

function render() {

    game.debug.bodyInfo(_player, 32, 32);
    // game.debug.spriteBounds(_player);
    game.debug.spriteBounds(_collisionGroup.children[0]);
    game.debug.spriteBounds(_collisionGroup.children[1]);

}