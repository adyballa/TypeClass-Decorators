import {Injectable} from '@angular/core';
import {IOrd, isOrd, IOrdConfig} from "../decorators/ord.typeclass";
import {AbstractListModelService} from "./abstractListModel.service";
import {Car, CarAnd, Colors, Brands, Interiors, modelConfig} from '../class/car';

@Injectable()
export class ListModelService extends AbstractListModelService {

    public createItem(props:any = {}):IOrd {
        let {engine = null, color = null, brand = null, interior = null, date = null} = props;
        return this.createItemByParams(Car, [engine,color,brand,interior,date]);
    }

    public createItems(props:any = {}):IOrd[] {
        let {engine = null, color = null, brand = null, interior = null, date = null} = props, res = [];
        this.formatProps([engine,color,brand,interior, date]).forEach((propsRow : Array<any>) => {
            res.push(this.createItemByParams(Car, propsRow));
        });
        return res;
    }

    public createAndItem(props:any = {}):IOrd {
        let {engine = null, color = null, brand = null, interior = null, date = null} = props;
        return this.createItemByParams(CarAnd, [engine,color,brand,interior,date]);
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
        return this.createItemByParams(Car, [12, "red", "bmw", "leder", new Date()]);
    }

    protected getList():Promise<IOrd[]> {
        let cars = new Array(3500);


        for (let i = 0; i < cars.length; i++) {
            cars[i] = {
                engine: Math.ceil(Math.random() * (i + 1) * 5),
                color: Colors[Math.floor(Math.random() * Colors.length)],
                brand: Brands[Math.floor(Math.random() * Brands.length)],
                interior: Interiors[Math.floor(Math.random() * Interiors.length)],
                date: Date.now()-Math.random()*1000000000000
            };
        }
        console.log("COnfig ist ", modelConfig);
        return Promise.resolve(cars.map((props) => this.createItem(props)));
    }
}
