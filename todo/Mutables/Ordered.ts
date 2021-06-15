import { List, Map } from "immutable";
import Mutable from "../Mutable";
import { Parent } from "./Parent";

export class Ordered extends Parent {
  constructor(
    children: Map<string, Mutable>,
    public readonly ordering: List<string>
  ) {
    super(children);
  }

  toJS(context: unknown) {
    return this.ordering
      .map((value) => {
        return this.childToJs(value, context);
      })
      .toJS();
  }
}
