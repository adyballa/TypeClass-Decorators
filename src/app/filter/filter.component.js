"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ord_typeclass_1 = require("../decorators/ord.typeclass");
var eq_typeclass_1 = require("decorator-eq/eq.typeclass");
var range_component_1 = require("./range/range.component");
var selectRange_component_1 = require("./selectRange/selectRange.component");
var select_component_1 = require("./select/select.component");
var checkbox_component_1 = require("./checkbox/checkbox.component");
var date_range_component_1 = require("./date-range/date-range.component");
var date_component_1 = require("./date/date.component");
var ordlocation_component_1 = require("./ordlocation/ordlocation.component");
var text_component_1 = require("./text/text.component");
var _ = require('lodash');
var history_1 = require("../class/history");
var FilterComponent = (function () {
    function FilterComponent(listService) {
        this.listService = listService;
        this.filtered = new core_1.EventEmitter(false);
        this.props = { top: {}, bottom: {}, eq: {} };
        this._viewCheckedCounter = 0;
        this.fields = this.listService.fields;
        this._model = this.listService.getModel();
        this._config = this.listService.getConfig().clone();
        this._history = new history_1.History(2);
    }
    /**
     * @FIXME Initialisierung kann erst ab dem 2.ten Durchlauf gemacht werden.
     */
    FilterComponent.prototype.ngAfterViewChecked = function () {
        if (this._viewCheckedCounter === 1) {
            this.counter.forEach(function (filter) { return filter.setCount(); });
            this.border.forEach(function (filter) { return filter.setBorder(true); });
        }
        this._viewCheckedCounter++;
    };
    Object.defineProperty(FilterComponent.prototype, "viewCheckedCounter", {
        set: function (counter) {
            this._viewCheckedCounter = counter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterComponent.prototype, "countRecord", {
        get: function () {
            return this.listService.countRecord;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterComponent.prototype, "borderRecord", {
        get: function () {
            return this.listService.borderRecord;
        },
        enumerable: true,
        configurable: true
    });
    FilterComponent.prototype.reCount = function (event) {
        event.countRecord.recordOrdConfig(this._filter(this.listService.list, event.props), this._config);
    };
    FilterComponent.prototype.reBorder = function (event) {
        event.borderRecord.recordOrdConfig(this._filter(this.listService.list, event.props), this._config);
    };
    FilterComponent.prototype._filter = function (cs, props) {
        var top = this.listService.createAndItem(props.top), bottom = this.listService.createAndItem(props.bottom), eqs = this.listService.createItems(props.eq);
        if (Object.keys(props.eq).length > 0) {
            cs = eq_typeclass_1.EqOr.fuzzyEq(cs, eqs, this._config);
        }
        if (Object.keys(props.top).length > 0 || Object.keys(props.bottom).length > 0) {
            cs = ord_typeclass_1.Ord.inRange(cs, top, bottom, this._config);
        }
        return cs;
    };
    FilterComponent.prototype.filter = function (field) {
        this._history.unshift(field);
        this.listService.result = this._filter(this.listService.list, this.props);
        this.filtered.emit({});
        this.counter.forEach(function (filter) { return filter.setCount(); });
        this.border.forEach(function (filter) { return filter.setBorder(); });
    };
    FilterComponent.prototype.createField = function (field) {
        if (ord_typeclass_1.isFieldOrd(field) && field.map.length > 0) {
            return "select";
        }
        if (this._model[field.name] instanceof Date) {
            return (ord_typeclass_1.isFieldOrd(field)) ? "date-range" : "date";
        }
        if (typeof this._model[field.name] === "object") {
            var m = /function (.*)\(.*/g.exec(this._model[field.name].constructor);
            if (m.length === 2) {
                return m[1].toLowerCase();
            }
        }
        else {
            switch (typeof this._model[field.name]) {
                case "string":
                    return (this.getOptions(field.name)) ? "string-options" : "string";
                case "number":
                    return "number";
            }
        }
    };
    FilterComponent.prototype.getOptions = function (name) {
        return this.listService.getOptions(name);
    };
    __decorate([
        core_1.Output()
    ], FilterComponent.prototype, "filtered");
    __decorate([
        core_1.ViewChildren('counter')
    ], FilterComponent.prototype, "counter");
    __decorate([
        core_1.ViewChildren('border')
    ], FilterComponent.prototype, "border");
    FilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-filter',
            templateUrl: 'filter.component.html',
            styleUrls: ['filter.component.css'],
            directives: [range_component_1.RangeComponent, selectRange_component_1.SelectRangeComponent, select_component_1.SelectComponent, checkbox_component_1.CheckboxComponent,
                date_range_component_1.DateRangeComponent, date_component_1.DateComponent, ordlocation_component_1.OrdlocationComponent, text_component_1.TextComponent]
        })
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
