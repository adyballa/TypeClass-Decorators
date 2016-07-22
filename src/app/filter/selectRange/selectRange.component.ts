import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";

@Component({
    moduleId: module.id,
    selector: 'field-range-select',
    templateUrl: 'selectRange.component.html',
    styleUrls: ['selectRange.component.css']
})
export class SelectRangeComponent {

    @Output()
    public filterChange : EventEmitter<any> = new EventEmitter(false);

    @Input()
    public field:Field;

    @Input()
    public props:Object;

    public update(key, ev : Event){
        let sel = <HTMLSelectElement> ev.target, op = <HTMLOptionElement> sel.options[sel.selectedIndex];
        this.props[key][this.field.name] = (op.value === "") ? null : op.value;
        this.filterChange.emit(this.props);
    }
}
