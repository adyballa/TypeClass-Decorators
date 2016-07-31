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

    private _location:OrdLocation = new OrdLocation(10,10,100);

    private _isActive:boolean;

    public update() {
        this.filterChange.emit(this.props);
    }

    private get isActive():boolean{
        return this._isActive;
    }

    private set isActive(isActive:boolean){
        this._isActive = isActive;
        if(isActive){
            this.props["eq"][this.field.name] = this._location;
        }else{
            this._location = this.props["eq"][this.field.name];
            this.props["eq"][this.field.name] = null;
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
        this._isActive = false;
        return null;
    }
}
