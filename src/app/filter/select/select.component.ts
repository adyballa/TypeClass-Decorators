import {Component, Input, Output, EventEmitter} from '@angular/core';
import {EqField, IField} from "../../decorators/eq.typeclass";
import {FilterProperties} from "../filter.component";

@Component({
    moduleId: module.id,
    selector: 'field-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.css']
})
export class SelectComponent {

    @Output()
    public filterChange : EventEmitter<IField> = new EventEmitter<IField>();

    @Input()
    public field:EqField;

    @Input()
    public props:FilterProperties;

    @Input()
    public options:Array<string>;

    public update(ev:Event){
        let sel = <HTMLSelectElement> ev.target, op = <HTMLOptionElement> sel.options[sel.selectedIndex];
        this.props['eq'][this.field.name] = (op.value === "") ? null : op.value;
        this.filterChange.emit(this.field);
    }
}
