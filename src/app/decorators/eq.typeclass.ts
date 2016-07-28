export interface IEq {
    eq(a:IEq):boolean,
    eq(a:IEq, config:IEqConfig): boolean;
    neq(a:IEq):boolean
    neq(a:IEq, config:IEqConfig): boolean;
}

export function isEq(object:any):object is IEq {
    return (typeof object === 'object' && 'eq' in object && 'neq' in object);
}

export interface IField{
    name:string;
    eq:(a:IEq, b:IEq)=>boolean;
    neq:(a:IEq, b:IEq)=>boolean;
    value:(object:IEq)=>number | string | IEq;
}

export class EqField implements IField{

    constructor(public name:string) {}

    public eq(a:IEq, b:IEq):boolean {
        let vals = [this.value(a), this.value(b)];
        if (vals[0] === null || vals[1] === null) {
            return null;
        }else{
            return (isEq(vals[0])) ? (<IEq> vals[0]).eq(<IEq> vals[1]) : vals[0] === vals[1];
        }
    }

    public neq(a:IEq, b:IEq):boolean {
        let val = this.eq(a, b);
        return (val === null) ? null : !val;
    }

    public value(object:IEq):number | string | IEq {
        return object[this.name];
    }
}

const
    _impl = function (method:string) {
        return function (a:any, config?:IEqConfig) {
            let res = null;
            if (!config) {
                throw new Error("Method " + method + " cannot be run without config.");
            }
            for(let i = 0; i < config.fields.length; i++){
                let val = config.fields[i][method](this, a);
                if (val !== null) {
                    if (!val) return false;
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


export interface IEqConfig {
    fields:Array<IField>,
}

export class EqConfig implements IEqConfig {

    protected _fields:Array<IField> = [];

    public get fields():Array<IField>{
        return this._fields;
    }

    public set fields(fields:Array<IField>){
        this._fields = fields;
    }

    public static setCardinalityOfField(name:string, fields : Array<IField>, newIndex = 0) {
        let oldKey = fields.findIndex((field:IField) => {
            return (field.name === name);
        });
        fields.splice(newIndex, 0, fields.splice(oldKey, 1)[0]);
    }
}

export interface IEqProps{
    config? : IEqConfig;
}

export class Eq {

    protected static _eq:{fields:Array<EqField>} = {fields:[]};

    static implementFields(config?:IEqConfig, fields : Array<EqField> = []) {
        let _f = [];
        for (let i = 0, j = fields.length; i < j; i++) {
            if (fields[i] !== undefined) {
                _f.push(fields[i]);
            }
        }
        if(config){
            config.fields = _f;
        }
    }

    static implement(props? : IEqProps){
        return (target:Function) => {
            Eq.implementFields((props) ? props.config : null , Eq._eq.fields);
            Eq._eq.fields = [];
            implEq(target);
            implNeq(target);
        }
    }

    static field(target:Object, propertyKey:string) {
        Eq._eq.fields.push(new EqField(propertyKey));
    }

    static eq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return ref.eq(a, config);
        });
    }

    static fuzzyEq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a, config) !== false);
        });
    }

    static neq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (ref.eq(a, config) === false);
        });
    }
}

export class EqOr {

    static fuzzyEq(cs:IEq[], refs:IEq[], config:IEqConfig):IEq[] {
        return cs.filter((a:IEq) => {
            return (refs.filter((ref:IEq) => {
                return (ref.eq(a, config) !== false);
            }).length > 0);
        });
    }

}