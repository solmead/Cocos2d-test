﻿/* File Created: January 10, 2012 */
(function () {
    __jah__.resources["/game/scene1.js"] = { data: function (exports, require, module, __filename, __dirname) {
        "use strict"  // Use strict JavaScript mode

        var cocos = require('cocos2d')   // Import the cocos2d module
, events = require('events')    // Import the events module
, geo = require('geometry')  // Import the geometry module
, ccp = geo.ccp;               // Short hand to create points

        var GreenItem = require('./greenitem');
        var box = require('./box');

        var Scene1 = cocos.nodes.Scene.extend({
            item1: null,
            item2: null,
            item3: null,
            an: 0.0,
            r: 200.0,
            dir: ccp(1, 1),
            init: function () {
                Scene1.superclass.init.call(this);

                var mainLayer = cocos.nodes.Layer.create();

                var s = cocos.Director.get('sharedDirector.winSize');

                this.item2 = box.create();
                this.item2.set('position', ccp(s.width / 2, s.height / 2));
                mainLayer.addChild(this.item2);

                this.item1 = cocos.nodes.Label.create({ string: "Fun interesting view" });
                this.item1.set('position', ccp(s.width / 2, 8));
                this.item1.tag = "label";
                mainLayer.addChild(this.item1);


                this.item3 = GreenItem.create();
                this.item3.set('position', ccp(150, 200));
                mainLayer.addChild(this.item3);


                this.item1 = GreenItem.create();
                this.item1.set('position', ccp(50, 100));
                mainLayer.addChild(this.item1);


                this.addChild(mainLayer);

                this.scheduleUpdate();
                //this.schedule(this.nextFrame);
            },
            update: function (dt) {

                var Prev = this.item1.position;
                var s = cocos.Director.get('sharedDirector.winSize');
                //        //this.item1.position = this.item1.position.add(ccp(100, 50).multiply(dt).scale(this.dir));
                var bb = this.item1.get('contentSize');
                this.item1.set('position', ccp(this.item1.position.x + 100 * dt * this.dir.x, this.item1.position.y + 50 * dt * this.dir.y));
                if ((this.item1.position.x > s.width - bb.width / 2) || (this.item1.position.x < bb.width / 2)) {
                    this.dir.x = -this.dir.x;
                }
                if ((this.item1.position.y > s.height - bb.height / 2) || (this.item1.position.y < bb.height / 2)) {
                    this.dir.y = -this.dir.y;
                }
                var Cur = this.item1.position;
                var ang = Math.atan2(Prev.y - Cur.y, Prev.x - Cur.x) + Math.PI - Math.PI / 2;
                this.item1.set('rotation',geo.radiansToDegrees(ang));

                this.an = this.an + (dt * Math.PI * 2) / 10.0;
                this.r = this.r - dt * 1;
                Prev = this.item3.position;
                this.item3.position = ccp(Math.sin(this.an) * this.r + s.width / 2, Math.cos(this.an) * this.r + s.height / 2);
                Cur = this.item3.position;
                ang = Math.atan2(Prev.y - Cur.y, Prev.x - Cur.x) + Math.PI - Math.PI / 2;
                this.item3.set('rotation', geo.radiansToDegrees(ang));
                this.item2.set('rotation', this.item3.rotation);
            },
            // ... module methods
            EOF: null
        });

        module.exports = Scene1;

    }, mimetype: "application/javascript", remote: false
    }; // END: /main.js


})();