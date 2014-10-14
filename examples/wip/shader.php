<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />
        <title>phaser</title>
        <script src="phaser-arcade-physics.min.js" type="text/javascript"></script>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: black;
            }
        </style>
    </head>
    <body>

    <script type="text/javascript">

    window.onload = function() {

var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('a', 'cokecan.png');

}

var shader;
var lazer;
var fire;
var d = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;

    var background = game.add.sprite(0, 0);
    background.width = game.width;
    background.height = game.height;

    lazer = game.add.filter('LazerBeam', game.width, game.height);

    background.filters = [lazer];

    shader = new PIXI.TwistFilter();
    shader.angle = 0;

    for (var i = 0; i < 100; i++)
    {
        sprite = game.add.sprite(game.world.randomX, 200, 'a');
        game.physics.arcade.enable(sprite);
        // sprite.scale.set(0.5);
        sprite.shader = shader;
        sprite.body.collideWorldBounds = true;
        sprite.body.velocity.x = game.rnd.between(-200, 200);
        sprite.body.velocity.y = game.rnd.between(-400, -200);
        sprite.body.bounce.x = 0.9;
        sprite.body.bounce.y = 0.9;
    }

    var background2 = game.add.sprite(0, game.height - 600);
    background2.width = game.width;
    background2.height = 600;

    fire = game.add.filter('Fire', game.width, 600);
    fire.alpha = 0.0;

    background2.filters = [fire];

}

function update() {

    if (d === 0)
    {
        shader.angle += 0.2;

        if (shader.angle >= 2.5)
        {
            d = 1;
        }
    }
    else
    {
        shader.angle -= 0.2;

        if (shader.angle <= -2.5)
        {
            d = 0;
        }
    }

    lazer.update();
    fire.update();

    // sprite.rotation -= 0.01;

}

function render() {

    // game.debug.text(shader.angle.toString(), 32, 32);
    // game.debug.text("BOB!", 32, 32);

}

Phaser.Filter.LazerBeam = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.divisor = { type: '1f', value: 0.5 };

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     divisor;",

        "void main(void) {",

            "vec2 p = (gl_FragCoord.yx / resolution.yx) - .5;",
            "float sx = 0.3 * (p.x+ 0.8) * sin(900.0 * p.x - 1. * pow(time, 0.55)*5.);",
            "float dy = 4. / ( 500.0 * abs(p.y - sx));",
            "dy += 1./ (25. * length(p - vec2(p.x, 0)));",
            "gl_FragColor = vec4((p.x + 0.1) * dy, 0.3 * dy, dy, 1.1);",

        "}"
    ];

};

Phaser.Filter.LazerBeam.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.LazerBeam.prototype.constructor = Phaser.Filter.LazerBeam;

Phaser.Filter.LazerBeam.prototype.init = function (width, height, divisor) {

    if (typeof divisor == 'undefined') { divisor = 0.5; }

    this.setResolution(width, height);
    this.uniforms.divisor.value = divisor;

};

Phaser.Filter.Fire = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = { type: '1f', value: 1.0 };
    this.uniforms.shift = { type: '1f', value: 1.6 };
    this.uniforms.speed = { type: '2f', value: { x: 0.7, y: 0.4 } };

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     alpha;",
        "uniform vec2      speed;",
        "uniform float     shift;",

        "float rand(vec2 n) {",
            "return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);",
        "}",

        "float noise(vec2 n) {",
            "const vec2 d = vec2(0.0, 1.0);",
            "vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));",
            "return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);",
        "}",

        "float fbm(vec2 n) {",
            "float total = 0.0, amplitude = 1.0;",
            "for (int i = 0; i < 4; i++) {",
                "total += noise(n) * amplitude;",
                "n += n;",
                "amplitude *= 0.5;",
            "}",
            "return total;",
        "}",

        "void main() {",

            "const vec3 c1 = vec3(0.5, 0.0, 0.1);",
            "const vec3 c2 = vec3(0.9, 0.0, 0.0);",
            "const vec3 c3 = vec3(0.2, 0.0, 0.0);",
            "const vec3 c4 = vec3(1.0, 0.9, 0.0);",
            "const vec3 c5 = vec3(0.1);",
            "const vec3 c6 = vec3(0.9);",

            "vec2 p = gl_FragCoord.xy * 8.0 / resolution.xx;",
            "float q = fbm(p - time * 0.1);",
            "vec2 r = vec2(fbm(p + q + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));",
            "vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);",
            "gl_FragColor = vec4(c * cos(shift * gl_FragCoord.y / resolution.y), alpha);",
        "}"
    ];

};

Phaser.Filter.Fire.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Fire.prototype.constructor = Phaser.Filter.Fire;

Phaser.Filter.Fire.prototype.init = function (width, height, alpha, shift) {

    this.setResolution(width, height);

    if (typeof alpha !== 'undefined') {
        this.uniforms.alpha.value = alpha;
    }

    if (typeof shift !== 'undefined') {
        this.uniforms.shift.value = shift;
    }

};

Object.defineProperty(Phaser.Filter.Fire.prototype, 'alpha', {

    get: function() {
        return this.uniforms.alpha.value;
    },

    set: function(value) {
        this.uniforms.alpha.value = value;
    }

});

Object.defineProperty(Phaser.Filter.Fire.prototype, 'shift', {

    get: function() {
        return this.uniforms.shift.value;
    },

    set: function(value) {
        this.uniforms.shift.value = value;
    }

});

Object.defineProperty(Phaser.Filter.Fire.prototype, 'speed', {

    get: function() {
        return this.uniforms.speed.value;
    },

    set: function(value) {
        this.uniforms.speed.value = value;
    }

});


    }

    </script>

    </body>
</html>