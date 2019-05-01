import Dependency from './Dependency'


export default class Register
{
    private _alias : string

    private _constructor : Function

    private _dependencies : Dependency[] = []


    constructor(constructor : Function, alias? : string)
    {
        this._alias       = alias || Register.getAliasFromConstructor(constructor)
        this._constructor = constructor
    }

    get dependencies()
    {
        return this._dependencies
    }

    set dependencies(value : Dependency[])
    {
        this._dependencies = value
    }

    pushDependency(dependency : Dependency)
    {
        this._dependencies.push(dependency)
    }

    set alias(value : string)
    {
        this._alias = value
    }

    get alias() : string
    {
        return this._alias.toUpperCase()
    }

    sameAlias(alias : string)
    {
        return this.alias === alias.toUpperCase()
    }

    getConstructor()
    {
        return this._constructor
    }

    getConstructorName()
    {
        return this._constructor.name
    }

    static getAliasFromConstructor(object : Function) : string
    {
        return object.name
    }
}
