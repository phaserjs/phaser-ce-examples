<?php
    //  Global
    $files = dirToArray(dirname(__FILE__));
    $total = 0;

    foreach ($files as $key => $value)
    {
        if (is_array($value) && count($value) > 0)
        {
            $total += count($value);
        }
    }

    function getFile() {

        global $files, $dir, $filename, $title, $code;

        if (isset($_GET['d']) && isset($_GET['f']))
        {
            $dir = urldecode($_GET['d']);
            $filename = urldecode($_GET['d']) . '/' . urldecode($_GET['f']);
            $title = urldecode($_GET['t']);

            if (file_exists($filename))
            {
                $code = file_get_contents($filename);
                $files = dirToArray($dir);
            }
        }

    }

    function dirToArray($dir) { 

        $ignore = array('.', '..', '_site', 'assets', 'gfx', 'states', 'book', 'filters', 'misc', 'golf');
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

    function printJSLinks($dir, $files) {

        $output = "";

        foreach ($files as $key => $value)
        {
            if (is_string($value))
            {
                $value2 = substr($value, 0, -3);
                $file = urlencode($value);

                $output .= "<tr><td><a href=\"wip/index.php?f=$file\">$value2</a></td>";
                $output .= "<td><a href=\"wip/index-lib.php?f=$file\">[ single lib ]</a></td>";
                $output .= "<td><a href=\"wip/index-fs.php?f=$file\">[ full screen ]</a></td>";
                $output .= "<td><a href=\"wip/index-cocoon.php?f=$file\">[ cocoon ]</a></td></tr>";
            }
        }

        return $output;

    }

    /*
<meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />
    */
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        
        <title>phaser</title>
        <base href="../" />
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php
            $path = '/phaser';
            require('../../../phaser/build/config.php');

            if (isset($_GET['f']))
            {
                $f = $_GET['f'];
        ?>
        <script src="wip/<?php echo $f?>" type="text/javascript"></script>
        <?php
            }
        ?>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial;
                font-size: 14px;
            }
        </style>
    </head>
    <body>

        <div id="phaser-example"></div>

        <textarea id="dump" style="width: 300px; height: 300px"></textarea>

        <input type="button" id="start" value="start" />
        <input type="button" id="stop" value="stop" style="margin-left: 32px" />
        <input type="button" id="step" value="step" style="margin-left: 128px"/>

        <div style="padding: 32px">

        <table cellpadding="8">
        <?php
            echo printJSLinks('wip', $files);
        ?>
        </table>

        </div>

        <script type="text/javascript">
            
            var debugSprite = null;

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

        </script>

    </body>
</html>