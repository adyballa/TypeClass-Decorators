import {Component, Output, EventEmitter, ViewChildren, QueryList, AfterViewChecked} from '@angular/core';
import {Ord, isFieldOrd, IOrd, IOrdConfig, CountRecord, BorderRecord} from "../decorators/ord.typeclass";
import {ListModelService} from "../cars/listModel.service";
import {EqField, EqOr, IField} from "../decorators/eq.typeclass";
import {RangeComponent} from "./range/range.component";
import {SelectRangeComponent} from "./selectRange/selectRange.component";
import {SelectComponent} from "./select/select.component";
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {DateRangeComponent} from "./date-range/date-range.component";
import {DateComponent} from "./date/date.component";
import {OrdlocationComponent} from "./ordlocation/ordlocation.component";
import {TextComponent} from "./text/text.component";
import * as _ from 'lodash';
import {History} from "../class/history";

export interface FilterProperty{
    [name:string] : (string|number|Array<string|number>)
}
export interface FilterProperties{
    top:FilterProperty,
    bottom:FilterProperty,
    eq:FilterProperty
}
export interface IReCount{
    countRecord:CountRecord,
    props:FilterProperties
}
export interface IReBorder{
    borderRecord:BorderRecord,
    props:FilterProperties
}
export interface ICounterField {
    setCount():void
}
export interface IBorderField {
    setBorder(fInit?:boolean):void
}

export type TFilterPropertyKeys = 'top'|'bottom'|'eq';

@Component({
    moduleId: module.id,
    selector: 'my-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css'],
    directives: [ RangeComponent, SelectRangeComponent, SelectComponent, CheckboxComponent,
        DateRangeComponent, DateComponent, OrdlocationComponent, TextComponent ]
})
export class FilterComponent implements AfterViewChecked{
    @Output()
    public filtered:EventEmitter<any> = new EventEmitter(false);

    public props:FilterProperties = {top:{},bottom:{},eq:{}};

    public fields:EqField[];

    private _model:IOrd;

    private _config:IOrdConfig;

    private _history:History<IField>;

    private _viewCheckedCounter : number = 0;

    @ViewChildren('counter')
    private counter : QueryList<ICounterField>;

    @ViewChildren('border')
    private border : QueryList<IBorderField>;

    constructor(private listService:ListModelService) {
        this.fields = this.listService.fields;
        this._model = this.listService.getModel();
        this._config = _.cloneDeep(this.listService.getConfig());
        this._history = new History<IField>(10);
    }

    ngAfterViewChecked():any {
        if(this._viewCheckedCounter === 1){
            this.counter.forEach((filter) => filter.setCount());
            this.border.forEach((filter) => filter.setBorder(true));
        }
        this._viewCheckedCounter++;
    }

    public get countRecord() : CountRecord{
        return this.listService.countRecord;
    }

    public get borderRecord() : BorderRecord{
        return this.listService.borderRecord;
    }

    public reCount(event:IReCount){
        const res = <IOrd[]>EqOr.fuzzyEq(this.listService.list, this.listService.createItems(event.props.eq), this._config);
        event.countRecord.recordOrdConfig(res, this._config);
    }

    public reBorder(event:IReBorder){
        const res = <IOrd[]>EqOr.fuzzyEq(this.listService.list, this.listService.createItems(event.props.eq), this._config);
        event.borderRecord.recordOrdConfig(res, this._config);
    }

    public filter(field : IField) {
        this._history.unshift(field);
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
        this.counter.forEach((filter) => filter.setCount());
        this.border.forEach((filter) => filter.setBorder());
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
            switch(typeof this._model[field.name]){
                case "string":
                    return (this.getOptions(field.name)) ? "string-options" : "string";
                case "number":
                    return "number";
            }
        }
    }

    public getOptions(name:string) : Array<string> {
        return this.listService.getOptions(name);
    }
}