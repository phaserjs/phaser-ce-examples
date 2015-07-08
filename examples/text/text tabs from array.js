
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var text;

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

}

function create() {

    game.add.image(0, 0, 'bg');

    var style = { font: "16px Courier", fill: "#fff", tabs: [ 164, 120, 80 ] };

    var headings = [ 'Name', 'Damage', 'Speed', 'Notes' ];

    text = game.add.text(32, 64, '', style);
    text.parseList(headings);

    var swords = [
        [ 'Knife', '1d3', '1', '' ],
        [ 'Dagger', '1d4', '1', 'May be thrown' ],
        [ 'Rapier', '1d6', '2', 'Max strength damage bonus +1' ],
        [ 'Sabre', '1d6', '3', 'Max strength damage bonus +3' ],
        [ 'Cutlass', '1d6', '5', '' ],
        [ 'Scimitar', '2d4', '4', '' ],
        [ 'Long Sword', '1d8+1', '6', '' ],
        [ 'Bastard Sword', '1d10+1', '8', 'Requires 2 hands to use effectively' ],
        [ 'Great Sword', '1d12+1', '10', 'Must always be used with 2 hands']
    ];

    var text2 = game.add.text(32, 120, '', style);
    text2.parseList(swords);

}
