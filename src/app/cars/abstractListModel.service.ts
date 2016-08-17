import {OrdConfig, IOrdConfig, IOrd, EqField, IEqConfig, IField, isFieldOrd, IOrdField, CountRecord, BorderRecord} from "decorator-ord";

export abstract class AbstractListModelService<ITEM extends IOrd, ITEM_AND extends IOrd> {

    protected _list:ITEM[] = [];
    private _result:ITEM[] = [];
    protected _config:IOrdConfig = new OrdConfig();
    private _countRecord:CountRecord = new CountRecord();
    private _borderRecord:BorderRecord = new BorderRecord();

    public get borderRecord() {
        return this._borderRecord;
    }

    public get countRecord() {
        return this._countRecord;
    }

    set result(value:IOrd[]) {
        this._result = <ITEM[]> value;
    }

    constructor(private item:{ new(...args:any[]):ITEM}, private itemAnd:{ new(...args:any[]):ITEM_AND}) {
        this._result = this.list;
        this.getList().then((list) => {
            this._list = list.slice(0);
            this._result = list;
        });
    }

    public getModel():ITEM {
        return new this.item();
    }

    public getConfig():IOrdConfig {
        return this._config;
    }

    get fields():EqField[] {
        return this._config.fields;
    }

    get list():ITEM[] {
        return this._list;
    }

    public getOptions(name:string):Array<string> {
        for(let field of (<IEqConfig>this._config).fields) {
            if (field.name === name && (isFieldOrd(field) && (<IOrdField> field).map.length)) {
                return (<IOrdField> field).map;
            }
        }
    }

    private implParams(params:any, obj:IOrd):IOrd{
        (<IEqConfig> this._config).fields.forEach((field:IField) => {
            if(Object.keys(params).indexOf(field.name)>-1){
                obj[field.name] = params[field.name];
            }else{
                obj[field.name] = null;
            }
        });
        return obj;
    }

    protected createItemByParams(params:any):ITEM {
        return <ITEM> this.implParams(params, new this.item());
    }

    protected createItemAndByParams(params:any[]):ITEM_AND {
        return <ITEM_AND> this.implParams(params, new this.itemAnd());
    }

    public createItem(props:any = {}):ITEM {
        return this.createItemByParams(props);
    }

    public createItems(props:any = {}):ITEM[] {
        let res = [];
        this.formatPropsObject(props).forEach((props:any) => {
            res.push(this.createItemByParams(props));
        });
        return res;
    }

    public createAndItem(props:any = {}):ITEM_AND {
        return this.createItemAndByParams(props);
    }

    /**
     * Erstellt aus einem Objekt aus Array-Werten Objekte aus allen Kombinationen.
     *
     * bsp.:
     * input: {engine:null,color:['red','yellow'],brand:['bmw','honda']}
     * output: [{engine:null, color:'red', brand:'bmw'}, {engine:null, color:'red',brand:'honda'],
     * {engine:null,color:'yellow',brand:'bmw'},{engine:null,color:'yellow',brand:'honda'}]
     *
     * @param {any} props
     * @returns {any}
     */
    protected formatPropsObject(props:any):Array<any> {
        let res = [{}];
        for(let field of (<IEqConfig> this._config).fields){
            if(field.name in props){
                if (Array.isArray(props[field.name])) {
                    for (let i = 0; i < res.length * props[field.name].length; i++) {
                        res[i] = res[i % res.length];
                        res[i][field.name] = props[field.name][i % props[field.name].length];
                    }
                } else {
                    res.forEach((resProps) => {
                        resProps[field.name] = props[field.name];
                    });
                }
            }else{
                res.forEach((resProps) => {
                    resProps[field.name] = null;
                });
            }
        }
        return res;
    }

    public setList(limit?:number):Promise<void> {
        return this.getList(limit).then((list:ITEM[]) => {
            this._list = list.slice(0);
            this._result = list;
        });
    }

    protected abstract getList(limit?:number):Promise<ITEM[]>;
}
