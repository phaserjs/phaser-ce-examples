
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    game.load.image('bullet', 'assets/misc/bullet0.png');

}

var sprite;
var bullet;
var bullets;
var bulletTime = 0;

//  Left, right and space key for controls
var leftKey;
var rightKey;
var spaceKey;

//  Helpful text display for justPressed functions.
var textLeft;
var textRight;
var textSpace;
var textLeft2;
var textRight2;
var textSpace2;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    bullets = game.add.group();

    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(10, 'bullet');
    bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetBullet, this);
    bullets.setAll('checkWorldBounds', true);

    sprite = game.add.sprite(400, 550, 'phaser');

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	
	//  Register the keys.
	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
	
	//  Add some debugging text.
	this.textLeft = game.add.text(20, 20, "Left was pressed 250 ms ago? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });
	this.textRight = game.add.text(20, 60, "Right was pressed 500 ms ago? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });
	this.textSpace = game.add.text(20, 100, "Space was pressed 1000 ms ago? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });
	
	this.textLeft2 = game.add.text(600, 20, "Is left still down? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });
	this.textRight2 = game.add.text(600, 60, "Is right still down? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });
	this.textSpace2 = game.add.text(600, 100, "Is space still down? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });

}

function update() {

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

	//  If true, it means that this key is down. If not, it means that the key is not down (was released/not pressed)
    if (this.leftKey.isDown)
    {
        sprite.body.velocity.x = -200;
		this.textLeft2.text = "Is left still down? YES";
    } 
	else 
	{
		this.textLeft2.text = "Is left still down? NO";
	}
	
    if (this.rightKey.isDown)
    {
        sprite.body.velocity.x = 200;
		this.textRight2.text = "Is right still down? YES";
    }
	else 
	{
		this.textRight2.text = "Is right still down? NO";
	}

    if (this.spaceKey.isDown)
    {
        fireBullet();
		this.textSpace2.text = "Is space still down? YES";
    }
	else 
	{
		this.textSpace2.text = "Is space still down? NO";
	}
	
	//  downDuration (previously called 'justPressed') does not schedule key pressing, it's merely indicative 
    //  of key states. 
    //  
    //  In this case the downDuration function tells us that between this current time and 250 milliseconds ago, 
    //  this key was pressed (not the same as holding down) and if it was pressed between that slice of time, it returns
	//  true, otherwise false.
	if (this.leftKey.downDuration(250))
	{
		this.textLeft.text = "Left was pressed 250 ms ago? YES";
	} 
	else
	{
		this.textLeft.text = "Left was pressed 250 ms ago? NO";
	}
	
	if (this.rightKey.downDuration(500))
	{
		this.textRight.text = "Right was pressed 500 ms ago? YES";
	} 
	else
	{
		this.textRight.text = "Right was pressed 500 ms ago? NO";
	}
	
	if (this.spaceKey.downDuration(1000))
	{
		this.textSpace.text = "Space was pressed 1000 ms ago? YES";
	} 
	else
	{
		this.textSpace.text = "Space was pressed 1000 ms ago? NO";
	}

}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x + 6, sprite.y - 8);
            bullet.body.velocity.y = -300;
            bulletTime = game.time.now + 250;
        }
    }

}

//  Called if the bullet goes out of the screen
function resetBullet (bullet) {

    bullet.kill();

}

