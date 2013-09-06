
(function () {
    __jah__.resources["/resources/crate.jpg"] = {
        data: __jah__.assetURL + "/crate.jpg",
        mimetype: "image/png",
        remote: true
    };
    __jah__.resources["/resources/ball.png"] = {
        data: __jah__.assetURL + "/ball.png",
        mimetype: "image/png",
        remote: true
    };

    __jah__.resources["/main.js"] = {
        data: function (exports, require, module, __filename, __dirname) {
            "use strict" // Use strict JavaScript mode
            // Import the cocos2d module
            var cocos = require('cocos2d'),
            // Import the geometry module
                geo = require('geometry'),
            // Import box2d Physics Engine
                box2d = require('box2d');
            var events = require('events');   // Import the events module


            // Create a new layer
            var PhysicsDemo = cocos.nodes.Layer.extend({
                world: null,
                bodies: null,
                selectedBody: null,
                mouseJoint: null,

                init: function () {
                    // You must always call the super class version of init
                    PhysicsDemo.superclass.init.call(this);

                    this.set('isMouseEnabled', true);

                    this.set('bodies', []);

                    // Get size of canvas
                    var s = cocos.Director.get('sharedDirector').get('winSize');

                    this.demo();
                    this.scheduleUpdate();
                },

                createCrate: function (point, scale) {
                    scale = scale || 1;
                    var sprite = cocos.nodes.Sprite.create({ file: '/resources/crate.jpg' });
                    sprite.set('position', point);
                    sprite.set('scale', scale / 2);
                    this.addChild(sprite);
                    return sprite;
                },

                createBall: function (point, scale) {
                    scale = scale || 1;
                    var sprite = cocos.nodes.Sprite.create({ file: '/resources/ball.png' });
                    sprite.set('position', point);
                    sprite.set('scale', scale);
                    this.addChild(sprite);
                    return sprite;
                },

                update: function (dt) {
                    var world = this.get('world'),
                        mouseJoint = this.get('mouseJoint');

                    world.Step(dt, 10, 10);
                    //world.DrawDebugData();
                    world.ClearForces();

                    var bodies = this.get('bodies');
                    for (var i = 0, len = bodies.length; i < len; i++) {
                        var body = bodies[i],
                            pos = body.GetPosition(),
                            angle = geo.radiansToDegrees(body.GetAngle());
                        body.sprite.set('position', new geo.Point(pos.x * 30, pos.y * 30));
                        body.sprite.set('rotation', angle);
                    }
                },

                demo: function () {

                    var s = cocos.Director.get('sharedDirector').get('winSize');
                    var pScale = 30;

                    var world = new box2d.b2World(
                        new box2d.b2Vec2(0, 10), //gravity
                        true                  //allow sleep
                    );
                    this.set('world', world);

                    var fixDef = new box2d.b2FixtureDef;
                    fixDef.density = 1.0;
                    fixDef.friction = 0.1;
                    fixDef.restitution = 0.2;

                    var bodyDef = new box2d.b2BodyDef;

                    //create ground
                    bodyDef.type = box2d.b2Body.b2_staticBody;
                    fixDef.shape = new box2d.b2PolygonShape;
                    fixDef.shape.SetAsBox((s.width / pScale) / 2, (2 / pScale) / 2);

                    bodyDef.position.Set((s.width / 2) / pScale, (s.height + 2) / pScale);
                    world.CreateBody(bodyDef).CreateFixture(fixDef);
                    bodyDef.position.Set((s.width / 2) / pScale, -2 / pScale);
                    world.CreateBody(bodyDef).CreateFixture(fixDef);

                    fixDef.shape.SetAsBox((2 / pScale) / 2, (s.height / pScale) / 2);

                    bodyDef.position.Set(-2 / pScale, (s.height / 2) / pScale);
                    world.CreateBody(bodyDef).CreateFixture(fixDef);
                    bodyDef.position.Set((s.width / pScale), (s.height / 2) / pScale);
                    world.CreateBody(bodyDef).CreateFixture(fixDef);


                    fixDef.density = 1.0;
                    fixDef.friction = 0.05;
                    fixDef.restitution = 1; // 0.2;

                    //create some objects
                    bodyDef.type = box2d.b2Body.b2_dynamicBody;
                    for (var i = 0; i < 15; ++i) {
                        var sprite;
                        bodyDef.position.x = Math.random() * 15;
                        bodyDef.position.y = Math.random() * 15;
                        var scale = (Math.random() + 0.5),
                            width = scale * 32;

                        //scale = 1;
                        //width = 32;

                        if (Math.random() > 0.5) {
                            fixDef.shape = new box2d.b2PolygonShape;
                            fixDef.shape.SetAsBox(width / 30, width / 30);
                            sprite = this.createCrate(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
                        } else {
                            fixDef.shape = new box2d.b2CircleShape(width / 30);
                            sprite = this.createBall(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
                        }

                        var bdy = world.CreateBody(bodyDef);
                        bdy.sprite = sprite;
                        this.get('bodies').push(bdy);
                        bdy.CreateFixture(fixDef);
                    }


                    /*
                    //setup debug draw
                    var debugDraw = new box2d.b2DebugDraw();
                    debugDraw.SetSprite(document.getElementById('debug-canvas').getContext("2d"));
                    debugDraw.SetDrawScale(30.0);
                    debugDraw.SetFillAlpha(0.5);
                    debugDraw.SetLineThickness(1.0);
                    debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
                    world.SetDebugDraw(debugDraw);
                    */
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
                },

                mouseDown: function (evt) {
                    var point = evt.locationInCanvas,
                        world = this.get('world'),
                        mouseJoint = this.get('mouseJoint');

                    if (!mouseJoint) {
                        var body = this.getBodyAtPoint(point);
                        if (body) {
                            var md = new box2d.b2MouseJointDef();
                            md.bodyA = world.GetGroundBody();
                            md.bodyB = body;
                            md.target.Set(point.x / 30, point.y / 30);
                            md.collideConnected = true;
                            md.maxForce = 300.0 * body.GetMass();
                            mouseJoint = world.CreateJoint(md);
                            body.SetAwake(true);
                            this.set('mouseJoint', mouseJoint);
                        }
                    }
                },

                mouseDragged: function (evt) {
                    var point = evt.locationInCanvas,
                        world = this.get('world'),
                        mouseJoint = this.get('mouseJoint');

                    if (mouseJoint) {
                        mouseJoint.SetTarget(new box2d.b2Vec2(point.x / 30, point.y / 30));
                    }
                },

                mouseUp: function (evt) {
                    var mouseJoint = this.get('mouseJoint'),
                        world = this.get('world');

                    if (mouseJoint) {
                        world.DestroyJoint(mouseJoint);
                        this.set('mouseJoint', null);
                    }
                }
            });

            exports.main = function () {
                // Initialise everything

                // Get director
                var director = cocos.Director.get('sharedDirector');

                // Attach director to our <div> element
                director.attachInView(document.getElementById('cocos2d-app'));

                director.set('displayFPS', true);

                director._showoutlines = true;

                // Wait for the director to finish preloading our assets
                events.addListener(director, 'ready', function (director) {
                    // Create a scene
                    var scene = cocos.nodes.Scene.create();

                    // Add our layer to the scene
                    scene.addChild({ child: PhysicsDemo.create() });
                    // Create a scene
                    director.replaceScene(scene);
                });

                // Preload our assets
                director.runPreloadScene();
            };

        },
        mimetype: "application/javascript",
        remote: false
    }; // END: /main.js


})();