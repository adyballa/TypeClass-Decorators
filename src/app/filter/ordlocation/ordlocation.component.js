"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ordLocation_1 = require("../../class/ordLocation");
var OrdlocationComponent = (function () {
    function OrdlocationComponent() {
        this.filterChange = new core_1.EventEmitter();
        this._location = new ordLocation_1.OrdLocation(10, 10, 100);
    }
    OrdlocationComponent.prototype.update = function () {
        this.filterChange.emit(this.props);
    };
    Object.defineProperty(OrdlocationComponent.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (isActive) {
            this._isActive = isActive;
            if (isActive) {
                this.props["eq"][this.field.name] = this._location;
            }
            else {
                this._location = this.props["eq"][this.field.name];
                this.props["eq"][this.field.name] = null;
            }
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrdlocationComponent.prototype, "distance", {
        get: function () {
            return Math.sqrt(this._location.distance);
        },
        set: function (d) {
            this._location.distance = d;
        },
        enumerable: true,
        configurable: true
    });
    OrdlocationComponent.prototype.ngOnInit = function () {
        this._location = new ordLocation_1.OrdLocation(10, 10, 100);
        this._isActive = false;
        return null;
    };
    __decorate([
        core_1.Output()
    ], OrdlocationComponent.prototype, "filterChange");
    __decorate([
        core_1.Input()
    ], OrdlocationComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], OrdlocationComponent.prototype, "props");
    OrdlocationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-ordlocation',
            templateUrl: 'ordlocation.component.html',
            styleUrls: ['ordlocation.component.css']
        })
    ], OrdlocationComponent);
    return OrdlocationComponent;
}());
exports.OrdlocationComponent = OrdlocationComponent;
