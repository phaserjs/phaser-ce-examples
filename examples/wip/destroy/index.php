<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Audio Sprite Generator</title>
        <script src="../../_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        ?>
        <style>

        body{
          background: #fff;
          font-family: 'helvetica neue';

        }

        #gamecounter{
          display: block;
          position: absolute;
          bottom: 100%;
          right: 0;
          margin: 10px;
        }

        a[role="button"]{
          position: absolute;
          background-color: black;
          text-align: center;
          left: 50%;
          top: 10px;
          width: 130px;
          margin-left: - (@width / 2);
          display: block;
          padding: 5px;
          cursor: pointer;
          color: white;
          text-transform: uppercase;
          &:active{
            font-weight: bold;
          }
        }

        #gamecontainer{
          position: absolute;
          top: 50%;
          left: 50%;
          height: 300px;
          width: 300px;
          margin-top: - (@height / 2);
          margin-left: - (@width / 2);
          background-color: #a0d3ff;
          border: 1px solid white;
        }

        .phasercontainer{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: 0 0 0 1px solid gold;
        }
        </style>
    </head>
    <body>

<div id="gamecontainer">
  <a role="button" data-action="addGame" style="display: none">start</a>
  <span id="gamecounter"></span>
</div>

<script type="text/javascript">

var $gamecontainer = $('#gamecontainer');

var startedGames = 0;

var createPhaserGame = function(){
  var Phaser = window.Phaser;
  var $phasercontainer = $('<div class="phasercontainer">');
  
  $gamecontainer.append($phasercontainer);

  setTimeout(function(){
    var game = new Phaser.Game(
      $gamecontainer.width(), 
      $gamecontainer.height(), 
      Phaser.AUTO,
      $phasercontainer.get(0), 
      false, 
      false
    );

    var state = {
      preload: function() {
        game.stage.backgroundColor = "B4D455";
      },
      create: function() {
        game.physics.startSystem(window.Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.gravity.y = 1000;
        
        var player = game.add.bitmapData( 50, 50 );
        var rgba = [100, 100, 0, 1];
        player.fill.apply(player, rgba);
        this.player = game.add.sprite( 50, 50, player );
        this.player.physicsBodyType = Phaser.Physics.P2JS;
        game.physics.p2.enable(this.player);
        this.player.body.angularVelocity = 50;

        // game.input.onDown.add(this.touch.down, this);
        // game.input.onUp.add(this.touch.up, this);
        // game.input.addMoveCallback(this.touch.move, this);
        
      },
      update: function() {
        
      },
      touch: {
        down: function(pointer){
          this.xScale = $phasercontainer.outerWidth() / game.world.width;
          this.yScale = $phasercontainer.outerHeight() / game.world.height;
          this.lastPos = [pointer.position.x / this.xScale, pointer.position.y / this.yScale];
        },
        up: function(){
          this.lastPos = undefined;
        },
        move: function(pointer){
          if(!this.lastPos) return;
          var currPos = [pointer.position.x / this.xScale, pointer.position.y / this.yScale];
          var deltaX = currPos[0] - this.lastPos[0];
          this.player.body.x += deltaX;
          this.lastPos = currPos;
        }
      }
    };
    
    game.state.add('main', state);
    game.state.start('main');
    startedGames++;
    $('#gamecounter').html('started games: ' + startedGames);
    
    setTimeout(function(){
      game.destroy();
      game = null;
      console.log(Phaser.GAMES);
      $phasercontainer.remove();
      setTimeout(createPhaserGame, 100);
    }, 4000);
  }, 10);
}

$(function(){
  $('a').hide();
  var interval = setInterval(function(){
    if(window.Phaser){
      clearInterval(interval);
      $('a').show();
    }                    
  }, 10);
  
  $('body').on('click', '[data-action="addGame"]', function(){
    createPhaserGame();
    $('a').hide();
    $('body').off('click');
  });
});

</script>

    </body>
</html>


