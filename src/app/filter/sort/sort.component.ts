import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Field, EqConfig} from "../../decorators/eq.typeclass";
import {Field as OrdField, Ord} from "../../decorators/ord.typeclass";
import {ListModelService} from "../../cars/listModel.service";

export type TDirection = "ASC" | "DESC";

export interface IDirection{
    state:TDirection
};

@Component({
    moduleId: module.id,
    selector: 'field-sort',
    templateUrl: 'sort.component.html',
    styleUrls: ['sort.component.css']
})
export class SortComponent implements OnInit, AfterViewInit {

    @Input()
    private cardinality:number;

    @Input()
    private field:Field;

    @Input()
    private ordFields:OrdField[];

    @Output()
    public sortFieldChange:EventEmitter<any> = new EventEmitter(true);

    @Output()
    public directionChange:EventEmitter<any> = new EventEmitter(true);

    @Input()
    public dir:IDirection;

    @ViewChild('icon')
    private icon:ElementRef;

    constructor(private listService:ListModelService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit():any {
        if(this.cardinality === 0){
            this.sortFieldChange.emit(this);
        }
    }

    public sort(event:Event, fieldName:string) {
        if(!this.state){
            EqConfig.setCardinalityOfField(fieldName, this.listService.getConfig().ordFields);
            this.sortFieldChange.emit(this);
        }
    }

    public setIcon(){
        if(this.icon){
            this.icon.nativeElement.classList.remove("glyphicon-chevron-"+((this.dir.state === "ASC") ? "up" : "down"));
            this.icon.nativeElement.classList.add("glyphicon-chevron-"+((this.dir.state === "ASC") ? "down" : "up"));
        }
    }

    private setDir(dir : TDirection | "SWAP"){
        this.dir.state = <TDirection>((dir === "SWAP") ? ( (this.dir.state === "ASC") ? "DESC" : "ASC" ) : dir);
        this.setIcon();
        this.directionChange.emit(this.dir);
    }

    public changeDir(){
        this.setDir("SWAP");
    }

    public set state(fActive : boolean){
        if(this.icon){
            this.icon.nativeElement.style.visibility = (fActive) ? "visible" : "hidden";
        }
    }

    public get state() : boolean{
        return (this.icon.nativeElement.style.visibility === "visible");
    }

    public fieldType():string {
        return (this.ordFields.find((ordField:OrdField) => ordField.name == this.field.name) === undefined) ? "eq" : "ord";
    }
}
