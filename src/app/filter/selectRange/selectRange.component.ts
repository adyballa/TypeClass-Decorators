import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Field, CountRecord} from "../../decorators/ord.typeclass";
import {IReCount, FilterProperties, TFilterPropertyKeys, ICounterField} from "../filter.component";
import {History} from "../../class/history";
import {IField} from "../../decorators/eq.typeclass";
import * as _ from 'lodash';
import {AsyncPipe} from "@angular/common";
import {BehaviorSubject} from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'field-range-select',
    templateUrl: 'selectRange.component.html',
    pipes:[AsyncPipe],
    styleUrls: ['selectRange.component.css']
})
export class SelectRangeComponent implements ICounterField,OnInit {

    @Output()
    public filterChange:EventEmitter<IField> = new EventEmitter<IField>(false);

    @Output()
    public counterChange:EventEmitter<IReCount> = new EventEmitter<IReCount>(false);

    @Input()
    public field:Field;

    @Input()
    public props:FilterProperties;

    @Input()
    private countRecord:CountRecord;

    @Input()
    private _history:History<IField>;

    private _count:{[option:string]:BehaviorSubject<number>} = {};

    ngOnInit():any {
        this.field.map.forEach((option:string) => {
            this._count[option] = new BehaviorSubject(0);
        });
        return null;
    }

    public update(key:'top'|'bottom', ev:Event) {
        let sel = <HTMLSelectElement> ev.target, op = <HTMLOptionElement> sel.options[sel.selectedIndex];
        this.props[key][this.field.name] = (op.value === "") ? null : op.value;
        this.filterChange.emit(this.field);
    }

    setCount():void {
        let fCouterSet = false;
        if (this._history.get() !== this.field) {
            for (let key of ['top', 'bottom']) {
                if (this.props[key][this.field.name] === null) {
                    this.field.map.forEach((option) => this._count[option].next(this.countRecord.play(this.field.name, key, option)));
                    fCouterSet = true;
                }

            }
            if (!fCouterSet) {
                let reCount:IReCount = {countRecord: new CountRecord(), props: _.cloneDeep(this.props)};
                //turn off search in field
                reCount.props.eq[this.field.name] = null;
                //this Eventemitter is synchron
                this.counterChange.emit(reCount);
                this.field.map.forEach((option) => this._count[option].next(this.countRecord.play(this.field.name, 'eq', option)));
            }
        }
    }

}