<?php
    $files = dirToArray(dirname(__FILE__));
    $total = 0;

    foreach ($files as $key => $value)
    {
        if (is_array($value) && count($value) > 0)
        {
            $total += count($value);
        }
    }

    function dirToArray($dir) { 

        $ignore = array('.', '..', '_site', 'assets', 'states', 'book', 'wip');
        $result = array(); 
        $root = scandir($dir); 
        $dirs = array_diff($root, $ignore);

        foreach ($dirs as $key => $value) 
        { 
            if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
            { 
                $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value); 
            } 
            else 
            {
                if (substr($value, -3) == '.js')
                {
                    $result[] = $value; 
                }
            } 
        } 

        return $result; 
    } 

    function buildSelectList($section) {

        global $files;

        if ($section == false)
        {
            $output = "";
        }
        else
        {
            $output = "        <select id=\"filelist\">";
        }

        if ($section)
        {
            $tempFiles = $files[$section];
        }
        else
        {
            $tempFiles = $files;
        }

        foreach ($tempFiles as $key => $value)
        {
            if (is_array($value)) 
            {
                $output .= "<optgroup label=\"$key\">";
                $output .= buildSelectList($key);
                $output .= "</optgroup>";
            } 
            else 
            {
                $value2 = substr($value, 0, -3);
                $file = urlencode($value);
                $output .= "<option value=\"$section/$file\">$value2</option>";
            } 
        }

        if ($section == false)
        {
            $output = "";
        }
        else
        {
            $output = "        </select>";
        }

        return $output;

    }

    function buildList($section) {

        global $files;

        $output = "";

        if ($section)
        {
            $tempFiles = $files[$section];
        }
        else
        {
            $tempFiles = $files;
        }

        foreach ($tempFiles as $key => $value)
        {
            if (is_array($value)) 
            {
                $output .= "<div class=\"section\">";
                $output .= "<h2>$key</h2>";
                $output .= buildList($key);
                $output .= "</div>";
            } 
            else 
            {
                $value2 = substr($value, 0, -3);
                $file = urlencode($value);
                $output .= "<div class=\"item\"><a href=\"debug.php?f=$section/$file\">$value2</a></div>";
            } 
        }

        return $output;

    }
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser</title>
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <!-- <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" /> -->
        <?php
            $v = "2.1.0";

            if (isset($_GET['phaser']))
            {
                echo "<script src=\"_site/phaser/phaser.{$_GET['phaser']}.min.js\" type=\"text/javascript\"></script>";
            }
            else
            {
                if (($_SERVER['SERVER_NAME'] == '192.168.0.100' || $_SERVER['SERVER_NAME'] == 'localhost'))
                {
                    $path = '../../phaser';
                    require('../../phaser/build/config.php');
                }
                else
                {
                    echo "<script src=\"_site/phaser/phaser.{$v}.min.js\" type=\"text/javascript\"></script>";
                }
            }
        ?>
        <style>
            body {
                font-family: Arial;
                font-size: 14px;
            }

            a {
                color: #0000ff;
                text-decoration: none;
            }

            a:Hover {
                color: #ff0000;
                text-decoration: underline;
            }

            input {
                font-size: 18px;
            }

            h2 {
                padding: 0;
                margin: 8px 0px;
            }

            .section {
                padding: 16px;
                clear: both;
            }

            .section .item {
                float: left;
                padding: 8px;
            }
        </style>
    </head>
    <body>

        <div id="phaser-example"></div>

        <input type="button" id="start" value="start" />
        <input type="button" id="stop" value="stop" style="margin-left: 32px" />
        <input type="button" id="step" value="step" style="margin-left: 128px"/>
        <input type="button" id="fs" value="fullscreen" style="margin-left: 128px"/>

        <?php
            echo buildList(false);
        ?>

        <script type="text/javascript">
            
            $("#filelist").change(function() {
                window.location.href = 'debug.php?f=' + $("#filelist").val();
            });

            var debugSprite = null;

            <?php
                if (isset($_GET['f']))
                {
                    $src = file_get_contents($_GET['f']);
                    echo $src;
                }
            ?>

            $('#step').click(function(){
                console.log('---- STEP', game.stepCount, '-------------------------------');
                game.step();
            });

            $('#start').click(function(){
                console.log('---- START DEBUGGING -------------------------------');

                game.enableStep();

                if (debugSprite)
                {
                    debugSprite.debug = true;
                }
            });

            $('#stop').click(function(){
                console.log('---- STOP DEBUGGING -------------------------------');

                game.disableStep();

                if (debugSprite)
                {
                    debugSprite.debug = false;
                }
            });

            $('#fs').click(function(){

                console.log('---- FULL SCREEN -------------------------------');
            
                if (game.scale.isFullScreen)
                {
                    game.scale.stopFullScreen();
                }
                else
                {
                    game.scale.startFullScreen(false);
                }

            });

        </script>

    </body>
</html>