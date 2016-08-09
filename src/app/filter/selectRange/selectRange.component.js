"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ord_typeclass_1 = require("../../decorators/ord.typeclass");
var _ = require('lodash');
var common_1 = require("@angular/common");
var Rx_1 = require("rxjs/Rx");
var SelectRangeComponent = (function () {
    function SelectRangeComponent() {
        this.filterChange = new core_1.EventEmitter(false);
        this.counterChange = new core_1.EventEmitter(false);
        this._count = {};
    }
    SelectRangeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.field.map.forEach(function (option) {
            _this._count[option] = new Rx_1.BehaviorSubject(0);
        });
        return null;
    };
    SelectRangeComponent.prototype.update = function (key, ev) {
        var sel = ev.target, op = sel.options[sel.selectedIndex];
        this.props[key][this.field.name] = (op.value === "") ? null : op.value;
        this.filterChange.emit(this.field);
    };
    SelectRangeComponent.prototype.setCount = function () {
        var _this = this;
        var fCouterSet = false;
        if (this._history.get() !== this.field) {
            var _loop_1 = function(key) {
                if (this_1.props[key][this_1.field.name] === null) {
                    this_1.field.map.forEach(function (option) { return _this._count[option].next(_this.countRecord.play(_this.field.name, key, option)); });
                    fCouterSet = true;
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = ['top', 'bottom']; _i < _a.length; _i++) {
                var key = _a[_i];
                _loop_1(key);
            }
            if (!fCouterSet) {
                var reCount = { countRecord: new ord_typeclass_1.CountRecord(), props: _.cloneDeep(this.props) };
                //turn off search in field
                reCount.props.eq[this.field.name] = null;
                //this Eventemitter is synchron
                this.counterChange.emit(reCount);
                this.field.map.forEach(function (option) { return _this._count[option].next(_this.countRecord.play(_this.field.name, 'eq', option)); });
            }
        }
    };
    __decorate([
        core_1.Output()
    ], SelectRangeComponent.prototype, "filterChange");
    __decorate([
        core_1.Output()
    ], SelectRangeComponent.prototype, "counterChange");
    __decorate([
        core_1.Input()
    ], SelectRangeComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], SelectRangeComponent.prototype, "props");
    __decorate([
        core_1.Input()
    ], SelectRangeComponent.prototype, "countRecord");
    __decorate([
        core_1.Input()
    ], SelectRangeComponent.prototype, "_history");
    SelectRangeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-range-select',
            templateUrl: 'selectRange.component.html',
            pipes: [common_1.AsyncPipe],
            styleUrls: ['selectRange.component.css']
        })
    ], SelectRangeComponent);
    return SelectRangeComponent;
}());
exports.SelectRangeComponent = SelectRangeComponent;
