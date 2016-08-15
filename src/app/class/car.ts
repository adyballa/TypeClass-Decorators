/**
 * Created by Andreas on 14.07.2016.
 */
import {Ord, Eq, IOrd, OrdConfig, OrdAnd, IEq} from "decorator-ord";
import {OrdLocation} from "./ordLocation";
import {isDate} from "@angular/core/src/facade/lang";

type TColor = "yellow" | "red" | "blue";
type TBrand = "bmw" | "pontiac" | "honda";
type TInterior = "leder" | "kunstleder" | "plastik";

export const Brands:TBrand[] = ['bmw', 'pontiac', 'honda'];
export const Colors:TColor[] = ['yellow', 'red', 'blue'];
export const Interiors:TInterior[] = ['leder', 'kunstleder', 'plastik'];

export const carConfig = new OrdConfig();

@Ord.implement({
    config: carConfig
})
export class Car implements IOrd {
    @Ord.field({
        ordinality: 3
    })
    public engine:number = 0;

    @Ord.field({
        ordinality: 2,
        map: Colors
    })
    public color:TColor = Colors[0];

    @Ord.field({
        ordinality: 4,
        map: Brands
    })
    public brand:TBrand = Brands[0];

    private _date:Date;

    @Ord.field({
        ordinality: 5
    })
    public location:OrdLocation = new OrdLocation(10,10,10);

    @Eq.field({fuzzy: true})
    public name:string = "";

    @Eq.field({})
    public interior:TInterior = Interiors[0];

    @Ord.field({
        ordinality: 1
    })
    public set date(timestamp:number|Date){
        this._date = (timestamp === null) ? null :
            ((timestamp instanceof Date) ? timestamp : new Date(timestamp));
    }

    public get date():number|Date{
        return this._date;
    }

    constructor(){
        this.date = new Date();
    }

    greater:(a:IOrd)=>boolean;
    less:(a:IOrd)=>boolean;
    eq:(a:IEq)=>boolean;
    neq:(a:IEq)=>boolean;
}

@OrdAnd.implement({})
export class CarAnd extends Car {
}
