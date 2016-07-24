import {EqField, IEq, isEq, Eq, IEqConfig, EqConfig, IEqProps, IField} from "./eq.typeclass";

export {EqField, IEq, isEq, Eq};

export interface IFieldProperty {
    cardinality:number,
    map?:Array<string>
}

export interface IOrd extends IEq {
    greater(a:IOrd):boolean,
    greater(a:IOrd, config:IOrdConfig):boolean,
    less(a:IOrd):boolean,
    less(a:IOrd, config:IOrdConfig):boolean
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
        return function (a:IOrd, config?:IOrdConfig) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for(let i = 0; i < config.ordFields.length; i++){
                let val = config.ordFields[i][method](this, a);
                if (val !== null) return val;
            }
            return null;
        }
    },
    implGreater = function (target:Function) {
        target.prototype.greater = _impl('greater');
    },
    implLess = function (target:Function) {
        target.prototype.less = _impl('less');
    }
    ;

export interface IOrdConfig extends IEqConfig {
    ordFields:Array<Field>
}

export class OrdConfig extends EqConfig implements IOrdConfig {

    protected _ordFields:Array<Field> = [];

    public set fields(fields:Array<IField>) {
        this._fields = fields;
        this._fields.forEach((field:Field) => {
            if (isFieldOrd(field)) {
                this._ordFields.push(field);
            }
        });
    }

    public get fields():Array<IField> {
        return (<IField[]> this._ordFields).concat(this._fields);
    }

    public get ordFields():Array<Field> {
        return this._ordFields;
    }
}

export class Ord extends Eq {

    protected static _ord:{fields:Array<Field>} = {fields: []};

    static implement(props?:IEqProps) {
        return (target:Function) => {
            Eq.implementFields((props) ? <IOrdConfig> props.config : null, Ord._ord.fields);
            Ord._ord.fields = [];
            implGreater(target);
            implLess(target);
            Eq.implement(props).apply(this, [target]);
        }
    }

    static field(props:IFieldProperty) {
        return function (target:Object, propertyKey:string) {
            Ord._ord.fields[props.cardinality] = new Field(propertyKey, props);
        }
    }

    static sort(cs:IOrd[], config:IOrdConfig):IOrd[] {
        return cs.slice(0).sort((a:IOrd, b:IOrd) => {
            let val = a.greater(b, config);
            return (val === null || (!val && a.eq(b, config))) ? 0 : ( (val) ? 1 : -1 );
        });
    }

    static greater(cs:IOrd[], ref:IOrd, config:IOrdConfig):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (ref.less(a, config));
        });
    }

    static less(cs:IOrd[], ref:IOrd, config:IOrdConfig):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (ref.greater(a, config));
        });
    }

    static inRange(cs:IOrd[], top:IOrd, bottom:IOrd, config:IOrdConfig):IOrd[] {
        return cs.filter((a:IOrd) => {
            return (top.greater(a, config) !== false && bottom.less(a, config) !== false);
        });
    }
}

const
    _implAnd = function (method:string) {
        return function (a:IOrd, config:IOrdConfig) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            let res = null;
            for(let i = 0; i < config.ordFields.length; i++) {
                let val = config.ordFields[i][method](this, a);
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

    static implement(props?:IEqProps) {
        return (target:Function) => {
            Eq.implementFields((props) ? <IOrdConfig> props.config : null, Ord._ord.fields);
            Ord._ord.fields = [];
            implGreaterAnd(target);
            implLessAnd(target);
            Eq.implement(props).apply(this, [target]);
        }
    }
}
