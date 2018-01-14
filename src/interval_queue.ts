import {interval} from "./config";
import {IGinIntervalConfig} from "./interface";
import {Lazy} from "./lazy";
import {pTimeout} from "./util";


export class iLazy<T> extends Lazy<T> {
  resolved?: Date;
  started?: Date;
  created: Date;
  failed?: boolean;
  error?: any;

  constructor(_func: () => T) {
    super(() => {
      this.started = new Date();
      try {
        const result = _func();

        if (result instanceof Promise) {
          result.then(x => {
            this.resolved = new Date();
            return x;
          }).catch(x => {
            this.resolved = new Date();
            this.error = x;
            this.failed = true;
          });
        }
        else {
          this.resolved = new Date();
        }
        return result;
      }
      catch (e) {
        this.resolved = new Date();
        this.error = e;
        this.failed = true;
      }
    });
    this.created = new Date();
  }
}


export class QInterval {
  currentLazy: iLazy<any>;

  get interval(){
    return this._config.requestInterval;
  }

  constructor(private _config: IGinIntervalConfig = interval()) {
  }

  async queue<T>(func: () => T): Promise<T> {
    const prev = this.currentLazy;

    const current = new iLazy(func);
    this.currentLazy = current;

    if (prev) {
      // let wait the time we should at least
      const w = (prev.created.getTime() + this._config.requestInterval) - Date.now();
      if (w > 0) {
        await pTimeout(w);
      }

      // if the promise haven't start yet, we should wait until it gets queued
      while (!prev.started) {
        await pTimeout(this._config.tick);
      }

      const p = prev.value;
      try {
        await p;
      } catch (e) {
        // ignore
      }

      //note probably remove this
      // // let wait the time we should at least
      // const w2 = (prev.started.getTime() + this._config.requestInterval) - Date.now();
      // if (w2 > 0) {
      //   console.log('w2: %dms', w2)
      //
      //   await pTimeout(w2);
      // }
    }

    return await current.value;
  }
}














