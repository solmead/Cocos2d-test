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
*/
// Class Example

System.Classes.HelloWorld = function (A) {
        var obj= {
            Message: "Hello World!",
            Hello: function () {
                alert(this.Message);
            }
        };
        obj.Message = obj.Message + ' ' + A;
        return obj;
}
//PreConstructed class with methods

System.Classes.HelloDevelopers = {
    Message: "Hello Developers",
    Message2: "Hello Developers Again",
    Message3: "Wassup!",

    Hello: function () {
        alert(this.Message);
    }
}
//Static Method

System.Classes.HelloMom = function () {
    var Message = "Hi";
    var Message2 = "Mom!";

    alert(Message + " " + Message2);
}
//Global Namespace Variable

System.Classes.Hey = "Hey";