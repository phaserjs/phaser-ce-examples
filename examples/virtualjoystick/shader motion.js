/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Virtual Joystick Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/virtualjoystick
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var PhaserGame = function () {

    this.pad;

    this.stick;

    this.filter;

};

PhaserGame.prototype = {

    init: function () {

        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function () {

        this.load.atlas('arcade', 'assets/virtualjoystick/skins/arcade-joystick.png', 'assets/virtualjoystick/skins/arcade-joystick.json');

    },

    create: function () {

        this.createShader();

        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);

        this.stick = this.pad.addStick(0, 0, 100, 'arcade');
        this.stick.alignBottomLeft();

    },

    update: function () {

        this.filter.uniforms.mouse.value.x = this.stick.filterX;
        this.filter.uniforms.mouse.value.y = this.stick.filterY;
        this.filter.update();

    },

    createShader: function () {

        var fragmentSrc = [
            "precision mediump float;",
            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform vec2      mouse;",

            "const float Tau        = 6.2832;",
            "const float speed  = .02;",
            "const float density    = .04;",
            "const float shape  = .04;",

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

        this.filter = new Phaser.Filter(this.game, null, fragmentSrc);
        this.filter.setResolution(this.game.width, this.game.height);

        var sprite = this.add.sprite();
        sprite.width = this.game.width;
        sprite.height = this.game.height;

        sprite.filters = [ this.filter ];

    }

};

game.state.add('Game', PhaserGame, true);
