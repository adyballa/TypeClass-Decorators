"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Andreas on 14.07.2016.
 */
var compare_typeclass_1 = require("../decorators/ord.typeclass.ts");
var car = (function () {
    function car(engine) {
        this.engine = engine;
    }
    car = __decorate([
        compare_typeclass_1["default"].type
    ], car);
    return car;
}());
//# sourceMappingURL=car.js.map