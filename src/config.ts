import {_TICK_, IGinConcurrentConfig, IGinIntervalConfig} from "./interface";




const defaultConcurrentConfig : IGinConcurrentConfig = {
  simultaneousRequests: 10,
  safeQueueSize: 5,
  maxQueueSize: 50,

  tick: _TICK_

};


const defaultIntervalConfig : IGinIntervalConfig ={
  requestInterval: 20,
  tick: _TICK_
};




export const concurrent= () : IGinConcurrentConfig => defaultConcurrentConfig;
export const interval= (): IGinIntervalConfig => defaultIntervalConfig;

