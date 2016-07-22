import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";

@Component({
    moduleId: module.id,
    selector: 'field-range',
    templateUrl: 'range.component.html',
    styleUrls: ['range.component.css']
})
export class RangeComponent{

    @Output()
    public filterChange : EventEmitter<any> = new EventEmitter();

    @Input()
    public field:Field;

    @Input()
    public props:Object;

    public update(){
        this.filterChange.emit(this.props);
    }
}
