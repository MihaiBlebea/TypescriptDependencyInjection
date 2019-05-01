"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Register {
    constructor(constructor, alias) {
        this._dependencies = [];
        this._alias = alias || Register.getAliasFromConstructor(constructor);
        this._constructor = constructor;
    }
    get dependencies() {
        return this._dependencies;
    }
    set dependencies(value) {
        this._dependencies = value;
    }
    pushDependency(dependency) {
        this._dependencies.push(dependency);
    }
    set alias(value) {
        this._alias = value;
    }
    get alias() {
        return this._alias.toUpperCase();
    }
    sameAlias(alias) {
        return this.alias === alias.toUpperCase();
    }
    getConstructor() {
        return this._constructor;
    }
    getConstructorName() {
        return this._constructor.name;
    }
    static getAliasFromConstructor(object) {
        return object.name;
    }
}
exports.default = Register;
