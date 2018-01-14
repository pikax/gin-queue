"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};function __extends(e,t){function n(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var __assign=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};function __awaiter(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(u,a)}c((r=r.apply(e,t||[])).next())})}function __generator(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}var _TICK_=+process.env.QUEUE_TICK||33,defConcurrent={maxConcurrent:10,safeSize:5,maxSize:50,tick:_TICK_},defInterval={interval:20,tick:_TICK_},concurrent=function(){return defConcurrent},interval=function(){return defInterval};function pTimeout(e){return new Promise(function(t){return setTimeout(t,e)})}var Queue=require("promise-queue"),QConcurrent=function(){function e(e){this._config=__assign({},concurrent(),e),this._queue=new Queue(this._config.maxConcurrent)}return e.prototype.queue=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:if(!(this._queue.getQueueLength()>this._config.maxSize))return[3,3];t.label=1;case 1:return this._queue.getQueueLength()<this._config.safeSize?[4,pTimeout(this._config.tick)]:[3,3];case 2:return t.sent(),[3,1];case 3:return[2,this._queue.add(e)]}})})},e}(),Lazy=function(){function e(e){this._func=e}return Object.defineProperty(e.prototype,"value",{get:function(){return this._value||(this._value=this._func())},enumerable:!0,configurable:!0}),e}(),iLazy=function(e){function t(t){var n=e.call(this,function(){n.started=new Date;try{var e=t();return e instanceof Promise?e.then(function(e){return n.resolved=new Date,e}).catch(function(e){n.resolved=new Date,n.error=e,n.failed=!0}):n.resolved=new Date,e}catch(e){n.resolved=new Date,n.error=e,n.failed=!0}})||this;return n.created=new Date,n}return __extends(t,e),t}(Lazy),QInterval=function(){function e(e){this._config=__assign({},interval(),e)}return Object.defineProperty(e.prototype,"interval",{get:function(){return this._config.interval},enumerable:!0,configurable:!0}),e.prototype.queue=function(e){return __awaiter(this,void 0,void 0,function(){var t,n,r,o;return __generator(this,function(i){switch(i.label){case 0:return t=this.last,n=new iLazy(e),this.last=n,t?(r=t.created.getTime()+this._config.interval-Date.now())>0?[4,pTimeout(r)]:[3,2]:[3,8];case 1:i.sent(),i.label=2;case 2:return t.started?[3,4]:[4,pTimeout(this._config.tick)];case 3:return i.sent(),[3,2];case 4:o=t.value,i.label=5;case 5:return i.trys.push([5,7,,8]),[4,o];case 6:return i.sent(),[3,8];case 7:return i.sent(),[3,8];case 8:return[4,n.value];case 9:return[2,i.sent()]}})})},e}();exports.QConcurrent=QConcurrent,exports.QInterval=QInterval;
