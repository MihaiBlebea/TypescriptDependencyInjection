
// type Registered = {
//     alias : string,
//     constructor : Function,
//     dependencies : Dependency[]
// }[]

import Register from './Register'
import Dependency from './Dependency'


export default class Container
{
    private _registered : Register[]


    constructor()
    {
        this._registered = []
    }

    merge(container : Container)
    {
        container.aliases().map((alias)=> {
            if(this.aliases().includes(alias))
            {
                throw Error(`Merger aborted. Alias ${ alias } already exists in the base container`)
            }
        })
        this._registered = this._registered.concat(container.registered)
        return this
    }


    get registered()
    {
        return this._registered
    }


    // Register dependency
    register(required : Function)
    {
        let register = new Register(required)
        this.registered.push(register)

        return this
    }

    as(alias : string)
    {
        // 1. Check that you are not setting the same alias as the existing one
        let last = this.getLastEntry()
        if(last.alias === alias)
        {
            throw Error(`You are setting the same alias as the existing one: ${ alias }`)
        }

        // 2. Make sure that the key is not a duplicate
        if(this.aliasExists(alias))
        {
            throw Error(`Alias ${ alias } is already registered in the container`)
        }

        // 3. Set new alias
        last.alias = alias
        return this
    }

    private aliasExists(alias : string) : boolean
    {
        let found = this.aliases().filter((savedAlias)=> {
            return savedAlias === alias.toUpperCase()
        })
        return found.length > 0 ? true : false
    }

    resolve(alias : string, callback : Function)
    {
        // 1. Make sure that the key is not a duplicate
        if(this.aliasExists(alias))
        {
            throw Error(`Alias ${ alias } is already registered in the container`)
        }

        // 2. Register the new resolver
        let register = new Register(callback, alias)
        this.registered.push(register)
    }

    dependsOn(value : string | number | boolean | Function)
    {
        let last = this.getLastEntry()

        if(typeof value === 'number')
        {
            last.pushDependency(new Dependency('number', value))
        }

        if(typeof value === 'boolean')
        {
            last.pushDependency(new Dependency('boolean', value))
        }

        if(typeof value === 'string')
        {
            try {
                this.findAlias(value)
                last.pushDependency(new Dependency('class', value))
            } catch(error) {
                last.pushDependency(new Dependency('string', value))
            }
        }

        if(typeof value === 'function')
        {
            let alias = Register.getAliasFromConstructor(value)
            if(!alias)
            {
                last.pushDependency(new Dependency('function', value))
            } else {
                last.pushDependency(new Dependency('class', value))
            }
        }

        return this
    }

    dependsOnClass(value : string)
    {
        let last = this.getLastEntry()
        last.pushDependency(new Dependency('class', value))
        return this
    }

    dependsOnString(value : string)
    {
        let last = this.getLastEntry()
        last.pushDependency(new Dependency('string', value))
        return this
    }

    dependsOnNumber(value : number)
    {
        let last = this.getLastEntry()
        last.pushDependency(new Dependency('number', value))
        return this
    }

    dependsOnBoolean(value : boolean)
    {
        let last = this.getLastEntry()
        last.pushDependency(new Dependency('boolean', value))
        return this
    }

    // Resolving dependencies
    get(alias : string)
    {
        // 1. Find by alias
        let found = this.findAlias(alias)

        // 2. If it's a callback just resolve it
        if(!found.getConstructorName())
        {
            let constructor = found.getConstructor()
            return constructor()
        }

        // 3. Resolve dependencies
        let dependencies = this.resolveDependencies(found.dependencies)

        // 4. Initialize object and pass in the dependencies
        return Reflect.construct(found.getConstructor(), dependencies)
    }

    private getLastEntry()
    {
        if(this._registered.length === 0)
        {
            throw new Error('The container is empty. Add a dependency first before creating alias')
        }
        return this._registered[this._registered.length - 1]
    }

    private findAlias(alias : string)
    {
        let found = this._registered.filter((register)=> {
            if(register.sameAlias(alias))
            {
                return register
            }
        })[0]

        if(!found)
        {
            throw new Error(`Could not find ${ alias } dependency in the container`)
        }
        return found
    }

    aliases()
    {
        return this._registered.map((register)=> register.alias )
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
