import Mutable from "../Mutable";

/**
 * A generic mutable for values you don't understand
 * Generally you should replace this value with a better Mutable that
 * is specific to the value contained, e.g. date or class object
 */
export class Ref extends Mutable {
  constructor(public readonly refId: string) {
    super();
  }

  toJS(context: unknown): unknown {
    const maybeRepository = context as Repository;
    if (
      maybeRepository instanceof Object &&
      "getRef" in maybeRepository &&
      typeof maybeRepository.getRef === "function"
    ) {
      return maybeRepository.getRef(this.refId);
    }

    return new Missing(this.refId, "Context is not a repository");
  }
}

export type Repository = { getRef(refId: string): unknown | Missing };

export class Missing {
  constructor(public readonly refId: string, public readonly reason: string) {}
}
