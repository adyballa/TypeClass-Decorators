import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ListModelService} from './listModel.service';
import {Ord, IOrd, IOrdConfig} from "decorator-ord";
import {FilterComponent} from "../filter/filter.component";
import {Car} from "../class/car";
import {SortComponent} from "../filter/sort/sort.component";
import {ListLengthComponent} from "../list-length/list-length.component";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'my-cars',
    templateUrl: 'cars.component.html',
    styleUrls: ['cars.component.css'],
    providers: [ListModelService],
    directives: [FilterComponent, SortComponent, ListLengthComponent]
})
/**
 * First field is default sort field
 */
export class CarsComponent implements OnInit, OnDestroy {

    public model:IOrd;

    private _result:Car[];

    private _config:IOrdConfig;

    private _subscribe:Subscription;

    private _limit:number;

    @ViewChild(FilterComponent)
    private _filterComponent: FilterComponent;

    constructor(private listService:ListModelService, private route : ActivatedRoute) {
        this.model = this.listService.getModel();
        this._config = this.listService.getConfig();
    }

    ngOnInit():any {
        this._subscribe = this.route.params.subscribe((params) => {
            this._limit = ('limit' in params) ? parseInt(params['limit'],10) : 3500;
            this.listService.setList(this._limit).then(() => {
                this.calculate();
                this._filterComponent.viewCheckedCounter = 1;
            });
        });
    }

    ngOnDestroy():any {
        this._subscribe.unsubscribe();
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
