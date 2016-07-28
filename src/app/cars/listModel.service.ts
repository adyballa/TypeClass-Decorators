import {Injectable} from '@angular/core';
import {IOrd, IOrdConfig} from "../decorators/ord.typeclass";
import {AbstractListModelService} from "./abstractListModel.service";
import {Car, CarAnd, Colors, Brands, Interiors, carConfig} from '../class/car';
import {OrdLocation} from "../class/ordLocation";

@Injectable()
export class ListModelService extends AbstractListModelService {

    protected _config : IOrdConfig = carConfig;

    public createItem(props:any = {}):IOrd {
        let {engine = null, color = null, brand = null, interior = null, date = null, location = null} = props;
        return this.createItemByParams(Car, [engine,color,brand,interior,date,location]);
    }

    public createItems(props:any = {}):IOrd[] {
        let {engine = null, color = null, brand = null, interior = null, date = null, location = null} = props, res = [];
        this.formatProps([engine,color,brand,interior, date,location]).forEach((propsRow : Array<any>) => {
            res.push(this.createItemByParams(Car, propsRow));
        });
        return res;
    }

    public createAndItem(props:any = {}):IOrd {
        let {engine = null, color = null, brand = null, interior = null, date = null, location = null} = props;
        return this.createItemByParams(CarAnd, [engine,color,brand,interior,date,location]);
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
        return this.createItemByParams(Car, [12, "red", "bmw", "leder", Date.now(), new OrdLocation(100,100,100)]);
    }

    protected getList():Promise<IOrd[]> {
        let cars = new Array(3500);

        for (let i = 0; i < cars.length; i++) {
            cars[i] = {
                engine: Math.ceil(Math.random() * (i + 1) * 5),
                color: Colors[Math.floor(Math.random() * Colors.length)],
                brand: Brands[Math.floor(Math.random() * Brands.length)],
                interior: Interiors[Math.floor(Math.random() * Interiors.length)],
                date: Date.now()-Math.random()*1000000000000,
                location: new OrdLocation(Math.random()*100,Math.random()*100,Math.random()*1000)
            };
        }
        return Promise.resolve(cars.map((props) => this.createItem(props)));
    }
}
