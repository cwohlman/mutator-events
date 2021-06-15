import { Map, List } from "immutable";
import Mutable from "../Mutable";
import Mutation from "../Mutation";

export abstract class Parent extends Mutable {
  constructor(
    public readonly children: Map<string, Mutable>,
  ) { super(); }
  
  public readonly deletedKeys: List<string> = List()
  apply(change: Mutation): Mutable {
    if (change.target.length) {
      const [childId] = change.target;
      const childChange = change.downscope();

      if (this.children.has(childId)) {
        const original = this.children.get(childId);
        const replacement = original?.apply(childChange) as Mutable;
        const newChildren = this.children.set(childId, replacement);
        return this.clone({ children: newChildren } as Partial<this>);
      }

      return this.clone({ deletedKeys: this.deletedKeys.push(childId) } as Partial<this>);
    }

    return this.applySelf(change);
  }
  applySelf(change: Mutation): Mutable {
    return super.apply(change);
  }

  childToJs(key: string, context: unknown) {
    const child = this.children.get(key);

    if (! child) return null;

    return child.toJS(context);
  }
}