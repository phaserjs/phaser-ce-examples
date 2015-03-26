<?php
    $filename = $_GET['f'];

    $modules = array(
        'debug' => true,
        'keyboard' => true,
        'gamepad' => true,
        'bitmapdata' => true,
        'graphics' => true,
        'rendertexture' => true,
        'text' => true,
        'bitmaptext' => true,
        'retrofont' => true,
        'tweens' => true,
        'sound' => true,
        'particles' => true,
        'tilemap' => true,
        'arcade' => true,
        'p2' => true,
        'ninja' => false,
        'box2d' => false
    );

    foreach ($modules as $module => $modset)
    {
        if (isset($_COOKIE[$module]))
        {
            if ($_COOKIE[$module] === 'true')
            {
                $modules[$module] = true;
            }
            else if ($_COOKIE[$module] === 'false')
            {
                $modules[$module] = false;
            }
        }
    }

    $dist = 'php';

    if (isset($_COOKIE['dist']) && $_COOKIE['dist'] === 'js')
    {
        $dist = 'js';
    }
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Phaser Example</title>
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="_site/js/jquery.cookie.js" type="text/javascript"></script>
        <?php
            if ($dist === 'php' && ($_SERVER['SERVER_NAME'] == '192.168.0.100' || $_SERVER['SERVER_NAME'] == 'localhost'))
            {
                $path = '../../phaser';
                require('../../phaser/build/config.php');
            }
            else
            {
                echo "<script src=\"_site/phaser/phaser.2.2.2.min.js\" type=\"text/javascript\"></script>";
            }

            if ($modules['box2d'])
            {
                echo "<script src=\"/phaser-box2d/src/box2d/box2d-html5.js\" type=\"text/javascript\"></script>";
                echo "<script src=\"/phaser-box2d/src/plugin/World.js\" type=\"text/javascript\"></script>";
                echo "<script src=\"/phaser-box2d/src/plugin/Body.js\" type=\"text/javascript\"></script>";
                echo "<script src=\"/phaser-box2d/src/plugin/PointProxy.js\" type=\"text/javascript\"></script>";
                echo "<script src=\"/phaser-box2d/src/plugin/DefaultDebugDraw.js\" type=\"text/javascript\"></script>";
                echo "<script src=\"/phaser-box2d/src/plugin/DefaultContactListener.js\" type=\"text/javascript\"></script>";
                echo "<script src=\"/phaser-box2d/src/plugin/Polygon.js\" type=\"text/javascript\"></script>";
            }
        ?>
        <style>
            body {
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    <body>

        <div id="phaser-example"></div>

        <script type="text/javascript">
            
            <?php
                if ($filename !== '')
                {
                    $src = file_get_contents($filename);
                    echo $src;
                }
            ?>

            $(document).ready(function(){
                // window.focus();
            });

        </script>

    </body>
</html>
