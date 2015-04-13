
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('dragon', 'assets/creature/character-dragon.png');
    game.load.json('dragon', 'assets/creature/dragonTest.json');

}

var dragon = null;

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

    dragon = new Phaser.Creature(game, manager, game.world.centerX, game.world.centerY, 'dragon');

    dragon.scale.set(25.0);

    game.world.add(dragon);

}
