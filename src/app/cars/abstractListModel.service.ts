import {IOrd, Ord} from "../decorators/ord.typeclass";
import {Field} from "../decorators/eq.typeclass";
import {Car} from "../class/car";

export abstract class AbstractListModelService{

    protected _list : IOrd[] = [];
    public result : IOrd[] = [];

    constructor() {
        this.result = this.list;
        this.getList().then((list : IOrd[]) => {
            this._list = list.slice(0);
            this.result = list;
        });
    }

    public abstract createItem(props:any) : IOrd;

    public abstract getOptions(name:string) : Array<string>;

    public abstract getModel() : IOrd;

    get fields() : Field[] {
        return this.getModel()._eq.fields;
    }

    get list() : IOrd[] {
        return this._list;
    }

    protected createItemByParams<IOrd>(ctor: { new(...args: any[]): IOrd }, params : any[]):IOrd {
        return new ctor(...params);
    }

    /**
     * Erstelle Array mit Reihen fester Länge von passenden Eigenschaften aus
     * Array mit Reihen gleichen Eigenschaften.
     * 1.) Spiegelung von x auf y
     * 2.) Bilde das Kreuzprodukt aus allen Eigenschaften
     * 3.) Fülle mit null-werten auf.
     *
     * bsp.:
     * input: [null, ['red','yellow'],['bmw','honda']]
     * output: [[null, 'red', 'bmw'], [null, 'red','honda'],[null,'yellow','bmw'],[null,'yellow','honda']]
     *
     * @param props
     * @returns {Array}
     */
    protected formatProps(props:Array<any>):Array<Array<string|number>> {
        let l = 1, res = [], perRow = 0;
        props.forEach((prop) => l = l*((Array.isArray(prop)) ? prop.length : 1));
        perRow = l;
        for(let i = 0; i < l; i++){
            res.push(new Array(props.length).fill(null,0,props.length));
        }
        props.forEach((prop, x) => {
            let _prop = (Array.isArray(prop)) ? prop : [prop];
            perRow /= _prop.length;
            for(let a = 0 ; a < (l/(_prop.length*perRow)); a++){
                _prop.forEach((val, y) => {
                    for(let i = 0; i < perRow; i++){
                        res[a*perRow+i+y][x] = val;
                    }
                });
            }
        });
        return res;
    }

    protected abstract getList() : Promise<IOrd[]>;
}