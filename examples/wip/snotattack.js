//  Our Slime object. Consists of a head and a body.

Slime = function (game, headGroup, bodyGroup, x) {

    this.head = new SlimeHead(game, headGroup, x);
    this.body = new SlimeBody(game, bodyGroup, x);

    this.head.slimeBody = this.body;
    this.body.slimeHead = this.head;

    return this;

}

Slime.prototype.constructor = Slime;

//  The head of the Slime. This moves down with the body and checks for collisions.

SlimeHead = function (game, headGroup, x) {

    Phaser.Sprite.call(this, game, x, 20, 'slimeHead');

    headGroup.add(this);

    this.body.moves = false;

    this.slimeBody = null;

    return this;

};

SlimeHead.prototype = Object.create(Phaser.Sprite.prototype);
SlimeHead.prototype.constructor = SlimeHead;

SlimeHead.prototype.update = function() {

    this.y = this.slimeBody.y + this.slimeBody.height - 10;

};

SlimeHead.prototype.shot = function() {

    if (this.slimeBody.height <= 32)
    {
        return false;
    }

    this.slimeBody.tween.stop();
    this.slimeBody.tween.onComplete.dispose();

    this.slimeBody.height *= this.game.rnd.realInRange(0.60, 0.90);

    this.slimeBody.start();

    return true;

};

//  The body of the Slime. This gets stretched down and the head remains aligned to it

SlimeBody = function (game, bodyGroup, x) {

    Phaser.Sprite.call(this, game, x, 20, 'slime');

    bodyGroup.add(this);

    this.slimeHead = null;

    return this;

};

SlimeBody.prototype = Object.create(Phaser.Sprite.prototype);
SlimeBody.prototype.constructor = SlimeBody;

SlimeBody.prototype.start = function() {

    this.dest = 20 + game.rnd.integerInRange(20, 40);
    this.delay = 1000 + Math.random() * 7500;
    this.speed = 1000 + Math.random() * 3000;

    this.tween = game.add.tween(this).to( { height: this.dest }, this.speed, Phaser.Easing.Circular.InOut, true, this.delay);
    this.tween.onComplete.add(this.nextDrip, this);

}

SlimeBody.prototype.nextDrip = function() {

    this.dest = this.height + game.rnd.integerInRange(20, 40);
    this.speed = 1000 + Math.random() * 3000;

    this.tween = game.add.tween(this).to( { height: this.dest }, this.speed, Phaser.Easing.Circular.InOut, true);
    this.tween.onComplete.add(this.nextDrip, this);

};

var game = new Phaser.Game(512, 384, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/games/snotattack/bullet.png');
    game.load.image('dude', 'assets/games/snotattack/dude.png');
    game.load.image('slimeHead', 'assets/games/snotattack/slime-head.png');
    game.load.image('slime', 'assets/games/snotattack/slime.png');
    game.load.image('walls', 'assets/games/snotattack/walls.png');
    game.load.image('splat1', 'assets/games/snotattack/splatter1.png');
    game.load.image('splat2', 'assets/games/snotattack/splatter2.png');
    game.load.image('splat3', 'assets/games/snotattack/splatter3.png');
    game.load.image('background', 'assets/skies/cavern1.png');

}

var player;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;

var background;
var walls;
var splatEmitter;
var splats;
var splatter;
var splatterTexture;

var heads;
var bodies;

// var score = 0;
// var scoreString = '';
// var scoreText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // game.world.setBounds(16, 0, 480, 384);

    background = game.add.image(0, 0, 'background');

    splats = [ 
        null,
        game.make.image(0, 0, 'splat1'),
        game.make.image(0, 0, 'splat2'),
        game.make.image(0, 0, 'splat3')
    ];

    splatterTexture = game.add.renderTexture(game.width, game.height);
    splatter = game.add.image(0, 0, splatterTexture);
    splatter.alpha = 0.4;

    walls = game.add.image(0, 0, 'walls');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');

    //  The hero!
    player = game.add.sprite(400, 306, 'dude');

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;

    splatEmitter = game.add.emitter(0, 0, 200);
    splatEmitter.makeParticles(['splat1', 'splat2', 'splat3']);
    splatEmitter.gravity = 200;

    //  da Slime!
    bodies = game.add.group();
    heads = game.add.group();
    heads.enableBody = true;

    for (var i = 0; i < 28; i++)
    {
        var s = new Slime(game, heads, bodies, 32 + (i * 16));
        s.body.start();
    }

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
}

function update() {

    player.body.velocity.setTo(0, 0);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;
    }

    //  Firing?
    if (fireButton.isDown)
    {
        fireBullet();
    }

    //  Run collision
    game.physics.arcade.overlap(bullets, heads, collisionHandler, null, this);
    // game.physics.arcade.overlap(heads, player, enemyHitsPlayer, null, this);

}

function collisionHandler (bullet, slime) {

    bullet.kill();

    if (slime.shot())
    {
        //  Increase the score
        // score += 20;
        // scoreText.text = scoreString + score;

        var sp = splats[game.rnd.integerInRange(1, 3)];
        var sx = slime.x + game.rnd.integerInRange(-8, 8);
        var sy = slime.y + game.rnd.integerInRange(-8, 8);

        splatterTexture.renderXY(sp, sx, sy, false);
    
        splatEmitter.x = slime.x;
        splatEmitter.y = slime.y;
        splatEmitter.start(true, 2000, null, 4);
    }

}


function render() {
}

function fireBullet () {

    if (player.x < 16 || player.x > 480)
    {
        return false;
    }

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x + 2, player.y);
            bullet.body.velocity.y = -300;
            bulletTime = game.time.now + 200;
        }
    }

}
