export default class Dependency {
    private _type;
    private _value;
    private _validTypes;
    constructor(type: string, value: string | number | boolean | Function);
    private assertValidType;
    readonly type: string;
    readonly value: string | number | boolean | Function;
}
