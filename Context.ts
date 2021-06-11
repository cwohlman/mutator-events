import { Map } from 'immutable';
import { Mutation } from './framework';
import { Mutable } from "./Mutable";


export default class Context {
  constructor(private readonly refMap: Map<string, Mutable> = Map()) { }

  static resolve(target: string, events: Mutation[]): unknown {
    const context = new Context().applyAll(events);

    return context.get(target)?.toJS(context);
  }

  apply(event: Mutation) {
    const ref = this.refMap.get(event.target);

    if (ref) {
      return new Context(this.refMap.set(event.target, ref.apply(event)));
    } else if (event.construct) {
      return new Context(this.refMap.set(event.target, event.construct()));
    }

    return this;
  }
  applyAll(events: Mutation[]) {
    let result: Context = this;

    events.forEach(event => (result = result.apply(event)));

    return result;
  }
  get(ref: string) {
    return this.refMap.get(ref);
  }
}
