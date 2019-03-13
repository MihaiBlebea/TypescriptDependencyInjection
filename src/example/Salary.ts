import User from './User'


export default class Salary
{
    public money : number

    public user : User

    constructor(money : number, user : User)
    {
        this.money = money
        this.user  = user
    }
}
