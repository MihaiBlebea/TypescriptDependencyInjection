import Container from './../Container'
import Car from './Car'
import Bike from './Bike'

let container = new Container()

container.register(Car)
         .dependsOnString('Mercedes')
         .dependsOnNumber(2500)

container.register(Bike)
         .dependsOnString('Kawasaky')
         .dependsOnNumber(2)
         .dependsOnNumber(2500)

export { container }
