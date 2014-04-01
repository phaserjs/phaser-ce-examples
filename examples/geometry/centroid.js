// Example: Phaser.Point.centroid
// Author: Lewis 'SEPTiMUS' Lane
// URL: http://www.rotates.org - https://github.com/lewster32
// Instructions: Click to add points. Points can be dragged. Centroid is displayed as a white cross, points as red rings.

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.spritesheet('centroid', 'assets/sprites/centroid.png', 16, 16);
}

var points = [];
var over = false;
var currentPoint;
var centroid;
var inputType;

function create() {

    currentPoint = game.add.image(10, 10, 'centroid');
    currentPoint.anchor.set(0.5);

    currentPoint.alpha = 0.5;

    centroid = game.add.image(10, 10, 'centroid', 1);
    centroid.anchor.set(0.5);
    centroid.visible = false;

    game.input.onTap.add(onTapHandler, this);

}

function onTapHandler() {

    if (!over)
    {
        var img = game.add.sprite(game.input.activePointer.position.x, game.input.activePointer.position.y, 'centroid', 0);

        points.push(img.position);

        img.anchor.set(0.5);
        img.alpha = 0.25;
        img.inputEnabled = true;
        img.input.enableDrag(true);
        img.defaultCursor = "move";

        img.events.onInputOver.add(function() {
            this.alpha = 1;
            this.scale.setTo(1.2, 1.2);
            over = true;
        }, img);

        img.events.onInputOut.add(function() {
            this.alpha = 0.25;
            this.scale.setTo(1, 1);
            over = false;
        }, img);
    }

}

function update() {

    currentPoint.position.copyFrom(game.input.activePointer.position);

    if (points.length > 0)
    {
        var c = Phaser.Point.centroid(points);

        centroid.position.copyFrom(c);

        if (!centroid.visible)
        {
            centroid.visible = true;
        }
    }

}

function render() {

    game.world.forEachAlive(function(child) {
        game.debug.text(Phaser.Math.roundTo(child.x, 0) + "," + Phaser.Math.roundTo(child.y, 0), child.x - 10, child.y + 25, "#ff1e00", "12px Courier");
    });

    if (centroid.visible)
    {
        game.debug.text("Points may be dragged.", 10, 20);
        game.debug.text(Phaser.Math.roundTo(centroid.x, 0) + "," + Phaser.Math.roundTo(centroid.y, 0), centroid.x - 10, centroid.y - 15, "#fff", "bold 12px Courier");
    }
    else
    {
        game.debug.text("Click anywhere to add points.", 10, 20);
    }

}