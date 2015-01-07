
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'assets/pics/alex-bisleys_horsy_512x512.png');

}

var filter;
var sprite;

function create() {

    //  Shader by Kali (https://www.shadertoy.com/view/4dfGDM)
    //  Image patched by Richard Davey

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "uv.y *= -1.0;",
            "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
            "vec4 texColor = texture2D(iChannel0, uv);",
            "gl_FragColor = texColor;",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    sprite = game.add.sprite(0, 0, 'texture');
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
