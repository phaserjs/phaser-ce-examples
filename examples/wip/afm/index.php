<?php
    if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
    {
        $files = dirToArray('../../assets/fonts/arcadeFonts/8x8/');
    }
    else
    {
        $files = dirToArray('assets/fonts/arcadeFonts/8x8/');
    }

    $total = 0;

    function dirToArray($dir) { 

        global $total;

        $ignore = array('.', '..', 'Thumbs.db');
        $result = array(); 
        $root = scandir($dir); 
        $dirs = array_diff($root, $ignore);

        foreach ($dirs as $key => $value) 
        { 
            if (substr($value, -4) === '.png')
            {
                $result[] = $value; 
                $total++;
            }
        } 

        return $result; 
    }

    function printJSLinks($files) {

        $output = "";

        foreach ($files as $key => $value)
        {
            if (is_string($value))
            {
                $value2 = substr($value, 0, -4);
                // $file = urlencode($value);
                if ($value2 == 'Ninja Gaiden (Tecmo)')
                {
                    $output .= "<option selected=\"selected\">$value2</option>\n";
                }
                else
                {
                    $output .= "<option>$value2</option>\n";
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
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <title>Arcade Font Writer</title>
        <meta name="description" content="Create your own text using hundreds of fonts from classic Arcade games" />
        <meta name="keywords" content="html5, png, arcade, retro, video, taito, namco, atari, snk, capcom, konami" />
        <meta name="author" content="Photon Storm" />
        <link rel="shortcut icon" href="favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" type="text/css" href="css/spectrum.css" />
        <script src="js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="js/spectrum.js" type="text/javascript"></script>
        <script src="js/blob.js" type="text/javascript"></script>
        <script src="js/canvas-to-blob.js" type="text/javascript"></script>
        <script src="js/file-saver.js" type="text/javascript"></script>
        <?php
            if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
            {
                $path = '/phaser';
                require('../../../../phaser/build/config.php');
            }
            else
            {
    ?>
        <script src="js/phaser-arcade-physics.min.js"></script>
    <?php
            }
        ?>
        <script src="js/arcade-font-writer.js" type="text/javascript"></script>
    </head>
    <body>

        <div class="container">

            <section class="main">
                <div class="example-wrapper clearfix">

                    <h3><span id="fontTitle">Arcade Font Writer</span> <span style="margin: 0px 16px; color: #3f3b3b">///</span> style: <span id="currentStyle">&lt; 1</span> of <span id="totalStyles">5 &gt;</span> <select style="float: right" id="font"><?php echo printJSLinks($files); ?></select></h3>

                    <div id="controls" class="demo-wrapper" align="center">

                        <div id="afm" class="drop-shadow bottom" style="margin-bottom: 16px"></div>

                        background: 
                        <input type="text" id="picker" />

                        <div style="display: inline-block; width: 32px"></div>

                        zoom: 
                        <div id="zoomIn" class="modern">+</div>
                        <div id="zoomOut" class="modern pad">&minus;</div>

                        horizontal: 
                        <div id="addSpacing" class="modern">+</div>
                        <div id="removeSpacing" class="modern pad">&minus;</div>

                        vertical: 
                        <div id="addLineHeight" class="modern">+</div>
                        <div id="removeLineHeight" class="modern pad">&minus;</div>

                        <div style="display: inline-block; width: 32px"></div>

                        <div id="savePNG" class="modern">save</div>

                        <div id="dudes"><img src="images/dudesx2.png" /></div>

                    </div>
                    <pre class="code-wrapper"><code>
UP:   Next Style                   LEFT:  Previous Font                 Built in
DOWN: Previous Style               RIGHT: Next Font                     <a href="http://phaser.io" class="inline-link-2">Phaser 2</a>
                    </code>
                    </pre>
                </div>

                <div align="center">Created by <a href="https://twitter.com/photonstorm/" class="inline-link-1">@photonstorm</a></div>
                <div align="center" style="margin-top: 10px">Based on <a href="http://nfggames.com/games/fontmaker/" class="inline-link-1">Arcade Font Engine</a> by <a href="https://twitter.com/NFG/" class="inline-link-1">@NFG</a></div>

        </div>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-1972437-4', 'photonstorm.com');
  ga('send', 'pageview');

</script>

    </body>
</html>