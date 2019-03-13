import Container from './../Container'
import Car from './Car'
import User from './User'
import Salary from './Salary'


let container = new Container()

container.register(Car)
         .as('Car')
         .dependsOnString('Mercedes')
         .dependsOnNumber(2500)

container.register(User)
         .as('User')
         .dependsOnString('Mihai')
         .dependsOnNumber(23)
         .dependsOn(Car)

container.register(Salary)
         .dependsOnNumber(70000)
         .dependsOn(()=> new User('Mihai', 29, new Car('Renault', 1500)))

let salary = container.get('Salary')
container.registered.map((register)=> {
    console.log(register)
})
console.log(salary)
