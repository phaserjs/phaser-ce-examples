
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create, update: update });

var filter;
var sprite;

function create() {

    //  From http://glslsandbox.com/e#16061.2

    var fragmentSrc = [

        "#ifdef GL_ES",
        "precision mediump float;",
        "const vec3 df = vec3(0.05, 0.0, 0.0);",
        "#else",
        "const vec3 df = vec3(0.01, 0.0, 0.0);",
        "#endif",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "// Sphere tracer by mzeo",
        "// inspired by http://www.youtube.com/watch?v=kuesTvUYsSc#t=377",
        "// waves by @hintz",

        "#define AUTO_CAMERA",

        "// Constants",
        "// Camera",
        "const vec3 origin = vec3(0, 0, 0);",
        "const int steps = 128;",
        "const vec3 sun = vec3(1.0, .5, -1.0);",

        "const int miterations = 32;",

        "// Ball",
        "struct Ball",
        "{",
            "vec3 pos;",
            "float size;",
        "};",

        "const Ball ball = Ball(vec3(0, 0, 5), 0.5);",

        "struct Balls",
        "{",
            "vec3 dir;",
            "vec3 p;",
            "float dist;",
        "};",

        "const Balls balls = Balls(vec3(1, 0, 0), vec3(0, 0, 0), 1.0);",

        "// Floor",

        "struct Plane",
        "{",
            "vec3 n;",
            "float d;",
        "};",

        "const Plane plane = Plane(vec3(0, 1, 0), -1.0);",

        "// Distance",
        "struct Dist",
        "{",
            "float dist;",
            "int id;",
        "};",


        "Dist and(Dist a, Dist b)",
        "{",
            "if (a.dist < b.dist)",
            "{",
                "return a;",
            "}",

            "return b;",
        "}",

        "Dist fBall(Ball ball, vec3 p)",
        "{",
            "return Dist(length(ball.pos - p) - ball.size, 0);",
        "}",

        "Ball get(Balls balls, float t)",
        "{",
            "float a = abs(mod(t, 6.0) - 3.0);",
            "vec3 p = balls.p + balls.dir * t * balls.dist + a * a * vec3(0, -0.15, 0);",
            "return Ball(p, ball.size);",
        "}",

        "Dist fBalls(Balls balls, vec3 p)",
        "{",
            "float t = dot(p - balls.p, balls.dir) / balls.dist;",
            "float t0 = t - fract(t + fract(time) * 2.0);",
            "float t1 = t0 + 1.0;",

            "return and(",
            "fBall(get(balls, t0), p),",
            "fBall(get(balls, t1), p));",
        "}",

        "Dist fPlane(Plane plane, vec3 p)",
        "{",
            "return Dist(dot(plane.n, p) - plane.d - 0.4*cos(length(p.xz) - time), 1);",
        "}",

        "Dist f(vec3 p)",
        "{",
            "return and(",
            "fBalls(balls, p),",
            "fPlane(plane, p));",
        "}",

        "vec3 grad(vec3 p)",
        "{",
            "float f0 = f(p).dist;",

            "return normalize(vec3(",
            "f(p + df.xyz).dist,",
            "f(p + df.yxz).dist,",
            "f(p + df.yzx).dist) - f0);",
        "}",

        "float mandel(vec2 c)",
        "{",
            "vec2 z = c;",

            "for(int i = 0; i < miterations; ++i)",
            "{",
                "z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;",
                "if (length(z) > 40.0) return float(i) / float(miterations);",
            "}",

            "return 0.0;",
        "}",

        "vec3 floorTexture(vec3 p)",
        "{",
            "mat2 rot = mat2(vec2(1, 1), vec2(1, -1));",
            "vec2 c = rot * (p.xz + vec2(-0.7, -1.0)) * 0.2;",
            "float i = mandel(c);",
            "return clamp(vec3(i * 10.0, i * i *10.0, i*i*i*5.0).zyx, vec3(0,0,0), vec3(2,2,2));",
        "}",


        "vec4 shade(vec3 p, vec3 ray, int id)",
        "{",
            "vec3 n = grad(p);",
            "float diffuse = clamp(dot(normalize(sun), n), 0.0, 1.0);",

            "vec3 color;",
            "float ref;",

            "if (id == 0)",
            "{",
                "color = vec3(0,1,0);",
                "ref = 0.1;",
            "}",
            "else",
            "{",
                "color = floorTexture(p);",
                "ref = 0.5;",
            "}",

            "return vec4(color * diffuse, 1) * ref;",
        "}",

        "vec4 combine(vec4 a, vec4 b)",
        "{",
            "return a + b * (1.0 - a.w);",
        "}",

        "vec4 sky(vec3 ray)",
        "{",
            "float sun = dot(ray, normalize(sun));",
            "sun = (sun > 0.0) ? pow(sun, 100.0) * 3.0 : 0.0;",
            "float horizon = 1.0 - abs(ray.y);",
            "vec3 blue = vec3(0.1, 0.3, 0.6);",
            "vec3 red = vec3(0.6, 0.3, 0.) * 2.0;",
            "return vec4(vec3(0.9, 0.8, 0.5) * sun + blue * horizon + red * pow(horizon, 8.0), 1);",
        "}",

        "vec4 trace(vec3 origin, vec3 ray)",
        "{",
            "vec3 p = origin;",
            "Dist dist = Dist(10000.0, 2);",
            "vec4 result = vec4(0, 0, 0, 0);",

            "for(int i = 0; i < steps; ++i)",
            "{",
                "dist = f(p);",
                "if (dist.dist > 0.01)",
                "{",
                    "p += ray * dist.dist;",
                    "float absorb = exp(-dist.dist * 0.05);",
                    "vec4 s = sky(ray) * (1.0 - absorb);",

                    "result = combine(result, s);",
                "}",
                "else if (result.w < 0.99)",
                "{",
                    "vec3 n = grad(p);",
                    "vec4 s = shade(p, ray, dist.id);",
                    "ray = reflect(ray, n);",
                    "p += n * 0.01;",

                    "result = combine(result, s);",
                "}",
                "else",
                "{",
                    "break;",
                "}",
            "}",

            "return combine(result, sky(ray));",
        "}",

        "void main(void)",
        "{",
            "float scale = 2.0 / max(resolution.x, resolution.y);",
            "vec3 ray = vec3((gl_FragCoord.xy - resolution.xy / 2.0) * scale, 1);",

            "#ifdef AUTO_CAMERA",
            "float yaw = cos(time) * -0.25 + 0.1;",
            "float angle = time * 0.5;",
            "#else",
            "float yaw = mouse.y - 0.15;",
            "float angle = mouse.x * 8.0;",
            "#endif",

            "vec3 from = (vec3(sin(angle), 0, cos(angle)) * cos(yaw) + vec3(0, sin(yaw) * 1.0, 0)) * 5.0;",
            "//vec3 from = origin + vec3((mouse.xy - vec2(0.5,0.0)) * vec2(15.0, 3.0), -5);",
            "vec3 to = vec3(0, -1, 0);",
            "vec3 up = vec3(0, 1, 0);",
            "vec3 dir = normalize(to - from);",
            "vec3 left = normalize(cross(up, dir));",
            "mat3 rot = mat3(left, cross(dir, left), dir);",

            "gl_FragColor = trace(from, rot * normalize(ray));",
        "}"
    ];


    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];

}

function update() {

    filter.update(game.input.activePointer);

}
