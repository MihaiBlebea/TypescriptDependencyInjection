import Car from './Car'
import ICar from './ICar'


export default class User
{
    name : string

    age : number

    car : ICar

    constructor(name : string, age : number, car : ICar)
    {
        this.name = name
        this.age  = age
        this.car  = car
    }
}
