/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/Physical/PhysicalShapeBox.js"] = {
        data: function (exports, require, module, __filename, __dirname) {
            "use strict" // Use strict JavaScript mode

            var geo = require('geometry');
            var box2d = require('box2d');
            var physicalShapePolygon = require("/Physical/PhysicalShapePolygon");
            var util = require('util');
            var evt = require('events');
            var ccp = geo.ccp;

            // Create a new layer
            var PhysicalShapeBox = physicalShapePolygon.extend({
                fixedRect: null,
                rectSet: false,
                init: function (opts) {
                    PhysicalShapeBox.superclass.init.call(this, opts);

                    //                    evt.addListener(this, 'isStatic_changed', util.callback(this, this._updateIsStatic));
                    evt.addListener(this, 'fixedRect_changed', util.callback(this, this._updateFixedRect));
                    evt.addListener(this, 'parent_changed', util.callback(this, this._parentChanged));

                    if (opts && opts.fixedRect != null) {
                        this.set("fixedRect", opts.fixedRect);
                        this.rectSet = true;
                    }

                },
                _parentChanged: function () {
                    this._updateFixedRect();
                },
                _updateFixedRect: function () {
                    if (!this.rectSet) {
                        var off = this.parent.anchorPointInPixels;
                        this.fixedRect = geo.rectMake(-off.x, -off.y, this.parent.contentSize.width, this.parent.contentSize.height);
                    }
                    this.addVertex(ccp(this.fixedRect.origin.x, this.fixedRect.origin.y));
                    this.addVertex(ccp(this.fixedRect.origin.x + this.fixedRect.size.width, this.fixedRect.origin.y));
                    this.addVertex(ccp(this.fixedRect.origin.x + this.fixedRect.size.width, this.fixedRect.origin.y + this.fixedRect.size.height));
                    this.addVertex(ccp(this.fixedRect.origin.x, this.fixedRect.origin.y + this.fixedRect.size.height));

                    if (this.parent != null) {
                        this.parent.setupBody();
                    }
                }
            });



            module.exports = PhysicalShapeBox;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();