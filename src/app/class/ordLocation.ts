import {IOrd, IOrdConfig} from "../decorators/ord.typeclass";
import {IEqConfig, IEq} from "../decorators/eq.typeclass";
/**
 * Created by Andreas on 26.07.2016.
 */

function isLocation(object:any):object is Location {
    return (typeof object === "object" && '_x' in object && '_y' in object && '_distance' in object);
}

export class OrdLocation implements IOrd {

    private _x:number;
    private _y:number;

    private _distance:number;

    constructor(x:number, y:number, dist:number) {
        this._x = Math.floor(x);
        this._y = Math.floor(y);
        this._distance = Math.floor(dist);
    }

    get x():number {
        return this._x;
    }

    get y():number {
        return this._y;
    }

    set distance(dist:number) {
        this._distance = dist * dist;
    }

    get distance() {
        return this._distance;
    }

    greater(a:IOrd, config?:IOrdConfig):boolean {
        if (isLocation(a)) {
            return (this._distance>((<OrdLocation> a).distance));
        }
        return null;
    }

    less(a:IOrd, config?:IOrdConfig):boolean {
        let res = this.greater(a);
        return (res===null) ? null : !res;
    }

    eq(a:IEq, config?:IEqConfig):boolean {
        if (isLocation(a)) {
            let d = Math.pow(Math.abs((<OrdLocation> a).x - this._x) + Math.abs((<OrdLocation> a).y - this._y), 2);
            return (d<=this._distance);
        }
        return null;
    }

    neq(a:IEq, config?:IEqConfig):boolean {
        let res = this.eq(a);
        return (res === null) ? null : !res;
    }

    toString():string{
        return "x:"+this._x+" y:"+this._y+" d:"+this._distance;
    }
}