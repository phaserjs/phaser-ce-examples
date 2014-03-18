var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('item', 'assets/buttons/number-buttons-90x90.png', 90, 90);

}

// Left and right groups
var left
var right;

// The first selected item.
var selected = null;

var leftText;
var rightText;

function create() {

    left = game.add.group();
    right = game.add.group();

    var item;

    for (var i = 0; i < 3; i++)
    {
        // Directly create sprites from the left group.
        item = left.create(290, 98 * (i + 1), 'item', i);

        // Enable input
        item.inputEnabled = true;
        item.events.onInputUp.add(select);

        // Add another to the right group.
        item = right.create(400, 98 * (i + 1), 'item', i + 3);

        // Enable input.
        item.inputEnabled = true;
        item.events.onInputUp.add(select);
    }

    leftText = game.add.text(290, 20, '', { font: '14px Arial', fill: '#fff' });
    rightText = game.add.text(400, 20, '', { font: '14px Arial', fill: '#fff' });

    leftText.text = "Left Group\nTotal: " + left.total;
    rightText.text = "Right Group\nTotal: " + right.total;

    game.add.text(260, 450, 'Click one item, then another to replace it', { font: '14px Arial', fill: '#fff' });

}

function select (item, pointer) {

    if (!selected)
    {
        selected = item;
        selected.alpha = 0.5;
    }
    else
    {
        if (selected.parent !== item.parent)
        {
            game.add.tween(item).to( { x: selected.x, y: selected.y }, 500, Phaser.Easing.Quartic.Out, true);
            selected.parent.replace(selected, item);
            selected.inputEnabled = false;

            leftText.text = "Left Group\nTotal: " + left.total;
            rightText.text = "Right Group\nTotal: " + right.total;
        }
        else
        {
            selected.alpha = 1;
        }

        // After checking, now clear the helper var.
        selected = null;
    }
    
}
