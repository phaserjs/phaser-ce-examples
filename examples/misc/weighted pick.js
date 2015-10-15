
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bg', 'assets/skies/deepblue.png');

}

function create() {

    game.add.image(0, 0, 'bg');

    var test = [0,1,2,3,4,5,6,7,8,9];

    var total = [0,0,0,0,0,0,0,0,0,0];

    for (var i = 0; i < 1000000; i++)
    {
        rnd = this.game.rnd.weightedPick(test);

        total[rnd]++;
    }

    var style = { font: "24px Courier", fill: "#fff", tabs: [ 150 ] };

    var list = [
        ['Value', 'Total' ]
    ];

    for (i = 0; i < total.length; i++)
    {
        list.push([i, total[i]]);
    }

    text = game.add.text(200, 64, '', style);
    text.parseList(list);

}
