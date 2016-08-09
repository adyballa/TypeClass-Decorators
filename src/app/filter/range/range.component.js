"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ord_typeclass_1 = require("../../decorators/ord.typeclass");
var Rx_1 = require("rxjs/Rx");
var common_1 = require("@angular/common");
var _ = require('lodash');
var RangeComponent = (function () {
    function RangeComponent() {
        this.filterChange = new core_1.EventEmitter();
        this.borderChange = new core_1.EventEmitter(false);
        this._border = { min: new Rx_1.BehaviorSubject(0), max: new Rx_1.BehaviorSubject(1000) };
        this._value = new Rx_1.BehaviorSubject(0);
    }
    RangeComponent.prototype.update = function () {
        this.filterChange.emit(this.field);
    };
    RangeComponent.prototype.setBorder = function (fInit) {
        if (fInit === void 0) { fInit = false; }
        if (this._history.get() !== this.field) {
            if (this.props['top'][this.field.name] === null) {
                this._border.min.next(this.borderRecord.play(this.field.name, "eq", "min"));
                this._border.max.next(this.borderRecord.play(this.field.name, "eq", "max"));
                if (fInit) {
                    this._value.next(this.borderRecord.play(this.field.name, "eq", "max"));
                }
            }
            else {
                var reBorder = { borderRecord: new ord_typeclass_1.BorderRecord(), props: _.cloneDeep(this.props) };
                //turn off search in field
                reBorder.props['top'][this.field.name] = null;
                reBorder.props['bottom'][this.field.name] = null;
                //this Eventemitter is synchron
                this.borderChange.emit(reBorder);
                this._border.min.next(reBorder.borderRecord.play(this.field.name, "eq", "min"));
                this._border.max.next(reBorder.borderRecord.play(this.field.name, "eq", "max"));
                if (fInit) {
                    this._value.next(reBorder.borderRecord.play(this.field.name, "eq", "max"));
                }
            }
        }
    };
    __decorate([
        core_1.Output()
    ], RangeComponent.prototype, "filterChange");
    __decorate([
        core_1.Output()
    ], RangeComponent.prototype, "borderChange");
    __decorate([
        core_1.Input()
    ], RangeComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], RangeComponent.prototype, "props");
    __decorate([
        core_1.Input()
    ], RangeComponent.prototype, "borderRecord");
    __decorate([
        core_1.Input()
    ], RangeComponent.prototype, "_history");
    RangeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-range',
            templateUrl: 'range.component.html',
            styleUrls: ['range.component.css'],
            pipes: [common_1.AsyncPipe]
        })
    ], RangeComponent);
    return RangeComponent;
}());
exports.RangeComponent = RangeComponent;
