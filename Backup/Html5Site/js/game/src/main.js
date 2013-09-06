/* File Created: January 16, 2012 */
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
    __jah__.resources["assets/ClearGreenButton.png"] = {
        data: __jah__.assetURL + "/ClearGreenButton.png",
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
            var Physical = require('/Physical');
            var legoMan = require('/game/legoman');
            var ground = require('/game/ground');
            var ccp = geo.ccp;

            // Create a new layer
            var PhysicsDemo = cocos.nodes.Layer.extend({
                selectedBody: null,
                mouseJoint: null,
                man: null,
                pLayer: null,
                init: function () {
                    // You must always call the super class version of init
                    PhysicsDemo.superclass.init.call(this);
                    var s = cocos.Director.get('sharedDirector').get('winSize');
                    this.pLayer = Physical.PhysicalLayer.create();
                    this.set('isMouseEnabled', true);
                    this.addChild(this.pLayer);
                    var size = geo.sizeMake(s.width * 10, s.height);
                    this.set('contentSize', size);
                    this.pLayer.set('contentSize', size);
                    this.demo();
                    this.pLayer.set('gravity', ccp(0, 300));
                    var pos = ccp(s.width / 2 - 100, s.height / 2);
                    pos = ccp(0, 0);
                    this.pLayer.set('position', pos);
                },

                createCrate: function (point, scale) {
                    scale = scale || 1;
                    var sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/crate.jpg'
                        }),
                        shape: Physical.PhysicalShapeBox.create({
                            restitution: 0.2
                        }),
                        position: point,
                        scale: scale / 2
                    });
                    this.pLayer.addChild(sprite);
                },
                createSpecial: function (point, scale) {
                    scale = scale || 1;
                    var sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/crate.jpg'
                        }),
                        shape: Physical.PhysicalShapeBox.create({
                            friction: 0.4,
                            restitution: 0.1
                        }),
                        position: point,
                        scale: scale / 2
                    });
                    this.pLayer.addChild(sprite);
                },

                createBall: function (point, scale) {
                    scale = scale || 1;
                    var sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/ball.png'
                        }),
                        shape: Physical.PhysicalShapeCircle.create({
                            radius: 32,
                            restitution: 0.7
                        }),
                        position: point,
                        scale: scale
                    });
                    this.pLayer.addChild(sprite);
                },
                createBall2: function (point, scale) {
                    scale = scale || 1;
                    var sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: 'assets/ClearGreenButton.png'
                        }),
                        shape: Physical.PhysicalShapeCircle.create({
                            radius: 13,
                            restitution: 0.7
                        }),
                        position: point,
                        scale: scale
                    });
                    this.pLayer.addChild(sprite);
                },

                createWalls: function () {

                    var s = this.contentSize;
                    var sprite = null;
                    sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/crate.jpg'
                        }),
                        shape: Physical.PhysicalShapeBox.create({
                            friction: 0.8,
                            restitution: 0.2
                        }),
                        isStatic: true,
                        position: ccp(0, 0),
                        scaleX: s.width / 32,
                        scaleY: 2 / 32
                    });
                    this.pLayer.addChild({ child: sprite, z: -150 });

                    sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/crate.jpg'
                        }),
                        shape: Physical.PhysicalShapeBox.create({
                            friction: 0.8,
                            restitution: 0.2
                        }),
                        isStatic: true,
                        position: ccp(0, s.height - 2),
                        scaleX: s.width / 32,
                        scaleY: 2 / 32
                    });
                    this.pLayer.addChild({ child: sprite, z: -150 });

                    sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/crate.jpg'
                        }),
                        shape: Physical.PhysicalShapeBox.create({
                            friction: 0.8,
                            restitution: 0.2
                        }),
                        isStatic: true,
                        position: ccp(0, 0),
                        scaleX: 2 / 32,
                        scaleY: s.height / 32
                    });
                    this.pLayer.addChild({ child: sprite, z: -150 });

                    sprite = Physical.PhysicalNode.create({
                        child: cocos.nodes.Sprite.create({
                            file: '/resources/crate.jpg'
                        }),
                        shape: Physical.PhysicalShapeBox.create({
                            friction: 0.8,
                            restitution: 0.2
                        }),
                        isStatic: true,
                        position: ccp((s.width - 2) * 10, 0),
                        scaleX: 2 / 32,
                        scaleY: s.height / 32
                    });
                    this.pLayer.addChild({ child: sprite, z: -150 });
                },
                createGroundAlong: function (gPoints) {
                    var p1 = gPoints[0];

                    for (var n = 1; n < gPoints.length; n++) {
                        var p2 = gPoints[n];

                        var sp = ground.create({
                            point1: p1,
                            point2: p2
                        });
                        this.pLayer.addChild({
                            child: sp,
                            z: -10
                        });

                        p1 = p2;
                    }
                },
                createGround: function () {
                    var BoxSize = 50;
                    var Bottom = 20;

                    var s = this.contentSize;
                    var height = s.height;

                    var gPoints = [ccp(BoxSize * 14, height - (Bottom + BoxSize * 3)),
                        ccp(BoxSize * 18, height - (Bottom + BoxSize * 3)),
                        ccp(BoxSize * 20, height - (Bottom + BoxSize * 4)),
                        ccp(BoxSize * 24, height - (Bottom + BoxSize * 4))
                    ];
                    this.createGroundAlong(gPoints);

                    gPoints = [ccp(0, height - Bottom),
                        ccp(BoxSize * 18, height - Bottom),
                        ccp(BoxSize * 20, height - (Bottom + BoxSize * 1)),
                        ccp(BoxSize * 24, height - (Bottom + BoxSize * 1)),
                        ccp(BoxSize * 28, height - (Bottom + BoxSize * 2)),
                        ccp(BoxSize * 30, height - (Bottom + BoxSize * 2)),
                        ccp(BoxSize * 36, height - Bottom),
                        ccp(BoxSize * 50, height - Bottom),
                        ccp(s.width, height - Bottom)
                    ];

                    this.createGroundAlong(gPoints);
                },
                demo: function () {


                    this.createWalls();

                    this.createGround();


                    //15
                                        for (var i = 0; i < 15; ++i) {
                                            var pos = ccp(Math.random() * 450, Math.random() * 450);
                                            var scale = (Math.random() + 0.5);
                                            scale = 1;
                                            var t = Math.random();
                                            if (t > 0.75) {
                                                this.createCrate(pos, scale);
                                            }
                                            if (t < 0.25) {
                                                this.createBall(pos, scale);
                                            }
                                            if (t >= 0.25 && t <= 0.50) {
                                                this.createBall2(pos, scale);
                                            }
                                            if (t > 0.50 && t <= 0.75) {
                                                this.createSpecial(pos, scale);
                                            }
                                        }

                    this.man = legoMan.create({
                        position: ccp(150, 150)
                    });
                    this.pLayer.addChild(this.man);

                    this.scheduleUpdate();
                },
                update: function (dt) {
                    var s = cocos.Director.get('sharedDirector').get('winSize');
                    this.set('position', ccp(-this.man.position.x + s.width / 2, this.pLayer.position.y));
                    if (this.position.x > 0) {

                        this.set('position', ccp(0, this.pLayer.position.y));
                    }
                },
                mouseDown: function (evt) {
                    var point = evt.locationInCanvas,
                        world = this.pLayer.get('world'),
                        mouseJoint = this.pLayer.get('mouseJoint');
                    point.x = point.x - this.position.x;
                    if (!mouseJoint) {
                        var body = this.pLayer.getBodyAtPoint(point);
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
                        world = this.pLayer.get('world'),
                        mouseJoint = this.get('mouseJoint');
                    point.x = point.x - this.position.x;

                    if (mouseJoint) {
                        mouseJoint.SetTarget(new box2d.b2Vec2(point.x / 30, point.y / 30));
                    }
                },

                mouseUp: function (evt) {
                    var mouseJoint = this.get('mouseJoint'),
                        world = this.pLayer.get('world');

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


                // Wait for the director to finish preloading our assets
                events.addListener(director, 'ready', function (director) {
                    // Create a scene
                    var scene = cocos.nodes.Scene.create();
                    var demo = PhysicsDemo.create();
                    director._showoutlines = true;
                    demo.pLayer.outlineObjects = true;
                    // Add our layer to the scene
                    scene.addChild({ child: demo });
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