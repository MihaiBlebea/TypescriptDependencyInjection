"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    get registered() {
        return this._registered;
    }
    // Register dependency
    register(required) {
        this.registered.push({
            alias: this.getAliasFromConstructor(required),
            constructor: required,
            dependencies: []
        });
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
        this.registered.push({
            alias: alias,
            constructor: callback,
            dependencies: []
        });
    }
    dependsOn(value) {
        let last = this.getLastEntry();
        if (typeof value === 'number') {
            last.dependencies.push({ type: 'number', value: value });
        }
        if (typeof value === 'boolean') {
            last.dependencies.push({ type: 'boolean', value: value });
        }
        if (typeof value === 'string') {
            try {
                this.findAlias(value);
                last.dependencies.push({ type: 'class', value: value });
            }
            catch (error) {
                last.dependencies.push({ type: 'string', value: value });
            }
        }
        if (typeof value === 'function') {
            let alias = this.getAliasFromConstructor(value);
            if (!alias) {
                last.dependencies.push({ type: 'callback', value: value });
            }
            else {
                last.dependencies.push({ type: 'class', value: alias });
            }
        }
        return this;
    }
    dependsOnClass(value) {
        let last = this.getLastEntry();
        last.dependencies.push({ type: 'class', value: value });
        return this;
    }
    dependsOnString(value) {
        let last = this.getLastEntry();
        last.dependencies.push({ type: 'string', value: value });
        return this;
    }
    dependsOnNumber(value) {
        let last = this.getLastEntry();
        last.dependencies.push({ type: 'number', value: value });
        return this;
    }
    dependsOnBoolean(value) {
        let last = this.getLastEntry();
        last.dependencies.push({ type: 'boolean', value: value });
        return this;
    }
    // Resolving dependencies
    get(alias) {
        // 1. Find by alias
        let found = this.findAlias(alias);
        // 2. If it's a callback just resolve it
        if (!found.constructor.name) {
            return found.constructor();
        }
        // 3. Resolve dependencies
        let dependencies = this.resolveDependencies(found.dependencies);
        // 4. Initialize object and pass in the dependencies
        return Reflect.construct(found.constructor, dependencies);
    }
    getAliasFromConstructor(object) {
        return object.name;
    }
    getLastEntry() {
        if (this._registered.length === 0) {
            throw new Error('The container is empty. Add a dependency first before creating alias');
        }
        return this._registered[this._registered.length - 1];
    }
    findAlias(alias) {
        let found = this._registered.filter((item) => {
            if (item.alias.toLowerCase() === alias.toLowerCase()) {
                return item;
            }
        })[0];
        if (!found) {
            throw new Error(`Could not find ${alias.toUpperCase()} dependency in the container`);
        }
        return found;
    }
    aliases() {
        return this._registered.map((item) => {
            return item.alias.toUpperCase();
        });
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
