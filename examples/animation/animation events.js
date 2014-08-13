
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('lazur', 'assets/pics/thorn_lazur.png');
    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var back;
var mummy;
var anim;
var loopText;

function create() {

	game.stage.smoothed = false;

	back = game.add.image(0, -400, 'lazur');
	back.scale.set(2);

    mummy = game.add.sprite(200, 360, 'mummy', 5);
    mummy.scale.set(4);
    anim = mummy.animations.add('walk');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 100;

    for (var i = 0; i < 100; i++)
    {
        var m = game.add.sprite(game.world.randomX, game.world.randomY, 'mummy', 5);
        game.physics.arcade.enable(m);
        m.animations.add('walk');
        m.play('walk', game.rnd.between(5, 40), true);
        m.body.velocity.x = game.rnd.between(-200, 200);
        m.body.bounce.set(1);
        m.body.collideWorldBounds = true;
    }

    anim.onStart.add(animationStarted, this);
    anim.onLoop.add(animationLooped, this);
    anim.onComplete.add(animationStopped, this);

    anim.play(10, true);

}

function animationStarted(sprite, animation) {

	game.add.text(32, 32, 'Animation started', { fill: 'white' });

}

function animationLooped(sprite, animation) {

	if (animation.loopCount === 1)
	{
		loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
	}
	else
	{
		loopText.text = 'Animation looped x2';
		animation.loop = false;
	}

}

function animationStopped(sprite, animation) {

	game.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });

}

function update() {

	if (anim.isPlaying)
	{
		back.x -= 1;
	}

}