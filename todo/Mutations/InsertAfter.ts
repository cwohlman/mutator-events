import Mutable from "../Mutable";
import Mutation from "../Mutation";

export class InsertAfter extends Mutation {
  constructor(
    id: string,
    target: string[],
    public readonly childId: string,
    public readonly afterChildId: string | null,
    public readonly initial: Mutable,
  ) { super(id, target); }
  apply: undefined
  construct: undefined
}

