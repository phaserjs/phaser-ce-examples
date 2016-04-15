<?php
    function getTabs() {
        
        global $tabs;

        $s = "";

        for ($t = 0; $t < $tabs; $t++)
        {
            $s = $s . "\t";
        }

        return $s;

    }

    $pixi = Array();

    $raw = 'Paste ShaderToy code in here';

    $output = "this.fragmentSrc = [\n";
    $output .= "\t\"precision mediump float;\",\n";
    $output .= "\t\"uniform vec3      iResolution;\",\n";
    $output .= "\t\"uniform float     iGlobalTime;\",\n";
    $output .= "\t\"uniform float     iChannelTime[4];\",\n";
    $output .= "\t\"uniform vec4      iMouse;\",\n";
    $output .= "\t\"uniform vec4      iDate;\",\n";
    $output .= "\t\"uniform vec3      iChannelResolution[4];\",\n";
    $output .= "\t\"uniform sampler2D iChannel0;\",\n";
    $output .= "\t\"// add any extra uniforms here\",\n";
    $output .= "\n";

/*
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iGlobalTime;           // shader playback time (in seconds)
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
uniform vec4      iDate;                 // (year, month, day, time in seconds)
uniform float     iSampleRate;           // sound sample rate (i.e., 44100)
*/

    $conv = array('iResolution', 'iGlobalTime', 'iMouse', 'iDate', 'iChannelResolution');

    $tabs = 1;

    if (isset($_POST['shader']))
    {
        $shader = explode("\n", $_POST['shader']);
        $raw = urldecode($_POST['shader']);

        for ($i = 0; $i < count($shader); $i++)
        {
            $pixi[] = trim($shader[$i]);
        }

        //  Tabbing
        for ($i = 0; $i < count($pixi); $i++)
        {
            if ($pixi[$i] == '{')
            {
                $output = $output . getTabs() . '"' . $pixi[$i] . "\",\n";
                $tabs++;
                continue;
            }
            else if ($pixi[$i] == '}')
            {
                $tabs--;
            }

            if ($pixi[$i] == '')
            {
                $output = $output . "\n";
            }
            else
            {
                $output = $output . getTabs() . '"' . $pixi[$i] . "\",\n";
            }
        }

        $output = rtrim($output);

        if (substr($output, -1) == ',')
        {
            $output = substr($output, 0, -1);
        }
    }

    $output .= "];";
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser - ShaderToy Convertor</title>
        <style>
            body {
                font-family: Arial;
                font-size: 14px;
            }
        </style>
    </head>
    <body>

        <h1>ShaderToy to PIXI Convertor</h1>

        <form action="filterconv.php" method="post">

        <h2>Input</h2>
        <textarea name="shader" style="width: 800px; height: 200px"><?php echo $raw ?></textarea>

        <h2>Output</h2>
        <textarea style="width: 800px; height: 400px"><?php echo $output ?></textarea>

        <br />

        <input type="submit" value="Convert" />

        </form>

    </body>
</html>