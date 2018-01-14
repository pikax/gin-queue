import { IGinConcurrentConfig, IGinQueue } from "./interface";
export declare class QConcurrent implements IGinQueue {
    private readonly _queue;
    private _config;
    constructor(config?: Partial<IGinConcurrentConfig>);
    queue<T>(func: () => Promise<T>): Promise<T>;
}
