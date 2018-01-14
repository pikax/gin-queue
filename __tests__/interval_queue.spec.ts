import {QInterval} from "../src/interval_queue";
import {pTimeout} from "../src/util";


const threshold = 4;

describe("interval pool", () => {

  function createTimeoutPromise<T>(timeout: number, value?: T) {
    return pTimeout(timeout).then(x => value || 1)
  }


  function createFailedTimeoutPromise(timeout: number, fail: string) {
    return pTimeout(timeout).then(x => {
      throw new Error("fail");
    })
  }

  const def_interval = 10;

  const failGen = () => () => createFailedTimeoutPromise(def_interval, 'fail');
  const successGen = (val) => () => createTimeoutPromise(def_interval, val);

  it("should run straight", async () => {
    const queue = new QInterval();

    const dt = Date.now();
    await queue.queue(successGen(1));
    const lapsed = Date.now() - dt;

    expect(lapsed).toBeGreaterThanOrEqual(def_interval);
    expect(lapsed).toBeLessThanOrEqual(def_interval + threshold)
  });


  it('should resolve sync', async ()=>{
    const queue = new QInterval();

    const dt = Date.now();
    queue.queue(successGen(1));
    await queue.queue(()=>1);
    const lapsed = Date.now() - dt;

    expect(lapsed).toBeGreaterThanOrEqual(queue.interval);
    expect(lapsed).toBeLessThanOrEqual(queue.interval + threshold)
  });

  it("should fail ", async () => {
    const queue = new QInterval();

    expect.assertions(1);

    try {
      await queue.queue(failGen());
    }
    catch (e) {
      expect(e.message).toContain("fail");
    }
  });


  it("should fail middle but should continue ", async () => {
    const n = 7;
    const queue = new QInterval();

    const p: Promise<any>[] = [];
    for (let i = 1; i <= n; i++) {
      p.push(queue.queue(i % 3 === 0 ? failGen() : successGen(i)));
    }

    for (let i = 0; i < p.length; i++) {
      try {
        const v = await p[i];

        expect(v).toBe(i+1);

      }
      catch (e) {
        expect(((i + 1) % 3)).toBe(0);
      }
    }
  });

  it("should wait", async () => {
    const queue = new QInterval();

    await queue.queue(successGen(1));

    const dt = Date.now();

    await queue.queue(successGen(1))
      .then(x => {
        const lapsed = Date.now() - dt;

        expect(lapsed).toBeGreaterThanOrEqual(queue.interval);
        expect(lapsed).toBeLessThanOrEqual(queue.interval + threshold)
      });
  });

  it("should wait 1000ms", async () => {
    const queue = new QInterval();



    queue.queue(successGen(1));

    let dt = Date.now();

    await queue.queue(successGen(2))
      .then(x => {
        const lapsed = Date.now() - dt;

        const expected = queue.interval + def_interval;

        expect(lapsed).toBeGreaterThanOrEqual( expected);
        expect(lapsed).toBeLessThanOrEqual(expected + threshold)
      });

    dt = Date.now();

    await queue.queue(successGen(2))
      .then(x => {
        const lapsed = Date.now() - dt;

        expect(lapsed).toBeGreaterThanOrEqual(def_interval);
        expect(lapsed).toBeLessThanOrEqual(def_interval + threshold)
      });
  });


    it(`should generate 7 and resolve them by order`, async () => {
      const n = 7;
      const queue = new QInterval();

      let dt = Date.now();

      const p: Promise<any>[] = [];

      for (let i = 1; i <= n; i++) {
        p.push(queue.queue(successGen(i)));
      }

      const r = await Promise.all(p);

      r.forEach((v, i) => expect(v).toBe(i+1));
      const lapsed = Date.now() - dt;

      expect(lapsed).toBeGreaterThanOrEqual(queue.interval * (n-1))
    });


    it(`should generate 7 and await for the last one`, async () => {
      const n = 7;
      const queue = new QInterval();

      let dt = Date.now();
      const p: Promise<any>[] = [];

      for (let i = 1; i <= n; i++) {
        p.push(queue.queue(successGen(i)));
      }

      const l = await p[p.length - 1];
      const lapsed = Date.now() - dt;

      expect(lapsed).toBeGreaterThanOrEqual(queue.interval * (n-1))
      expect(l).toBe(n);
    });


    it("invalid function", async ()=>{
      const queue = new QInterval();

      expect.assertions(1);

      try {
        await queue.queue(()=>{
          throw new Error('fail')});
      }
      catch (e) {
        expect(e.message).toContain("fail");
      }
    })
});
