import Container from './Container'

let container = new Container()

class Name
{
    constructor(private _value : string)
    {
        //
    }

    get value()
    {
        return this._value
    }
}

class Age
{
    constructor(private _value : number)
    {
        //
    }

    get value()
    {
        return this._value
    }
}

class Human
{
    constructor(private _name : Name, private _age : Age)
    {
        //
    }

    get name()
    {
        return this._name.value
    }

    get age()
    {
        return this._age.value
    }
}

// let mihai = new Human('Mihai', 29)
// container.register(Human).dependsOnClass('Name').dependsOnClass('Age')

container.register(Name).dependencies('Serban')

container.register(Age).dependencies(30)

container.register(Human).dependencies('@Name', 31)

let mihai = container.get('Human')

console.log(mihai)

container.test()