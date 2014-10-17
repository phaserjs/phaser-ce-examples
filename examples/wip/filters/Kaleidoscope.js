
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	//	From http://glslsandbox.com/e#18958.2

	var fragmentSrc = [
		"precision mediump float;",

		"uniform float     time;",
		"uniform vec2      resolution;",
		"uniform vec2      mouse;",

		"//MrOMGWTF",

		"float line(vec2 a, float rot, float height, float width, vec2 p)",
		"{",
			"p = vec2(p.x * cos(rot) + p.y * -sin(rot), p.x * sin(rot) + p.y * cos(rot));",
			"vec2 pos = p-a;",
			"float radius = width * 0.5 * (2.5+sin(atan(pos.y, pos.x)*5.0));",
			"float v = max(0.0, min(1.0, (radius-length(p-a))*40.0));",
			"return v;",
		"}",

		"void main( void )",
		"{",
			"vec2 position = ( gl_FragCoord.xy / resolution.xy * 2.0 - 1.0 );",
			"position.x *= resolution.x / resolution.y;",
			"position*=3.0;",
			"vec2 origin = vec2(mouse)*2.0 - 1.0;",
			"origin *= 5.0;",
			"float rot = 0.0;",
			"float height = 0.5;",
			"float width = 0.1;",
			"vec3 color = vec3(0.0, 0.0, 0.0);",
			"for(float i = 0.; i < 80.; i++)",
			"{",
				"float lit = line(origin, rot, height, width, position * (7.0/(1.0+i*.12)))*(.95-i*.004)*1.5;",
				"float ang = i/50.0*3.14+time;",
				"color.r += max(0.0, sin(ang)+0.5)*lit;",
				"color.g += max(0.0, sin(ang+2.09)+0.5)*lit;",
				"color.b += max(0.0, sin(ang-2.09)+0.5)*lit;",
				"width += 0.01;",
				"height += 0.05;",
				"rot += time*0.1;",
			"}",
			"color*=0.3;",
			"gl_FragColor = vec4( color , 1.0 );",
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
