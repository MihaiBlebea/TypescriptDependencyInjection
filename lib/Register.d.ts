declare type Dependency = {
    type: string;
    value: string | number | Boolean | Function;
};
export default class Register {
    private _alias;
    private _constructor;
    private _dependencies;
    constructor(constructor: Function, alias?: string);
    dependencies: Dependency[];
    alias: string;
    private getAliasFromConstructor;
}
export {};
