import { Map, List } from "immutable";
import Mutable from "./Mutable";
import Mutation from "./Mutation";

export default class Context {
  constructor(
    public readonly events: List<Mutation>,
    public readonly initialState: Map<string, Mutable> = Map()
  ){}

  // apply event => new Context
  // apply update => new Context
}