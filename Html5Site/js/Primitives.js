/* File Created: January 3, 2012 */

Namespace.Register("cocos2d.primitives");

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
//Date.now = function() {
//    return new Date();
//};

cocos2d.fillArc = function (context, pos, radius, startangle, endangle, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(pos.x, pos.y, radius, startangle, endangle, false);
    context.closePath();
    context.fill();
};
cocos2d.fillCircle = function (context, pos, radius, color) {
    cocos2d.fillArc(context, pos, radius, 0, 2 * Math.PI, color);
};

cocos2d.fillPoly = function (context, refPnt, points, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
    for (var j = 1; j < points.length; j++) {
        context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
    }
    context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
    context.closePath();
    context.fill();
};
cocos2d.fillRect = function (context, rect, color) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    context.closePath();
    context.fill();
};
cocos2d.fillPoint = function (context, pos, color) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(pos.x, pos.y, 1, 1);
    context.closePath();
    context.fill();
};
cocos2d.drawArc = function (context, pos, radius, startangle, endangle, color, lineWidth) {
    if (lineWidth == null) {
        lineWidth = 1;
    }
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.arc(pos.x, pos.y, radius, startangle, endangle, false);
    context.closePath();
    context.stroke();
};
cocos2d.drawCircle = function (context, pos, radius, color, lineWidth) {
    cocos2d.drawArc(context, pos, radius, 0, 2 * Math.PI, color, lineWidth);
};
cocos2d.drawPoly = function (context, refPnt, points, color, lineWidth) {
    if (points.length == 0) {
        return;
    }
    if (lineWidth == null) {
        lineWidth = 1;
    }
    context.strokeStyle = color;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.moveTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
    for (var j = 1; j < points.length; j++) {
        context.lineTo((points[j].x + refPnt.x), (points[j].y + refPnt.y));
    }
    context.lineTo((refPnt.x + points[0].x), (refPnt.y + points[0].y));
    context.closePath();
    context.stroke();
};
cocos2d.drawRect = function (context, rect, color, lineWidth) {
    if (lineWidth == null) {
        lineWidth = 1;
    }
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.strokeRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
    context.closePath();
    context.stroke();
};
cocos2d.drawPoint = function (context, pos, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.strokeRect(pos.x, pos.y, 1, 1);
    context.closePath();
    context.stroke();
};
