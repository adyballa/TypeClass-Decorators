export class History<Item>{
    private _items : Array<Item> = [];

    constructor(private _length : number = 0){}

    unshift(item:Item):Item{
        this._items.unshift(item);
        return (this._items.length>this._length)? this._items.pop() : null;
    }

    get(i:number = 0):Item{
        return (i>this._length) ? this._items[this._length-1] : this._items[i];
    }
}
