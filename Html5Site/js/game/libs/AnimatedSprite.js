/* File Created: January 18, 2012 */


/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/AnimatedSprite.js"] = {
        data: function (exports, require, module, __filename, __dirname) {
            "use strict" // Use strict JavaScript mode

            var cocos = require('cocos2d');
            var geo = require('geometry');
            var evt = require('events');
            var util = require('util');
            var ccp = geo.ccp;


            // Create a new layer
            var AnimatedSprite = cocos.nodes.Node.extend({
                IsAnimating: false,
                animation: null,
                frameWidth: 1,
                frameHeight: 1,
                framesPerRow: 1,
                totalFrames: 0,
                sprite: null,
                walkAction: null,
                fileName: "",
                texture: null,
                textureAtlas: null,
                playAnimation: function () {
                    if (!this.isAnimating) {
                        this.isAnimating = true;
                        this.sprite.runAction(this.walkAction);
                    }
                },
                stopAnimation: function () {
                    if (this.isAnimating) {
                        this.isAnimating = false;
                        this.sprite.stopAllActions();
                    }
                },
                init: function (opts) {
                    AnimatedSprite.superclass.init.call(this);

                    if (opts && opts.frameWidth) {
                        this.frameWidth = opts.frameWidth;
                    }
                    if (opts && opts.frameHeight) {
                        this.frameHeight = opts.frameHeight;
                    }
                    if (opts && opts.framesPerRow) {
                        this.framesPerRow = opts.framesPerRow;
                    }
                    if (opts && opts.totalFrames) {
                        this.totalFrames = opts.totalFrames;
                    }
                    if (opts && opts.fileName) {
                        this.fileName = opts.fileName;
                    }
                    if (opts && opts.texture) {
                        this.texture = opts.texture;
                    }
                    this.textureAtlas = cocos.TextureAtlas.create({ file: this.fileName, texture: this.texture });
                    this.texture = this.textureAtlas.texture;

                    var frames = [];
                    for (var i = 0; i < this.totalFrames; i++) {
                        var x = parseInt(i % this.framesPerRow) * this.frameWidth;
                        var y = parseInt(i / this.framesPerRow) * this.frameHeight;
                        var rect = geo.rectMake(x, y, this.frameWidth, this.frameHeight);
                        frames.push(
                            cocos.SpriteFrame.create({
                                texture: this.texture,
                                rect: rect
                            }));
                    }

                    this.animation = cocos.Animation.create({
                        frames: frames,
                        delay: 0.05
                    });

                    var walkCycle = cocos.actions.Animate.create({
                        animation: this.animation,
                        duration: 0.05 * this.totalFrames
                    });

                    this.walkAction = cocos.actions.RepeatForever.create(walkCycle);

                    this.sprite = cocos.nodes.Sprite.create({
                        frame: this.animation.frames[0]
                    });
                    this.addChild(this.sprite);

                    this.set('contentSize', geo.sizeMake(this.frameWidth, this.frameHeight));

                    this.sprite.set("position", ccp(this.sprite.anchorPointInPixels.x, this.sprite.anchorPointInPixels.y));


                    this.sprite.runAction(this.walkAction);
                }

            });

            module.exports = AnimatedSprite;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();
