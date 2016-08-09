"use strict";
var ord_typeclass_1 = require("../decorators/ord.typeclass");
var AbstractListModelService = (function () {
    function AbstractListModelService() {
        var _this = this;
        this._list = [];
        this.result = [];
        this._config = new ord_typeclass_1.OrdConfig();
        this.result = this.list;
        this.getList().then(function (list) {
            _this._list = list.slice(0);
            _this.result = list;
        });
    }
    AbstractListModelService.prototype.getConfig = function () {
        return this._config;
    };
    Object.defineProperty(AbstractListModelService.prototype, "fields", {
        get: function () {
            return this._config.fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractListModelService.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    AbstractListModelService.prototype.createItemByParams = function (ctor, params) {
        return new ctor(...params);
    };
    /**
     * Erstelle Array mit Reihen fester Länge von passenden Eigenschaften aus
     * Array mit Reihen gleichen Eigenschaften.
     * 1.) Spiegelung von x auf y
     * 2.) Bilde das Kreuzprodukt aus allen Eigenschaften
     * 3.) Fülle mit null-werten auf.
     *
     * bsp.:
     * input: [null, ['red','yellow'],['bmw','honda']]
     * output: [[null, 'red', 'bmw'], [null, 'red','honda'],[null,'yellow','bmw'],[null,'yellow','honda']]
     *
     * @param props
     * @returns {Array}
     */
    AbstractListModelService.prototype.formatProps = function (props) {
        var l = 1, res = [], perRow = 0;
        props.forEach(function (prop) { return l = l * ((Array.isArray(prop)) ? prop.length : 1); });
        perRow = l;
        for (var i = 0; i < l; i++) {
            res.push(new Array(props.length).fill(null, 0, props.length));
        }
        props.forEach(function (prop, x) {
            var _prop = (Array.isArray(prop)) ? prop : [prop];
            perRow /= _prop.length;
            var _loop_1 = function(a) {
                _prop.forEach(function (val, y) {
                    for (var i = 0; i < perRow; i++) {
                        res[a * perRow + i + y][x] = val;
                    }
                });
            };
            for (var a = 0; a < (l / (_prop.length * perRow)); a++) {
                _loop_1(a);
            }
        });
        return res;
    };
    AbstractListModelService.prototype.setList = function (limit) {
        var _this = this;
        return this.getList(limit).then(function (list) {
            _this._list = list.slice(0);
            _this.result = list;
        });
    };
    return AbstractListModelService;
}());
exports.AbstractListModelService = AbstractListModelService;
