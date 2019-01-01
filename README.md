## Typescript Dependency Injection

### Install

Run in terminal ``` npm install typescript-dependency-injection ```

### Usage with TypeScript

Create a special file that holds the registered dependencies and export the container for later use import.

**dependencies.ts** example:

```
import dependencyContainer from 'typescript-dependency-injection'
import { Router } from './path-to-router'

let container = dependencyContainer()

container.register(Router)
         .as('MyRouter')
         .dependsOn('HttpRequest')

export default container
```

Get the object from the container.

Example:

```
import { container } from './path-to-container'

container.get('Router')
```
