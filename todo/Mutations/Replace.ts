import Mutable from "../Mutable";
import Mutation from "../Mutation";

export class Replace extends Mutation {
  constructor(
    id: string,
    target: string[],
    public readonly replacement: Mutable,
  ) { super(id, target); }
  apply(): Mutable {
    return this.replacement.clone({});
  }
  construct = this.apply
}

export const Init = Replace;
