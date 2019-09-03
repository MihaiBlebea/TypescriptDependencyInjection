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
    constructor(private _names : string[])
    {
        //
    }
}

// let mihai = new Human('Mihai', 29)
// container.register(Human).dependsOnClass('Name').dependsOnClass('Age')

container.register(Human).dependsOn(['Serban', 'Iulia', 'Nathi'])


let mihai = container.get('Human')

// console.log(mihai)

container.test()