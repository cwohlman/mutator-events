import Context from "./Context";
import { Mutation } from "./framework";
import { Mutable, MutatorMethods } from "./Mutable";
import { Map } from "immutable";

export class Ref {
  constructor(public $: string) {}
}
export class Val {
  constructor(public $: string) {}
}

export class Replace extends Mutation {
  constructor(target: string, public value: Mutable) {
    // value is by value, always
    super("set", target);
  }

  apply() {
    return this.value.clone();
  }
  construct() {
    return this.value.clone();
  }
}
export class Set extends Mutation {
  constructor(target: string, public key: string, public value: Ref | Val) {
    // value can be a Mutation, in which case it is used to initialize the value
    super("set", target);
  }
}
export class Unset extends Mutation {
  constructor(target: string, public key: string) {
    // value can be a Mutation, in which case it is used to initialize the value
    super("unset", target);
  }
}
export class Add extends Mutation {
  constructor(
    target: string,
    public after: Ref | null, // after null adds to head of list
    public value: Ref
  ) {
    super("add", target);
  }
}
export class Remove extends Mutation {
  constructor(target: string, public value: Ref) {
    super("add", target);
  }
}
// TODO: splice, etc.

export class Value extends Mutable {
  constructor(ref: string, public readonly value: unknown) {
    super(ref);
  }

  apply(event: Mutation): Mutable {
    if (
      event instanceof Set &&
      event.value instanceof Val &&
      this.value instanceof Object
    ) {
      return new Value(
        this.ref,
        Object.assign(Object.create(this.value.constructor), {
          [event.key]: event.value.$,
        })
      );
    }
    if (event instanceof Unset && this.value instanceof Object) {
      return new Value(
        this.ref,
        Object.assign(Object.create(this.value.constructor), {
          [event.key]: undefined,
        })
      );
    }

    return super.apply(event);
  }

  replace(value: unknown) {
    return new Replace(this.ref, new Value(this.ref, value));
  }

  toJS() {
    return this.value;
  }
}
export class Dict extends Mutable {
  constructor(ref: string, private keys: Map<string, Ref | Val>) {
    super(ref);
  }

  apply(event: Mutation): Mutable {
    if (event instanceof Set) {
      return new Dict(this.ref, this.keys.set(event.key, event.value));
    }
    if (event instanceof Unset) {
      return new Dict(this.ref, this.keys.delete(event.key));
    }

    return super.apply(event);
  }

  set(key: string, value: Val | Ref) {
    return new Set(this.ref, key, value);
  }

  toJS(context: Context) {
    return this.keys.map((value, key) => {
      if (value instanceof Val) return value.$;
      else return context.get(value.$);
    });
  }
}
