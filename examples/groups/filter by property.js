var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('blue', 'assets/sprites/blue_ball.png');
    game.load.image('red', 'assets/sprites/orb-red.png');
    game.load.image('card', 'assets/sprites/mana_card.png');
    game.load.image('hotdog', 'assets/sprites/hotdog.png');

}

var items;

function create() {

    items = game.add.group();

    //  Add in a bunch of different sprites

    for (var i = 0; i < 10; i++)
    {
        items.create(game.world.randomX, game.world.randomY, 'blue');
        items.create(game.world.randomX, game.world.randomY, 'red');
        items.create(game.world.randomX, game.world.randomY, 'card');
    }

    game.input.onDown.add(pickCard, this);

}

function pickCard() {

    //  Here we'll get the first child from the Group who's "key" value matches "card"
    var card = items.iterate('key', 'card', Phaser.Group.RETURN_CHILD);

    if (card !== null)
    {
        //  We've got a card, so let's turn it into a hotdog
        card.loadTexture('hotdog');
    }

}
