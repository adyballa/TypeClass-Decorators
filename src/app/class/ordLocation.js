"use strict";
/**
 * Created by Andreas on 26.07.2016.
 */
function isLocation(object) {
    return (typeof object === "object" && 'x' in object && 'y' in object && '_distance' in object);
}
var OrdLocation = (function () {
    function OrdLocation(x, y, dist) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this._distance = Math.floor(dist);
    }
    Object.defineProperty(OrdLocation.prototype, "distance", {
        get: function () {
            return this._distance;
        },
        set: function (dist) {
            this._distance = dist * dist;
        },
        enumerable: true,
        configurable: true
    });
    OrdLocation.prototype.greater = function (a, config) {
        if (isLocation(a)) {
            return (this._distance > (a.distance));
        }
        return null;
    };
    OrdLocation.prototype.less = function (a, config) {
        var res = this.greater(a);
        return (res === null) ? null : !res;
    };
    OrdLocation.prototype.eq = function (a, config) {
        if (isLocation(a)) {
            var d = Math.pow(Math.abs(a.x - this.x) + Math.abs(a.y - this.y), 2);
            return (d <= this._distance);
        }
        return null;
    };
    OrdLocation.prototype.neq = function (a, config) {
        var res = this.eq(a);
        return (res === null) ? null : !res;
    };
    OrdLocation.prototype.toString = function () {
        return "x:" + this.x + " y:" + this.y + " d:" + this._distance;
    };
    return OrdLocation;
}());
exports.OrdLocation = OrdLocation;
