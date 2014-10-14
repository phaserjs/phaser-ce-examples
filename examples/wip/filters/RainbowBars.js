
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	// By: Brandon Fogerty
	// bfogerty at gmail dot com

	var fragmentSrc = [
		"precision mediump float;",
		"uniform vec2      resolution;",
		"uniform float     time;",

		"void main( void )",
		"{",
			"vec2 p = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;",

			"vec3 c = vec3( 0.0 );",

			"float amplitude = 0.50;",
			"float glowT = sin(time) * 0.5 + 0.5;",
			"float glowFactor = mix( 0.15, 0.35, glowT );",

			"c += vec3(0.02, 0.03, 0.13) * ( glowFactor * abs( 1.0 / sin(p.x + sin( p.y + time ) * amplitude ) ));",
			"c += vec3(0.02, 0.10, 0.03) * ( glowFactor * abs( 1.0 / sin(p.x + cos( p.y + time+1.00 ) * amplitude+0.1 ) ));",
			"c += vec3(0.15, 0.05, 0.20) * ( glowFactor * abs( 1.0 / sin(p.y + sin( p.x + time+1.30 ) * amplitude+0.15 ) ));",
			"c += vec3(0.20, 0.05, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+3.00 ) * amplitude+0.3 ) ));",
			"c += vec3(0.17, 0.17, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+5.00 ) * amplitude+0.2 ) ));",

			"gl_FragColor = vec4( c, 1.0 );",
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
