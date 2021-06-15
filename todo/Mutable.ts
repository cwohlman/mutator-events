import Mutation from "./Mutation";

export default abstract class Mutable {
  constructor() {}

  /**
   * 
   * @param change the modification to apply to this object
   * @returns a new Mutable instance representing the replacement value
   */
  apply(change: Mutation): Mutable {
    // TODO: warning!
    if (change.target.length) return this;

    if (change.apply) return change.apply(this);

    return this;
  }
  clone(childProps: Partial<this>): this {
    return Object.assign(Object.create(this.constructor.prototype), this, childProps);
  }

  abstract toJS(context: unknown): unknown;
}
