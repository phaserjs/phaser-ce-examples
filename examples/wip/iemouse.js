function MainState () {
}
MainState.prototype.preload = function() {
};
MainState.prototype.create = function() {
    this.text = this.add.text(this.world.centerX, this.world.centerY, "MouseDown: false", {
        font: "50px Arial",
        fill: "#ffffff",
        align: "center"
    });
    this.text.anchor.set(0.5, 0.5);
};
MainState.prototype.update = function() {

    // this.text.setText(this.input.mousePointer.x);


    if (this.input.activePointer.isDown) { //This state is always false in IE 10 and 11
        this.text.setText("MouseDown: true");
    } else {
        this.text.setText("MouseDown: false");
    }

};

window.onload = function() {
    var game = new Phaser.Game(800, 500, Phaser.CANVAS, 'phaser-example', MainState);
};