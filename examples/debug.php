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

    $ignore = array('_site', 'assets', 'states', 'book', '_plugins');

    $path = realpath(dirname(__FILE__));

    //  http://uk1.php.net/manual/en/class.splfileinfo.php

    $directory = new RecursiveDirectoryIterator($path);
    $filter = new RecursiveCallbackFilterIterator($directory, function ($current, $key, $iterator) {

        global $ignore;

        if ($current->isDir())
        {
            $name = $current->getBasename();
            $path = $current->getPath();

            if ($name === 'wip')
            {
                return true;
            }
            else if (strpos($path, 'wip'))
            {
                return false;
            }
            else
            {
                return (array_search($current->getBasename(), $ignore) === false);
            }
        }
        else
        {
            return ($current->getType() === 'file' && $current->getExtension() === 'js');
        }

        return false;

    });

    $iterator = new RecursiveIteratorIterator($filter);

    $examples = [];
    $previous = '';

    foreach ($iterator as $info)
    {
        $section = $info->getPathInfo()->getBasename();

        if ($section !== $previous)
        {
            $examples[$section] = [];
            $previous = $section;

            if (count($examples[$section]) > 0)
            {
                sort($examples[$section]);
            }
        }

        $examples[$section][] = $info->getBasename();

    }

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
        'tilesprite' => true,
        'particlestorm' => true
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
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Phaser Examples - <?php echo $title ?></title>
        <script src="_site/js/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="_site/js/jquery.cookie.js" type="text/javascript"></script>
        <script src="_site/js/RecordRTC.js" type="text/javascript"></script>
        <script src="_site/js/Blob.js" type="text/javascript"></script>
        <script src="_site/js/CanvasToBlob.js" type="text/javascript"></script>
        <script src="_site/js/FileSaver.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href="_site/css/debug.css" />
        <!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"> -->
        <?php
            if ($target == 'div')
            {
                if ($dist === 'php' && in_array($_SERVER['SERVER_NAME'], $config_hosts))
                {
                    $path = $config_phaser_path . '/v2';
                    require($path . '/build/config.php');
                }
                else
                {
                    echo '<script src="_site/phaser/' . $config_phaser_min . '" type="text/javascript"></script>';
                    // echo '<script src="../../phaser/dist/phaser-test.js" type="text/javascript"></script>';
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

                if ($modules['particlestorm'])
                {
                    //  This is only enabled if you have the Phaser ParticleStorm Plugin Source files
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/ParticleStorm.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/Emitter.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/Particle.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/GravityWell.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/Graph.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Base.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Point.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Rectangle.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Circle.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Ellipse.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Line.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Spline.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Text.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/zones/Image.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/controls/Texture.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/controls/Color.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/controls/Transform.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/renderers/Base.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/renderers/Sprite.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/renderers/Pixel.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/renderers/BitmapData.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/renderers/RenderTexture.js\" type=\"text/javascript\"></script>";
                    echo "<script src=\"/phaser-particles-plugin/plugin/src/renderers/SpriteBatch.js\" type=\"text/javascript\"></script>";
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

        <div id="options">

            <div id="optionsForm" class="modform">
        <?php
            foreach ($modules as $module => $modset)
            {
                $c = '';

                if ($modset)
                {
                    $c = 'checked="checked"';
                }

                if ($dist === 'js')
                {
                    $c = 'disabled="disabled"';
                }
        ?>
                <div class="modopt">
                    <input type="checkbox" id="<?php echo $module ?>" value="<?php echo $module ?>" <?php echo $c ?> />
                    <label for="<?php echo $module ?>"><?php echo $module ?></label>
                </div>
        <?php
            }
        ?>
            </div>

            <div id="controls">

                <hr />

                <input type="button" id="start" value="start" class="mini" />
                <input type="button" id="stop" value="stop" class="mini" />
                <input type="button" id="step" value="step" class="mini" />

                <hr />

                <input type="button" id="minimal" value="minimal" />

                <?php
                    if ($dist === 'php')
                    {
                ?>
                <input type="button" id="dist" value="phaser.js" />
                <?php
                    }
                    else
                    {
                ?>
                <input type="button" id="dist" value="config.php" />
                <?php
                    }
                ?>

                <?php
                    if ($target === 'div')
                    {
                ?>
                <input type="button" id="to" value="iframe" />
                <?php
                    }
                    else
                    {
                ?>
                <input type="button" id="to" value="div" />
                <?php
                    }
                ?>

                <!-- <input type="button" id="fs" value="fullscreen" /> -->
                <input type="button" id="grab" value="screen grab (g)" />

                <p>Module Sets:</p>

                <input type="button" id="defcon1" value="default" />
                <input type="button" id="defcon2" value="arcade physics" />
                <input type="button" id="defcon3" value="no physics" />
                <input type="button" id="defcon4" value="minimum" />

                <input type="button" id="optionsSubmit" value="Reload" />

            </div>

        </div>

        <section>

            <div class="clr">
            <?php
                if ($current)
                {
                ?>
                    <div style="display: inline-block; margin: 16px">
                        <div class="exampleTotal"><?php echo count($examples[$current]) ?></div>
                        <a class="example selected" href="debug.php?s=<?php echo $current ?>"><?php echo $current ?></a>
                    </div>

                    <div id="examples">
                <?php
                    foreach ($examples[$current] as $category => $item)
                    {
                        $fcheck = $current . '/' . $item;
                        $url = "debug.php?s=$current&amp;f=$current/$item";
                        $item = substr($item, 0, -3);

                        if ($fcheck === $filename)
                        {
                            echo "<a href=\"$url\" class=\"selected\">$item</a>";
                        }
                        else
                        {
                            echo "<a href=\"$url\">$item</a>";
                        }
                    }
                ?>
                    </div>
                <?php
                }

                $total = 0;
                $keys = array_keys($examples);

                foreach ($keys as $key)
                {
                    $total += count($examples[$key]);

                    if ($current === $key)
                    {
                        continue;
                    }
                ?>
                <div style="display: inline-block; margin: 16px">
                    <div class="exampleTotal"><?php echo count($examples[$key]) ?></div>
                    <a class="example" href="debug.php?s=<?php echo $key ?>"><?php echo $key ?></a>
                </div>
                <?php
                }
                ?>
            </div>


        </section>

        <div id="footer"><?php echo $total ?> Examples - @photonstorm</div>

        <script type="text/javascript" charset="utf-8">
            
            <?php
                if ($filename !== '' && $target === 'div')
                {
                    $src = file_get_contents($filename);
                    echo $src;
                }
            ?>

            $('#step').click(function(){
                game.step();
            });

            $('#start').click(function(){
                game.enableStep();
            });

            $('#stop').click(function(){
                game.disableStep();
            });

            $('#fs').click(function(){
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
                        saveAs(blob, "<?php echo $png ?>");
                    });
                }

            });

            $('#grab').click(function(){

                game.canvas.toBlob(function(blob) {
                    saveAs(blob, "<?php echo $png ?>");
                });

            });

            $('#optionsSubmit').click(function(){

                saveCookies();
                window.location.reload();

            });

            <?php
                $modlist = 'var modules = [';

                foreach ($modules as $module => $modset)
                {
                    $modlist .= "'$module', ";
                }

                $modlist = substr($modlist, 0, -2);
                $modlist .= '];';

                echo $modlist;

            ?>

            $("#minimal").click(function() {

                window.location.href = 'minimal.php?<?php echo $_SERVER['QUERY_STRING'] ?>';

            });

            $("#dist").click(function() {

                console.log($(this).prop('value'));

                if ($(this).prop('value') === 'phaser.js')
                {
                    //  swap to pre-built package
                    $.cookie('dist', 'js', { expires: 7 });
                }
                else
                {
                    //  swap to PHP build
                    $.cookie('dist', 'php', { expires: 7 });
                }

                window.location.reload();

            });

            $("#to").click(function() {

                console.log($(this).prop('value'));

                if ($(this).prop('value') === 'div')
                {
                    //  Swap from iframe to div
                    $.cookie('target', 'div', { expires: 7 });
                }
                else
                {
                    //  Swap from div to iframe
                    $.cookie('target', 'iframe', { expires: 7 });
                }

                window.location.reload();

            });

            function saveCookies() {

                for (var i = 0; i < modules.length; i++)
                {
                    $.cookie(modules[i], $('#' + modules[i]).prop('checked'), { expires: 7 });
                }

            }

            $("#optionsForm input[type='checkbox']").click(function() {
                $.cookie(this.value, $(this).prop('checked'), { expires: 7 });
            });

            //   Default Module set
            $('#defcon1').click(function(){

                $("#optionsForm input[type='checkbox']").each(
                    function() {
                        $(this).prop('checked', true);
                    }
                );
                
                $('#ninja').prop('checked', false);
                $('#box2d').prop('checked', false);
                saveCookies();

            });

            //   Arcade Physics Module set
            $('#defcon2').click(function(){

                $("#optionsForm input[type='checkbox']").each(
                    function() {
                        $(this).prop('checked', true);
                    }
                );
                
                $('#p2').prop('checked', false);
                $('#ninja').prop('checked', false);
                $('#box2d').prop('checked', false);
                saveCookies();

            });

            //   No Physics Module set
            $('#defcon3').click(function(){

                $("#optionsForm input[type='checkbox']").each(
                    function() {
                        $(this).prop('checked', true);
                    }
                );
                
                $('#arcade').prop('checked', false);
                $('#tilemap').prop('checked', false);
                $('#particles').prop('checked', false);
                $('#p2').prop('checked', false);
                $('#ninja').prop('checked', false);
                $('#box2d').prop('checked', false);
                saveCookies();

            });

            //   Minimum Module set
            $('#defcon4').click(function(){

                $("#optionsForm input[type='checkbox']").each(
                    function() {
                        $(this).prop('checked', false);
                    }
                );
                saveCookies();

            });

        </script>

        <?php //print_r($_SERVER) ?>

    </body>
</html>
