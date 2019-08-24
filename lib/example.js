"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("./Container"));
let container = new Container_1.default();
class Name {
    constructor(_value) {
        this._value = _value;
        //
    }
    get value() {
        return this._value;
    }
}
class Age {
    constructor(_value) {
        this._value = _value;
        //
    }
    get value() {
        return this._value;
    }
}
class Human {
    constructor(_name, _age) {
        this._name = _name;
        this._age = _age;
        //
    }
    get name() {
        return this._name.value;
    }
    get age() {
        return this._age.value;
    }
}
// let mihai = new Human('Mihai', 29)
// container.register(Human).dependsOnClass('Name').dependsOnClass('Age')
container.register(Name).dependencies('Serban');
container.register(Age).dependencies(30);
container.register(Human).dependencies('@Name', 31);
let mihai = container.get('Human');
console.log(mihai);
container.test();
