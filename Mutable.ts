import Context from './Context';
import { Mutation } from './framework';

export type Args<T> = T extends (...args: infer P ) => any ? P : never;
type MutatorPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => Mutation ? K : never
}[keyof T];
export type MutatorMethods<T> = Pick<T, MutatorPropertyNames<T>>;
// export type Mutators<T> = { [P in keyof T]: T[P] extends (...args: any) => Mutation ? T[P] : never }

export abstract class Mutable {
  constructor(public ref: string) {}
  apply<T extends Mutation>(event: T): Mutable {
    if (event.apply)
      return event.apply(this);

    return this;
  }

  // TODO: using advanced typescript we can give this method the same return type as apply
  whatif<T extends keyof MutatorMethods<Omit<this, "whatif">>>(method: T, ...args: Args<this[T]>) {
    const event = (this[method])(...args);

    return this.apply(event);
  }

  abstract toJS(context: Context): unknown;

  clone() {
    return Object.assign(Object.create(this.constructor), this);
  }
}
