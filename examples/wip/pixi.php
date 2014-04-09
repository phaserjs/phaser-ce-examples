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

                $output .= "<tr><td><a href=\"wip/pixi.php?f=$file\">$value2</a></td></tr>";
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
        
        <title>pixi</title>
        <base href="../" />
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/Pixi.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/core/Point.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/core/Rectangle.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/core/Polygon.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/core/Circle.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/core/Ellipse.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/core/Matrix.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/display/DisplayObject.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/display/DisplayObjectContainer.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/display/Sprite.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/display/SpriteBatch.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/display/MovieClip.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/FilterBlock.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/text/Text.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/text/BitmapText.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/InteractionData.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/InteractionManager.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/display/Stage.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/utils/Utils.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/utils/EventTarget.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/utils/Detector.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/utils/Polyk.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLShaderUtils.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/shaders/PixiShader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/shaders/PixiFastShader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/shaders/StripShader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/shaders/PrimitiveShader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLGraphics.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/WebGLRenderer.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLMaskManager.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLShaderManager.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLSpriteBatch.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLFastSpriteBatch.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/WebGLFilterManager.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/webgl/utils/FilterTexture.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/canvas/utils/CanvasMaskManager.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/canvas/utils/CanvasTinter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/canvas/CanvasRenderer.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/renderers/canvas/CanvasGraphics.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/primitives/Graphics.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/extras/Strip.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/extras/Rope.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/extras/TilingSprite.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/extras/Spine.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/textures/BaseTexture.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/textures/Texture.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/textures/RenderTexture.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/AssetLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/JsonLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/AtlasLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/SpriteSheetLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/ImageLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/BitmapFontLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/loaders/SpineLoader.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/AbstractFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/AlphaMaskFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/ColorMatrixFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/GrayFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/DisplacementFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/PixelateFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/BlurXFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/BlurYFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/BlurFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/InvertFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/SepiaFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/TwistFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/ColorStepFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/DotScreenFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/CrossHatchFilter.js" type="text/javascript"></script>
        <script src="../../photonstorm-pixi.js/src/pixi/filters/RGBSplitFilter.js" type="text/javascript"></script>
        <?php
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

        <input type="button" id="start" value="start" />
        <input type="button" id="stop" value="stop" style="margin-left: 32px" />
        <input type="button" id="step" value="step" style="margin-left: 128px"/>

        <div style="padding: 32px">

        <table cellpadding="8">
        <?php
            // echo printJSLinks('wip', $files);
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