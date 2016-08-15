import {Injectable} from '@angular/core';
import {IOrd, IOrdConfig, CountRecord, BorderRecord, IOrdField, IField} from "decorator-ord";
import {AbstractListModelService} from "./abstractListModel.service";
import {Car, CarAnd, Colors, Brands, Interiors, carConfig} from '../class/car';
import {OrdLocation} from "../class/ordLocation";

@Injectable()
export class ListModelService extends AbstractListModelService<Car,CarAnd> {

    protected _config:IOrdConfig = carConfig;

    private _countRecord:CountRecord = new CountRecord();

    private _borderRecord:BorderRecord = new BorderRecord();

    public get borderRecord() {
        return this._borderRecord;
    }

    public get countRecord() {
        return this._countRecord;
    }

    public constructor() {
        super(Car, CarAnd);
    }

    private randomString(len:number = 5, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        let text = '';
        for (let i = 0; i < len; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    public getOptions(name:string):Array<string> {
        switch (name){
            case 'interior' : return Interiors;
            default : return super.getOptions(name)
        }
    }

    private createRandomParams(cardinality:number):{[name:string]:any} {
        return {
            engine: Math.ceil(Math.random() * (cardinality)),
            color: Colors[Math.floor(Math.random() * Colors.length)],
            brand: Brands[Math.floor(Math.random() * Brands.length)],
            interior: Interiors[Math.floor(Math.random() * Interiors.length)],
            date: Date.now() - Math.random() * 1000000000000,
            location: new OrdLocation(Math.random() * 100, Math.random() * 100, Math.random() * 1000),
            name: this.randomString()
        }
    }

    protected getList(limit?:number):Promise<IOrd[]> {
        let cars = new Array((limit === null) ? 3500 : limit);

        for (let i = 0; i < cars.length; i++) {
            cars[i] = this.createRandomParams(i + 1);
        }
        return Promise.resolve(cars.map((props) => this.createItem(props)));
    }
}
