import { Map } from "immutable";
import Context from "./Context";
import Mutable from "./Mutable";
import Mutation from "./Mutation";
import Revision from "./Revision";
import Update from "./Update";

export class Bus {
  constructor(
    initialState: Context,
    
  ) {}

  emit(event: Mutation) {
    throw new Error("NE");
  }
  recieve(update: Update) {
    throw new Error("NE");
  }

  cache: Map<string, Mutable> = Map()

  watch(ref: string, cb: (value: Mutable) => void, directModificationsOnly: boolean = false) {
    throw new Error("NE");
  }
  unwatch(cb: Function) {
    throw new Error("NE");
  }
  get(ref: string, directModificationsOnly: boolean = false): Mutable {
    throw new Error("NE");
  }

  snapshot(): Map<string, Mutable> {
    throw new Error("NE");
  }
  
  on(eventName: "emit", cb: (event: Mutation | Revision) => void): void;
  on(eventName: "recieve", cb: (update: Update) => void): void;
  on(eventName: "snapshot", cb: (snapshot: Map<string, Mutable>) => void): void;
  on(eventName: "watch", cb: (ref: string,) => void): void;
  on(eventName: "unwatch", cb: (ref: string,) => void): void;
  on(eventName: "get", cb: (ref: string, directModificationsOnly: boolean) => void): void;
  on(eventName: string, callback: Function): void {
    throw new Error("NE");
  }
}
