import {concurrent, interval} from "./config";
import {IGinConcurrentConfig, IGinIntervalConfig, IGinQueue, IPromiseQueue} from "./interface";
import {pTimeout} from "./util";

const Queue = require("promise-queue") as IPromiseQueue;


export class QConcurrent implements IGinQueue {
  private readonly _queue: IPromiseQueue;
  private _config: IGinConcurrentConfig;

  constructor(config?: Partial<IGinConcurrentConfig>){
    this._config = {...concurrent(),...config};
    this._queue = new Queue(this._config.maxConcurrent);
  }

  async queue<T>(func: ()=> Promise<T>): Promise<T> {
    if (this._queue.getQueueLength() > this._config.maxSize) {
      while (this._queue.getQueueLength() < this._config.safeSize) {
        await pTimeout(this._config.tick);
      }
    }

    return this._queue.add(func);
  }

}