import Mutable from "../Mutable";
import Mutation from "../Mutation";

export class InitKey extends Mutation {
  constructor(
    id: string,
    target: string[],
    public readonly key: string,
    public readonly childId: string,
    public readonly initial: Mutable,
  ) { super(id, target); }
  apply: undefined
  construct: undefined
}

