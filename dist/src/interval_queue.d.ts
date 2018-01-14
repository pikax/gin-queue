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
    private _config;
    currentLazy: iLazy<any>;
    readonly interval: number;
    constructor(_config?: IGinIntervalConfig);
    queue<T>(func: () => T): Promise<T>;
}
