var w = window.innerWidth,
    h = window.innerHeight;

var game = new Phaser.Game(w, h, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var sprite;

function preload() {
    //game.load.spritesheet('phone', 'assets/images/frames.png', 530, 520);
    game.load.atlasJSONHash('target', 'wip/footSol_Top_01.png', 'wip/footSol_Top_01.json');
    game.load.image('full', 'wip/footSol_Top_01.png');
    game.load.image('test', 'wip/thrustmap.png');
}

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    // sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'test');
    // sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'target', 'footSol_Top_01_birth_08');
    // sprite.anchor.set(0.5, 0.5);

    var i = game.add.sprite(-1576, -776, 'full');
    // var i = game.add.sprite(0, -0, 'full');
    i.alpha = 0.3;


    sprite = game.add.sprite(0, 0, 'target', 'footSol_Top_01_birth_08');
    // sprite.anchor.set(0.5, 0.5);

/*
"footSol_Top_01_birth_08":
{
    "frame": {"x":1576,"y":776,"w":150,"h":356},
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": {"x":179,"y":0,"w":150,"h":356},
    "sourceSize": {"w":512,"h":512}
},

 */

    console.log(sprite.texture);

    // var frames = Phaser.Animation.generateFrameNames('footSol_Top_01_birth_', 0, 8, '', 2);
    // sprite.animations.add("spawn", frames, 10, false);
    // sprite.animations.play("spawn");

    sprite.inputEnabled = true;
    sprite.input.pixelPerfectOver = true;
    sprite.input.pixelPerfectAlpha = 100;
    sprite.input.useHandCursor = true;

}

function update() {}

function render() {

    game.debug.spriteInputInfo(sprite, 32, 500);

    game.debug.text(sprite.input._dx, 600, 32);
    game.debug.text(sprite.input._dy, 600, 64);

}