
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	//	From http://glslsandbox.com/e#5891

	/*
	Reverses the starfield to flow away towards the pointer
	const float Tau		= 6.2832;
	const float speed	= .02;
	*/

	var fragmentSrc = [
		"precision mediump float;",
		"uniform float     time;",
		"uniform vec2      resolution;",
		"uniform vec2      mouse;",

		"const float Tau		= 6.2832;",
		"const float speed	= .02;",
		"const float density	= .04;",
		"const float shape	= .04;",

		"float random( vec2 seed ) {",
			"return fract(sin(seed.x+seed.y*1e3)*1e5);",
		"}",

		"float Cell(vec2 coord) {",
			"vec2 cell = fract(coord) * vec2(.5,2.) - vec2(.0,.5);",
			"return (1.-length(cell*2.-1.))*step(random(floor(coord)),density)*2.;",
		"}",

		"void main( void ) {",

			"vec2 p = gl_FragCoord.xy / resolution  - mouse;",

			"float a = fract(atan(p.x, p.y) / Tau);",
			"float d = length(p);",

			"vec2 coord = vec2(pow(d, shape), a)*256.;",
			"vec2 delta = vec2(-time*speed*256., .5);",
			"//vec2 delta = vec2(-time*speed*256., cos(length(p)*10.)*2e0+time*5e-1); // wavy wavy",

			"float c = 0.;",
			"for(int i=0; i<3; i++) {",
				"coord += delta;",
				"c = max(c, Cell(coord));",
			"}",

			"gl_FragColor = vec4(c*d);",
		"}"
	];

	filter = new Phaser.Filter(game, null, fragmentSrc);
	filter.setResolution(800, 600);

	sprite = game.add.sprite(0, 0, 'texture');
	sprite.width = 800;
	sprite.height = 600;

	sprite.filters = [ filter ];

}

function update() {

	filter.update(game.input.activePointer);

}
