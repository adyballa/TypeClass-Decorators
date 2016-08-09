/**
 * Created by Andreas on 14.07.2016.
 */
import {Ord, Eq, IOrd, OrdConfig, OrdAnd, IEq} from "decorator-ord";
import {OrdLocation} from "./ordLocation";

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
    private engine:number;

    @Ord.field({
        ordinality: 2,
        map: Colors
    })
    private color:TColor;

    @Ord.field({
        ordinality: 4,
        map: Brands
    })
    private brand:TBrand;

    @Ord.field({
        ordinality: 1
    })
    private date:Date;

    @Ord.field({
        ordinality: 5
    })
    private location:OrdLocation;

    @Eq.field({fuzzy: true})
    private name:string;

    @Eq.field({})
    private interior:TInterior;

    constructor(engine?:number, color?:TColor, brand?:TBrand, interior?:TInterior, timestamp?:number, location?:OrdLocation, name?:string) {
        this.engine = engine;
        this.color = color;
        this.brand = brand;
        this.interior = interior;
        this.date = (timestamp === null) ? null : new Date(timestamp);
        this.location = location;
        this.name = name;
    };

    greater:(a:IOrd)=>boolean;
    less:(a:IOrd)=>boolean;
    eq:(a:IEq)=>boolean;
    neq:(a:IEq)=>boolean;
}

@OrdAnd.implement({})
export class CarAnd extends Car {
}
