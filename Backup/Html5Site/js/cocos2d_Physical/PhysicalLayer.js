/* File Created: January 16, 2012 */
(function () {
    __jah__.resources["/Physical/PhysicalLayer.js"] = {
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


            // Create a new layer
            var PhysicalLayer = cocos.nodes.Layer.extend({
                world: null,
                bodies: null,
                gravity: null,
                outlineObjects: false,
                physicalScaling: 30,
                init: function () {
                    // You must always call the super class version of init
                    PhysicalLayer.superclass.init.call(this);

                    var s = cocos.Director.get('sharedDirector').get('winSize');

                    var world = new box2d.b2World(
                        new box2d.b2Vec2(0, 0), //gravity
                        true                  //allow sleep
                    );
                    this.set('world', world);
                    
                    evt.addListener(this, 'gravity_changed', util.callback(this, this._updategravity));
                    //this.set('isMouseEnabled', true);
                    this.set('gravity', geo.PointZero());
                    this.set('bodies', []);



                    this.scheduleUpdate();
                },
                _updategravity: function () {
                    var g = this.gravity;
                    this.get('world').SetGravity(new box2d.b2Vec2(g.x / this.physicalScaling, g.y / this.physicalScaling));
                },
                addChild: function (opts) {
                    if (opts.isCocosNode) {
                        return this.addChild({ child: opts });
                    }
                    PhysicalLayer.superclass.addChild.call(this, opts);

                },
                removeChild: function (opts) {
                    PhysicalLayer.superclass.removeChild.call(this, opts);

                },
                update: function (dt) {
                    var world = this.get('world');

                    world.Step(dt, 10, 10);
                    //world.DrawDebugData();
                    world.ClearForces();

                    var children = this.get('children');
                    for (var i = 0, len = children.length; i < len; i++) {
                        var child = children[i];
                        child.updateSprite();
                    }
                },


                getBodyAtPoint: function (point) {
                    point = new geo.Point(point.x / 30, point.y / 30);
                    var world = this.get('world');
                    var mousePVec = new box2d.b2Vec2(point.x, point.y);
                    var aabb = new box2d.b2AABB();
                    aabb.lowerBound.Set(point.x - 0.001, point.y - 0.001);
                    aabb.upperBound.Set(point.x + 0.001, point.y + 0.001);


                    var self = this;

                    function getBodyCB(fixture) {
                        if (fixture.GetBody().GetType() != box2d.b2Body.b2_staticBody) {
                            if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                                self.set('selectedBody', fixture.GetBody());
                                return false;
                            }
                        }
                        return true;
                    }


                    // Query the world for overlapping shapes.

                    this.set('selectedBody', null);
                    world.QueryAABB(getBodyCB, aabb);
                    return this.get('selectedBody');
                }

            });

            module.exports = PhysicalLayer;

        },
        mimetype: "application/javascript",
        remote: false
    };
})();
