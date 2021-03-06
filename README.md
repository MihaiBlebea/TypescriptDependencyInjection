## Typescript Dependency Injection

### Install

Run in terminal ``` npm install typescript-dependency-injection ```

### Usage with TypeScript

Create a file that holds the registered dependencies and export the container for later use import. File should export the container object:

#### 1. Simple usage with callbacks

```
import { LoginService } from './path-to-service' // get a demo service class
import { UserRepo, MysqlConnection, Response } from './path-to-dependencies' // get some dependencies

import { Container } from 'typescript-dependency-injection'

let container = new Container()

container.register(UserRepo)
         .dependsOn(()=> new UserRepo())
         .dependsOn(()=> new MysqlConnection('host', 'port', 'username', 'password'))
         .dependsOn(()=> new Response())
```

</br></br>

#### 2. Register with a different alias

```
import { User } from './path-to-service' // get a demo service class

import { Container } from 'typescript-dependency-injection'

let container = new Container()

container.register(User)
         .as('SpecialUser')
         .dependsOnString('Mihai') // set the name
         .dependsOnNumber(29) // set the age
         .dependsOnBoolean(true) // is the user special ?

container.register(User)
         .as('NormalUser')
         .dependsOnString('John') // what a boring name
         .dependsOnNumber(45) // kind of old
         .dependsOnBoolean(false) // nothing special here

export default container
```

</br></br>

#### 3. Depend on already registered objects

```
import { LoginService } from './path-to-service' // get a demo service class
import { UserRepo, MysqlConnection, Response } from './path-to-dependencies' // get some dependencies

import { Container } from 'typescript-dependency-injection'

let container = new Container()

container.register(MysqlConnection)
         .dependsOnString('host')
         .dependsOnNumber('port')
         .dependsOnString('username')
         .dependsOnString('password')

container.register(UserRepo)
         .dependsOn(()=> new UserRepo())
         .dependsOnClass('MysqlConnection')
         .dependsOn(()=> new Response())
```

</br></br>

#### 4. Register a callback

```
import { QueryBus } from './path-to-service' // get a demo query bus that needs handlers to be registered
import {
    SelectMemberHandler,
    SelectPaymentHandler,
    SelectTransactionHandler } from './path-to-dependencies' // get some dependencies

import { Container } from 'typescript-dependency-injection'

let container = new Container()

// first param must be an alias, second param a callback that returns the init object
container.register('QueryBus', ()=> {
    let bus = new QueryBus()
    bus.register(SelectMemberHandler)
    bus.register(SelectPaymentHandler)
    bus.register(SelectTransactionHandler)

    return bus
})
```

</br></br>

#### 5. Merge containers from different files

```
import { authContainer } from './path-to-auth-container'
import { applicationContainer } from './path-to-auth-container'
import { queriesContainer } from './path-to-auth-container'
import { commandsContainer } from './path-to-auth-container'

// will throw Error if you have same alias in another container, so better wrap everything in a try catch block
let container = authContainer.merge(applicationContainer)
                             .merge(queriesContainer)
                             .merge(commandsContainer)

export default container

```

</br></br>

### License
License under the MIT License (MIT)

Copyright © 2019 [Mihai Blebea](https://www.linkedin.com/in/mihai-blebea-87353310b/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
