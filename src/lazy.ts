export class Lazy<T> {
  private _value: T;
  get value(): T {
    return this._value || (this._value = this._func());
  }

  constructor(private _func: () => T) {
  }
}