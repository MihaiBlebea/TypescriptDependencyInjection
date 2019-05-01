import Container from './../Container'
import Car from './Car'
import User from './User'
import Salary from './Salary'
import Bike from './Bike'
import Register from './../Register'

import { container as carContainer } from './cars-container'


let container = new Container

// container.register(Car)
//          .dependsOnString('Mercedes')
//          .dependsOnNumber(2500)
//
// container.register(Bike)
//          .as('Bike')
//          .dependsOnString('Kawasaky')
//          .dependsOnNumber(2)
//          .dependsOnNumber(2500)

container.register(User)
         .dependsOnString('Mihai')
         .dependsOnNumber(23)
         .dependsOn(Car)

container.register(Salary)
         .dependsOnNumber(70000)
         .dependsOnClass('MihaiSerban')


container.resolve('MihaiSerban', ()=> new User('Serban22', 33, 102) )

container.merge(carContainer)

let register = new Register(User)


console.log(register)
// console.log(container.get('Salary'))
