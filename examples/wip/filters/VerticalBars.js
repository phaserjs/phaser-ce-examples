
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	//	From http://glslsandbox.com/e#16133.0

	var fragmentSrc = [

		"precision mediump float;",

		"uniform float     time;",
		"uniform vec2      resolution;",

		"#define PI 0.01",

		"void main( void ) {",

			"vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",

			"float sx = 0.2*sin( 25.0 * p.y - time * 5.);",

			"float dy = 0.9/ ( 50. * abs(p.y - sx));",

			"gl_FragColor = vec4( (p.x + 0.5) * dy, 0.5 * dy, dy-1.65, 5.0 );",

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
