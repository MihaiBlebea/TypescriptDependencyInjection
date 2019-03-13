import Container from './../Container'
import Car from './Car'
import User from './User'
import Salary from './Salary'
import Bike from './Bike'


let container = new Container()

container.register(Car)
         .as('Car')
         .dependsOnString('Mercedes')
         .dependsOnNumber(2500)

container.register(Bike)
         .as('Bike')
         .dependsOnString('Kawasaky')
         .dependsOnNumber(2)
         .dependsOnNumber(2500)

container.register(User)
         .as('User')
         .dependsOnString('Mihai')
         .dependsOnNumber(23)
         .dependsOn(Car)

// container.register(Salary)
//          .dependsOnNumber(70000)
//          .dependsOn(()=> new User('Mihai', 29, new Car('Renault', 1500)))


let user = container.get('User')
container.registered.map((register)=> {
    console.log(register)
})
console.log(user)
