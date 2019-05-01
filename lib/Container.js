"use strict";
// type Registered = {
//     alias : string,
//     constructor : Function,
//     dependencies : Dependency[]
// }[]
Object.defineProperty(exports, "__esModule", { value: true });
const Register_1 = require("./Register");
const Dependency_1 = require("./Dependency");
class Container {
    constructor() {
        this._registered = [];
    }
    merge(container) {
        container.aliases().map((alias) => {
            if (this.aliases().includes(alias)) {
                throw Error(`Merger aborted. Alias ${alias} already exists in the base container`);
            }
        });
        this._registered = this._registered.concat(container.registered);
        return this;
    }
    get registered() {
        return this._registered;
    }
    // Register dependency
    register(required) {
        let register = new Register_1.default(required);
        this.registered.push(register);
        return this;
    }
    as(alias) {
        // 1. Check that you are not setting the same alias as the existing one
        let last = this.getLastEntry();
        if (last.alias === alias) {
            throw Error(`You are setting the same alias as the existing one: ${alias}`);
        }
        // 2. Make sure that the key is not a duplicate
        if (this.aliasExists(alias)) {
            throw Error(`Alias ${alias} is already registered in the container`);
        }
        // 3. Set new alias
        last.alias = alias;
        return this;
    }
    aliasExists(alias) {
        let found = this.aliases().filter((savedAlias) => {
            return savedAlias === alias.toUpperCase();
        });
        return found.length > 0 ? true : false;
    }
    resolve(alias, callback) {
        // 1. Make sure that the key is not a duplicate
        if (this.aliasExists(alias)) {
            throw Error(`Alias ${alias} is already registered in the container`);
        }
        // 2. Register the new resolver
        let register = new Register_1.default(callback, alias);
        this.registered.push(register);
    }
    dependsOn(value) {
        let last = this.getLastEntry();
        if (typeof value === 'number') {
            last.pushDependency(new Dependency_1.default('number', value));
        }
        if (typeof value === 'boolean') {
            last.pushDependency(new Dependency_1.default('boolean', value));
        }
        if (typeof value === 'string') {
            try {
                this.findAlias(value);
                last.pushDependency(new Dependency_1.default('class', value));
            }
            catch (error) {
                last.pushDependency(new Dependency_1.default('string', value));
            }
        }
        if (typeof value === 'function') {
            let alias = Register_1.default.getAliasFromConstructor(value);
            if (!alias) {
                last.pushDependency(new Dependency_1.default('function', value));
            }
            else {
                last.pushDependency(new Dependency_1.default('class', value));
            }
        }
        return this;
    }
    dependsOnClass(value) {
        let last = this.getLastEntry();
        last.pushDependency(new Dependency_1.default('class', value));
        return this;
    }
    dependsOnString(value) {
        let last = this.getLastEntry();
        last.pushDependency(new Dependency_1.default('string', value));
        return this;
    }
    dependsOnNumber(value) {
        let last = this.getLastEntry();
        last.pushDependency(new Dependency_1.default('number', value));
        return this;
    }
    dependsOnBoolean(value) {
        let last = this.getLastEntry();
        last.pushDependency(new Dependency_1.default('boolean', value));
        return this;
    }
    // Resolving dependencies
    get(alias) {
        // 1. Find by alias
        let found = this.findAlias(alias);
        // 2. If it's a callback just resolve it
        if (!found.getConstructorName()) {
            let constructor = found.getConstructor();
            return constructor();
        }
        // 3. Resolve dependencies
        let dependencies = this.resolveDependencies(found.dependencies);
        // 4. Initialize object and pass in the dependencies
        return Reflect.construct(found.getConstructor(), dependencies);
    }
    getLastEntry() {
        if (this._registered.length === 0) {
            throw new Error('The container is empty. Add a dependency first before creating alias');
        }
        return this._registered[this._registered.length - 1];
    }
    findAlias(alias) {
        let found = this._registered.filter((register) => {
            if (register.sameAlias(alias)) {
                return register;
            }
        })[0];
        if (!found) {
            throw new Error(`Could not find ${alias} dependency in the container`);
        }
        return found;
    }
    aliases() {
        return this._registered.map((register) => register.alias);
    }
    resolveDependencies(dependencies) {
        return dependencies.map((dependency) => {
            if (['string', 'number', 'boolean'].includes(dependency.type)) {
                return dependency.value;
            }
            if (dependency.type === 'class') {
                return this.get(dependency.value);
            }
            if (typeof dependency.value === 'function') {
                return dependency.value();
            }
            throw Error('Dependency type not found');
        });
    }
}
exports.default = Container;
