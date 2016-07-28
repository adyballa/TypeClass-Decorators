import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {EqField, EqConfig, IField} from "../../decorators/eq.typeclass";
import {Field as OrdField, isFieldOrd, TDirection, IOrdConfig} from "../../decorators/ord.typeclass";
import {ListModelService} from "../../cars/listModel.service";

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
    private field:EqField;

    @Input()
    private ordFields:OrdField[];

    @Output()
    public fieldChange:EventEmitter<any> = new EventEmitter(true);

    @ViewChild('icon')
    private icon:ElementRef;

    constructor(private listService:ListModelService) {}

    ngOnInit() {
    }

    ngAfterViewInit():any {
        if (this.cardinality === 0) {
            this.fieldChange.emit(null);
        }
        this.setIcon();
    }

    public sort(event:Event, fieldName:string) {
        EqConfig.setCardinalityOfField(fieldName, this.ordFields);
        this.fieldChange.emit(null);
    }

    private getOrdField() : OrdField{
        return (isFieldOrd(this.field)) ? <OrdField> this.field : null;
    }

    public setIcon() {
        const f = this.getOrdField();
        if (this.icon && f) {
            this.icon.nativeElement.classList.remove("glyphicon-chevron-" + ((f.dir === "ASC") ? "up" : "down"));
            this.icon.nativeElement.classList.add("glyphicon-chevron-" + ((f.dir === "ASC") ? "down" : "up"));
        }
    }

    private setDir(dir:TDirection | "SWAP") {
        const f = this.getOrdField();
        if (f) {
            f.dir = <TDirection>((dir === "SWAP") ? ( (f.dir === "ASC") ? "DESC" : "ASC" ) : dir);
            this.setIcon();
            this.fieldChange.emit(null);
        }
    }

    public changeDir() {
        this.setDir("SWAP");
    }

    public fieldType():string {
        return (this.ordFields.find((ordField:OrdField) => ordField.name == this.field.name) === undefined) ? "eq" : "ord";
    }
}
