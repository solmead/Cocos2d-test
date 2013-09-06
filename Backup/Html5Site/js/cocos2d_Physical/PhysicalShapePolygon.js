/* File Created: January 16, 2012 */
/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/Physical/PhysicalShapePolygon.js"] = {
        data: function (exports, require, module, __filename, __dirname) {
            "use strict" // Use strict JavaScript mode

            var geo = require('geometry');
            var box2d = require('box2d');
            var physicalShape = require("/Physical/PhysicalShape");
            var util = require('util');
            var ccp = geo.ccp;

            // Create a new layer
            var PhysicalShapePolygon = physicalShape.extend({
                points: null,
                init: function (opts) {
                    PhysicalShapePolygon.superclass.init.call(this, opts);

                    this.points = [];
                    if (opts) {
                        if (opts.points != null) {
                            this.set("points", opts.points);
                        }
                    }

                },
                addVertex: function (point) {
                    this.points.push(point);
                    this._updatePolygon();
                },
                draw: function (ctx) {
                    var s = Math.min(this.parent.scaleX, this.parent.scaleY);
                    cocos2d.drawPoly(ctx, this.parent.anchorPointInPixels, this.points, "green", 2 / s);
                    PhysicalShapePolygon.superclass.draw.call(this, ctx);
                },
                getShape: function () {
                    var shape = new box2d.b2PolygonShape;
                    var points = [];

                    for (var i = 0; i < this.points.length; i++) {
                        var vec = new box2d.b2Vec2();
                        vec.Set(this.points[i].x / this.physicalScaling() * this.parent.scaleX, this.points[i].y / this.physicalScaling() * this.parent.scaleY);
                        points[i] = vec;
                    }

                    shape.SetAsArray(points, points.length);

                    return shape;
                },
                _updatePolygon: function () {
                    if (this.parent != null) {
                        this.parent.setupBody();
                    }
                }
            });



            module.exports = PhysicalShapePolygon;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();