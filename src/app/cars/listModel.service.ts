import {Injectable} from '@angular/core';
import {IOrd, IOrdConfig, CountRecord, BorderRecord} from "../decorators/ord.typeclass";
import {AbstractListModelService} from "./abstractListModel.service";
import {Car, CarAnd, Colors, Brands, Interiors, carConfig} from '../class/car';
import {OrdLocation} from "../class/ordLocation";

@Injectable()
export class ListModelService extends AbstractListModelService {

    protected _config : IOrdConfig = carConfig;

    private _countRecord : CountRecord = new CountRecord();

    private _borderRecord : BorderRecord = new BorderRecord();

    public get borderRecord(){
        return this._borderRecord;
    }

    public get countRecord(){
        return this._countRecord;
    }

    public createItem(props:any = {}):IOrd {
        let {engine = null, color = null, brand = null, interior = null, date = null, location = null, name = null} = props;
        return this.createItemByParams(Car, [engine,color,brand,interior,date,location,name]);
    }

    public createItems(props:any = {}):IOrd[] {
        let {engine = null, color = null, brand = null, interior = null, date = null, location = null, name = null} = props, res = [];
        this.formatProps([engine,color,brand,interior, date,location,name]).forEach((propsRow : Array<any>) => {
            res.push(this.createItemByParams(Car, propsRow));
        });
        return res;
    }

    public createAndItem(props:any = {}):IOrd {
        let {engine = null, color = null, brand = null, interior = null, date = null, location = null, name = null} = props;
        return this.createItemByParams(CarAnd, [engine,color,brand,interior,date,location,name]);
    }

    public getOptions(name:string):Array<string> {
        switch (name) {
            case "brand" :
                return Brands;
            case "interior" :
                return Interiors;
            case "color" :
                return Colors;
        }
    }

    public getModel():IOrd {
        return this.createItemByParams(Car, [12, "red", "bmw", "leder", Date.now(), new OrdLocation(100,100,100),"model"]);
    }

    private randomString(len : number = 5, possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"){
        let text='';
        for( let i=0; i < len; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    protected getList(limit?:number):Promise<IOrd[]> {
        let cars = new Array( (limit === null) ? 3500 : limit);

        for (let i = 0; i < cars.length; i++) {
            cars[i] = {
                engine: Math.ceil(Math.random() * (i + 1) * 5),
                color: Colors[Math.floor(Math.random() * Colors.length)],
                brand: Brands[Math.floor(Math.random() * Brands.length)],
                interior: Interiors[Math.floor(Math.random() * Interiors.length)],
                date: Date.now()-Math.random()*1000000000000,
                location: new OrdLocation(Math.random()*100,Math.random()*100,Math.random()*1000),
                name: this.randomString()
            };
        }
        return Promise.resolve(cars.map((props) => this.createItem(props)));
    }
}
