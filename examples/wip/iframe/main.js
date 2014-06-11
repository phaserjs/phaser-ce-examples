var game = new Phaser.Game(760, 1100, Phaser.AUTO, 'game_div');
var overlay, countdownText;
var counter = 0;

var main_state = {
    preload: function() {       
       
    },
    create: function () {
       
        game.stage.disableVisibilityChange = true;

        //game overlay
        overlay = game.add.graphics(0, 0);
        overlay.beginFill(0x00A54F, 0.8);
        overlay.drawRect(0, 0, game.width, game.height);

        countdownText = game.add.text((game.width / 2), (game.height / 2), counter, { font: "65px Arial", fill: "#ffffff", align: "center" });
        countdownText.anchor.set(0.5,0.5);
        
    },

    update: function() {
        countdownText.setText(game.input.resetLocked + ' ' + counter++);
    }
}

game.state.add('main', main_state);  
game.state.start('main');  