import Container from './../Container'
import Car from './Car'
import Bike from './Bike'

let container = Container.instance

container.register(Car)
         .as('Car')
         .dependsOnString('Mercedes')
         .dependsOnNumber(2500)

container.register(Bike)
         .as('Bike')
         .dependsOnString('Kawasaky')
         .dependsOnNumber(2)
         .dependsOnNumber(2500)

// export default container
