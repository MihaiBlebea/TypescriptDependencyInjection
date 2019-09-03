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
    constructor(_names) {
        this._names = _names;
        //
    }
}
// let mihai = new Human('Mihai', 29)
// container.register(Human).dependsOnClass('Name').dependsOnClass('Age')
container.register(Human).dependsOn(['Serban', 'Iulia', 'Nathi']);
let mihai = container.get('Human');
// console.log(mihai)
container.test();
