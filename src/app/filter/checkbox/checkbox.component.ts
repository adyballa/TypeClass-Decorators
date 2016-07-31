import {
    Component, Output, Input, EventEmitter, ViewChildren, QueryList, ElementRef, OnInit,
} from '@angular/core';
import {EqField, IField} from "../../decorators/eq.typeclass";
import {FilterProperties, IReCount, ICounterField} from "../filter.component";
import {CountRecord} from "../../decorators/ord.typeclass";
import {History} from "../../class/history";
import * as _ from 'lodash';
import {BehaviorSubject} from "rxjs/Rx";
import {AsyncPipe} from "@angular/common";

@Component({
    moduleId: module.id,
    selector: 'field-checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.css'],
    pipes: [AsyncPipe]
})
export class CheckboxComponent implements OnInit,ICounterField {

    @ViewChildren("inps")
    public inputs:QueryList<ElementRef>;

    @Output()
    public filterChange:EventEmitter<IField> = new EventEmitter<IField>(true);

    @Output()
    public counterChange:EventEmitter<IReCount> = new EventEmitter<IReCount>(false);

    @Input()
    public field:EqField;

    @Input()
    public props:FilterProperties;

    @Input()
    public options:Array<string>;

    @Input()
    private countRecord:CountRecord;

    @Input()
    private _history:History<IField>;

    private _count:{[option:string]:BehaviorSubject<number>} = {};

    ngOnInit():any {
        if (this._getProp().length) {
            this.inputs.forEach((el:ElementRef) => {
                this._getProp().forEach((val) => {
                    let input = (<HTMLInputElement>el.nativeElement);
                    input.checked = (val === input.value);
                })
            });
        } else {
            this.props.eq[this.field.name] = null;
        }
        this.options.forEach((option) => {this._count[option] = new BehaviorSubject(0)});
        return null;
    }

    setCount():void {
        if (this._history.get() !== this.field) {
            this.options.forEach((option) => {
                if (this.props.eq[this.field.name] === null) {
                    this._count[option].next(this.countRecord.play(this.field.name, "eq", option));
                } else {
                    let reCount:IReCount = {countRecord: new CountRecord(), props: _.cloneDeep(this.props)};
                    //turn off search in field
                    reCount.props.eq[this.field.name] = null;
                    //this Eventemitter is synchron
                    this.counterChange.emit(reCount);
                    this._count[option].next(reCount.countRecord.play(this.field.name, "eq", option));
                }
            });
        }
    }

    private _getProp():Array<string> {
        if (!(this.field.name in this.props.eq)) {
            this.props.eq[this.field.name] = [];
        }
        return (Array.isArray(this.props.eq[this.field.name])) ? (<Array<string>> this.props.eq[this.field.name]) : [];
    }

    public update(ev:Event) {
        let input = <HTMLInputElement> ev.target;
        if (input.checked) {
            if (this.props.eq[this.field.name] === null || this.inputs.length === (<Array<string>> this.props.eq[this.field.name]).length) {
                this.props.eq[this.field.name] = [input.value];
            } else {
                this._getProp().push(input.value);
            }
        } else {
            this.props.eq[this.field.name] = this._getProp().filter((val) => (val !== input.value));
        }
        if (!this._getProp().length || this.inputs.length === (<Array<string>> this.props.eq[this.field.name]).length) {
            this.props.eq[this.field.name] = null;
        }
        this.filterChange.emit(this.field);
    }
}
