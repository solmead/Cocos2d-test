/* File Created: January 24, 2012 */
/* File Created: January 18, 2012 */
/* File Created: January 10, 2012 */
(function () {
    __jah__.resources["assets/Ground.png"] = {
        data: __jah__.assetURL + "/Ground.png",
        mimetype: "image/png",
        remote: true
    };
    __jah__.resources["assets/GroundGreenBack.png"] = {
        data: __jah__.assetURL + "/GroundGreenBack.png",
        mimetype: "image/png",
        remote: true
    };

    __jah__.resources["/game/ground.js"] = { data: function (exports, require, module, __filename, __dirname) {
        "use strict"  // Use strict JavaScript mode


        var cocos = require('cocos2d');
        var geo = require('geometry');
        var evt = require('events');
        var util = require('util');
        var physicalNode = require('/Physical/PhysicalNode');
        var physicalShapeBox = require('/Physical/PhysicalShapeBox');
        var ccp = geo.ccp;

        var Ground = physicalNode.extend({
            point1: null,
            point2: null,
            sprite: null,
            init: function (opts) {
                Ground.superclass.init.call(this, opts);


                evt.addListener(this, 'point1_changed', util.callback(this, this._updatePoints));
                evt.addListener(this, 'point2_changed', util.callback(this, this._updatePoints));

                if (opts && opts.point1) {
                    this.point1 = opts.point1;
                }

                if (opts && opts.point2) {
                    this.point2 = opts.point2;
                }


                this.set('isStatic', true);
                this._updatePoints();
            },
            _updatePoints: function () {
                if (this.sprite != null) {
                    this.removeChild(this.sprite);
                }
                this.sprite = cocos.nodes.Node.create();
                this.addChild(this.sprite);
                this.shapes = [];
                var p1 = this.point1;
                var p2 = this.point2;
                var xtn = (p2.x - p1.x);
                var ytn = (p2.y - p1.y);
                var atnRadians = Math.atan2(ytn, xtn);
                var atnDegrees = geo.radiansToDegrees(atnRadians);
                var x = 0;
                var d = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
                var sp = null;

                for (x = -d / 2 + 20; x <= d / 2; x = x + 38) {
                    //for (x = 0; x <= d / 2; x = x + 38) {
                    sp = cocos.nodes.Sprite.create({
                        file: 'assets/GroundGreenBack.png'
                    });
                    sp.set('position', ccp(x, 320 / 2));
                    this.sprite.addChild(sp);

                    sp = cocos.nodes.Sprite.create({
                        file: 'assets/Ground.png'
                    });
                    sp.set('position', ccp(x, 0));
                    this.sprite.addChild(sp);
                }


                sp = cocos.nodes.Sprite.create({
                    file: 'assets/GroundGreenBack.png'
                });
                sp.set('position', ccp(d / 2, 320 / 2));
                this.sprite.addChild(sp);

                sp = cocos.nodes.Sprite.create({
                    file: 'assets/Ground.png'
                });
                sp.set('position', ccp(d / 2, 0));
                this.sprite.addChild(sp);

                this.addShape(physicalShapeBox.create({
                    fixedRect: geo.rectMake(-d / 2, 0, d, 1),
                    friction: 1,
                    restitution: 0.1
                }));

                this.set('rotation', atnDegrees);
                this.set('position', ccp((p2.x - p1.x) / 2 + p1.x, (p2.y - p1.y) / 2 + p1.y));

                var size = geo.sizeMake(d, 1);
                //this.set('contentSize', size);

                this.setupBody();
            },
            // ... module methods
            EOF: null
        });
        module.exports = Ground;

    }, mimetype: "application/javascript", remote: false
    }; // END: /main.js


})();