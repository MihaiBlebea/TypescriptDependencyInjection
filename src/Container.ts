
type Registered = { alias : String, constructor : Function, dependencies : String[] }[]


export class Container
{
    private registered : Registered

    constructor()
    {
        this.registered = []
    }

    register(required : Function)
    {
        this.registered.push({
            alias: this.getAliasFromConstructor(required),
            constructor: required,
            dependencies: []
        })

        return this
    }

    as(alias : String)
    {
        let last = this.getLastEntry()
        last.alias = alias
        return this
    }

    dependsOn(alias : String)
    {
        let last = this.getLastEntry()
        last.dependencies.push(alias)
        return this
    }

    get(alias : String)
    {
        let found = this.findAlias(alias)
        let dependencies = this.resolveDependencies(found.dependencies)

        return Reflect.construct(found.constructor, dependencies)
    }

    private getAliasFromConstructor(object : Function)
    {
        return object.constructor.name
    }

    private getLastEntry()
    {
        if(this.registered.length === 0)
        {
            throw new Error('The container is empty. Add a dependency first before creating alias')
        }
        return this.registered[this.registered.length - 1]
    }

    private findAlias(alias : String)
    {
        let found = this.registered.filter((item)=> {
            if(item.alias.toLowerCase() === alias.toLowerCase())
            {
                return item
            }
        })[0]

        if(!found)
        {
            throw new Error(`Could not find ${ alias.toUpperCase() } dependency in the container`)
        }
        return found
    }

    private aliases()
    {
        return this.registered.map((item)=> {
            return item.alias.toLowerCase()
        })
    }

    private resolveDependencies(dependencies : Object[]) : Object[]
    {
        return dependencies.map((dependency)=> {
            if(typeof dependency === 'string' && this.aliases().includes(dependency.toLowerCase()))
            {
                return this.get(dependency)
            }
            return dependency
        })
    }
}
