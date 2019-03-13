import ICar from './ICar'


export default class Car implements ICar
{
    brand : string

    engine : number

    constructor(brand : string, engine : number)
    {
        this.brand  = brand
        this.engine = engine
    }
}
