<?php
    $files = dirToArray(dirname(__FILE__));
    $total = 0;
    $sections = array();

    $current_section = false;

    if (isset($_GET['s']) && trim($_GET['s']) !== '')
    {
        $current_section = $_GET['s'];
    }

    $filename = '';

    if (isset($_GET['f']))
    {
        $current_file = $_GET['f'];
        $current_file = substr($current_file, strpos($current_file, '/') + 1);
        $filename = $_GET['f'];
        $filename = str_replace('/', '-', $filename);
        $filename = str_replace('.js', '.png', $filename);
    }

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
        global $sections;
        global $current_section;
        global $current_file;

        $output = "";

        if ($section)
        {
            $tempFiles = $files[$section];
        }
        else
        {
            $tempFiles = $files;
        }

        $ignore = array('dragonBones.js' => false, 'phaser_dragonbones.js' => false);

        foreach ($tempFiles as $key => $value)
        {
            if (is_array($value)) 
            {
                $sections[] = $key;

                $output .= "<div class=\"section\">";

                if ($current_section === $key)
                {
                    $output .= "<a href=\"debug.php?s=$key\" class=\"sectionHeadC\">$key</a><br clear=\"all\" />";
                }
                else
                {
                    $output .= "<a href=\"debug.php?s=$key\" class=\"sectionHead\">$key</a>";
                }

                $output .= buildList($key);
                $output .= "</div>";

                if ($current_section === $key)
                {
                    $output .= "<br clear=\"all\" />";
                }
            } 
            else 
            {
                if ($current_section === false || $current_section === $section)
                {
                    $value2 = substr($value, 0, -3);
                    $file = urlencode($value);

                    if (!array_key_exists($value, $ignore))
                    {
                        // $output .= "<div class=\"item\"><a href=\"debug.php?f=$section/$file\">$value2</a></div>";

                        if ($value === $current_file)
                        {
                            $output .= "<div class=\"itemC\"><a href=\"debug.php?s=$section&amp;f=$section/$file\">$value2</a></div>";
                        }
                        else
                        {
                            $output .= "<div class=\"item\"><a href=\"debug.php?s=$section&amp;f=$section/$file\">$value2</a></div>";
                        }
                    }
                }
            } 
        }

        return $output;

    }
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser - <?php echo $current_file ?></title>
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="_site/js/Blob.js" type="text/javascript"></script>
        <script src="_site/js/CanvasToBlob.js" type="text/javascript"></script>
        <script src="_site/js/FileSaver.js" type="text/javascript"></script>
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

            .sectionHead,
            .sectionHeadC {
                color: #f7f024;
                float: left;
                width: 200px;
                height: 28px;
                background-color: #47aede;
                border: 1px solid #1b79a5;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
                padding-top: 4px;
                margin: 4px;
            }

            .sectionHeadC {
                background-color: #de47ae;
                border: 1px solid #a51b79;
            }

            .section .item {
                float: left;
                padding: 8px;
            }

            .section .itemC {
                float: left;
                padding: 8px;
                background-color: #de47ae;
                border: 1px solid #a51b79;
            }

        </style>
    </head>
    <body>

        <div id="phaser-example"></div>

        <input type="button" id="start" value="start" />
        <input type="button" id="stop" value="stop" style="margin-left: 32px" />
        <input type="button" id="step" value="step" style="margin-left: 128px"/>
        <input type="button" id="fs" value="fullscreen" style="margin-left: 128px"/>
        <input type="button" id="grab" value="screen [g]rab" style="margin-left: 128px"/>

        <?php
            echo buildList(false);
        ?>

        <script type="text/javascript">
            
            // $("#filelist").change(function() {
            //     window.location.href = 'debug.php?f=' + $("#filelist").val();
            // });

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

            $(window).keydown(function(event) {

                //  Press G to capture
                if (event.which === 71)
                {
                    game.canvas.toBlob(function(blob) {
                        saveAs(blob, "<?php echo $filename ?>");
                    });
                }

            });

            $('#grab').click(function(){

                game.canvas.toBlob(function(blob) {
                    saveAs(blob, "<?php echo $filename ?>");
                });

            });

        </script>

    </body>
</html>