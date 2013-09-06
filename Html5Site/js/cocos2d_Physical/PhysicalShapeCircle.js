/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/Physical/PhysicalShapeCircle.js"] = {
        data: function (exports, require, module, __filename, __dirname) {
            "use strict" // Use strict JavaScript mode

            var geo = require('geometry');
            var box2d = require('box2d');
            var physicalShape = require("/Physical/PhysicalShape");
            var util = require('util');
            var evt = require('events');
            var ccp = geo.ccp;

            // Create a new layer
            var PhysicalShapeCircle = physicalShape.extend({
                radius: 1.0,
                init: function (opts) {
                    PhysicalShapeCircle.superclass.init.call(this, opts);
                    evt.addListener(this, 'radius_changed', util.callback(this, this._updateRadius));
                    if (opts && opts.radius != null) {
                        this.set("radius", opts.radius);
                    }
                },
                draw: function (ctx) {
                    var s = Math.min(this.parent.scaleX, this.parent.scaleY);
                    cocos2d.drawCircle(ctx, this.parent.anchorPointInPixels, this.radius, "green", 2 / s );
                    PhysicalShapeCircle.superclass.draw.call(this, ctx);
                },
                getShape: function () {
                    return new box2d.b2CircleShape(this.radius / this.physicalScaling() * this.parent.scaleX);
                },
                _updateRadius: function () {
                    if (this.parent != null) {
                        this.parent.setupBody();
                    }
                }
            });



            module.exports = PhysicalShapeCircle;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();