import { Map, List } from "immutable";
import Mutable from "./Mutable";
import Mutation from "./Mutation";

export default class State {
  constructor(
    public readonly events: List<Mutation>,
    public readonly snapshot: Map<string, Mutable> = Map()
  ){}

  apply(event: Mutation) { return new State(this.events.push(event), this.snapshot); }
  // apply update => new Context
}