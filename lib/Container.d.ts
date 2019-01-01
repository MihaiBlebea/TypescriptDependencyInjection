export declare class Container {
    private registered;
    constructor();
    register(required: Function): this;
    as(alias: String): this;
    dependsOn(alias: String): this;
    get(alias: String): any;
    private getAliasFromConstructor;
    private getLastEntry;
    private findAlias;
    private aliases;
    private resolveDependencies;
}
