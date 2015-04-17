
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('dragon', 'assets/creature/character-dragon.png');
    game.load.json('dragon', 'assets/creature/dragonTest.json');

}

var dragon1 = null;
var dragon2 = null;

function create() {

    var meshData = game.cache.getJSON('dragon');

    var creature = new Creature(meshData);

    var animation = new CreatureAnimation(meshData, "default", creature);

    var manager = new CreatureManager(creature);

    manager.AddAnimation(animation);
    manager.SetActiveAnimationName("default", false);
    manager.SetShouldLoop(true);
    manager.SetIsPlaying(true);
    manager.RunAtTime(0);

    dragon1 = new Phaser.Creature(game, manager, 0, 200, 'dragon');
    dragon1.scale.set(5.0);
    dragon1.timeDelta = 0.05;
    game.world.add(dragon1);

    dragon2 = new Phaser.Creature(game, manager, 0, 400, 'dragon');
    dragon2.scale.set(9.0);
    dragon2.timeDelta = 0.1;
    game.world.add(dragon2);

}

function update() {

    dragon1.x += 2;

    if (dragon1.x > 900)
    {
        dragon1.x = -100;
    }

    dragon2.x += 3;

    if (dragon2.x > 900)
    {
        dragon2.x = -100;
    }

}