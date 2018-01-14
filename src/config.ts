import {_TICK_, IGinConcurrentConfig, IGinIntervalConfig} from "./interface";




const defConcurrent : IGinConcurrentConfig = {
  maxConcurrent: 10,
  safeSize: 5,
  maxSize: 50,

  tick: _TICK_

};


const defInterval : IGinIntervalConfig ={
  interval: 20,
  tick: _TICK_
};




export const concurrent= () : IGinConcurrentConfig => defConcurrent;
export const interval= (): IGinIntervalConfig => defInterval;

