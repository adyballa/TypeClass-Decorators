import {EqField, IEq, isEq, Eq, IEqConfig, EqConfig, IEqProps, IField} from "./eq.typeclass";

export {EqField, IEq, isEq, Eq};

export const __NULL_STRING__ = "__NULL__";

export interface IFieldProperty {
    cardinality:number,
    dir?:TDirection,
    map?:Array<string>
}

export type TDirection = "ASC" | "DESC";

export interface IOrd extends IEq {
    greater(a:IOrd):boolean,
    greater(a:IOrd, config:IOrdConfig):boolean,
    less(a:IOrd):boolean,
    less(a:IOrd, config:IOrdConfig):boolean
}

export class Field extends EqField {

    public dir:TDirection;

    public map:Array<string>;

    constructor(public name:string, props:IFieldProperty) {
        super(name);
        this.map = ('map' in props) ? props.map : [];
        this.dir = ('dir' in props) ? props.dir : "ASC"
    }

    public greater(a:IOrd, b:IOrd):boolean {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null || vals[0] === vals[1]) {
            return null;
        } else {
            if (isOrd(vals[0])) {
                return (this.dir == "ASC") ? (<IOrd> vals[0]).greater(<IOrd> vals[1]) : (<IOrd> vals[0]).less(<IOrd> vals[1]);
            } else {
                return (this.dir == "ASC") ? (vals[0] > vals[1]) : (vals[0] < vals[1]);
            }
        }
    }

    public less(a:IOrd, b:IOrd):boolean {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null || vals[0] === vals[1]) {
            return null;
        } else {
            if (isOrd(vals[0])) {
                return (this.dir == "ASC") ? (<IOrd> vals[0]).less(b) : (<IOrd> vals[0]).greater(b);
            } else {
                return (this.dir == "ASC") ? (vals[0] < vals[1]) : (vals[0] > vals[1]);
            }
        }
    }

    public value(object:IOrd):number|string|IEq {
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
    return (typeof object === "object" && 'greater' in object && 'less' in object);
}

export function isFieldOrd(object:any):object is Field {
    return ('name' in object && 'map' in object);
}

export interface IOrdConfig extends IEqConfig {
    ordFields:Array<Field>
    eqFields:Array<EqField>
    fields:Array<EqField>
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

    public get eqFields():Array<EqField> {
        return this._fields;
    }

    public get ordFields():Array<Field> {
        return this._ordFields;
    }
}

export class Ord extends Eq {

    protected static _ord:{fields:Array<Field>} = {fields: []};

    protected static _impl(method:string){
        return function (a:IOrd, config?:IOrdConfig) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for (let field of config.ordFields) {
                let val = field[method](this, a);
                if (val !== null) return val;
            }
            return null;
        }
    }

    static implement(props?:IEqProps){
            return (target:Function) => {
                Eq.implementFields((props) ? <IOrdConfig> props.config : null, Ord._ord.fields);
                Ord._ord.fields = [];
                target.prototype.greater = this._impl('greater');
                target.prototype.less = this._impl('less');
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

export class OrdAnd extends Ord {

    protected static _impl(method:string): (a:IOrd, config?:IOrdConfig)=>(any|any) {
        return function (a:IOrd, config?:IOrdConfig) {
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            let res = null;
            for (let field of config.ordFields) {
                let val = field[method](this, a);
                if (val !== null) {
                    if (!val) return false;
                    res = true;
                }
            }
            return res;
        }
    }
};

export interface IRecord<T> {
    record(fieldName:string, method:string, value:string, data?:Object):void;
    play(fieldName:string, method:string, value:string):T
    reset();
}

export abstract class AbstractRecord<T> implements IRecord<T> {

    protected results:{}={};

    protected initVal : T;

    protected guarantee(obj:Object, key:string, value:any):this {
        if (!(key in obj)) {
            obj[key] = value;
        }
        return this;
    }

    protected abstract _record(fieldName:string, method:string, value:string, data?:Object);

    public play(fieldName:string, method:string, value:string):T {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {})
            .guarantee(this.results[fieldName][method], value, this.initVal);
        return this.results[fieldName][method][value];
    }

    public record(fieldName:string, method:string, value:string, data?:Object) {
        this.guarantee(this.results, fieldName, {})
            .guarantee(this.results[fieldName], method, {})
            .guarantee(this.results[fieldName][method], value, this.initVal);
        this._record(fieldName, method, value, data);
    }

    public reset() {
        this.results = {};
    }
}

export class CountRecord extends AbstractRecord<number>{

    protected initVal : number = 0;

    protected _record(fieldName:string, method:string, value:string, data?:Object) {
        this.results[fieldName][method][value]++;
    }

    recordOrdConfig(cs:IOrd[],config:IOrdConfig){
        cs.forEach((c:IOrd) => {config.fields.forEach( (field) => this.record(field.name,"eq",c[field.name]))});
    }
}

export class BorderRecord extends AbstractRecord<number>{

    protected initVal : number = 0;

    protected _record(fieldName:string, method:string, value:string, data?:Object) {
        this.results[fieldName][method]['min'] = ('min' in this.results[fieldName][method])
            ? Math.min(this.results[fieldName][method]['min'], parseFloat(value))
            : parseFloat(value);
        this.results[fieldName][method]['max'] = ('max' in this.results[fieldName][method])
            ? Math.max(this.results[fieldName][method]['max'], parseFloat(value))
            : parseFloat(value);
    }

    public record(fieldName:string, method:string, value:string, data?:Object) {
        this.guarantee(this.results,fieldName, {})
            .guarantee(this.results[fieldName], method, {});
        this._record(fieldName, method, value, data);
    }

    public recordOrdConfig(cs:IOrd[],config:IOrdConfig){
        for(let c of cs){
            for(let field of config.fields){
                this.record(field.name,"eq",c[field.name]);
            }
        }
    }
}
