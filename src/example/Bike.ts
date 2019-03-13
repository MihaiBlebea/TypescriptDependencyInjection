import ICar from './ICar'


export default class Bike implements ICar
{
    public brand : string

    public wheels : number

    public engine : number


    constructor(brand : string, wheels: number, engine : number)
    {
        this.brand = brand
        this.wheels = wheels
        this.engine = engine
    }
}
