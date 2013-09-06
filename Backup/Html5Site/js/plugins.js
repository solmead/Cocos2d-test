
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};



// place any jQuery/helper plugins in here, instead of separate, slower script files.

Modernizr.load({
  test: Modernizr.canvas,
  nope: '../js/libs/excanvas.js',
  complete: function () {
    //Modernizr.load('../js/game/src/main.js');
  }
});
Modernizr.load({
    test: Modernizr.borderradius || Modernizr.boxshadow,
    nope: '../js/libs/pie/PIE.js',
    callback: function () {
        $('.rounded_corners, .box_shadow').each(function () {
            PIE.attach(this);
        });
    }
});

