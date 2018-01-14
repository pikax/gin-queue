import { IGinConcurrentConfig, IGinQueue } from "./interface";
export declare class QConcurrent implements IGinQueue {
    private _config;
    private readonly _queue;
    constructor(_config?: IGinConcurrentConfig);
    queue<T>(func: () => Promise<T>): Promise<T>;
}
