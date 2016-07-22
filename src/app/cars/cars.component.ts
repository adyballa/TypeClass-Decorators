import {Component, OnInit} from '@angular/core';
import {ListModelService} from './listModel.service';
import {Ord, Eq, IOrd} from '../decorators/ord.typeclass';
import {FilterComponent} from "../filter/filter.component";
import {Car} from "../class/car";
import {SortComponent, TDirection, IDirection} from "../filter/sort/sort.component";

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

    public dir : IDirection = {
        state:"ASC"
    };

    private sortField : SortComponent;

    constructor(private listService:ListModelService) {
        this.model = this.listService.getModel();
    }

    ngOnInit():any {
        this.calculate();
    }

    public sortFieldChange(sort : SortComponent){
        if(this.sortField){
            this.sortField.state = false;
        }
        this.sortField = sort;
        this.sortField.dir = this.dir;
        this.sortField.setIcon();
        this.sortField.state = true;
        this.calculate();
    }

    public directionChange(dir : IDirection){
        this.dir = dir;
        this.calculate();
    }

    public calculate(){
        this._result  = <Car[]> Ord.sort(this.listService.result);
        if(this.dir.state === "DESC"){
            this._result.reverse();
        }
    }

    public get result() : Car[] {
        return this._result;
    }

    public get less() {
        let top = {engine:50, color:'red', brand:'pontiac', interior:'plastic'};
        return Ord.less(this.listService.result, this.listService.createItem(top));
    }
}
