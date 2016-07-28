import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import {Field} from "../../decorators/ord.typeclass";
import {OrdLocation} from "../../class/ordLocation";
import * as _ from 'lodash';

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

    private _location:OrdLocation;

    private _isNull:boolean=true;

    public update() {
        this.filterChange.emit(this.props);
    }

    private get isNull():boolean{
        return this._isNull;
    }

    private set isNull(isNull:boolean){
        this._isNull = isNull;
        if(isNull){
            this._location = this.props["eq"][this.field.name];
            this.props["eq"][this.field.name] = null;
        }else{
            this.props["eq"][this.field.name] = this._location;
        }
        this.update();
    }

    public set distance(d:number){
        this._location.distance = d;
    }

    public get distance(){
        return Math.sqrt(this._location.distance);
    }

    ngOnInit():any {
        this._location = new OrdLocation(10,10,100);
        return null;
    }
}
