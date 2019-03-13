declare type Dependency = {
    type: string;
    value: string | number | Boolean | Function;
};
export default class Container {
    private _registered;
    constructor();
    readonly registered: {
        alias: string;
        constructor: Function;
        dependencies: Dependency[];
    }[];
    register(required: Function): this;
    as(alias: string): this;
    dependsOn(value: string | number | boolean | Function): this;
    dependsOnClass(value: string): this;
    dependsOnString(value: string): this;
    dependsOnNumber(value: number): this;
    dependsOnBoolean(value: boolean): this;
    get(alias: String): any;
    private getAliasFromConstructor;
    private getLastEntry;
    private findAlias;
    private aliases;
    private resolveDependencies;
}
export {};
