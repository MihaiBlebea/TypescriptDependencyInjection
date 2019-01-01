"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.registered = [];
    }
    register(required) {
        this.registered.push({
            alias: this.getAliasFromConstructor(required),
            constructor: required,
            dependencies: []
        });
        return this;
    }
    as(alias) {
        let last = this.getLastEntry();
        last.alias = alias;
        return this;
    }
    dependsOn(alias) {
        let last = this.getLastEntry();
        last.dependencies.push(alias);
        return this;
    }
    get(alias) {
        let found = this.findAlias(alias);
        let dependencies = this.resolveDependencies(found.dependencies);
        return Reflect.construct(found.constructor, dependencies);
    }
    getAliasFromConstructor(object) {
        return object.constructor.name;
    }
    getLastEntry() {
        if (this.registered.length === 0) {
            throw new Error('The container is empty. Add a dependency first before creating alias');
        }
        return this.registered[this.registered.length - 1];
    }
    findAlias(alias) {
        let found = this.registered.filter((item) => {
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
        return this.registered.map((item) => {
            return item.alias.toLowerCase();
        });
    }
    resolveDependencies(dependencies) {
        return dependencies.map((dependency) => {
            if (typeof dependency === 'string' && this.aliases().includes(dependency.toLowerCase())) {
                return this.get(dependency);
            }
            return dependency;
        });
    }
}
exports.Container = Container;
