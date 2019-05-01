"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dependency {
    constructor(type, value) {
        this._validTypes = [
            'string',
            'number',
            'boolean',
            'function',
            'class'
        ];
        this.assertValidType(type);
        this._type = type;
        this._value = value;
    }
    assertValidType(type) {
        if (!this._validTypes.includes(type)) {
            throw Error(`Invalid type supplied: ${type}`);
        }
    }
    get type() {
        return this._type;
    }
    get value() {
        return this._value;
    }
}
exports.default = Dependency;
