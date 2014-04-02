Bomber.City = function (game, x, height) {

    Phaser.Group.call(this, game);

 	//	The height of this city block
    this.stack = height;

    //	The color (there are 5 different colors)
    this.color = game.rnd.pick([0, 7, 14, 21, 28]);

    //	The style (there are 3 different styles)
    this.style = game.rnd.integerInRange(0, 2);

	//	Reference to the top-most part of the block (used for collision detection with the bomb)
    this.top;

    this.build(x);

    return this;

}

Bomber.City.prototype = Object.create(Phaser.Group.prototype);
Bomber.City.prototype.constructor = Bomber.City;

Bomber.City.prototype.build = function (x) {

	this.enableBody = true;

	var y = 336 - (this.stack * 16);

	for (var i = 0; i < this.stack; i++)
	{
		//	The first piece is always the roof
		if (i === 0)
		{
			this.top = this.create(x, y, 'city', this.color + 3);
		}
		else
		{
			var block = this.create(x, y, 'city', this.color + this.style);
		}

		y += 16;
	}

	this.setAll('body.allowGravity', false);
	this.setAll('body.immovable', true);

	this.alive = true;

}

Bomber.City.prototype.hit = function (bomb, block) {

    var emitter = this.game.state.getCurrentState().emitter;

    var damage = this.game.rnd.integerInRange(2, 5);

    if (damage > this.stack)
    {
    	damage = this.stack;
    }

    bomb.reset(0, 0);
    bomb.body.gravity.y = 0;
    bomb.body.velocity.y = 0;
    bomb.visible = false;

    this.cursor = this.getFirstAlive();

    for (var i = 0; i < damage; i++)
    {
    	if (this.cursor)
    	{
    		this.game.time.events.add(100 * i, this.crumble, this, this.cursor);
	    	this.game.time.events.add(200 * i, this.explode, this, this.cursor, emitter);
    		this.stack--;
    		this.next();
    	}
    }

    if (this.stack > 0)
    {
	    //	reset the top
	    this.top = this.cursor;
	    i++;
    	this.game.time.events.add(100 * i, this.crumble, this, this.top);
    }
    else
    {
		this.alive = false;
    }

    this.game.state.getCurrentState().deadCities();

}

Bomber.City.prototype.crumble = function (block) {

	block.frame = this.color + this.game.rnd.integerInRange(4, 6);

}

Bomber.City.prototype.explode = function (block, emitter) {

	emitter.x = block.x + 8;
	emitter.y = block.y + 8;
	emitter.start(true, 2000, null, 16);

	this.game.state.getCurrentState().score += 10;

	block.kill();

}
