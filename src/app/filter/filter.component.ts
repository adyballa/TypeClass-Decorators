import {Component, Output, EventEmitter} from '@angular/core';
import {Ord, isFieldOrd, IOrd, IOrdConfig} from "../decorators/ord.typeclass";
import {ListModelService} from "../cars/listModel.service";
import {EqField, EqOr} from "../decorators/eq.typeclass";
import {RangeComponent} from "./range/range.component";
import {SelectRangeComponent} from "./selectRange/selectRange.component";
import {SelectComponent} from "./select/select.component";
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {DateRangeComponent} from "./date-range/date-range.component";
import {DateComponent} from "./date/date.component";
import {OrdlocationComponent} from "./ordlocation/ordlocation.component";

export interface FilterProperty{
    [name:string] : (string|number|Array<string|number>)
}
export interface FilterProperties{
    top:FilterProperty,
    bottom:FilterProperty,
    eq:FilterProperty
}

@Component({
    moduleId: module.id,
    selector: 'my-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css'],
    directives: [ RangeComponent, SelectRangeComponent, SelectComponent, CheckboxComponent, DateRangeComponent, DateComponent, OrdlocationComponent ]
})
export class FilterComponent {
    @Output()
    public filtered:EventEmitter<any> = new EventEmitter(true);

    public props:FilterProperties = {top:{},bottom:{},eq:{}};

    public fields:EqField[];

    private _model:IOrd;

    private _config:IOrdConfig;

    constructor(private listService:ListModelService) {
        this.fields = this.listService.fields;
        this._model = this.listService.getModel();
        this._config = this.listService.getConfig();
    }

    public filter() {
        let top = this.listService.createAndItem(this.props.top),
            bottom = this.listService.createAndItem(this.props.bottom),
            eqs = this.listService.createItems(this.props.eq),
            res = this.listService.list
            ;
        if(Object.keys(this.props.eq).length>0){
            res = <IOrd[]>EqOr.fuzzyEq(res, eqs, this._config);
        }
        if(Object.keys(this.props.top).length>0 || Object.keys(this.props.bottom).length>0){
            res = Ord.inRange(res, top, bottom, this._config);
        }
        this.listService.result = res;
        this.filtered.emit({});
    }

    public createField(field:EqField):string {
        if (isFieldOrd(field) && field.map.length > 0) {
            return "select";
        }
        if(this._model[field.name] instanceof Date){
            return (isFieldOrd(field)) ? "date-range" : "date";
        }
        if(typeof this._model[field.name] === "object"){
            let m = /function (.*)\(.*/g.exec(this._model[field.name].constructor);
            if(m.length===2){
                return m[1].toLowerCase();
            }
        }else{
            return typeof this._model[field.name];
        }
    }

    public getOptions(name:string) : Array<string> {
        return this.listService.getOptions(name);
    }
}
