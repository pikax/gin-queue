



// NOTE promise-queue interface
export interface IPromiseQueue{
  new (maxConcurrent: number, maxQueued?: number): IPromiseQueue;
  add<T>(generator: () => Promise<T>): Promise<T>;

  getQueueLength(): number;

  getPendingLength(): number;
}


export interface IGinQueueConfig{
  tick: number;
}


export interface IGinQueue {
  // new (config: IGinQueueConfig): IGinQueue;
  queue<T>(func: ()=>T|Promise<T>): Promise<T>
}




export interface IGinConcurrentConfig extends IGinQueueConfig{
  simultaneousRequests: number;
  maxQueueSize: number; // after hitting this size the queue will wait until promise level go as much as safeQueueSize
  safeQueueSize: number; //
}

export interface IGinIntervalConfig extends IGinQueueConfig{
  requestInterval: number;
}


//this is to force the interface.d.ts to be generated by the rollup-typescript
export const _TICK_  =  +process.env.QUEUE_TICK || 33;


