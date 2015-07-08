
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', this);

function create() {

    var test = [0,1,2,3,4,5,6,7,8,9];

    var total = [0,0,0,0,0,0,0,0,0,0];

    for (var i = 0; i < 1000000; i++)
    {
        rnd = this.game.rnd.weightedPick(test);

        total[rnd]++;
    }

    console.table(total);

}
