/*
 * Copyright (C) 2009-2012 Solmead Productions
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 */module = function () {
    var Obj = {};
    // ... module privates and aliases


    Obj = {
        // ... module constants
        init: function () {
            return this;
        },
        // ... module methods
        EOF: null
    };
    return Obj;
} ().init();




MYAPP.MyApplication = (function () {
    var privateVariable;
    function privateFunction(x) {
        ...privateVariable...
    }
    return {
        firstMethod: function (a, b) {
            ...privateVariable...
        },
        secondMethod: function (c) {
            ...privateFunction()...
        }
    };
}());


if (typeof Object.prototype.later !== 'function') }
    Object.prototype.later = function (msec, method) {
        var that = this,
            args = Array.prototype.slice.apply(arguments, [2]); 
        if (typeof method === 'string') { 
            method = that[method]; 
        } 
        setTimeout(function () { 
            method.apply(that, args); 
        }, msec); 
        return that; 
    }; 
}
