# gin-queue

Interval and Concurrent (using [promise-queue][promise-queue]) implementation.




## Usage


```javascript
const ginQueue = require("gin-queue")
//or
import {QInterval, QConcurrent} from 'gin-queue';
```




## Interval
Implements queue that only dequeue after a set amount of time.


```javascript


const interval = 5000;
const q = new QInterval({interval});

q.queue(request());

const result = await q.queue(()=>request()); // it will only run 5 seconds after the previous started



```







[promise-queue]: https://www.npmjs.com/package/promise-queue