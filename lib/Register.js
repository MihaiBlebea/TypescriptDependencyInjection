"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Register {
    constructor(constructor, alias) {
        this._dependencies = [];
        this._alias = alias || this.getAliasFromConstructor(constructor);
        this._constructor = constructor;
    }
    set dependencies(value) {
        this._dependencies = value;
    }
    set alias(value) {
        this._alias = value;
    }
    get alias() {
        return this._alias;
    }
    getAliasFromConstructor(object) {
        return object.name;
    }
}
exports.default = Register;
