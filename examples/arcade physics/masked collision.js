
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('saw', 'assets/sprites/saw.png');
    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('blood', 'assets/sprites/chunk.png');
    game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);

}

var saws;
var platform1;
var platform2;

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;

var emitter;

function create() {

    game.stage.backgroundColor = '#362f2d';

    game.physics.arcade.gravity.y = 500;

    //  Two platforms for the player to run across
    platform1 = game.add.sprite(0, 160, 'platform');
    platform1.width = game.width - 100;
    platform1.height = 32;

    platform2 = game.add.sprite(0, 430, 'platform');
    platform2.width = game.width;
    platform2.height = 32;

    game.physics.arcade.enable([platform1, platform2]);

    //  Platforms don't move or get influenced by gravity
    platform1.body.immovable = true;
    platform1.body.allowGravity = false;

    platform2.body.immovable = true;
    platform2.body.allowGravity = false;

    //  Our saws group
    saws = game.add.physicsGroup();

    //  The saw sprite is 128x128

    //  Some saws for platform1
    var saw1 = saws.create(200, platform1.y + 128, 'saw');
    var saw2 = saws.create(400, platform1.y + 128, 'saw');
    var saw3 = saws.create(600, platform1.y + 128, 'saw');

    //  And let's link the saw to the platform
    saw1.data.platform = platform1;
    saw2.data.platform = platform1;
    saw3.data.platform = platform1;

    //  And some saws for platform2
    var saw4 = saws.create(200, platform2.y + 128, 'saw');
    var saw5 = saws.create(400, platform2.y + 128, 'saw');
    var saw6 = saws.create(600, platform2.y + 128, 'saw');

    //  And let's link the saw to the platform
    saw4.data.platform = platform2;
    saw5.data.platform = platform2;
    saw6.data.platform = platform2;

    //  ^ You could encapsulate all the above in a simple class, but for this example it'll do

    //  All saws share the same body properties
    //  We're using a circle because, well, they're circular, and colliding with the corners of a box would be unfair :)
    saws.callAll('body.setCircle', 'body', 64);
    saws.setAll('anchor.x', 0.5);
    saws.setAll('anchor.y', 0.5);
    saws.setAll('body.immovable', true);
    saws.setAll('body.allowGravity', false);

    //  Let's create a mask that covers all of our saws

    //  A mask is a Graphics object
    var mask = game.add.graphics(0, 0);

    //  Shapes drawn to the Graphics object must be filled.
    mask.beginFill(0xffffff);

    //  Here we'll draw a rectangle for each saw sprite
    //  The area of the rectangle is where the saw will be visible, outside of it, it's hidden

    saws.forEach(function(saw) {

        //  Draw a rectangle that shows the saw
        //  We're positioning it 64 pixels above the platform that the saw rises out of
        //  If you need the saws to move higher, give it more space
        mask.drawRect(saw.left, saw.data.platform.top - 64, saw.width, 64 + saw.data.platform.height);

    });

    //  And apply the mask to the saws group
    //  If you comment-out this line it's much easier to debug the mask rects :)
    saws.mask = mask;

    //  Bring the platforms to the top, otherwise the saws appear over them
    platform1.bringToTop();
    platform2.bringToTop();

    //  Tween the saws so they 'peak' up above the platforms

    game.add.tween(saw1).to({ y: saw1.data.platform.y }, 1000, "Sine.easeInOut", true, 1000, -1, true);
    game.add.tween(saw2).to({ y: saw2.data.platform.y }, 1000, "Sine.easeInOut", true, 1500, -1, true);
    game.add.tween(saw3).to({ y: saw3.data.platform.y }, 1000, "Sine.easeInOut", true, 2000, -1, true);

    game.add.tween(saw4).to({ y: saw4.data.platform.y }, 1000, "Sine.easeInOut", true, 1000, -1, true);
    game.add.tween(saw5).to({ y: saw5.data.platform.y }, 1000, "Sine.easeInOut", true, 1500, -1, true);
    game.add.tween(saw6).to({ y: saw6.data.platform.y }, 1000, "Sine.easeInOut", true, 2000, -1, true);

    //  Create our Player sprite

    player = game.add.sprite(32, platform1.y - 64, 'dude');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Particle emitter

    emitter = game.add.emitter(0, 0, 64);

    emitter.makeParticles('blood');

    emitter.minParticleSpeed.set(-200, -200);
    emitter.maxParticleSpeed.set(200, -300);
    emitter.bounce.set(0.5);

    //  Controls

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function sawProcessCallback (player, saw) {

    //  Two checks here to see if it's a valid collision
    //  
    //  1) Is the player below the saws platform? If so then ignore, as he's colliding with a saw above him
    //  2) If the player is above the saw, is the saw itself 'appearing' above its platform?

    if (player.top > saw.data.platform.bottom || saw.top >= saw.data.platform.top)
    {
        return false;
    }
    else
    {
        return true;
    }

}

function splat (player, saw) {

    emitter.x = player.centerX;
    emitter.y = player.centerY;

    emitter.start(true, 2000, null, 10);

    //  Back to the start!
    player.reset(32, platform1.y - 64);

}

function update() {

    //  Collide the player and emitter with the platforms (you could put them in a Group to cut this code down)

    game.physics.arcade.collide(player, platform1);
    game.physics.arcade.collide(player, platform2);

    game.physics.arcade.collide(emitter, platform1);
    game.physics.arcade.collide(emitter, platform2);

    //  Now check if the player overlaps with any of the saws
    //  This uses a custom process callback, see the comments in that function for details.

    game.physics.arcade.overlap(player, saws, splat, sawProcessCallback, this);

    //  Player controls

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing !== 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing !== 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing !== 'idle')
        {
            player.animations.stop();

            if (facing === 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.touching.down && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

    //  Rotate the saws

    saws.forEach(function(saw) {
        saw.rotation -= 0.06;
    });

}
