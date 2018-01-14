import { IGinIntervalConfig } from "./interface";
import { Lazy } from "./lazy";
export declare class iLazy<T> extends Lazy<T> {
    resolved?: Date;
    started?: Date;
    created: Date;
    failed?: boolean;
    error?: any;
    constructor(_func: () => T);
}
export declare class QInterval {
    last: iLazy<any>;
    readonly interval: number;
    private _config;
    constructor(config?: Partial<IGinIntervalConfig>);
    queue<T>(func: () => T): Promise<T>;
}
