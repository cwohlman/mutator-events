import Mutable from "../Mutable";

/**
 * A generic mutable for values you don't understand
 * Generally you should replace this value with a better Mutable that
 * is specific to the value contained, e.g. date or class object
 */
export class Box extends Mutable {
  constructor(
    public readonly value: unknown
  ) { super(); }

  toJS(): unknown {
    return this.value;
  }
}