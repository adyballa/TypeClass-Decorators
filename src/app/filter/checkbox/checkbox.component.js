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
var Rx_1 = require("rxjs/Rx");
var common_1 = require("@angular/common");
var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this.filterChange = new core_1.EventEmitter(true);
        this.counterChange = new core_1.EventEmitter(false);
        this._count = {};
    }
    CheckboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this._getProp().length) {
            this.inputs.forEach(function (el) {
                _this._getProp().forEach(function (val) {
                    var input = el.nativeElement;
                    input.checked = (val === input.value);
                });
            });
        }
        else {
            this.props.eq[this.field.name] = null;
        }
        this.options.forEach(function (option) { _this._count[option] = new Rx_1.BehaviorSubject(0); });
        return null;
    };
    CheckboxComponent.prototype.setCount = function () {
        var _this = this;
        if (this._history.get() !== this.field) {
            this.options.forEach(function (option) {
                if (_this.props.eq[_this.field.name] === null) {
                    _this._count[option].next(_this.countRecord.play(_this.field.name, "eq", option));
                }
                else {
                    var reCount = { countRecord: new ord_typeclass_1.CountRecord(), props: _.cloneDeep(_this.props) };
                    //turn off search in field
                    reCount.props.eq[_this.field.name] = null;
                    //this Eventemitter is synchron
                    _this.counterChange.emit(reCount);
                    _this._count[option].next(reCount.countRecord.play(_this.field.name, "eq", option));
                }
            });
        }
    };
    CheckboxComponent.prototype._getProp = function () {
        if (!(this.field.name in this.props.eq)) {
            this.props.eq[this.field.name] = [];
        }
        return (Array.isArray(this.props.eq[this.field.name])) ? this.props.eq[this.field.name] : [];
    };
    CheckboxComponent.prototype.update = function (ev) {
        var input = ev.target;
        if (input.checked) {
            if (this.props.eq[this.field.name] === null || this.inputs.length === this.props.eq[this.field.name].length) {
                this.props.eq[this.field.name] = [input.value];
            }
            else {
                this._getProp().push(input.value);
            }
        }
        else {
            this.props.eq[this.field.name] = this._getProp().filter(function (val) { return (val !== input.value); });
        }
        if (!this._getProp().length || this.inputs.length === this.props.eq[this.field.name].length) {
            this.props.eq[this.field.name] = null;
        }
        this.filterChange.emit(this.field);
    };
    __decorate([
        core_1.ViewChildren("inps")
    ], CheckboxComponent.prototype, "inputs");
    __decorate([
        core_1.Output()
    ], CheckboxComponent.prototype, "filterChange");
    __decorate([
        core_1.Output()
    ], CheckboxComponent.prototype, "counterChange");
    __decorate([
        core_1.Input()
    ], CheckboxComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], CheckboxComponent.prototype, "props");
    __decorate([
        core_1.Input()
    ], CheckboxComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], CheckboxComponent.prototype, "countRecord");
    __decorate([
        core_1.Input()
    ], CheckboxComponent.prototype, "_history");
    CheckboxComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-checkbox',
            templateUrl: 'checkbox.component.html',
            styleUrls: ['checkbox.component.css'],
            pipes: [common_1.AsyncPipe]
        })
    ], CheckboxComponent);
    return CheckboxComponent;
}());
exports.CheckboxComponent = CheckboxComponent;
