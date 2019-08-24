import Register from './Register'
import Dependency from './Dependency'


export default class Container
{
    //!REGISTER
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
        //!REGISTER
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

        //!REGISTER
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
            if(value[0] === '@')
            {
                last.pushDependency(new Dependency('class', value.slice(1)))
                return
            }

            if(value[0] === '~')
            {
                last.pushDependency(new Dependency('string', value.slice(1)))
                return
            }
            
            let found = this.findAlias(value)
            if(!found)
            {
                last.pushDependency(new Dependency('string', value))
                return
            } else {
                last.pushDependency(new Dependency('class', value))
                return
            }
        }

        if(typeof value === 'function')
        {
            //!REGISTER
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

    dependencies(...dependencies : any)
    {
        if(Array.isArray(dependencies[0]))
        {
            dependencies[0].map((dependency : string | number | boolean | Function)=> {
                console.log(dependency)
                this.dependsOn(dependency)
            })
        } else {
            dependencies.map((dependency : string | number | boolean | Function)=> {
                this.dependsOn(dependency)
            })
        }
    }

    test()
    {
        this.registered.map((item)=> {
            this.get(item.alias)
        })
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
        if(!found)
        {
            throw new Error(`Could not find ${ alias } dependency in the container`)
        }

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

    private findAlias(alias : string) : Register | null
    {
        let found = null
        this._registered.forEach((register)=> {
            if(register.sameAlias(alias))
            {
                found = register
            }
        })
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
