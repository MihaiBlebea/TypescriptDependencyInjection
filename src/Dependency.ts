export default class Dependency
{
    private _type : string

    private _value : string | number | boolean | Function

    private _validTypes = [
        'string',
        'number',
        'boolean',
        'function',
        'class'
    ]

    constructor(type : string, value : string | number | boolean | Function)
    {
        this.assertValidType(type)

        this._type  = type
        this._value = value
    }

    private assertValidType(type : string)
    {
        if(!this._validTypes.includes(type))
        {
            throw Error(`Invalid type supplied: ${ type }`)
        }
    }

    get type()
    {
        return this._type
    }

    get value()
    {
        return this._value
    }
}
