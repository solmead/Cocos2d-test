/* File Created: January 10, 2012 */
(function () {
    __jah__.resources["assets/ClearGreenButton.png"] = {
        data: __jah__.assetURL + "/ClearGreenButton.png",
        mimetype: "image/png",
        remote: true
    };

    __jah__.resources["/game/greenitem.js"] = { data: function (exports, require, module, __filename, __dirname) {
        "use strict"  // Use strict JavaScript mode

        var cocos = require('cocos2d')   // Import the cocos2d module
, events = require('events')    // Import the events module
, geo = require('geometry')  // Import the geometry module
, ccp = geo.ccp;               // Short hand to create points

        var GreenItem = cocos.nodes.Sprite.extend({
            init: function () {
                GreenItem.superclass.init.call(this, { file: 'assets/ClearGreenButton.png' });
                //this.loadWithFile("../images/ClearGreenButton.png");
                //this.position = ccp(150, 200);
            },
            draw: function (ctx) {
                GreenItem.superclass.draw.call(this, ctx);
            },
            // ... module methods
            EOF: null
        });
        module.exports = GreenItem;

    }, mimetype: "application/javascript", remote: false
    }; // END: /main.js


})();