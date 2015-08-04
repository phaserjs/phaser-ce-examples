<?php
    require('config.php');

    $png = '';
    $filename = '';
    $current = false;
    $title = 'Index';

    if (isset($_GET['s']) && $_GET['s'] !== '')
    {
        $current = $_GET['s'];
        $title = ucfirst($current);
    }
    
    if (isset($_GET['f']) && $_GET['f'] !== '')
    {
        $filename = $_GET['f'];
        $png = str_replace('.js', '.png', $filename);
        $png = str_replace('/', '_', $png);
        $title = $filename;
    }

    $path = realpath(dirname(__FILE__));

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
        'box2d' => false,
        'joystick' => false,
        'creature' => true,
        'video' => true,
        'rope' => true,
        'tilesprite' => true
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

    $target = 'div';

    if (isset($_COOKIE['target']) && $_COOKIE['target'] === 'iframe')
    {
        $target = 'iframe';
    }
?>
<!doctype html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Phaser Examples - <?php echo $title ?></title>
        <?php
            if ($target == 'div')
            {
                if ($dist === 'php' && in_array($_SERVER['SERVER_NAME'], $config_hosts))
                {
                    $path = $config_phaser_path;
                    require($path . '/build/config.php');
                }
                else
                {
                    echo '<script src="_site/phaser/' . $config_phaser_min . '" type="text/javascript"></script>';
                }

                if ($modules['box2d'])
                {
                    //  This is only enabled if you have the Phaser Box2D Plugin Source files
                    echo "<script src=\"/phaser-box2d/src/box2d/box2d-html5.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-box2d/src/plugin/World.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-box2d/src/plugin/Body.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-box2d/src/plugin/PointProxy.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-box2d/src/plugin/DefaultDebugDraw.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-box2d/src/plugin/DefaultContactListener.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-box2d/src/plugin/Polygon.js\" type=\"text/javascript\"></script>";
                }

                if ($modules['joystick'])
                {
                    //  This is only enabled if you have the Phaser Virtual Joystick Plugin Source files
                    echo "<script src=\"/arcadestorm/VirtualJoysticks/plugin/src/Pad.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/arcadestorm/VirtualJoysticks/plugin/src/Stick.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/arcadestorm/VirtualJoysticks/plugin/src/DPad.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/arcadestorm/VirtualJoysticks/plugin/src/Button.js\" type=\"text/javascript\"></script>";
                }
            }
        ?>
    </head>
    <body>

    <?php
        if ($target === 'div')
        {
    ?>
        <div id="phaser-example"></div>
    <?php
        }
        else
        {
    ?>
        <iframe id="phaser-example" width="800" height="600" src="iframe.php?f=<?php echo $filename ?>" style="border: 1px solid #2ab7ec"></iframe>
    <?php
        }
    ?>

        <script type="text/javascript" charset="utf-8">
            
            <?php
                if ($filename !== '' && $target === 'div')
                {
                    $src = file_get_contents($filename);
                    echo $src;
                }
            ?>

        </script>

        <p><a href="debug.php?s=<?php echo $_GET['s']?>&f=<?php echo $_GET['f']?>">Full</a></p>

    </body>
</html>
