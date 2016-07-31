import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Field, BorderRecord} from "../../decorators/ord.typeclass";
import {IField} from "../../decorators/eq.typeclass";
import {History} from "../../class/history";
import {BehaviorSubject} from "rxjs/Rx";
import {AsyncPipe} from "@angular/common";
import {IBorderField, IReBorder, FilterProperties} from "../filter.component";
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'field-range',
    templateUrl: 'range.component.html',
    styleUrls: ['range.component.css'],
    pipes:[AsyncPipe]
})
export class RangeComponent implements IBorderField{

    @Output()
    public filterChange : EventEmitter<IField> = new EventEmitter<IField>();

    @Output()
    public borderChange:EventEmitter<IReBorder> = new EventEmitter<IReBorder>(false);

    @Input()
    public field:Field;

    @Input()
    public props:FilterProperties;

    @Input()
    private borderRecord:BorderRecord;

    @Input()
    private _history:History<IField>;

    private _border:{min:BehaviorSubject<number>,max:BehaviorSubject<number>} = {min:new BehaviorSubject(0),max:new BehaviorSubject(1000)};

    private _value: BehaviorSubject<number> = new BehaviorSubject(0);

    public update(){
        this.filterChange.emit(this.field);
    }

    public setBorder(fInit:boolean=false):void {
        if (this._history.get() !== this.field) {
            if (this.props['top'][this.field.name] === null) {
                this._border.min.next(this.borderRecord.play(this.field.name, "eq", "min"));
                this._border.max.next(this.borderRecord.play(this.field.name, "eq", "max"));
                if(fInit){
                    this._value.next(this.borderRecord.play(this.field.name, "eq", "max"));
                }
            }else{
                let reBorder:IReBorder = {borderRecord: new BorderRecord(), props: _.cloneDeep(this.props)};
                //turn off search in field
                reBorder.props['top'][this.field.name] = null;
                reBorder.props['bottom'][this.field.name] = null;
                //this Eventemitter is synchron
                this.borderChange.emit(reBorder);
                this._border.min.next(reBorder.borderRecord.play(this.field.name, "eq", "min"));
                this._border.max.next(reBorder.borderRecord.play(this.field.name, "eq", "max"));
                if(fInit){
                    this._value.next(reBorder.borderRecord.play(this.field.name, "eq", "max"));
                }
            }
        }
    }
}
