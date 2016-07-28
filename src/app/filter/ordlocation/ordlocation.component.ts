import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";
import {OrdLocation} from "../../class/ordLocation";

@Component({
    moduleId: module.id,
    selector: 'field-ordlocation',
    templateUrl: 'ordlocation.component.html',
    styleUrls: ['ordlocation.component.css']
})
export class OrdlocationComponent implements OnInit {

    @Output()
    public filterChange:EventEmitter<any> = new EventEmitter();

    @Input()
    public field:Field;

    @Input()
    public props:Object;

    public update() {
        this.filterChange.emit(this.props);
    }

    public set distance(d:number){
        this.props['eq'][this.field.name].distance = d;
    }

    public get distance(){
        return Math.sqrt(this.props['eq'][this.field.name].distance);
    }

    ngOnInit():any {
        this.props['eq'][this.field.name] = new OrdLocation(10,10,10000);
        return null;
    }
}
