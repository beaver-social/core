export abstract class Singleton {
  private static _instances: Map<Function, any> = new Map();

  constructor() {
    const ctor = this.constructor;
    if (Singleton._instances.has(ctor)) {
      throw new Error(
        `Instance of ${ctor.name} already exists. Use getInstance().`,
      );
    }
    Singleton._instances.set(ctor, this);
  }

  static getInstance<T>(this: new () => T): T {
    if (!Singleton._instances.has(this)) {
      new this(); // shoud register self in constructor itself
    }
    return Singleton._instances.get(this);
  }
}
