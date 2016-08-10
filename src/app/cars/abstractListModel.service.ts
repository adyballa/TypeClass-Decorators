import {OrdConfig, IOrdConfig, IOrd, EqField} from "decorator-ord";

export abstract class AbstractListModelService<ITEM extends IOrd, ITEM_AND extends IOrd> {

    protected _list:IOrd[] = [];
    public result:IOrd[] = [];
    protected _config:IOrdConfig = new OrdConfig();
//ctor:{ new(...args:any[]):ITEM
    constructor(private item:{ new(...args:any[]):ITEM} , private itemAnd:{ new(...args:any[]):ITEM_AND}) {
        this.result = this.list;
        this.getList().then((list:IOrd[]) => {
            this._list = list.slice(0);
            this.result = list;
        });
    }

    public abstract getOptions(name:string):Array<string>;

    public abstract getModel():IOrd;

    public getConfig():IOrdConfig {
        return this._config;
    }

    get fields():EqField[] {
        return this._config.fields;
    }

    get list():IOrd[] {
        return this._list;
    }

    protected abstract getParams(props:any):Array<any>;

    protected createItemByParams(params:any[]):IOrd {
        return new this.item(...params);
    }

    protected createItemAndByParams(params:any[]):IOrd {
        return new this.itemAnd(...params);
    }

    public createItem(props:any = {}):IOrd {
        return this.createItemByParams(this.getParams(props));
    }

    public createItems(props:any = {}):IOrd[] {
        let res = [];
        this.formatProps(this.getParams(props)).forEach((propsRow:Array<any>) => {
            res.push(this.createItemByParams(propsRow));
        });
        return res;
    }

    public createAndItem(props:any = {}):IOrd {
        return this.createItemAndByParams(this.getParams(props));
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
        props.forEach((prop) => l = l * ((Array.isArray(prop)) ? prop.length : 1));
        perRow = l;
        for (let i = 0; i < l; i++) {
            res.push(new Array(props.length).fill(null, 0, props.length));
        }
        props.forEach((prop, x) => {
            let _prop = (Array.isArray(prop)) ? prop : [prop];
            perRow /= _prop.length;
            for (let a = 0; a < (l / (_prop.length * perRow)); a++) {
                _prop.forEach((val, y) => {
                    for (let i = 0; i < perRow; i++) {
                        res[a * perRow + i + y][x] = val;
                    }
                });
            }
        });
        return res;
    }

    public setList(limit?:number):Promise<void> {
        return this.getList(limit).then((list:IOrd[]) => {
            this._list = list.slice(0);
            this.result = list;
        });
    }

    protected abstract getList(limit?:number):Promise<IOrd[]>;
}
