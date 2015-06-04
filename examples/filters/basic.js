
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('metal', 'assets/textures/metal.png');

}

var filter;
var sprite;

function create() {

    var fragmentSrc = [

        "precision mediump float;",

        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 texColor = texture2D(uSampler, vTextureCoord);",

            "if (vTextureCoord.x < 0.1) {",
                "texColor = vec4(1.0, 0.0, 1.0, 1.0);",
            "}",
     
            "gl_FragColor = texColor;",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    sprite = game.add.sprite(0, 0, 'metal');

    filter = new Phaser.Filter(game, null, fragmentSrc);

    sprite.filters = [ filter ];

}
