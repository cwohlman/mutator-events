import Mutation from "./Mutation";

export default abstract class Mutable {
  constructor() {}

  apply(change: Mutation): Mutable {
    if (change.apply) return change.apply(this);

    return this;
  }
  abstract toJS(): unknown;
}
