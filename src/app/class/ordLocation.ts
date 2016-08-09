import {IOrd, IOrdConfig, IEqConfig, IEq} from "decorator-ord";
/**
 * Created by Andreas on 26.07.2016.
 */

function isLocation(object:any):object is Location {
    return (typeof object === "object" && 'x' in object && 'y' in object && '_distance' in object);
}

export class OrdLocation implements IOrd {

    public x:number;
    public y:number;

    private _distance:number;

    constructor(x:number, y:number, dist:number) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this._distance = Math.floor(dist);
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
            let d = Math.pow(Math.abs((<OrdLocation> a).x - this.x) + Math.abs((<OrdLocation> a).y - this.y), 2);
            return (d<=this._distance);
        }
        return null;
    }

    neq(a:IEq, config?:IEqConfig):boolean {
        let res = this.eq(a);
        return (res === null) ? null : !res;
    }

    toString():string{
        return "x:"+this.x+" y:"+this.y+" d:"+this._distance;
    }
}