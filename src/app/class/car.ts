/**
 * Created by Andreas on 14.07.2016.
 */
import {Ord, Eq, IOrd, OrdAnd, Field} from "../decorators/ord.typeclass";
import {IEq} from "../decorators/eq.typeclass";

type TColor = "yellow" | "red" | "blue";
type TBrand = "bmw" | "pontiac" | "honda";
type TInterior = "leder" | "kunstleder" | "plastik";

export const Brands : TBrand[] = ['bmw', 'pontiac','honda'];
export const Colors : TColor[] = ['yellow','red','blue'];
export const Interiors : TInterior[] = ['leder','kunstleder','plastik'];

@Ord.implement
export class Car implements IOrd{
    @Ord.field({
        cardinality:2
    })
    private engine : number;

    @Ord.field({
        cardinality:1,
        map:Colors
    })
    private color : TColor;

    @Ord.field({
        cardinality:3,
        map:Brands
    })
    private brand : TBrand;

    @Eq.field
    private interior : TInterior;

    constructor(engine : number, color : TColor, brand : TBrand, interior : TInterior){
        this.engine = engine;
        this.color = color;
        this.brand = brand;
        this.interior = interior;
    };

    _ord:{fields:Field []};
    _eq:{fields:Field []};
    greater:(a:IOrd)=>boolean;
    less:(a:IOrd)=>boolean;
    eq:(a:IEq)=>boolean;
    neq:(a:IEq)=>boolean;

}

@OrdAnd.implement
export class CarAnd extends Car{
}