export interface IPromiseQueue {
    new (maxConcurrent: number, maxQueued?: number): IPromiseQueue;
    add<T>(generator: () => Promise<T>): Promise<T>;
    getQueueLength(): number;
    getPendingLength(): number;
}
export interface IGinQueueConfig {
    tick: number;
}
export interface IGinQueue {
    queue<T>(func: () => T | Promise<T>): Promise<T>;
}
export interface IGinConcurrentConfig extends IGinQueueConfig {
    maxConcurrent: number;
    maxSize: number;
    safeSize: number;
}
export interface IGinIntervalConfig extends IGinQueueConfig {
    interval: number;
}
export declare const _TICK_: number;
