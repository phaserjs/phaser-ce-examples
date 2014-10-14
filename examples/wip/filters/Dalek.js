
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('texture', 'wip/filters/tex07.jpg');

}

var filter;
var sprite;

function create() {

	//	From http://glslsandbox.com/e#19880.0

	var fragmentSrc = [
		"precision mediump float;",

		"uniform float     time;",
		"uniform vec2      resolution;",
		"uniform vec2      mouse;",

		"#define pi 3.1415927",

		"//various primitives, thanks IQ! http://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm",

		"float Sphere( vec3 p, vec3 c, float r )",
		"{",
			"return length(p-c) - r;",
		"}",

		"float Box( vec3 p, vec3 b )",
		"{",
			"vec3 d = abs(p) - b;",
			"return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));",
		"}",

		"float BevelBox(vec3 p, vec3 size, float box_r)",
		"{",
			"vec3 box_edge = size - box_r*0.5;",
			"vec3 dd = abs(p) - box_edge;",

			"//in (dd -ve)",
			"float maxdd = max(max(dd.x,dd.y),dd.z);",
			"//0 away result if outside",
			"maxdd = min(maxdd,0.0);",

			"//out (+ve);",
			"dd = max(dd,0.0);",
			"float ddd = (length(dd)-box_r);",

			"//combine the in & out cases",
			"ddd += maxdd;",
			"return ddd;",
		"}",

		"float CylinderXY( vec3 p, vec3 c ) {",
			"return length(p.xy-c.xy)-c.z;",
		"}",

		"float CylinderXZ( vec3 p, vec3 c ) {",
			"return length(p.xz-c.xy)-c.z;",
		"}",

		"float CylinderYZ( vec3 p, vec3 c ) {",
			"return length(p.yz-c.xy)-c.z;",
		"}",

		"float udHexPrism( vec2 p, float h ) {",
			"vec2 q = abs(p);",
			"return max(q.x+q.y*0.57735,q.y*1.1547)-h;",
		"}",

		"vec3 RotX(vec3 p, float t) {",
			"float c = cos(t); float s = sin(t);",
			"return vec3(p.x,",
			"p.y*c+p.z*s,",
			"-p.y*s+p.z*c);",
		"}",

		"vec3 RotY(vec3 p, float t) {",
			"float c = cos(t); float s = sin(t);",
			"return vec3(p.x*c+p.z*s,",
			"p.y,",
			"-p.x*s+p.z*c);",
		"}",

		"vec3 RotZ(vec3 p, float t) {",
			"float c = cos(t); float s = sin(t);",
			"return vec3(p.x*c+p.y*s,",
			"-p.x*s+p.y*c,",
			"p.z);",
		"}",

		"//initiate time corridor... (aka begin original work)",

		"float Plate(vec3 p, float h)",
		"{",
			"p = RotX(p,-pi*0.0625);",

			"float hh = 0.25;",
			"float w = 0.5 * hh;",
			"float bev = 0.02;",

			"float base = BevelBox(p-vec3(0.0,0.0,0),vec3(w,h,w), bev);",
			"float scallop = BevelBox(RotX(p,-pi*0.0625)-vec3(0.,-.6*h,0.6*hh),vec3(w,2.*h,w)*0.5, bev);",
			"base = max(base,-scallop);",

			"float hole_size = 0.03;",
			"float hole_off = h * 0.8;",

			"vec3 reflect_y_p = vec3(p.x,abs(p.y),p.z);",

			"//	float hole = CylinderXY( reflect_y_p, vec3(0.,hole_off,hole_size));",
			"//	base = max(base,-hole);",

			"float rivet = Sphere( reflect_y_p, vec3(0.,hole_off,w), hole_size );",

			"base = min(base,rivet);",
			"return base;",
		"}",

		"float PlateRing(vec3 p, float polar_t, float polar_r)",
		"{",
			"float h = abs(polar_t) < pi*(3.0/8.) ? 0.25 : 0.5;",

			"polar_t = mod(polar_t,pi*(1./8.)) - pi*(1./8.)*0.5;",
			"vec3 q = vec3(polar_r * sin(polar_t), p.y, polar_r*cos(polar_t));",
			"q -= vec3(0.,-(h-0.25),1.0);",

			"return Plate(q,h);",
		"}",

		"float Whisk(vec3 p)",
		"{",
			"p = abs(p);",
			"float r = 0.075;",
			"float c = min(0.4-p.x,0.1) * r * 12.0;",
			"return length(p.zy - vec2(c,c)) - r*0.25;",
		"}",

		"float Gun( vec3 p )",
		"{",
			"p -= vec3(1.7,-.55,-0.70);",

			"float d = Whisk(p);",
			"d = min( d, Whisk(RotX(p,pi*0.25)) );",
			"float barrel = length(p.zy)-0.05;",

			"barrel = max( barrel, abs(p.x)-0.5); //clip",

			"barrel = max( barrel, -(length(p.zy)-0.025));",
			"return min(d,barrel);",
		"}",

		"const float suck_end = 1.0;",


		"float Plunger(vec3 p )",
		"{",
			"p -= vec3(1.7,-.55,0.70);",
			"float barrel = length(p.zy)-0.075;",
			"barrel = max( barrel, abs(p.x)-0.75);	//clip!",

			"float sucker = Sphere(p, vec3(suck_end,0.0,0.0), 0.3);",
			"sucker = max(sucker, -Sphere(p, vec3(suck_end,0.0,0.0), 0.25));",
			"sucker = max(sucker, p.x-0.9); //clip",
			"return min(barrel,sucker);",
		"}",

		"float GunPort(vec3 p)",
		"{",
			"p.z = abs(p.z);",

			"float w = 0.225;",
			"float d = 0.5;",

			"vec3 c = vec3(.75-0.25,-.55,0.70);",

			"float s = Sphere(p, c+vec3(.35+0.25,0,0), w * 0.66);",

			"p.x += 0.2 * p.y;",
			"float bev = 0.02;",
			"float b = BevelBox(p-c,vec3(d,w,w), bev);",

			"return min(b,s);",
		"}",

		"float DarkBits(vec3 p)",
		"{",
			"//core body",
			"float b = CylinderXZ(p, vec3(0.,0.,0.8-0.15*p.y));",
			"b = max(b,abs(p.y)-1.2); //clip!",

			"//sucker",
			"vec3 sucker_p = p - vec3(1.7,-.55,0.70);",
			"float sucker = Sphere(sucker_p, vec3(suck_end,0.0,0.0), 0.3);",

			"//bulb",
			"vec3 stalk_p = RotZ(p,pi*0.05);",
			"float bulb_d = Sphere(stalk_p,vec3(2.4,1.1,0.0),0.2);",
			"bulb_d = max(bulb_d,stalk_p.x-2.5); //clip",

			"//gun ports",
			"p.z = abs(p.z);",

			"float w = 0.225;",
			"float d = 0.5;",

			"vec3 c = vec3(.75-0.25,-.55,0.70);",

			"float s = Sphere(p, c+vec3(.35+0.25,0,0), w * 0.66);",


			"return min(min(bulb_d,s),min(b,sucker));",
		"}",

		"float Balls(vec3 p, float polar_t, float polar_r)",
		"{",
			"p.y += 2.45;",

			"float ang_reps = 6.;",
			"polar_t = mod(polar_t,pi*(1./ang_reps)) - pi*(1./ang_reps)*0.5;",
			"vec3 q = vec3(polar_r * sin(polar_t), p.y, polar_r*cos(polar_t));",

			"float k = .5;",
			"q.y = mod( q.y, k ) - 0.5 * k;",

			"float balls = Sphere(q,vec3(0.0,0,1.25 - 0.1*floor(p.y*2.)),0.2);",

			"balls = max(balls,abs(p.y)-1.); //clip!",
			"return balls;",
		"}",

		"float Body(vec3 p) {",
			"vec3 q = p;",
			"p=RotY(p,pi*1.0/12.0);",
			"float taper = 1.0+0.1*p.y;",

			"taper -= p.y < -3.5 ? .2 * clamp(-(p.y+3.5),0.,0.1) : 0.;",
			"p.xz *= taper;",

			"float w = 1.15; ///taper;",
			"float d = udHexPrism(p.zx,w);",
			"d = max(d, udHexPrism(p.xz,w));",

			"d /= taper;",

			"q.y += +2.45;",

			"d = max(d,abs(q.y)-1.5); //clip!",
			"return d;",
		"}",

		"float Belt(vec3 p, float polar_t, float polar_r) {",

			"//belt",
			"float r = p.y + 1.05;",
			"float d = CylinderXZ(p, vec3(0.,0.,1.25-0.15*r) );",
			"vec3 q = p;",
			"q.y += 1.05;",
			"d = max(d,abs(q.y)-0.125); //clip!",

			"//core body",
			"float b = CylinderXZ(p, vec3(0.,0.,0.8-0.15*p.y));",
			"b = max(b,abs(p.y)-1.2); //clip!",

			"//buckle",
			"d = min(d, BevelBox(p+vec3(-0.8,0.60,0.),vec3(.2,.2,.4+0.2*p.y),0.05) );",

			"d = min(d,b);",
			"return d;",
		"}",

		"float Grill(vec3 p, float polar_t, float polar_r)",
		"{",
			"p += vec3(0.,-0.5,0.);",

			"vec3 c = p;",
			"float k = .25;",
			"c.y = mod( c.y + 0.1, k ) - 0.5 * k;",

			"float b = CylinderXZ(c,vec3(0.,0.,0.9));",
			"b = max(b,abs(c.y)-0.025); //clip each ring",

			"b = max(b,abs(p.y)-0.5); //clip the repetitions",

			"float ang_reps = 4.;",
			"polar_t = mod(polar_t,pi*(1./ang_reps)) - pi*(1./ang_reps)*0.5;",
			"vec3 q = vec3(polar_r * cos(polar_t), p.y, polar_r*sin(polar_t));",

			"q = RotZ(q,pi*0.06);",

			"float d = BevelBox(q,vec3(0.8,0.5,.05),.045);",
			"return min(d,b);",
		"}",

		"float Head(vec3 p)",
		"{",
			"float d = Sphere(p,vec3(0.,0.66,0.),1.0);",
			"d = max(d,-p.y+1.0); //clip!",
			"return d;",
		"}",

		"float Eye(vec3 p)",
		"{",
			"//stalk",
			"p = RotZ(p,pi*0.05);",
			"float d = CylinderYZ(p,vec3(1.1,0.,0.1));",
			"d = max(d,-p.x); //clip",

			"//bulb",
			"d = min(d, Sphere(p,vec3(2.4,1.1,0.0),0.2) );",

			"d = max(d,p.x-2.5); //clip",

			"//lens",
			"d = min(d, Sphere(p,vec3(2.4,1.1,0.0),0.15) );",

			"//mount",
			"d = min(d, BevelBox(p+vec3(-0.9,-1.1,0.),vec3(.2,.2,.4-0.2*p.y),0.05) );",
			"return d;",
		"}",

		"float Lens(vec3 p)",
		"{",
			"p = RotZ(p,pi*0.05);",
			"return Sphere(p,vec3(2.4,1.1,0.0),0.15);",
		"}",

		"float Ears(vec3 p)",
		"{",
			"p.z = abs(p.z);",


			"p = RotX(p, -pi * 0.25);",

			"float d = CylinderXY(p,vec3(0.0,.5,0.2-0.1*(p.z-0.5)));",

			"d = max(d,p.z-1.75); //clip",

			"return d;",
		"}",

		"float floor_height = -4.0;",

		"float sdf( vec3 p )",
		"{",
			"float polar_t = atan(p.z,p.x);",
			"float polar_r = length(p.xz);",

			"float d = 1e10;",
			"float d_bound = 2.5;",
			"if (polar_r < d_bound)	//optimize away this stuff if far away from bound cylinder",
			"{",
				"//	if (p.y < -1.0)	//opt?",
				"d = min(d, Balls(p, polar_t, polar_r));",

				"d = min(d, Belt(p, polar_t, polar_r));",

				"d = min(d, PlateRing(p, polar_t, polar_r));",

				"//	if (p.y > 0.25) //opt?",
				"{",
					"d = min(d, Grill(p, polar_t, polar_r));",
					"d = min(d, Head(p));",
					"d = min(d, Ears(p));",
				"}",
			"}",

			"//	if (p.y < -1.0) //opt ?",
			"d = min(d, Body(p));",
			"//	else 			//opt ? glitches shadows though",
			"if (abs(polar_t) < pi * 0.5) //optimize away this stuff if far away from front",
			"{",
				"d = min(d, Eye(p));",
				"d = min(d,GunPort(p));",
				"d = min(d, Gun(p));",
				"d = min(d, Plunger(p));",
			"}",

			"//floor!",
			"d = min(d,p.y-floor_height);",
			"return d;",
		"}",


		"vec3 nor(vec3 X)",
		"{",
			"vec2 e = vec2(0.01,0.0); //fatter filter looks like bevelled edges on hard CSG shapes",
			"#if 0",
			"//guh glitchy on silhouettes!",
			"float d = sdf(X);",
			"vec3 N = vec3(sdf(X-e.xyy),sdf(X-e.yxy),sdf(X-e.yyx) - vec3(d,d,d) );",
			"#else",
			"vec3 N = vec3(sdf(X-e.xyy),sdf(X-e.yxy),sdf(X-e.yyx)) -",
			"vec3(sdf(X+e.xyy),sdf(X+e.yxy),sdf(X+e.yyx));",
			"#endif",
			"return -normalize(N);",
		"}",

		"float Ao(vec3 p, vec3 n, float d) {",
			"float vis = 0.0;",
			"for (int i=0; i<6; i++)",
			"{",
				"float d = sdf(p);",
				"//this made more sense to me as volume of sphere that is clear of stuff blocking light ??",
				"vis += d*d*d * (4.*pi/3.);",
				"p += n * d;",
			"}",
			"return pow(clamp(vis,0.,1.),0.2);",
		"}",

		"//thanks BRDF guys!",
		"//http://hal.inria.fr/docs/00/70/23/04/PDF/paper.pdf",

		"float gamma = //1.8;",
		"2.2;",
		"//2.0;",
		"float one_pi = 0.31830988618;",
		"float lightIntensity = 8.0;",

		"// gold-paint",
		"#if 1",
		"vec3 rho_d = vec3(0.147708, 0.0806975, 0.033172);",
		"vec3 rho_s = vec3(0.160592, 0.217282, 0.236425);",
		"vec3 alpha = vec3(0.122506, 0.108069, 0.12187);",
		"vec3 p = vec3(0.795078, 0.637578, 0.936117);",
		"vec3 F_0 = vec3(9.16095e-12, 1.81225e-12, 0.0024589);",
		"vec3 F_1 = vec3(-0.596835, -0.331147, -0.140729);",
		"vec3 K_ap = vec3(5.98176, 7.35539, 5.29722);",
		"vec3 sh_lambda = vec3(2.64832, 3.04253, 2.3013);",
		"vec3 sh_c = vec3(9.3111e-08, 8.80143e-08, 9.65288e-08);",
		"vec3 sh_k = vec3(24.3593, 24.4037, 25.3623);",
		"vec3 sh_theta0 = vec3(-0.284195, -0.277297, -0.245352);",
		"#endif",

		"float envAmount = 1.0;",

		"void dark_specular_fabric()",
		"{",
			"// dark-specular-fabric",
			"rho_d = vec3(0.0197229, 0.00949167, 0.00798414);",
			"rho_s = vec3(0.556218, 0.401495, 0.378651);",
			"alpha = vec3(0.140344, 0.106541, 0.166715);",
			"p = vec3(0.249059, 0.177611, 0.434167);",
			"F_0 = vec3(0.0351133, 0.0387177, 0.0370533);",
			"F_1 = vec3(0.0243153, 0.0293178, 0.0264913);",
			"K_ap = vec3(7.60492, 9.81673, 6.19307);",
			"sh_lambda = vec3(3.93869, 4.23097, 4.3775);",
			"sh_c = vec3(0.00122421, 0.00238545, 8.47126e-06);",
			"sh_k = vec3(13.889, 14.5743, 17.2049);",
			"sh_theta0 = vec3(0.114655, 0.210179, -0.227628);",
			"envAmount = 0.;",
		"}",

		"void gold_paint()",
		"{",
			"rho_d = vec3(0.147708, 0.0806975, 0.033172);",
			"rho_s = vec3(0.160592, 0.217282, 0.236425);",
			"alpha = vec3(0.122506, 0.108069, 0.12187);",
			"p = vec3(0.795078, 0.637578, 0.936117);",
			"F_0 = vec3(9.16095e-12, 1.81225e-12, 0.0024589);",
			"F_1 = vec3(-0.596835, -0.331147, -0.140729);",
			"K_ap = vec3(5.98176, 7.35539, 5.29722);",
			"sh_lambda = vec3(2.64832, 3.04253, 2.3013);",
			"sh_c = vec3(9.3111e-08, 8.80143e-08, 9.65288e-08);",
			"sh_k = vec3(24.3593, 24.4037, 25.3623);",
			"sh_theta0 = vec3(-0.284195, -0.277297, -0.245352);",
		"}",

		"void two_layer_silver()",
		"{",
			"rho_d = vec3(0.0657916, 0.0595705, 0.0581288);",
			"rho_s = vec3(1.55275, 2.00145, 1.93045);",
			"alpha = vec3(0.0149977, 0.0201665, 0.0225062);",
			"p = vec3(0.382631, 0.35975, 0.361657);",
			"F_0 = vec3(4.93242e-13, 1.00098e-14, 0.0103259);",
			"F_1 = vec3(-0.0401315, -0.0395054, -0.0312454);",
			"K_ap = vec3(50.1263, 38.8508, 34.9978);",
			"sh_lambda = vec3(3.41873, 3.77545, 3.78138);",
			"sh_c = vec3(6.09709e-08, 1.02036e-07, 1.01016e-07);",
			"sh_k = vec3(46.6236, 40.8229, 39.1812);",
			"sh_theta0 = vec3(0.183797, 0.139103, 0.117092);",
		"}",

		"void specular_violet_phenolic()",
		"{",
			"rho_d = vec3(0.0686035, 0.0181856, 0.0210368);",
			"rho_s = vec3(0.108459, 0.0471612, 0.171691);",
			"alpha = vec3(0.00123271, 0.000443974, 0.00149517);",
			"p = vec3(0.657484, 0.546753, 0.653065);",
			"F_0 = vec3(0.0403569, 0.121081, 0.035323);",
			"F_1 = vec3(-0.0295013, 0.0563904, -0.0275623);",
			"K_ap = vec3(351.208, 1193.45, 294.897);",
			"sh_lambda = vec3(3.17585e-05, 1.3817, 2.44051e-05);",
			"sh_c = vec3(3.02028e-07, 6.19706e-08, 3.40809e-07);",
			"sh_k = vec3(31.3319, 234.879, 28.7237);",
			"sh_theta0 = vec3(-0.168991, 0.500354, -0.252626);",
		"}",

		"void orange_paint()",
		"{",
			"rho_d = vec3(0.368088, 0.147113, 0.00692426);",
			"rho_s = vec3(0.524979, 0.116386, 0.199437);",
			"alpha = vec3(0.818115, 0.064743, 0.229391);",
			"p = vec3(1.44385, 0.0709512, 0.483597);",
			"F_0 = vec3(6.92565e-13, 0.106161, 0.102279);",
			"F_1 = vec3(-0.174318, 0.0934385, 0.0625648);",
			"K_ap = vec3(4.57466, 16.0185, 4.96427);",
			"sh_lambda = vec3(1.84547, 4.70387, 3.6232);",
			"sh_c = vec3(0.072629, 0.0299825, 0.000333551);",
			"sh_k = vec3(5.96872, 14.9466, 13.2194);",
			"sh_theta0 = vec3(0.222125, 0.438216, -0.0759733);",
		"}",

		"vec3 Fresnel(vec3 F0, vec3 F1, float V_H)",
		"{",
			"return F0 - V_H * F1  + (1. - F0)*pow(1. - V_H, 5.);",
		"}",

		"vec3 D(vec3 _alpha, vec3 _p, float cos_h, vec3 _K)",
		"{",
			"float cos2 = cos_h*cos_h;",
			"float tan2 = (1.-cos2)/cos2;",
			"vec3 ax = _alpha + tan2/_alpha;",

			"ax = max(ax,0.); //bug?",

			"return one_pi * _K * exp(-ax)/(pow(ax,_p) * cos2 * cos2);",
			"// return vec3( 0.0 / (cos2 * cos2));",
		"}",

		"vec3 G1(float theta)",
		"{",
			"theta = clamp(theta,-1.,1.); //bug?",
			"return 1.0 + sh_lambda * (1. - exp(sh_c * pow(max(acos(theta) - sh_theta0,0.), sh_k)));",
		"}",

		"vec3 shade(float inLight, float n_h, float n_l, float n_v, float v_h)",
		"{",
			"return  one_pi * inLight * ( n_l * rho_d",
			"+ rho_s * D(alpha, p, n_h, K_ap) * G1(n_l) * G1 (n_v) * Fresnel(F_0, F_1, v_h));",
		"}",

		"vec3 brdf(vec3 lv, vec3 ev, vec3 n)",
		"{",
			"vec3 halfVector = normalize(lv + ev);",

			"float v_h = dot(ev, halfVector);",
			"float n_h = dot(n, halfVector);",
			"float n_l = dot(n, lv);",
			"float inLight = 1.0;",
			"if (n_l < 0.) inLight = 0.0;",
			"float n_v = dot(n, ev);",

			"vec3 sh = shade(inLight, n_h, n_l, n_v, v_h);",
			"sh = clamp( sh, 0., 1.); //bug?",
			"vec3 retColor = lightIntensity * sh;",


			"return retColor;",
		"}",


		"void ChooseMat(vec3 p)",
		"{",
			"if (p.y < -3.5 || (DarkBits(p)) < 0.01)",
			"{",
				"//	black_soft_plastic();",
				"//	blue_acrylic();",
				"dark_specular_fabric();",
			"}",

			"#if 1",

			"float polar_t = atan(p.z,p.x);",
			"float polar_r = length(p.xz);",
			"if ( abs(Balls(p, polar_t, polar_r)) < 0.01)",
			"{",
				"//		gold_paint();",
				"two_layer_silver();",
			"}",
			"#endif",

			"if (Lens(p)<0.01)",
			"{",
				"specular_violet_phenolic();",
			"}",

			"if (Ears(p)<0.01)",
			"{",
				"orange_paint();",

				"lightIntensity+=max(sin(time*10.0),0.)*10.0;",
			"}",
		"}",

		"void MakeViewRay(out vec3 viewP, out vec3 viewD)",
		"{",
			"vec2 xy = gl_FragCoord.xy;",
			"xy.y=resolution.y-gl_FragCoord.y;",
			"vec2 filmUv = (xy + vec2(0.5,0.5))/resolution.xy;",

			"float tx = (2.0*filmUv.x - 1.0)*(resolution.x/resolution.y);",
			"float ty = (1.0 - 2.0*filmUv.y);",
			"float tz = 0.0;",

			"viewP = vec3(0.0, 0.0, 5.0);",
			"viewD = vec3(tx, ty, tz) - viewP;",

			"viewD = normalize(viewD);",

			"float t = pi*0.5 + sin(time);",

			"viewD=RotX(viewD,pi*0.1);",

			"viewP.y += 4.0;",
			"viewP.z += 12.0; // - sin(iGlobalTime)*8.0;",
			"viewP = RotY(viewP,t);",

			"viewD = RotY(viewD,t);",

		"}",

		"//thanks again IQ http://www.iquilezles.org/www/articles/rmshadows/rmshadows.htm",
		"float shadow( in vec3 X, in vec3 n, in vec3 L )",
		"{",
			"float mint = 0.001;",
			"float maxt = 20.0;",

			"X += n*.01;",

			"float h=0.2;",
			"float sharpness = 25.;",
			"float soft=1.0;",
			"float t = mint;",
			"for (int i=0; i<32; i++)",
			"{",
				"float d = sdf(X + L*t);",
				"if( d<-0.1 )",
				"return h; //t*h;",

				"soft = min( soft, (sharpness*d)*(1./t));",

				"if (t > maxt) break;",
				"t += d * 0.9;",
			"}",
			"return clamp(soft,h,1.0);",
		"}",

		"void main(void)",
		"{",
			"vec3 viewP, viewD;",
			"MakeViewRay(viewP, viewD);",

			"float t = 0.;",
			"float d;",

			"for (int i=0; i<64; i++)",
			"{",
				"vec3 X = viewP + viewD * t;",
				"d = sdf(X);",
				"if (abs(d) < 0.00001) break; //near enough surface for normals to look OK.",

				"#if 1",
				"if (t>20.) //too far - won't converge: just go to ground plane.",
				"{",
					"t = (-viewP.y + floor_height) / (viewD.y);",
					"break;",
				"}",
				"#endif",
				"t += d*0.9; //bounding volumes make the distance a bit wrong so slow down",
			"}",

			"vec3 X = viewP + viewD * t;",
			"vec3 n = nor(X);",

			"//	vec3 c = vec3(i,i,i)*1.0/32.0;",
			"//	vec3 c = vec3(t,t,t);",
			"//	vec3 c = n*0.5+0.5;",

			"vec3 lightDir = normalize(vec3(3,8,2));",

			"#if 1",
			"float ao = Ao(X+n*0.03, n, sdf(n*0.03+X));",
			"lightIntensity *= ao;",
			"#endif",

			"ChooseMat(X);",

			"float sha= 0.2;",
			"//	if (dot(n,lightDir)>0.)",
			"sha = shadow(X,n,lightDir);",
			"lightIntensity *= sha;",

			"#if 0",
			"gl_FragColor = vec4(vec3(sha,sha,sha),1.0);",
			"#else",

			"vec3 c = brdf(lightDir, -viewD, n);",

			"lightDir = normalize(vec3(2,8,-3));",
			"if (dot(n,lightDir)>0.)		sha = shadow(X,n,lightDir);",
			"lightIntensity = ao * 4. * sha;",

			"c += brdf(lightDir, -viewD, n) * vec3(1., 0.,0.7);",

			"vec3 env = vec3(1.5, 0.5, 0.5);",
			"//textureCube(iChannel0,reflect(viewD,n)).xyz;",


			"//	c += c * env * envAmount;",

			"//	c = vec3(ao,ao,ao);",

			"//	c = pow(c, vec3(1./gamma));",

			"//	c = vec3(sha,sha,sha);",

			"//	c = n*0.5+0.5;",

			"gl_FragColor = vec4(c,1.0);",
			"#endif",
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
