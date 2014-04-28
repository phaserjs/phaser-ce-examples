
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var timmy;

function create() {

  	// game.stage.disableVisibilityChange = true;

	timmy = game.time.create(false);
  	timmy.loop(5000, function(){ console.log('timmy loop'); });
	timmy.start();

  	game.time.events.loop(10000, function(){ console.log('event loop'); });

	game.input.onDown.add(handleClick);

}

var t1 = 0;

function handleClick(){

	//	Toggle pause
	game.paused = !game.paused

	if (!game.paused)
	{
		t1 = game.time.now;
		// game.time.events.add(500, function(){ console.log('>>> hello from game timer after', game.time.now - t1); });
		timmy.add(1500, function(){ console.log('>>> hello from timmy timer after', game.time.now - t1); });
	}

}

function update() {
}

function render() {

	game.debug.text('Custom Timer', 32, 32);
	game.debug.timer(timmy, 32, 64);

	game.debug.text('Game Timer', 32, 200);
	game.debug.timer(game.time.events, 32, 232);

}
