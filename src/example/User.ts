import Car from './Car'

export default class User
{
    name : string

    age : number

    car : Car

    constructor(name : string, age : number, car : Car)
    {
        this.name = name
        this.age  = age
        this.car  = car
    }
}
