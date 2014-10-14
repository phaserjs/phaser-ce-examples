
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	//	From http://glslsandbox.com/e#20450.0

	var fragmentSrc = [
		"precision mediump float;",
		"uniform vec2      resolution;",
		"uniform float     time;",

		"float size = 0.002;",

		"void main( void ) {",
			"vec2 view = ( gl_FragCoord.xy - resolution / 2.0 ) / ( resolution.y / 2.0);",
			"float time = time + length(view)*8.;",
			"vec4 color = vec4(0);",
			"vec2 center = vec2(0);",
			"float rotationVelocity = 2.0;",
			"for( int j = 0; j < 20; j++ ) {",
				"for( int i = 0; i < 20; i++ ) {",
					"float amplitude = ( cos( time / 10.0 ) + sin(  time /5.0 ) ) / 2.0;",
					"float angle =   sin( float(j) * time) * rotationVelocity + 2.0 * 3.14 * float(i) / 20.0;",
					"center.x = cos( 7.0 * float(j) / 20.0 * 2.0 * 3.14 ) + sin( time / 4.0);",
					"center.y = sin( 3.0 * float(j) / 20.0 * 2.0 *  3.14 )+ cos( time / 8.0);",
					"vec2 light = center + amplitude * vec2( cos( angle ), sin( angle ));",
					"//size = sin( time ) * 0.005;",
					"float l = size / length( view - light );",
					"vec4 c = vec4( l / 20.0, l, l, 1.0 ) / 5.0;",
					"color += c;",
				"}",
			"}",
			"gl_FragColor = color;",
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

	filter.update();

}
