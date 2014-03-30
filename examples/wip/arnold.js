var Phaser,game;

    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update }, false);

    function preload() {

        game.load.image('arnold', 'wip/arnold-rest.png');  // Image is 209w x 255h

    }

    function create() {
        arnold = game.add.sprite(-167, 561, 'arnold');
        arnold.anchor.setTo(0.5, 0.5);
        game.physics.enable(arnold,Phaser.Physics.ARCADE);
        arnold.anchor.setTo(0.5, 0.5);  // reset anchor point after turning on physics

    }

    function update() {
        var tStartX = -167;
        var tStartY = 561;
        var tCurrX = arnold.x;
        var tCurrY = arnold.y;
        var tCurrBodyX = arnold.body.x;
        var tCurrBodyY = arnold.body.y;
        var tTargetX = -23;
        var tTargetY = 501;
        var tAngleDegrees = -23.347668528091089;
        var tVelocity = 379;
        var tReachedTargetX;
        var tReachedTargetY;

        if (tStartX <= tTargetX) {
            if (tStartY <= tTargetY) {
                //Moving BR
                tReachedTargetX = (tCurrX >= tTargetX);
                tReachedTargetY = (tCurrY >= tTargetY);
            } else {
                // Moving TR
                tReachedTargetX = (tCurrX >= tTargetX);
                tReachedTargetY = (tCurrY <= tTargetY);
            }
        } else {
            if (tStartY <= tTargetY) {
                //Moving BL
                tReachedTargetX = (tCurrX <= tTargetX);
                tReachedTargetY = (tCurrY >= tTargetY);
            } else {
                // Moving TL
                tReachedTargetX = (tCurrX <= tTargetX);
                tReachedTargetY = (tCurrY <= tTargetY);
            }
        }

        if ((tReachedTargetX!==true) || (tReachedTargetY!==true)) {
            console.log("Start: " + tStartX + "," + tStartY + " / Curr: " + tCurrX + "," + tCurrY + " / CurrBody: " + tCurrBodyX + "," + tCurrBodyY + " / " + "Target: " + tTargetX + "," + tTargetY);
            game.physics.arcade.velocityFromAngle(tAngleDegrees, tVelocity, arnold.body.velocity);
        } else {
            arnold.velocity = 0;
            arnold.body.velocity = 0;
        }

    }

    function render() {

    }

    function msgBox(pMsg) {
        game.add.text(0, game.world.height-24, pMsg, {font:"20px Arial",fill:"#000000"});
    }