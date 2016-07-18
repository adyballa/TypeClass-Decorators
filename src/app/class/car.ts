/**
 * Created by Andreas on 14.07.2016.
 */
import { Ord, Eq } from "../decorators/ord.typeclass";
export const Colors : TColor[] = ['yellow','red','blue'];
type TColor = "yellow" | "red" | "blue";
export const Brands : TBrand[] = ['bmw', 'pontiac'];
type TBrand = "bmw" | "pontiac";

@Ord.type
export class Car{
    @Ord.field({
        cardinality:2
    })
    private engine : number;

    @Ord.field({
        cardinality:1,
        map:Colors
    })
    private color : TColor;

    @Eq.field
    private brand : TBrand;

    constructor(engine : number, color : TColor, brand : TBrand){
        this.engine = engine;
        this.color = color;
        this.brand = brand;
    }
}
