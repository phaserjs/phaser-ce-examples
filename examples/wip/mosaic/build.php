<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Mosaic</title>
        <script src="jquery-2.0.3.min.js" type="text/javascript"></script>
        <script src="mosaic-fx.js" type="text/javascript"></script>
    </head>
    <body>

        <canvas id="fx" width="994" height="454" />

        <script type="text/javascript">

            var config = { 
                canvas: 'fx', 
                pics: ['mosaic_guide_Zakiyya.jpg', 'mosaic_guide_Vijan.jpg', 'pic1.jpg', 'pic2.jpg'],
                tileWidth: 14, 
                tileHeight: 19, 
                duration: { min: 250, max: 1000 },
                delay: { min: 0, max: 5000 },
                url: '',
                callbacks: {
                    loadComplete: onLoad,
                    transitionStart: startTransition,
                    transitionEnd: endTransition
                }
            };

            function onLoad(fx) {

                fx.start();

            }

            function startTransition(fx, img) {

                console.log('Starting to display', img);

                //  Note - you can change any of the transition parameters at this point, they will take effect in time to influence this transition

                //  fx.tileWidth
                //  fx.tileHeight
                //  fx.durationMin
                //  fx.durationMax
                //  fx.delayMin
                //  fx.delayMax

                //  Note: If you want a fixed duration for ALL tiles simply set the min and max values to be the same

                // fx.durationMin = fx.between(500, 100);
                // fx.durationMax = fx.between(100, 10000);

            }

            function endTransition(fx, img) {

                console.log('Ending display of', img);

                //  Move onto the next one - the value given here is how long (in milliseconds) to wait until starting the next transition
                fx.next(1000);
                
            }

            var fx = new FX(config);

        </script>

    </body>
</html>