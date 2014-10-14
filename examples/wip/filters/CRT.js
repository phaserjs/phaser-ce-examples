PIXI.CRT = function(width, height, texture)
{
	PIXI.AbstractFilter.call( this );
	
	this.passes = [this];

	var d = new Date();

	var dates = [
		d.getFullYear(), // the year (four digits)
		d.getMonth(),	   // the month (from 0-11)
		d.getDate(),     // the day of the month (from 1-31)
		d.getHours()*60.0*60 + d.getMinutes()*60 + d.getSeconds()
	];

	this.uniforms = {
		iResolution: { type: 'f3', value: { x: width, y: height, z: 0 }},
		iMouse: { type: 'f3', value: { x: 0, y: 0, z: 0 }},
		iGlobalTime: { type: 'f', value: 1 },
		iDate: { type: 'f4', value: dates },
		iChannel0: { type: 'sampler2D', value: texture, wrap: 'repeat' }
	};

this.fragmentSrc = [
	"precision mediump float;",
	"uniform vec3      iResolution;",
	"uniform float     iGlobalTime;",
	"uniform float     iChannelTime[4];",
	"uniform vec4      iMouse;",
	"uniform vec4      iDate;",
	"uniform vec3      iChannelResolution[4];",
	"uniform sampler2D iChannel0;",
	"// add any extra uniforms here",

	"vec3 sample( sampler2D tex, vec2 tc )",
	"{",
		"vec3 s = pow(texture2D(tex,tc).rgb, vec3(2.2));",
		"return s;",
	"}",


	"vec3 blur(sampler2D tex, vec2 tc, float offs)",
	"{",
		"vec4 xoffs = offs * vec4(-2.0, -1.0, 1.0, 2.0) / iResolution.x;",
		"vec4 yoffs = offs * vec4(-2.0, -1.0, 1.0, 2.0) / iResolution.y;",

		"vec3 color = vec3(0.0, 0.0, 0.0);",
		"color += sample(tex,tc + vec2(xoffs.x, yoffs.x)) * 0.00366;",
		"color += sample(tex,tc + vec2(xoffs.y, yoffs.x)) * 0.01465;",
		"color += sample(tex,tc + vec2(    0.0, yoffs.x)) * 0.02564;",
		"color += sample(tex,tc + vec2(xoffs.z, yoffs.x)) * 0.01465;",
		"color += sample(tex,tc + vec2(xoffs.w, yoffs.x)) * 0.00366;",

		"color += sample(tex,tc + vec2(xoffs.x, yoffs.y)) * 0.01465;",
		"color += sample(tex,tc + vec2(xoffs.y, yoffs.y)) * 0.05861;",
		"color += sample(tex,tc + vec2(    0.0, yoffs.y)) * 0.09524;",
		"color += sample(tex,tc + vec2(xoffs.z, yoffs.y)) * 0.05861;",
		"color += sample(tex,tc + vec2(xoffs.w, yoffs.y)) * 0.01465;",

		"color += sample(tex,tc + vec2(xoffs.x, 0.0)) * 0.02564;",
		"color += sample(tex,tc + vec2(xoffs.y, 0.0)) * 0.09524;",
		"color += sample(tex,tc + vec2(    0.0, 0.0)) * 0.15018;",
		"color += sample(tex,tc + vec2(xoffs.z, 0.0)) * 0.09524;",
		"color += sample(tex,tc + vec2(xoffs.w, 0.0)) * 0.02564;",

		"color += sample(tex,tc + vec2(xoffs.x, yoffs.z)) * 0.01465;",
		"color += sample(tex,tc + vec2(xoffs.y, yoffs.z)) * 0.05861;",
		"color += sample(tex,tc + vec2(    0.0, yoffs.z)) * 0.09524;",
		"color += sample(tex,tc + vec2(xoffs.z, yoffs.z)) * 0.05861;",
		"color += sample(tex,tc + vec2(xoffs.w, yoffs.z)) * 0.01465;",

		"color += sample(tex,tc + vec2(xoffs.x, yoffs.w)) * 0.00366;",
		"color += sample(tex,tc + vec2(xoffs.y, yoffs.w)) * 0.01465;",
		"color += sample(tex,tc + vec2(    0.0, yoffs.w)) * 0.02564;",
		"color += sample(tex,tc + vec2(xoffs.z, yoffs.w)) * 0.01465;",
		"color += sample(tex,tc + vec2(xoffs.w, yoffs.w)) * 0.00366;",

		"return color;",
	"}",

	"//Credit: http://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl",
	"float rand(vec2 co){",
	"return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
"}",

"vec2 curve(vec2 uv)",
"{",
	"uv = (uv - 0.5) * 2.0;",
	"uv *= 1.1;",
	"uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);",
	"uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);",
	"uv  = (uv / 2.0) + 0.5;",
	"uv =  uv *0.92 + 0.04;",
	"return uv;",
"}",
"void main(void)",
"{",
	"vec2 q = gl_FragCoord.xy / iResolution.xy;",
	"vec2 uv = q;",
	"uv = mix( curve( uv ), uv, 0.5 );",
	"vec3 oricol = texture2D( iChannel0, vec2(q.x,q.y) ).xyz;",
	"vec3 col;",
	"float x =  sin(0.1*iGlobalTime+uv.y*21.0)*sin(0.23*iGlobalTime+uv.y*29.0)*sin(0.3+0.11*iGlobalTime+uv.y*31.0)*0.0017;",
	"float o =2.0*mod(gl_FragCoord.y,2.0)/iResolution.x;",
	"x+=o;",
	"col.r = 1.0*blur(iChannel0,vec2(x+uv.x+0.0009,uv.y+0.0009),1.2).x+0.005;",
	"col.g = 1.0*blur(iChannel0,vec2(x+uv.x+0.000,uv.y-0.0015),1.2).y+0.005;",
	"col.b = 1.0*blur(iChannel0,vec2(x+uv.x-0.0015,uv.y+0.000),1.2).z+0.005;",
	"col.r += 0.2*blur(iChannel0,vec2(x+uv.x+0.0009,uv.y+0.0009),2.25).x-0.005;",
	"col.g += 0.2*blur(iChannel0,vec2(x+uv.x+0.000,uv.y-0.0015),1.75).y-0.005;",
	"col.b += 0.2*blur(iChannel0,vec2(x+uv.x-0.0015,uv.y+0.000),1.25).z-0.005;",
	"float ghs = 0.05;",
	"col.r += ghs*(1.0-0.299)*blur(iChannel0,0.75*vec2(x-0.01, -0.027)+vec2(uv.x+0.001,uv.y+0.001),7.0).x;",
	"col.g += ghs*(1.0-0.587)*blur(iChannel0,0.75*vec2(x+-0.022, -0.02)+vec2(uv.x+0.000,uv.y-0.002),5.0).y;",
	"col.b += ghs*(1.0-0.114)*blur(iChannel0,0.75*vec2(x+-0.02, -0.0)+vec2(uv.x-0.002,uv.y+0.000),3.0).z;",

	"col = clamp(col*0.4+0.6*col*col*1.0,0.0,1.0);",

	"float vig = (0.0 + 1.0*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y));",
	"vig = pow(vig,0.3);",
	"col *= vec3(vig);",

	"col *= vec3(0.95,1.05,0.95);",
	"col = mix( col, col * col, 0.3) * 3.8;",

	"float scans = clamp( 0.35+0.15*sin(3.5*iGlobalTime+uv.y*iResolution.y*1.5), 0.0, 1.0);",

	"float s = pow(scans,0.9);",
	"col = col*vec3( s) ;",

	"col *= 1.0+0.0015*sin(300.0*iGlobalTime);",

	"col*=1.0-0.15*vec3(clamp((mod(gl_FragCoord.x+o, 2.0)-1.0)*2.0,0.0,1.0));",
	"col *= vec3( 1.0 ) - 0.25*vec3( rand( uv+0.0001*iGlobalTime),  rand( uv+0.0001*iGlobalTime + 0.3 ),  rand( uv+0.0001*iGlobalTime+ 0.5 )  );",
	"col = pow(col, vec3(0.45));",

	"if (uv.x < 0.0 || uv.x > 1.0)",
	"col *= 0.0;",
	"if (uv.y < 0.0 || uv.y > 1.0)",
	"col *= 0.0;",


	"float comp = smoothstep( 0.1, 0.9, sin(iGlobalTime) );",

	"// Remove the next line to stop cross-fade between original and postprocess",
	"col = mix( col, oricol, comp );",

	"gl_FragColor = vec4(col,1.0);",
"}"];

}

PIXI.CRT.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.CRT.prototype.constructor = PIXI.CRT;

// Object.defineProperty(PIXI.CRT.prototype, 'iGlobalTime', {
//     get: function() {
//         return this.uniforms.iGlobalTime.value;
//     },
//     set: function(value) {
//     	this.uniforms.iGlobalTime.value = value;
//     }
// });

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	sprite = game.add.sprite(0, 0, 'texture');
	sprite.width = 800;
	sprite.height = 600;

	filter = new PIXI.CRT(sprite.width, sprite.height, sprite.texture);

	sprite.filters = [filter];

}

function update() {

	// filter.iGlobalTime = game.time.totalElapsedSeconds();
	// filter.uniforms.iMouse.value.x = game.input.x;
	// filter.uniforms.iMouse.value.y = game.input.y;

}

function render() {
}
