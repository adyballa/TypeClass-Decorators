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
/**
 * Created by Andreas on 14.07.2016.
 */
var ord_typeclass_1 = require("../decorators/ord.typeclass");
exports.Brands = ['bmw', 'pontiac', 'honda'];
exports.Colors = ['yellow', 'red', 'blue'];
exports.Interiors = ['leder', 'kunstleder', 'plastik'];
exports.carConfig = new ord_typeclass_1.OrdConfig();
var Car = (function () {
    function Car(engine, color, brand, interior, timestamp, location, name) {
        this.engine = engine;
        this.color = color;
        this.brand = brand;
        this.interior = interior;
        this.date = (timestamp === null) ? null : new Date(timestamp);
        this.location = location;
        this.name = name;
    }
    ;
    __decorate([
        ord_typeclass_1.Ord.field({
            cardinality: 3
        })
    ], Car.prototype, "engine");
    __decorate([
        ord_typeclass_1.Ord.field({
            cardinality: 2,
            map: exports.Colors
        })
    ], Car.prototype, "color");
    __decorate([
        ord_typeclass_1.Ord.field({
            cardinality: 4,
            map: exports.Brands
        })
    ], Car.prototype, "brand");
    __decorate([
        ord_typeclass_1.Ord.field({
            cardinality: 1
        })
    ], Car.prototype, "date");
    __decorate([
        ord_typeclass_1.Ord.field({
            cardinality: 5
        })
    ], Car.prototype, "location");
    __decorate([
        ord_typeclass_1.Eq.field({ fuzzy: true })
    ], Car.prototype, "name");
    __decorate([
        ord_typeclass_1.Eq.field({})
    ], Car.prototype, "interior");
    Car = __decorate([
        ord_typeclass_1.Ord.implement({
            config: exports.carConfig
        })
    ], Car);
    return Car;
}());
exports.Car = Car;
var CarAnd = (function (_super) {
    __extends(CarAnd, _super);
    function CarAnd() {
        _super.apply(this, arguments);
    }
    CarAnd = __decorate([
        ord_typeclass_1.OrdAnd.implement({})
    ], CarAnd);
    return CarAnd;
}(Car));
exports.CarAnd = CarAnd;
