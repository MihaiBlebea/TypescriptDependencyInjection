import { expect } from 'chai';
import 'mocha'

import Container from './../Container'
import User from './../example/User'
import Car from './../example/Car'



describe('Testing the dependency container', ()=> {
    describe('Registered a class named "Car" in the container', ()=> {
        it('Should find a class named "Car" if you check all stored dependencies', ()=> {
            let container = new Container()

            container.register(Car)
                     .dependsOnString('Mercedes')
                     .dependsOnNumber(2500)

            let dependency = container.registered[0]
            expect(dependency.alias).to.equal('Car')
        })

        it('Should return the registered class "Car" from the container if using the "get()" method', ()=> {
            let container = new Container()

            container.register(Car)
                     .dependsOnString('Mercedes')
                     .dependsOnNumber(2500)

            let car = container.get('Car')
            expect(typeof car).to.equal('object')
            expect(car instanceof Car).to.equal(true)
        })

        it('Should return the registered class "Car" from the container even if registered without specifing it\'s dependencies type', ()=> {
            let container = new Container()

            container.register(Car)
                     .dependsOn('Mercedes')
                     .dependsOn(2500)

            let car = container.get('Car')
            expect(typeof car).to.equal('object')
            expect(car instanceof Car).to.equal(true)
        })

        it('Should throw an Error if you ask for an unregistered class. It should specify the name of the dependency that it failed to find', ()=> {
            let container = new Container()

            container.register(Car)
                     .dependsOn('Mercedes')
                     .dependsOn(2500)

            try {
                let car = container.get('Car2')
            } catch(error) {
                expect(error.message).to.equal('Could not find CAR2 dependency in the container')
            }
        })
    })


    describe('Registered two classes "Car" and "User" that depend one on the other in the container', ()=> {
        it('Should return class User that depends on Car and resolve the dependency in the background', ()=> {
            let container = new Container()

            container.register(Car)
                     .dependsOn('Mercedes')
                     .dependsOnNumber(2500)

            container.register(User)
                     .dependsOn('Mihai')
                     .dependsOnNumber(29)
                     .dependsOn(Car)

            let user = container.get('User')
            expect(typeof user).to.equal('object')
            expect(user instanceof User).to.equal(true)

        })
    })

})
