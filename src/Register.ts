type Dependency = {
    type: string,
    value: string | number | Boolean | Function
}


export default class Register
{
    private _alias : string

    private _constructor : Function

    private _dependencies : Dependency[] = []


    constructor(constructor : Function, alias? : string)
    {
        this._alias       = alias || this.getAliasFromConstructor(constructor)
        this._constructor = constructor
    }

    set dependencies(value : Dependency[])
    {
        this._dependencies = value
    }

    set alias(value : string)
    {
        this._alias = value
    }

    get alias() : string
    {
        return this._alias
    }

    private getAliasFromConstructor(object : Function) : string
    {
        return object.name
    }
}
