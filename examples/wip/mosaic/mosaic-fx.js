FX = (function() {

    var M = function(config) {

        this.canvas = document.getElementById(config.canvas);
        this.context = this.canvas.getContext('2d');

        this.tileWidth = (config.tileWidth) ? config.tileWidth : 14;
        this.tileHeight = (config.tileHeight) ? config.tileHeight : 19;
        this.durationMin = (config.duration.min) ? config.duration.min : 250;
        this.durationMax = (config.duration.max) ? config.duration.max : 1000;
        this.delayMin = (config.delay.min) ? config.delay.min : 0;
        this.delayMax = (config.delay.max) ? config.delay.max : 5000;
        this.url = (config.url) ? config.url : '';

        this.loadCompleteCallback = config.callbacks.loadComplete;
        this.transitionStartCallback = config.callbacks.transitionStart;
        this.transitionEndCallback = config.callbacks.transitionEnd;

        this.imgs = [];
        this.index = 0;
        this.total = 0;

        this.remaining = 0;

        this.w = this.canvas.width / this.tileWidth;
        this.h = this.canvas.height / this.tileHeight;

        this.sequence = [];
        this.times = [];

        this.running = false;

        /**
        * @property {Point} _pos - Internal cache var.
        * @private
        */
        this._pos = new Point();

        /**
        * @property {Point} _size - Internal cache var.
        * @private
        */
        this._size = new Point();

        /**
        * @property {Point} _scale - Internal cache var.
        * @private
        */
        this._scale = new Point();

        /**
        * @property {number} _rotate - Internal cache var.
        * @private
        */
        this._rotate = 0;

        /**
        * @property {Object} _alpha - Internal cache var.
        * @private
        */
        this._alpha = { prev: 1, current: 1 };

        /**
        * @property {Point} _anchor - Internal cache var.
        * @private
        */
        this._anchor = new Point();

        this.current = 0;
        this.time = 0;

        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
        window.requestAnimationFrame(this.update.bind(this));

        this.load(config.pics);

    };

    M.prototype = {

        start: function() {

            this.copy(this.imgs[0]);
            this.current = this.imgs[1];
            this.index = 1;

            this.transitionStartCallback.call(this, this, this.current.name);

            this.reset(0);

            this.running = true;

        },

        next: function(pause) {

            pause = pause || 0;

            if (this.running)
            {
                return;
            }

            this.index++;

            if (this.index === this.total)
            {
                this.index = 0;
            }

            this.current = this.imgs[this.index];

            this.transitionStartCallback.call(this, this, this.current.name);

            this.reset(pause);

            this.running = true;

        },

        reset: function(pause) {

            this.sequence = [];
            this.times = [];

            this.w = this.canvas.width / this.tileWidth;
            this.h = this.canvas.height / this.tileHeight;

            var duration = 0;
            var delay = 0;

            for (var y = 0; y < this.h; y++)
            {
                for (var x = 0; x < this.w; x++)
                {
                    duration = this.between(this.durationMin, this.durationMax);
                    delay = this.between(this.delayMin, this.delayMax);

                    var i = 1 / ((duration / 1000) * 60);

                    this.sequence.push( { alpha: 0, rect: new Rectangle(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight) } );
                    this.times.push( { start: this.time + pause + delay, end: this.time + pause + delay + duration, duration: duration, inc: i, delay: delay, started: false, finished: false });
                }
            }

        },

        between: function(min, max) {

            return Math.round((Math.random() * (max - min)) + min);

        },

        update: function(time) {

            this.time = time;

            if (this.running)
            {
                this.draw();
            }

            window.requestAnimationFrame(this.update.bind(this));

        },

        draw: function() {

            var remaining = 0;

            for (var i = 0; i < this.times.length; i++)
            {
                if (this.times[i].finished === false)
                {
                    remaining++;
                }
            }

            if (remaining === 0)
            {
                this.running = false;

                this.transitionEndCallback.call(this, this, this.current.name);
            }
            else
            {
                for (var i = 0; i < this.sequence.length; i++)
                {
                    //  We need to copy the chunk even after finishing
                    if (this.times[i].started)
                    {
                        if (this.sequence[i].alpha < 1)
                        {
                            this.sequence[i].alpha += this.times[i].inc;
                        }

                        this.copyRect(this.current, this.sequence[i].rect, this.sequence[i].rect.x, this.sequence[i].rect.y, this.sequence[i].alpha);

                        if (this.sequence[i].alpha >= 1)
                        {
                            this.times[i].finished = true;
                        }
                    }
                    else
                    {
                        if (this.time >= this.times[i].start)
                        {
                            this.times[i].started = true;
                        }
                    }
                }

            }

        },

        load: function(pics) {

            var _this = this;

            for (var i = 0; i < pics.length; i++)
            {
                this.imgs.push(new Image());

                this.imgs[i].src = this.url + pics[i];
                this.imgs[i].name = pics[i];

                this.imgs[i].onload = function() {

                    _this.total++;

                    if (_this.imgs.length === _this.total)
                    {
                        _this.loadCompleteCallback.call(_this, _this);
                    }

                };
            }

        },

        /**
         * Copies a rectangular area from the source object to the canvas. If you give `null` as the source it will copy from itself.
         * You can optionally resize, translate, rotate, scale, alpha or blend as it's drawn.
         * All rotation, scaling and drawing takes place around the regions center point by default, but can be changed with the anchor parameters.
         *
         * @method copy
         * @param {HTMLImage|HTMLCanvasElement} [source] - The source image to copy from.
         * @param {number} [x=0] - The x coordinate representing the top-left of the region to copy from the source image.
         * @param {number} [y=0] - The y coordinate representing the top-left of the region to copy from the source image.
         * @param {number} [width] - The width of the region to copy from the source image. If not specified it will use the full source image width.
         * @param {number} [height] - The height of the region to copy from the source image. If not specified it will use the full source image height.
         * @param {number} [tx] - The x coordinate to translate to before drawing. If not specified it will default to the `x` parameter.
         * @param {number} [ty] - The y coordinate to translate to before drawing. If not specified it will default to the `y` parameter.
         * @param {number} [newWidth] - The new width of the block being copied. If not specified it will default to the `width` parameter.
         * @param {number} [newHeight] - The new height of the block being copied. If not specified it will default to the `height` parameter.
         * @param {number} [rotate=0] - The angle in radians to rotate the block to before drawing. Rotation takes place around the center by default, but can be changed with the `anchor` parameters.
         * @param {number} [anchorX=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
         * @param {number} [anchorY=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
         * @param {number} [scaleX=1] - The horizontal scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
         * @param {number} [scaleY=1] - The vertical scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
         * @param {number} [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
         * @param {number} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all.
         */
        copy: function (source, x, y, width, height, tx, ty, newWidth, newHeight, rotate, anchorX, anchorY, scaleX, scaleY, alpha, blendMode, roundPx) {

            if (typeof source === 'undefined' || source === null) { source = this.context; }

            this._image = source;

            //  Reset
            this._pos.set(0);
            this._scale.set(1);
            this._anchor.set(0);
            this._rotate = 0;
            this._alpha.current = 1;
            this._size.set(this._image.width, this._image.height);

            //  The source region to copy from
            if (typeof x === 'undefined' || x === null) { x = 0; }
            if (typeof y === 'undefined' || y === null) { y = 0; }

            //  If they set a width/height then we override the frame values with them
            if (width)
            {
                this._size.x = width;
            }

            if (height)
            {
                this._size.y = height;
            }

            //  The destination region to copy to
            if (typeof tx === 'undefined' || tx === null) { tx = x; }
            if (typeof ty === 'undefined' || ty === null) { ty = y; }
            if (typeof newWidth === 'undefined' || newWidth === null) { newWidth = this._size.x; }
            if (typeof newHeight === 'undefined' || newHeight === null) { newHeight = this._size.y; }

            //  Rotation - if set this will override any potential Sprite value
            if (typeof rotate === 'number')
            {
                this._rotate = rotate;
            }

            //  Anchor - if set this will override any potential Sprite value
            if (typeof anchorX === 'number')
            {
                this._anchor.x = anchorX;
            }

            if (typeof anchorY === 'number')
            {
                this._anchor.y = anchorY;
            }

            //  Scaling - if set this will override any potential Sprite value
            if (typeof scaleX === 'number')
            {
                this._scale.x = scaleX;
            }

            if (typeof scaleY === 'number')
            {
                this._scale.y = scaleY;
            }

            //  Effects
            if (typeof alpha === 'number')
            {
                this._alpha.current = alpha;
            }

            if (typeof blendMode === 'undefined') { blendMode = null; }
            if (typeof roundPx === 'undefined') { roundPx = false; }

            if (this._alpha.current <= 0 || this._scale.x === 0 || this._scale.y === 0 || this._size.x === 0 || this._size.y === 0)
            {
                //  Why bother wasting CPU cycles drawing something you can't see?
                return;
            }

            this._alpha.prev = this.context.globalAlpha;

            this.context.save();

            this.context.globalAlpha = this._alpha.current;

            if (blendMode)
            {
                this.context.globalCompositeOperation = blendMode;
            }

            if (roundPx)
            {
                tx |= 0;
                ty |= 0;
            }

            this.context.translate(tx, ty);

            this.context.scale(this._scale.x, this._scale.y);

            this.context.rotate(this._rotate);

            this.context.drawImage(this._image, this._pos.x + x, this._pos.y + y, this._size.x, this._size.y, -newWidth * this._anchor.x, -newHeight * this._anchor.y, newWidth, newHeight);

            this.context.restore();

            this.context.globalAlpha = this._alpha.prev;

        },

        /**
        * Copies the area defined by the Rectangle parameter from the source image to this context at the given location.
        *
        * @method copyRect
        * @param {HTMLImage} source - The Image to copy from.
        * @param {Rectangle} area - The Rectangle region to copy from the source image.
        * @param {number} x - The destination x coordinate to copy the image to.
        * @param {number} y - The destination y coordinate to copy the image to.
        * @param {number} [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
        * @param {number} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all.
        * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
        */
        copyRect: function (source, area, x, y, alpha, blendMode, roundPx) {

            return this.copy(source, area.x, area.y, area.width, area.height, x, y, area.width, area.height, 0, 0, 0, 1, 1, alpha, blendMode, roundPx);

        },

    };

    /**
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
     *
     * @class Point
     * @constructor
     * @param x {Number} position of the point on the x axis
     * @param y {Number} position of the point on the y axis
     */
    Point = function(x, y)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;
    };

    /**
     * Creates a clone of this point
     *
     * @method clone
     * @return {Point} a copy of the point
     */
    Point.prototype.clone = function()
    {
        return new Point(this.x, this.y);
    };

    /**
     * Sets the point to a new x and y position.
     * If y is ommited, both x and y will be set to x.
     * 
     * @method set
     * @param [x=0] {Number} position of the point on the x axis
     * @param [y=0] {Number} position of the point on the y axis
     */
    Point.prototype.set = function(x, y)
    {
        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 ) ;
    };

    Point.prototype.constructor = Point;

    /**
     * The Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
     *
     * @class Rectangle
     * @constructor
     * @param x {Number} The X coord of the upper-left corner of the rectangle
     * @param y {Number} The Y coord of the upper-left corner of the rectangle
     * @param width {Number} The overall width of this rectangle
     * @param height {Number} The overall height of this rectangle
     */
    Rectangle = function(x, y, width, height)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;

        /**
         * @property width
         * @type Number
         * @default 0
         */
        this.width = width || 0;

        /**
         * @property height
         * @type Number
         * @default 0
         */
        this.height = height || 0;
    };

    /**
     * Creates a clone of this Rectangle
     *
     * @method clone
     * @return {Rectangle} a copy of the rectangle
     */
    Rectangle.prototype.clone = function()
    {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };

    /**
     * Checks whether the x and y coordinates passed to this function are contained within this Rectangle
     *
     * @method contains
     * @param x {Number} The X coordinate of the point to test
     * @param y {Number} The Y coordinate of the point to test
     * @return {Boolean} Whether the x/y coords are within this Rectangle
     */
    Rectangle.prototype.contains = function(x, y)
    {
        if (this.width <= 0 || this.height <= 0)
        {
            return false;
        }

        var x1 = this.x;

        if (x >= x1 && x <= x1 + this.width)
        {
            var y1 = this.y;

            if (y >= y1 && y <= y1 + this.height)
            {
                return true;
            }
        }

        return false;
    };

    Rectangle.prototype.constructor = Rectangle;

    return M;

}());

