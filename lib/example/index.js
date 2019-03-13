"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./../Container");
const Car_1 = require("./Car");
const User_1 = require("./User");
const Salary_1 = require("./Salary");
let container = new Container_1.default();
container.register(Car_1.default)
    .as('Car')
    .dependsOnString('Mercedes')
    .dependsOnNumber(2500);
container.register(User_1.default)
    .as('User')
    .dependsOnString('Mihai')
    .dependsOnNumber(23)
    .dependsOn(Car_1.default);
container.register(Salary_1.default)
    .dependsOnNumber(70000)
    .dependsOn(() => new User_1.default('Mihai', 29, new Car_1.default('Renault', 1500)));
let salary = container.get('Salary');
container.registered.map((register) => {
    console.log(register);
});
console.log(salary);
