export interface IEq {
    _eq:{fields:Array<Field>},
    eq(a:IEq):boolean,
    neq(a:IEq):boolean
}

export function isEq(object:any):object is IEq {
    return ('eq' in object && 'neq' in object);
}

export class Field {

    constructor(public name:string) {
    }

    public eq(a:IEq, b:IEq):boolean {
        let vals = [this.value(a), this.value(b)];
        return (vals[0] === vals[1]) ? true : (vals[0] === null || vals[1] === null) ? null : false;
    }

    public neq(a:IEq, b:IEq):boolean {
        let val = this.eq(a, b);
        return (val === null) ? null : !val;
    }

    public value(object:IEq):number | string {
        return object[this.name];
    }
}

const
    _impl = function (method:string) {
        return function (a:any) {
            let res = null;
            for (let i = 0, j = a._eq.fields.length; i < j; i++) {
                let val = (a._eq.fields[i][method](this, a));
                if (val !== null) {
                    if (!val) {
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

    private static _eq:{fields:Array<Field>} = {fields: []};

    static implementFields(target:Function) {
        let _f = [];
        for (let i = 0, j = Eq._eq.fields.length; i < j; i++) {
            if (Eq._eq.fields[i] !== undefined) {
                _f.push(Eq._eq.fields[i]);
            }
        }
        if (!('_eq' in target.prototype)) {
            Object.defineProperty(target.prototype, '_eq', {
                value: {fields: _f}
            });
        } else {
            target.prototype._eq.fields = target.prototype._eq.fields.concat(_f);
        }
        Eq._eq.fields = [];
    }

    static implement(config:Object){
        return function(target){
            Eq.implementFields(target);
            implEq(target);
            implNeq(target);
        }
    }

    static field(target:Object, propertyKey:string) {
        Eq._eq.fields.push(new Field(propertyKey));
    }

    static eq(cs:IEq[], ref:IEq):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a));
        });
    }

    static fuzzyEq(cs:IEq[], ref:IEq):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a)!==false);
        });
    }

    static neq(cs:IEq[], ref:IEq):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a)===false);
        });
    }
}

export class EqOr{

    static fuzzyEq(cs:IEq[], refs:IEq[]):IEq[] {
        return cs.filter((a:IEq) => {
            return (refs.filter((ref:IEq) => {
                return (ref.eq(a)!==false);
            }).length>0);
        });
    }

}