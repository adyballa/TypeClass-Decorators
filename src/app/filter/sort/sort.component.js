"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var eq_typeclass_1 = require("decorator-eq/eq.typeclass");
var ord_typeclass_1 = require("../../decorators/ord.typeclass");
var SortComponent = (function () {
    function SortComponent(listService) {
        this.listService = listService;
        this.fieldChange = new core_1.EventEmitter(true);
    }
    SortComponent.prototype.ngOnInit = function () {
    };
    SortComponent.prototype.ngAfterViewInit = function () {
        if (this.cardinality === 0) {
            this.fieldChange.emit(null);
        }
        this.setIcon();
    };
    SortComponent.prototype.sort = function (event, fieldName) {
        eq_typeclass_1.EqConfig.setCardinalityOfField(fieldName, this.ordFields);
        this.fieldChange.emit(null);
    };
    SortComponent.prototype.getOrdField = function () {
        return (ord_typeclass_1.isFieldOrd(this.field)) ? this.field : null;
    };
    SortComponent.prototype.setIcon = function () {
        var f = this.getOrdField();
        if (this.icon && f) {
            this.icon.nativeElement.classList.remove("glyphicon-chevron-" + ((f.dir === "ASC") ? "up" : "down"));
            this.icon.nativeElement.classList.add("glyphicon-chevron-" + ((f.dir === "ASC") ? "down" : "up"));
        }
    };
    SortComponent.prototype.setDir = function (dir) {
        var f = this.getOrdField();
        if (f) {
            f.dir = ((dir === "SWAP") ? ((f.dir === "ASC") ? "DESC" : "ASC") : dir);
            this.setIcon();
            this.fieldChange.emit(null);
        }
    };
    SortComponent.prototype.changeDir = function () {
        this.setDir("SWAP");
    };
    SortComponent.prototype.fieldType = function () {
        var _this = this;
        return (this.ordFields.find(function (ordField) { return ordField.name == _this.field.name; }) === undefined) ? "eq" : "ord";
    };
    __decorate([
        core_1.Input()
    ], SortComponent.prototype, "cardinality");
    __decorate([
        core_1.Input()
    ], SortComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], SortComponent.prototype, "ordFields");
    __decorate([
        core_1.Output()
    ], SortComponent.prototype, "fieldChange");
    __decorate([
        core_1.ViewChild('icon')
    ], SortComponent.prototype, "icon");
    SortComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-sort',
            templateUrl: 'sort.component.html',
            styleUrls: ['sort.component.css']
        })
    ], SortComponent);
    return SortComponent;
}());
exports.SortComponent = SortComponent;
