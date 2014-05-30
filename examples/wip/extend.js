
MonsterBunny = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'bunny');

};

MonsterBunny.prototype = Object.create(Phaser.Sprite.prototype);
MonsterBunny.prototype.constructor = MonsterBunny;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bunny', 'assets/sprites/bunny.png');

}

function create() {

    var wabbit = new MonsterBunny(game, 200, 300);

    game.add.existing(wabbit);

}
