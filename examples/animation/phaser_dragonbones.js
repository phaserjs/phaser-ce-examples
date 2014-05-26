var dragonBones;
(function (dragonBones) {
    (function (display) {
        var PhaserDisplayBridge = (function () {
            function PhaserDisplayBridge() {
            }

            PhaserDisplayBridge.prototype.getVisible = function () {
                return this._display ? this._display.visible : false
            };
            PhaserDisplayBridge.prototype.setVisible = function (value) {
                if (this._display) {
                    this._display.visible = value
                }
            };
            PhaserDisplayBridge.prototype.getDisplay = function () {
                return this._display
            };
            PhaserDisplayBridge.prototype.setDisplay = function (value) {
                if (this._display == value) {
                    return
                }
                if (this._display) {
                    var parent = this._display.parent;
                    if (parent) {
                        var index = this._display.parent.getChildIndex(this._display)
                    }
                    this.removeDisplay()
                }
                this._display = value;
                this.addDisplay(parent, index)
            };
            PhaserDisplayBridge.prototype.dispose = function () {
                this._display = null
            };
            PhaserDisplayBridge.prototype.updateTransform = function (matrix, transform) {
                // apply the matrix to the phaser / pixi display object
                this._display.x = matrix.tx;
                this._display.y = matrix.ty;
                this._display.rotation = transform.skewX;
                this._display.scaleX = transform.scaleX;
                this._display.scaleY = transform.scaleY
            };
            PhaserDisplayBridge.prototype.updateColor = function (aOffset, rOffset, gOffset, bOffset, aMultiplier, rMultiplier, gMultiplier, bMultiplier) {
                if (this._display) {
                    this._display.alpha = aMultiplier
                }
            };
            PhaserDisplayBridge.prototype.addDisplay = function (container, index) {
                var parent = container;
                if (parent && this._display) {
                    if (index < 0 || typeof index === "undefined") {
                        parent.addChild(this._display)
                    } else {
                        parent.addChildAt(this._display, Math.min(index, parent.children.length))
                    }
                }
            };
            PhaserDisplayBridge.prototype.removeDisplay = function () {
                if (this._display && this._display.parent) {
                    this._display.parent.removeChild(this._display)
                }
            };
            PhaserDisplayBridge.RADIAN_TO_ANGLE = 180 / Math.PI;
            return PhaserDisplayBridge
        })();
        display.PhaserDisplayBridge = PhaserDisplayBridge
    })(dragonBones.display || (dragonBones.display = {}));
    var display = dragonBones.display;
    (function (textures) {
        var PhaserBonesAtlas = (function () {
            function PhaserBonesAtlas(image, textureAtlasRawData, scale) {
                if (typeof scale === "undefined") {
                    scale = 1
                }
                this._regions = {};
                this.image = image;
                this.scale = scale;
                this.atlasId = textureAtlasRawData.atlasId;
                this.parseData(textureAtlasRawData)
            }

            PhaserBonesAtlas.prototype.dispose = function () {
                this.image = null;
                this._regions = null
            };
            PhaserBonesAtlas.prototype.getRegion = function (subTextureName) {
                return this._regions[subTextureName]
            };
            PhaserBonesAtlas.prototype.parseData = function (textureAtlasRawData) {
                var textureAtlasData = dragonBones.objects.DataParser.parseTextureAtlasData(textureAtlasRawData, this.scale);
                this.name = textureAtlasData.__name;
                delete textureAtlasData.__name;
                for (var subTextureName in textureAtlasData) {
                    this._regions[subTextureName] = textureAtlasData[subTextureName]
                }
            };
            return PhaserBonesAtlas
        })();
        textures.PhaserBonesAtlas = PhaserBonesAtlas
    })(dragonBones.textures || (dragonBones.textures = {}));
    var textures = dragonBones.textures;
    (function (factorys) {
        var PhaserBonesFactory = (function (_super) {
            __extends(PhaserBonesFactory, _super);
            function PhaserBonesFactory() {
                _super.call(this)
            }

            PhaserBonesFactory.prototype._generateArmature = function () {
                var display = dragonBones.game.add.group();
                var armature = new dragonBones.Armature(display);
                return armature
            };
            PhaserBonesFactory.prototype._generateSlot = function () {
                var slot = new dragonBones.Slot(new display.PhaserDisplayBridge());
                return slot
            };
            PhaserBonesFactory.prototype._generateDisplay = function (textureAtlas, frameName, pivotX, pivotY) {
                //get reference to the image object
                var imageRef = textureAtlas.image;
                //create a sprite
                var image = new Phaser.Sprite(dragonBones.game, 0, 0);
                //fetch the id of the atlas image
                var imgName = textureAtlas.atlasId;
                //set the 'key' property
                image.key = imgName;
                //apply the texture
                image.setTexture(imageRef);
                //set the sprite frame from the texture atlas
                image.animations.loadFrameData(image.game.cache.getFrameData(imgName));
                //and the frameName... (restoring the .png that was stripped earlier)
                image.frameName = frameName + ".png";
                //set anchor point
                image.anchor.setTo(pivotX / image.width, pivotY / image.height);
                return image
            };
            return PhaserBonesFactory
        })(factorys.BaseFactory);
        factorys.PhaserBonesFactory = PhaserBonesFactory
    })(dragonBones.factorys || (dragonBones.factorys = {}));
    var factorys = dragonBones.factorys
})(dragonBones || (dragonBones = {}));
/*
* generate a dragonbones atlas out of a TexturePacker JSONArray format atlas
*/
dragonBones.makeBonesAtlas = function (atlasJson, name, partsList) {
    var bonesAtlas = {};
    bonesAtlas.name = name;
    bonesAtlas.SubTexture = [];
    var subTextures = atlasJson.frames;
    var n = partsList.length;
    var k = subTextures.length;
    var partName;
    var txData;
    var filename;
    var subTexture;
    var frame;
    var hasExtension = false;
    for (var i = 0; i < n; i++) {
        partName = partsList[i];
        hasExtension = partName.match(/.png/i) !== null;
        if(hasExtension){
            filename = partName;
            partName = filename.substr(-4);
        } else {
            filename = partName + ".png";
        }
        for (var j = 0; j < k; j++) {
            txData = subTextures[j];
            if (txData.filename === filename) {
                frame = txData.frame;
                subTexture = {name: partName};
                subTexture.x = frame.x;
                subTexture.y = frame.y;
                subTexture.width = frame.w;
                subTexture.height = frame.h;
                bonesAtlas.SubTexture[i] = subTexture;
                break
            }
        }
    }
    return bonesAtlas
};
/*
* utility method to create a phaser armature
*/
dragonBones.makePhaserArmature = function (armatureName, 
                                    skeletonId, 
                                    animationId, 
                                    skeletonData, 
                                    atlasJson,
                                    texture,
                                    partsList,
                                    atlasId) {
    //generate a dragonBones format input data out of the JSONArray atlas
    var textureData = dragonBones.makeBonesAtlas(atlasJson, skeletonId, partsList);
    textureData.atlasId = atlasId;// set the is
    //pass skeleton data to factory
    var factory = new dragonBones.factorys.PhaserBonesFactory();
    factory.addSkeletonData(dragonBones.objects.DataParser.parseSkeletonData(skeletonData));
    //generate atlas from the texture data
    var atlas = new dragonBones.textures.PhaserBonesAtlas(texture, textureData);
    //pass atlas to factory
    factory.addTextureAtlas(atlas);
    // generate the armature
    var armature = factory.buildArmature(armatureName, animationId, skeletonId);
    //link it to the world clock
    dragonBones.animation.WorldClock.clock.add(armature);
    //play the requested timeline
    armature.animation.gotoAndPlay(animationId, 0.2);
    return armature
};