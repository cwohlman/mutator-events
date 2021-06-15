import { Map } from "immutable";
import Mutable from "../Mutable";
import { Parent } from "./Parent";

export class Keyed extends Parent {

  constructor(
    children: Map<string, Mutable>,
    public readonly keys: Map<string, string>,
  ) { super(children); }

  toJS(context: unknown): unknown {
    return this.keys.map((value) => {
      return this.childToJs(value, context);
    }).toJS();
  }
}