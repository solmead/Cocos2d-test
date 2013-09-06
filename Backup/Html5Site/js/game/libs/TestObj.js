/* File Created: January 3, 2012 */
(function () {
    __jah__.resources["/game/box.js"] = { data: function (exports, require, module, __filename, __dirname) {
        "use strict"  // Use strict JavaScript mode

var cocos = require('cocos2d')   // Import the cocos2d module
, events = require('events')    // Import the events module
, geo = require('geometry')  // Import the geometry module
, ccp = geo.ccp;               // Short hand to create points

var box = cocos.nodes.Node.extend({
    box: new geo.Rect(0, 0, 100, 100),
    init: function () {
        box.superclass.init.call(this);
        this.set("contentSize", this.box.size);
    },
    draw: function (ctx) {
        cocos2d.fillRect(ctx, this.box, "blue");
    }
});

module.exports = box;


}, mimetype: "application/javascript", remote: false
    }; // END: /main.js


})();