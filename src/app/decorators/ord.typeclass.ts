import {Field as EqField, IEq, isEq, Eq} from "./eq.typeclass";

export {EqField, IEq, isEq, Eq};

export interface IFieldProperty {
    cardinality:number,
    map?:Array<string>
}

export interface IOrd extends IEq {
    _ord:{fields:Array<Field>},
    greater(a:IOrd):boolean,
    less(a:IOrd):boolean
}

export class Field extends EqField {

    public map:Array<string>;

    constructor(public name:string, props:IFieldProperty) {
        super(name);
        this.map = ('map' in props) ? props.map : [];
    }

    public greater(a:IOrd, b:IOrd):boolean {
        let vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null || vals[0] === vals[1]) ? null : (vals[0] > vals[1]);
    }

    public less(a:IOrd, b:IOrd):boolean {
        let vals = [this.value(a), this.value(b)];
        return (vals[0] === null || vals[1] === null || vals[0] === vals[1]) ? null : (vals[0] < vals[1]);
    }

    public value(object:IOrd):number|string {
        let val = object[this.name];
        if (val === null) {
            return null;
        }
        if (this.map.length) {
            return this.map.indexOf(object[this.name]);
        } else {
            return super.value(object);
        }
    }
}

export function isOrd(object:any):object is IOrd {
    return ('greater' in object && 'less' in object);
}

export function isFieldOrd(object:any):object is Field {
    return ('name' in object && 'map' in object);
}

const
    _impl = function (method:string) {
        return function (a:IOrd) {
            for (let i = 0, j = a._ord.fields.length; i < j; i++) {
                let val = (a._ord.fields[i][method](this, a));
                if (val !== null) {
                    return val;
                }
            }
            return false;
        }
    },
    implGreater = function (target:Function) {
        target.prototype.greater = _impl('greater');
    },
    implLess = function (target:Function) {
        target.prototype.less = _impl('less');
    }
    ;

export class Ord extends Eq {

    private static _ord:{fields:Array<Field>} = {fields: []};

    static implementFields(target:Function) {
        let _f = [];
        for (let i = 0, j = Ord._ord.fields.length; i < j; i++) {
            if (Ord._ord.fields[i] !== undefined) {
                _f.push(Ord._ord.fields[i]);
            }
        }

        if (!('_ord' in Object.getOwnPropertyNames(target.prototype))) {
            Object.defineProperty(target.prototype, '_ord', {
                value: {fields: _f}
            });
        } else {
            target.prototype._ord.fields = target.prototype._ord.fields.concat(_f);
        }

        if (!('_eq' in target.prototype)) {
            Object.defineProperty(target.prototype, '_eq', {
                value: {fields: _f}
            });
        } else {
            target.prototype._eq.fields = target.prototype._eq.fields.concat(_f);
        }

        Ord._ord.fields = [];
    }

    static implement(target:Function) {
        Ord.implementFields(target);
        implGreater(target);
        implLess(target);
        super.implement(target);
    }

    static field(props:IFieldProperty) {
        return function (target:Object, propertyKey:string) {
            Ord._ord.fields[props.cardinality] = new Field(propertyKey, props);
        }
    }

    static sort(cs:IOrd[]):IOrd[] {
        return cs.slice(0).sort((a:IOrd, b:IOrd) => {
            let val = a.greater(b);
            return (val === null || (!val && a.eq(b))) ? 0 : ( (val) ? 1 : -1 );
        });
    }

    static greater(cs:IOrd[], ref:IOrd):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (ref.less(a));
        });
    }

    static less(cs:IOrd[], ref:IOrd):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (ref.greater(a));
        });
    }

    static inRange(cs:IOrd[], top:IOrd, bottom:IOrd):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (top.greater(a) !== false && bottom.less(a) !== false);
        });
    }

    static setCardinality(cs:IOrd[], name:string, newIndex = 0) {
        cs.map((item:IOrd) => {
            let oldKey = item._ord.fields.findIndex((val:EqField) => {
                return (val.name === name);
            }), old = item._ord.fields[newIndex];
            item._ord.fields.splice(newIndex, 0, item._ord.fields.splice(oldKey, 1)[0]);
        });
    }
}

const
    _implAnd = function (method:string) {
        return function (a:IOrd) {
            let res = null;
            for (let i = 0, j = a._ord.fields.length; i < j; i++) {
                let val = (a._ord.fields[i][method](this, a));
                if (val !== null) {
                    if (!val) return false;
                    res = true;
                }
            }
            return res;
        }
    },
    implGreaterAnd = function (target:Function) {
        target.prototype.greater = _implAnd('greater');
    },
    implLessAnd = function (target:Function) {
        target.prototype.less = _implAnd('less');
    }
    ;

export class OrdAnd extends Ord {

    static implement(target:Function) {
        implGreaterAnd(target);
        implLessAnd(target);
        Ord.implementFields(target);
        Eq.implement.apply(this, [target]);
    }
}
