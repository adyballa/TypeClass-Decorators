"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ord_typeclass_1 = require("../decorators/ord.typeclass");
var abstractListModel_service_1 = require("./abstractListModel.service");
var car_1 = require('../class/car');
var ordLocation_1 = require("../class/ordLocation");
var ListModelService = (function (_super) {
    __extends(ListModelService, _super);
    function ListModelService() {
        _super.apply(this, arguments);
        this._config = car_1.carConfig;
        this._countRecord = new ord_typeclass_1.CountRecord();
        this._borderRecord = new ord_typeclass_1.BorderRecord();
    }
    Object.defineProperty(ListModelService.prototype, "borderRecord", {
        get: function () {
            return this._borderRecord;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListModelService.prototype, "countRecord", {
        get: function () {
            return this._countRecord;
        },
        enumerable: true,
        configurable: true
    });
    ListModelService.prototype.createItem = function (props) {
        if (props === void 0) { props = {}; }
        var _a = props.engine, engine = _a === void 0 ? null : _a, _b = props.color, color = _b === void 0 ? null : _b, _c = props.brand, brand = _c === void 0 ? null : _c, _d = props.interior, interior = _d === void 0 ? null : _d, _e = props.date, date = _e === void 0 ? null : _e, _f = props.location, location = _f === void 0 ? null : _f, _g = props.name, name = _g === void 0 ? null : _g;
        return this.createItemByParams(car_1.Car, [engine, color, brand, interior, date, location, name]);
    };
    ListModelService.prototype.createItems = function (props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        var _a = props.engine, engine = _a === void 0 ? null : _a, _b = props.color, color = _b === void 0 ? null : _b, _c = props.brand, brand = _c === void 0 ? null : _c, _d = props.interior, interior = _d === void 0 ? null : _d, _e = props.date, date = _e === void 0 ? null : _e, _f = props.location, location = _f === void 0 ? null : _f, _g = props.name, name = _g === void 0 ? null : _g, res = [];
        this.formatProps([engine, color, brand, interior, date, location, name]).forEach(function (propsRow) {
            res.push(_this.createItemByParams(car_1.Car, propsRow));
        });
        return res;
    };
    ListModelService.prototype.createAndItem = function (props) {
        if (props === void 0) { props = {}; }
        var _a = props.engine, engine = _a === void 0 ? null : _a, _b = props.color, color = _b === void 0 ? null : _b, _c = props.brand, brand = _c === void 0 ? null : _c, _d = props.interior, interior = _d === void 0 ? null : _d, _e = props.date, date = _e === void 0 ? null : _e, _f = props.location, location = _f === void 0 ? null : _f, _g = props.name, name = _g === void 0 ? null : _g;
        return this.createItemByParams(car_1.CarAnd, [engine, color, brand, interior, date, location, name]);
    };
    ListModelService.prototype.getOptions = function (name) {
        switch (name) {
            case "brand":
                return car_1.Brands;
            case "interior":
                return car_1.Interiors;
            case "color":
                return car_1.Colors;
        }
    };
    ListModelService.prototype.getModel = function () {
        return this.createItemByParams(car_1.Car, [12, "red", "bmw", "leder", Date.now(), new ordLocation_1.OrdLocation(100, 100, 100), "model"]);
    };
    ListModelService.prototype.randomString = function (len, possible) {
        if (len === void 0) { len = 5; }
        if (possible === void 0) { possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; }
        var text = '';
        for (var i = 0; i < len; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    ListModelService.prototype.getList = function (limit) {
        var _this = this;
        var cars = new Array((limit === null) ? 3500 : limit);
        for (var i = 0; i < cars.length; i++) {
            cars[i] = {
                engine: Math.ceil(Math.random() * (i + 1) * 5),
                color: car_1.Colors[Math.floor(Math.random() * car_1.Colors.length)],
                brand: car_1.Brands[Math.floor(Math.random() * car_1.Brands.length)],
                interior: car_1.Interiors[Math.floor(Math.random() * car_1.Interiors.length)],
                date: Date.now() - Math.random() * 1000000000000,
                location: new ordLocation_1.OrdLocation(Math.random() * 100, Math.random() * 100, Math.random() * 1000),
                name: this.randomString()
            };
        }
        return Promise.resolve(cars.map(function (props) { return _this.createItem(props); }));
    };
    ListModelService = __decorate([
        core_1.Injectable()
    ], ListModelService);
    return ListModelService;
}(abstractListModel_service_1.AbstractListModelService));
exports.ListModelService = ListModelService;
