
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('cyberglow', 'assets/textures/cyberglow.png');
    game.load.image('tron', 'assets/textures/tron.png');
    game.load.image('metal', 'assets/textures/metal.png');
    game.load.image('factory', 'assets/textures/factory.png');
    game.load.image('ooze', 'assets/textures/ooze.png');

}

var filter;
var sprite;

function create() {

    //  Shader by cce (https://www.shadertoy.com/view/XsXGWM)

    // "vec4 blips = texture2D(iChannel1, maa);",
    // "vec4 mixer = texture2D(iChannel1, maa2);",

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "float t = time;",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

            "texcoord.y -= t*0.2;",

            "float zz = 1.0/(1.0-uv.y*1.7);",
            "texcoord.y -= zz * sign(zz);",

            "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
            "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
            "vec4 stone = texture2D(iChannel0, maa);",
            "vec4 blips = texture2D(iChannel0, maa);",
            "vec4 mixer = texture2D(iChannel0, maa2);",

            "float shade = abs(1.0/zz);",

            "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
            "gl_FragColor = vec4(outp,1.0);",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    sprite = game.add.sprite(0, 0, 'cyberglow');
    sprite.width = 800;
    sprite.height = 600;

    var customUniforms = {
        iChannel0: { type: 'sampler2D', value: sprite.texture, textureData: { repeat: true } }
    };

    filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
    filter.setResolution(800, 600);

    sprite.filters = [ filter ];

}

function update() {

    filter.update();

}
