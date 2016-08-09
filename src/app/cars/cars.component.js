"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var listModel_service_1 = require('./listModel.service');
var ord_typeclass_1 = require('../decorators/ord.typeclass');
var filter_component_1 = require("../filter/filter.component");
var sort_component_1 = require("../filter/sort/sort.component");
var list_length_component_1 = require("../list-length/list-length.component");
var CarsComponent = (function () {
    function CarsComponent(listService, route) {
        this.listService = listService;
        this.route = route;
        this.model = this.listService.getModel();
        this._config = this.listService.getConfig();
    }
    CarsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscribe = this.route.params.subscribe(function (params) {
            _this._limit = ('limit' in params) ? parseInt(params['limit'], 10) : 3500;
            _this.listService.setList(_this._limit).then(function () {
                _this.calculate();
                _this._filterComponent.viewCheckedCounter = 1;
            });
        });
    };
    CarsComponent.prototype.ngOnDestroy = function () {
        this._subscribe.unsubscribe();
    };
    CarsComponent.prototype.fieldChange = function () {
        this.calculate();
    };
    CarsComponent.prototype.calculate = function () {
        this.listService.countRecord.reset();
        this._result = ord_typeclass_1.Ord.sort(this.listService.result, this._config);
        this.listService.countRecord.recordOrdConfig(this._result, this._config);
    };
    Object.defineProperty(CarsComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarsComponent.prototype, "result", {
        get: function () {
            return this._result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarsComponent.prototype, "less", {
        get: function () {
            var top = { engine: 50, color: 'red', brand: 'pontiac', interior: 'plastic' };
            return ord_typeclass_1.Ord.less(this.listService.result, this.listService.createItem(top), this._config);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(filter_component_1.FilterComponent)
    ], CarsComponent.prototype, "_filterComponent");
    CarsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-cars',
            templateUrl: 'cars.component.html',
            styleUrls: ['cars.component.css'],
            providers: [listModel_service_1.ListModelService],
            directives: [filter_component_1.FilterComponent, sort_component_1.SortComponent, list_length_component_1.ListLengthComponent]
        })
    ], CarsComponent);
    return CarsComponent;
}());
exports.CarsComponent = CarsComponent;
