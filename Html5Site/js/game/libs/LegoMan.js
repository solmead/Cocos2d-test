/* File Created: January 18, 2012 */
/* File Created: January 10, 2012 */
(function () {
    __jah__.resources["assets/LegoManWalk.png"] = {
        data: __jah__.assetURL + "/LegoManWalk.png",
        mimetype: "image/png",
        remote: true
    };

    __jah__.resources["/game/legoman.js"] = { data: function (exports, require, module, __filename, __dirname) {
        "use strict"  // Use strict JavaScript mode


        var cocos = require('cocos2d');
        var geo = require('geometry');
        var evt = require('events');
        var util = require('util');
        var animatedSprite = require('/AnimatedSprite');
        var physicalNode = require('/Physical/PhysicalNode');
        var physicalShapePolygon = require('/Physical/PhysicalShapePolygon');
        var ccp = geo.ccp;

        var LegoMan = physicalNode.extend({
            animatedSprite: null,
            init: function (opts) {
                LegoMan.superclass.init.call(this, opts);

                this.animatedSprite = animatedSprite.create({
                    frameWidth: 100,
                    frameHeight: 100,
                    framesPerRow: 5,
                    totalFrames: 20,
                    fileName: 'assets/LegoManWalk.png'
                });

                this.addChild(this.animatedSprite);

                this.addShape(physicalShapePolygon.create({
                    points: [ccp(-15, 15),
                        ccp(-20, 0),
                        ccp(-20, -25),
                        ccp(-5, -50),
                        ccp(5, -50),
                        ccp(20, -25),
                        ccp(20, 0),
                        ccp(15, 15),
                        ccp(5, 40),
                        ccp(-5, 40)
                    ],
                    friction: 0.8,
                    restitution: 0.1
                }));
                this.lockRotation = true;
                //this.animatedSprite.playAnimation();
            },
            updateSprite: function () {
                LegoMan.superclass.updateSprite.call(this);
                if (this.velocity.x < -0.5) {
                    this.scaleX = -1;
                    this.animatedSprite.playAnimation();
                }
                if (this.velocity.x > 0.51) {
                    this.scaleX = 1;
                    this.animatedSprite.playAnimation();
                }
                if (Math.abs(this.velocity.x) <= 0.5) {
                    this.animatedSprite.stopAnimation();
                }
            },
            walkLeft: function () {
                this.set('velocity', ccp(-50, this.velocity.y));
            },
            walkRight: function () {
                this.set('velocity', ccp(50, this.velocity.y));
            },
            jump: function () {
                this.set('velocity', ccp(this.velocity.x, 210));
            },
            stand: function () {
                this.set('velocity', ccp(0, this.velocity.y));
            },
            // ... module methods
            EOF: null
        });
        module.exports = LegoMan;

    }, mimetype: "application/javascript", remote: false
    }; // END: /main.js


})();