import {
    Component, Output, Input, EventEmitter, ViewChildren, QueryList, AfterViewInit,
    ElementRef
} from '@angular/core';
import {Field} from "../../decorators/eq.typeclass";
import {FilterProperties} from "../filter.component";

@Component({
    moduleId: module.id,
    selector: 'field-checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.css']
})
export class CheckboxComponent implements AfterViewInit {

    @ViewChildren("inps")
    public inputs:QueryList<ElementRef>;

    @Output()
    public filterChange:EventEmitter<any> = new EventEmitter(true);

    @Input()
    public field:Field;

    @Input()
    public props:FilterProperties;

    @Input()
    public options:Array<string>;

    ngAfterViewInit():any {
        if(this._getProp().length) {
            this.inputs.forEach((el:ElementRef) => {
                this._getProp().forEach((val) => {
                    let input = (<HTMLInputElement>el.nativeElement);
                    input.checked = (val === input.value);
                })
            });
        }else{
            this.props.eq[this.field.name] = null;
        }
        return null;
    }

    private _getProp() : Array<string>{
        if(!(this.field.name in this.props.eq)){
            this.props.eq[this.field.name] = [];
        }
        return (Array.isArray(this.props.eq[this.field.name])) ? (<Array<string>> this.props.eq[this.field.name]) : [];
    }

    public update(ev:Event) {
        let input = <HTMLInputElement> ev.target;
        if(input.checked){
            if(this.props.eq[this.field.name]===null || this.inputs.length === (<Array<string>> this.props.eq[this.field.name]).length){
                this.props.eq[this.field.name] = [input.value];
            }else{
                this._getProp().push(input.value);
            }
        }else{
            this.props.eq[this.field.name] = this._getProp().filter((val) => (val !== input.value));
        }
        if(!this._getProp().length || this.inputs.length === (<Array<string>> this.props.eq[this.field.name]).length){
            this.props.eq[this.field.name] = null;
        }
        this.filterChange.emit(this.props);
    }
}
