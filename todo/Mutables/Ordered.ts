import { List, Map } from "immutable";
import Mutable from "../Mutable";
import Mutation from "../Mutation";
import { InsertAfter } from "../Mutations/InsertAfter";
import { Parent } from "./Parent";

export class Ordered extends Parent {
  constructor(
    children: Map<string, Mutable>,
    public readonly ordering: List<string>
  ) {
    super(children);
  }

  applySelf(change: Mutation) {
    if (change instanceof InsertAfter) {
      return this.clone({
        children: this.children.set(change.childId, change.initial),
        ordering: this.ordering.insert(this.getIndexOf(change.afterChildId) + 1, change.childId)
      } as Partial<this>)
    }

    return super.applySelf(change);
  }

  getIndexOf(childId: string | null | undefined) {
    if (typeof childId !== "string") return -1;

    return this.ordering.indexOf(childId);
  }

  toJS(context: unknown) {
    return this.ordering
      .map((value) => {
        return this.childToJs(value, context);
      })
      .toJS();
  }
}
