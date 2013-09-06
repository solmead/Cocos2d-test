/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/Physical/PhysicalNode.js"] = {
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
            var PhysicalNode = cocos.nodes.Node.extend({
                body: null,
                _world: null,
                isStatic: false,
                shapes: null,
                _isUpdating: false,
                velocity: ccp(0, 0),
                angularSpeed: 0,
                lockRotation: false,
                init: function (opts) {
                    PhysicalNode.superclass.init.call(this, opts);
                    this.shapes = [];
                    evt.addListener(this, 'isStatic_changed', util.callback(this, this._updateIsStatic));
                    evt.addListener(this, 'parent_changed', util.callback(this, this._updateWorld));
                    evt.addListener(this, 'scaleX_changed', util.callback(this, this._updateWorld));
                    evt.addListener(this, 'scaleY_changed', util.callback(this, this._updateWorld));
                    evt.addListener(this, 'position_changed', util.callback(this, this._updateBody));
                    evt.addListener(this, 'rotation_changed', util.callback(this, this._updateBody));
                    evt.addListener(this, 'velocity_changed', util.callback(this, this._updateBody));
                    evt.addListener(this, 'angularSpeed_changed', util.callback(this, this._updateBody));
                    this.set('isStatic', !!(opts && opts.isStatic));

                    if (opts && opts.position != null) {
                        this.set("position", opts.position);
                    }
                    if (opts && opts.scale != null) {
                        this.set("scale", opts.scale);
                    }
                    if (opts && opts.scaleX != null) {
                        this.set("scaleX", opts.scaleX);
                    }
                    if (opts && opts.scaleY != null) {
                        this.set("scaleY", opts.scaleY);
                    }
                    if (opts && opts.lockRotation != null) {
                        this.set("lockRotation", opts.lockRotation);
                    }
                    if (opts && opts.child != null) {
                        this.addChild(opts.child);
                    }
                    if (opts && opts.shape != null) {
                        this.addShape(opts.shape);
                    }
                },
                addChild: function (opts) {
                    if (opts.isCocosNode) {
                        return this.addChild({ child: opts, z: -10 });
                    }
                    PhysicalNode.superclass.addChild.call(this, opts);
                    this.set('contentSize', opts.child.contentSize);
                    opts.child.set("position", ccp(opts.child.anchorPointInPixels.x, opts.child.anchorPointInPixels.y));
                },
                _updateIsStatic: function () {
                    this.setupBody();
                },
                _updateBody: function () {
                    if (this._isUpdating) {
                        return;
                    }
                    if (this.body != null) {
                        var vec = new box2d.b2Vec2();
                        vec.Set(this.position.x / this.physicalScaling(), this.position.y / this.physicalScaling());
                        this.body.SetPosition(vec);
                        vec = new box2d.b2Vec2();
                        vec.Set(this.velocity.x / this.physicalScaling(), this.velocity.y / this.physicalScaling());
                        this.body.SetLinearVelocity(vec);
                        this.body.SetAngle(geo.degreesToRadians(this.rotation));
                        this.body.SetAngularVelocity(this.angularSpeed);
                    }
                },
                _updateWorld: function () {
                    if (this._isUpdating) {
                        return;
                    }
                    this.setupBody();
                },
                addShape: function (shape) {
                    this.shapes.push(shape);
                    shape.set("parent", this);
                    this.setupBody();
                },
                draw: function (ctx) {
                    PhysicalNode.superclass.draw.call(this, ctx);

                    if (this.parent.outlineObjects) {
                        util.each(this.shapes, util.callback(this, function (shape) {
                            shape.draw(ctx);
                        }));
                        var mcenter = this.body.GetWorldCenter();
                        var mpos = this.body.GetPosition();
                        var rcent = ccp(mcenter.x - mpos.x, mcenter.y - mpos.y);
                        var an = -geo.degreesToRadians(this.rotation);
                        var ms = Math.sin(an);
                        var mc = Math.cos(an);
                        rcent = ccp(rcent.x * mc - rcent.y * ms, rcent.x * ms + rcent.y * mc);
                        var ap = this.anchorPointInPixels;
                        var mc = ccp(rcent.x * this.physicalScaling() + ap.x, rcent.y * this.physicalScaling() + ap.y);
                        cocos2d.fillCircle(ctx, ap, 4, "blue");
                        cocos2d.fillCircle(ctx, mc, 2, "yellow");
                    }
                },
                setupBody: function () {
                    if (this.parent == null) {
                        return;
                    }
                    this._world = this.parent.world;
                    if (this._world == null) {
                        return;
                    }
                    if (this.body != null) {
                        this._world.DestroyBody(this.body);
                    }
                    var bodyDef = new box2d.b2BodyDef;
                    if (this.isStatic) {
                        bodyDef.type = box2d.b2Body.b2_staticBody;
                    } else {
                        bodyDef.type = box2d.b2Body.b2_dynamicBody;
                    }

                    bodyDef.position.x = this.position.x / this.physicalScaling();
                    bodyDef.position.y = this.position.y / this.physicalScaling();

                    this.set("body", this._world.CreateBody(bodyDef));
                    util.each(this.shapes, util.callback(this, function (shape) {
                        shape.applyFixture(this.body);
                    }));
                    this._updateBody();
                },
                physicalScaling: function () {
                    if (parent == null) {
                        return 30;
                    }
                    return this.parent.physicalScaling;
                },
                updateSprite: function () {
                    this._isUpdating = true;
                    var pos = this.body.GetPosition();
                    var vel = this.body.GetLinearVelocity();
                    var angle = geo.radiansToDegrees(this.body.GetAngle());
                    this.set('position', ccp(pos.x * this.physicalScaling(), pos.y * this.physicalScaling()));
                    if (!this.lockRotation) {
                        this.set('rotation', angle);
                    } else {
                        this.body.SetAngle(geo.degreesToRadians(this.rotation));
                    }
                    this.set('velocity', ccp(vel.x * this.physicalScaling(), vel.y * this.physicalScaling()));
                    this.set('angularSpeed', this.body.GetAngularVelocity());
                    this._isUpdating = false;
                }

            });



            module.exports = PhysicalNode;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();