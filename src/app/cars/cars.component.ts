import {Component, OnInit} from '@angular/core';
import {ListModelService} from './listModel.service';
import {Ord, IOrd, IOrdConfig} from '../decorators/ord.typeclass';
import {FilterComponent} from "../filter/filter.component";
import {Car} from "../class/car";
import {SortComponent} from "../filter/sort/sort.component";

@Component({
    moduleId: module.id,
    selector: 'my-cars',
    templateUrl: 'cars.component.html',
    styleUrls: ['cars.component.css'],
    providers: [ListModelService],
    directives: [FilterComponent, SortComponent]
})
/**
 * First field is default sort field
 */
export class CarsComponent implements OnInit {

    public model:IOrd;

    private _result:Car[];

    private _config:IOrdConfig;

    constructor(private listService:ListModelService) {
        this.model = this.listService.getModel();
        this._config = this.listService.getConfig();
    }

    ngOnInit():any {
        //this.calculate();
    }

    public fieldChange(){
        this.calculate();
    }

    public calculate(){
        this.listService.countRecord.reset();
        this._result  = <Car[]> Ord.sort(this.listService.result, this._config);
        this.listService.countRecord.recordOrdConfig(this._result, this._config);
    }

    public get config() : IOrdConfig {
        return this._config;
    }

    public get result() : Car[] {
        return this._result;
    }

    public get less() {
        let top = {engine:50, color:'red', brand:'pontiac', interior:'plastic'};
        return Ord.less(this.listService.result, this.listService.createItem(top), this._config);
    }
}
