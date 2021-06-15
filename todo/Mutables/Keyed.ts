import { Map } from "immutable";
import Mutable from "../Mutable";
import Mutation from "../Mutation";
import { InitKey } from "../Mutations/InitKey";
import { Parent } from "./Parent";

export class Keyed extends Parent {
  constructor(
    children: Map<string, Mutable>,
    public readonly keys: Map<string, string>
  ) {
    super(children);
  }

  applySelf(change: Mutation) {
    if (change instanceof InitKey) {
      return this.clone({
        children: this.children.set(change.childId, change.initial),
        keys: this.keys.set(change.key, change.childId),
      } as Partial<this>);
    }

    return super.applySelf(change);
  }

  toJS(context: unknown): unknown {
    return this.keys
      .map((value) => {
        return this.childToJs(value, context);
      })
      .toJS();
  }
}
