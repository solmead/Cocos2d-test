/* File Created: January 3, 2012 */

(function () {
    __jah__.resources["/main.js"] = { data: function (exports, require, module, __filename, __dirname) {
        "use strict"  // Use strict JavaScript mode

        exports.main = function () {

            var cocos = require('cocos2d');   // Import the cocos2d module
            var events = require('events');   // Import the events module
            var geo = require('geometry');  // Import the geometry module
            var ccp = geo.ccp;               // Short hand to create points

            var Scene1 = require('/game/scene1');


            var director = cocos.Director.get('sharedDirector');
            director._showoutlines = true;
            // Attach director to our <div> element
            director.attachInView(document.getElementById('cocos2d-app'));

            director.set('displayFPS', true);


            // Wait for the director to finish preloading our assets
            events.addListener(director, 'ready', function (director) {
                // Create a scene
                var mainScene = Scene1.create();
                director.replaceScene(mainScene);
            });

            // Preload our assets
            director.runPreloadScene();
        };

    }, mimetype: "application/javascript", remote: false
    }; // END: /main.js


})();



