import Dependency from './Dependency';
export default class Register {
    private _alias;
    private _constructor;
    private _dependencies;
    constructor(constructor: Function, alias?: string);
    dependencies: Dependency[];
    pushDependency(dependency: Dependency): void;
    alias: string;
    sameAlias(alias: string): boolean;
    getConstructor(): Function;
    getConstructorName(): string;
    static getAliasFromConstructor(object: Function): string;
}
