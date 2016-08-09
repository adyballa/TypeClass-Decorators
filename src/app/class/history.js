"use strict";
var History = (function () {
    function History(_length) {
        if (_length === void 0) { _length = 0; }
        this._length = _length;
        this._items = [];
    }
    History.prototype.unshift = function (item) {
        this._items.unshift(item);
        return (this._items.length > this._length) ? this._items.pop() : null;
    };
    History.prototype.get = function (i) {
        if (i === void 0) { i = 0; }
        return (i > this._length) ? this._items[this._length - 1] : this._items[i];
    };
    return History;
}());
exports.History = History;
