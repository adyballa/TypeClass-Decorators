"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TextComponent = (function () {
    function TextComponent() {
        this.filterChange = new core_1.EventEmitter();
    }
    TextComponent.prototype.update = function () {
        if (!this.props["eq"][this.field.name])
            this.props["eq"][this.field.name] = null;
        this.filterChange.emit(this.field);
    };
    __decorate([
        core_1.Output()
    ], TextComponent.prototype, "filterChange");
    __decorate([
        core_1.Input()
    ], TextComponent.prototype, "field");
    __decorate([
        core_1.Input()
    ], TextComponent.prototype, "props");
    TextComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'field-text',
            templateUrl: 'text.component.html',
            styleUrls: ['text.component.css']
        })
    ], TextComponent);
    return TextComponent;
}());
exports.TextComponent = TextComponent;
