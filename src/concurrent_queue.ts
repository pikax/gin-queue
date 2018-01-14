import {concurrent} from "./config";
import {IGinConcurrentConfig, IGinQueue, IPromiseQueue} from "./interface";
import {pTimeout} from "./util";

const Queue = require("promise-queue") as IPromiseQueue;


export class QConcurrent implements IGinQueue {
  private readonly _queue: IPromiseQueue;

  constructor(private _config: IGinConcurrentConfig = concurrent()) {
    this._queue = new Queue(30);
  }

  async queue<T>(func: ()=> Promise<T>): Promise<T> {
    if (this._queue.getQueueLength() > this._config.maxQueueSize) {
      while (this._queue.getQueueLength() < this._config.safeQueueSize) {
        await pTimeout(this._config.tick);
      }
    }

    return this._queue.add(func);
  }

}