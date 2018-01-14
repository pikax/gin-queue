export declare class Lazy<T> {
    private _func;
    private _value;
    readonly value: T;
    constructor(_func: () => T);
}
