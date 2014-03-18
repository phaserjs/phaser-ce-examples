
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var content = [
    " ",
    "photon storm presents",
    "a phaser production",
    " ",
    "Kern of Duty",
    " ",
    "directed by rich davey",
    "rendering by mat groves",
    "    ",
    "03:45, November 4th, 2014",
    "somewhere in the north pacific",
    "mission control bravo ...",
];

var text;
var index = 0;
var line = '';

function preload() {
    game.load.image('cod', 'assets/pics/cod.jpg');
}

function create() {

    game.add.sprite(0, 0, 'cod');

    text = game.add.text(32, 380, '', { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });

    nextLine();

}

function updateLine() {

    if (line.length < content[index].length)
    {
        line = content[index].substr(0, line.length + 1);
        // text.text = line;
        text.setText(line);
    }
    else
    {
        //  Wait 2 seconds then start a new line
        game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
    }

}

function nextLine() {

    index++;

    if (index < content.length)
    {
        line = '';
        game.time.events.repeat(80, content[index].length + 1, updateLine, this);
    }

}
