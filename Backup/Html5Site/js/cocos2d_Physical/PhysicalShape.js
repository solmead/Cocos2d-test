/* File Created: January 16, 2012 */

/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/Physical/PhysicalShape.js"] = {
        data: function (exports, require, module, __filename, __dirname) {
            "use strict" // Use strict JavaScript mode
            // Import the cocos2d module
            var cocos = require('cocos2d'),
            // Import the geometry module
                geo = require('geometry'),
            // Import box2d Physics Engine
                box2d = require('box2d');
            var evt = require('events');   // Import the events module
            var util = require('util');
            var ccp = geo.ccp;

            // Create a new layer
            var PhysicalShape = BObject.extend({
                fixDef: null,
                fixture: null,
                parent: null,
                density: 1.0,
                friction: 0.5,
                restitution: 0.9,
                init: function (opts) {
                    PhysicalShape.superclass.init.call(this, opts);

                    //                    evt.addListener(this, 'isStatic_changed', util.callback(this, this._updateIsStatic));
                    evt.addListener(this, 'parent_changed', util.callback(this, this._updateParent));
                    evt.addListener(this, 'density_changed', util.callback(this, this._updateFixture));
                    evt.addListener(this, 'friction_changed', util.callback(this, this._updateFixture));
                    evt.addListener(this, 'restitution_changed', util.callback(this, this._updateFixture));

                    if (opts && opts.density != null) {
                        this.set("density", opts.density);
                    }
                    if (opts && opts.friction != null) {
                        this.set("friction", opts.friction);
                    }
                    if (opts && opts.restitution != null) {
                        this.set("restitution", opts.restitution);
                    }
                },
                getShape: function () {
                    return new box2d.b2CircleShape(Math.random() + 0.1);
                },
                _updateParent: function () {

                },
                physicalScaling: function () {
                    if (parent == null) {
                        return 30;
                    }
                    return this.parent.physicalScaling();
                },
                _updateFixture: function () {
                    if (this.fixture != null) {
                        this.fixture.SetDensity(this.density);
                        this.fixture.SetFriction(this.friction);
                        this.fixture.SetRestitution(this.restitution);
                    } else {
                        this.setupFixtureDef();
                    }
                },
                draw: function (ctx) {
                    
                },
                applyFixture: function (body) {

                    if (this.parent == null) {
                        return;
                    }
                    this.fixture = null;
                    this._updateFixture();
                    this.fixture = body.CreateFixture(this.fixDef);
                },
                setupFixtureDef: function () {
                    if (this.parent == null) {
                        return;
                    }
                    this.fixDef = new box2d.b2FixtureDef;
                    this.fixDef.density = this.density;
                    this.fixDef.friction = this.friction;
                    this.fixDef.restitution = this.restitution;
                    this.fixDef.shape = this.getShape();
                }

            });



            module.exports = PhysicalShape;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();