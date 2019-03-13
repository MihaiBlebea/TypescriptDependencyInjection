
type Registered = { alias : string, constructor : Function, dependencies : Dependency[] }[]
type Dependency = { type: string, value: string | number | Boolean | Function }


export default class Container
{
    private _registered : Registered

    constructor()
    {
        this._registered = []
    }

    get registered()
    {
        return this._registered
    }


    // Register dependency

    register(required : Function)
    {
        this.registered.push({
            alias: this.getAliasFromConstructor(required),
            constructor: required,
            dependencies: []
        })

        return this
    }

    as(alias : string)
    {
        let last = this.getLastEntry()
        last.alias = alias
        return this
    }

    dependsOn(value : string | number | boolean | Function)
    {
        let last = this.getLastEntry()

        console.log(typeof value)

        if(typeof value === 'number')
        {
            last.dependencies.push({ type: 'number', value: value })
        }

        if(typeof value === 'boolean')
        {
            last.dependencies.push({ type: 'boolean', value: value })
        }

        if(typeof value === 'string')
        {
            try {
                this.findAlias(value)
                last.dependencies.push({ type: 'class', value: value })
            } catch(error) {
                last.dependencies.push({ type: 'string', value: value })
            }
        }

        if(typeof value === 'function')
        {
            let alias = this.getAliasFromConstructor(value)
            if(!alias)
            {
                last.dependencies.push({ type: 'callback', value: value })
            } else {
                last.dependencies.push({ type: 'class', value: alias })
            }
        }

        return this
    }

    dependsOnClass(value : string)
    {
        let last = this.getLastEntry()
        last.dependencies.push({ type: 'class', value: value })
        return this
    }

    dependsOnString(value : string)
    {
        let last = this.getLastEntry()
        last.dependencies.push({ type: 'string', value: value })
        return this
    }

    dependsOnNumber(value : number)
    {
        let last = this.getLastEntry()
        last.dependencies.push({ type: 'number', value: value })
        return this
    }

    dependsOnBoolean(value : boolean)
    {
        let last = this.getLastEntry()
        last.dependencies.push({ type: 'boolean', value: value })
        return this
    }


    // Resolving dependencies

    get(alias : String)
    {
        let found = this.findAlias(alias)
        let dependencies = this.resolveDependencies(found.dependencies)

        return Reflect.construct(found.constructor, dependencies)
    }

    private getAliasFromConstructor(object : Function)
    {
        return object.name
    }

    private getLastEntry()
    {
        if(this._registered.length === 0)
        {
            throw new Error('The container is empty. Add a dependency first before creating alias')
        }
        return this._registered[this._registered.length - 1]
    }

    private findAlias(alias : String)
    {
        let found = this._registered.filter((item)=> {
            if(item.alias.toLowerCase() === alias.toLowerCase())
            {
                return item
            }
        })[0]

        console.log('Item found:', found)

        if(!found)
        {
            throw new Error(`Could not find ${ alias.toUpperCase() } dependency in the container`)
        }
        return found
    }

    private aliases()
    {
        return this._registered.map((item)=> {
            return item.alias.toLowerCase()
        })
    }

    private resolveDependencies(dependencies : Dependency[]) : string[]
    {
        return dependencies.map((dependency)=> {
            if(['string', 'number', 'boolean'].includes(dependency.type))
            {
                return dependency.value
            }

            if(dependency.type === 'class')
            {
                return this.get(<string>dependency.value)
            }

            if(typeof dependency.value === 'function')
            {
                return dependency.value()
            }

            throw Error('Dependency type not found')
        })
    }
}
