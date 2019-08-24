import Register from './Register';
export default class Container {
    private _registered;
    constructor();
    merge(container: Container): this;
    readonly registered: Register[];
    register(required: Function): this;
    as(alias: string): this;
    private aliasExists;
    resolve(alias: string, callback: Function): void;
    dependsOn(value: string | number | boolean | Function): this | undefined;
    dependencies(...dependencies: any): void;
    test(): void;
    dependsOnClass(value: string): this;
    dependsOnString(value: string): this;
    dependsOnNumber(value: number): this;
    dependsOnBoolean(value: boolean): this;
    get(alias: string): any;
    private getLastEntry;
    private findAlias;
    aliases(): string[];
    private resolveDependencies;
}
