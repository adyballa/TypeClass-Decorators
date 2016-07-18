export interface IEq {
    _eq : {fields : Array<Field>},
    eq(a:IEq):boolean,
    neq(a:IEq):boolean
}

export function isEq(object:any):object is IEq {
    return ('eq' in object && 'neq' in object);
}

export class Field {

    constructor(public name:string) {}

    public eq(a:IEq, b:IEq) : boolean {
        let vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null) ? null : (vals[0] === vals[1]);
    }

    public neq(a:IEq, b:IEq) : boolean {
        let val = this.eq(a, b);
        return (val === null) ? null : !val;
    }

    protected value(object:IEq): number | string {
        return object[this.name];
    }
}

const
    _impl = function(method : string){
        return function (a:IEq) {
            let res = false;
            for (let i = 0, j = a._eq.fields.length; i < j; i++) {
                let val = (a._eq.fields[i][method](this, a));
                if(val !== null){
                    if(!val){
                        return false;
                    }
                    res = true;
                }
            }
            return res;
        }
    },
    implEq = function (target:Function) {
        target.prototype.eq = _impl("eq");
    },
    implNeq = function (target:Function) {
        target.prototype.neq = _impl("neq");
    }
;

export class Eq {

    private static _eq : {fields:Array<Field>} = {fields:[]};

    static type(target:Function) {
        let _f = [];
        for (let i = 0, j = Eq._eq.fields.length; i < j; i++) {
            if (Eq._eq.fields[i] !== undefined) {
                _f.push(Eq._eq.fields[i]);
            }
        }
        if (!("eq" in target.prototype)) {
            implEq(target);
        }
        if (!("neq" in target.prototype)) {
            implNeq(target);
        }
        if (!('_eq' in target.prototype)) {
            Object.defineProperty(target.prototype, '_eq', {
                value: {fields : _f}
            });
        }else{
            target.prototype._eq.fields = target.prototype._eq.fields.concat(_f);
        }
        Eq._eq.fields = [];
    }

    static field (target:Object, propertyKey:string) {
        Eq._eq.fields.push(new Field(propertyKey));
    }

    /**
     * @FIXME genauere Signatur
     */
    static eq(cs:IEq[], ref:Object):IEq[] {
        if (isEq(ref)) {
            return cs.filter((a:IEq) => {
                return (ref.eq(a));
            });
        }
        return [];
    }
}