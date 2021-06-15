import { Map } from "immutable";
import State from "./Context";
import Mutable from "./Mutable";
import { Nothing } from "./Mutables/Nothing";
import Mutation from "./Mutation";
import Revision from "./Revision";
import Update from "./Update";

export class Bus {
  constructor(private state: State) {}

  emit(event: Mutation) {
    this.notify("emit", event);
    this.state = this.state.apply(event);

    const ref = event.target[0];
    const watchers = this.watchers[ref];
    if (ref && watchers) {
      const newValue = this.get(ref);
      watchers.forEach((watcher) => watcher(newValue));
    }
  }
  recieve(update: Update) {
    throw new Error("NE");
  }

  cache: Map<string, Mutable> = Map();

  watchers: { [key: string]: ((value: Mutable) => void)[] } = {};
  watch(
    ref: string,
    cb: (value: Mutable) => void
    // directModificationsOnly: boolean = false // TODO
  ) {
    this.watchers[ref] = [];
    this.watchers[ref].push(cb);

    cb(this.get(ref));
  }
  unwatch(cb: Function) {
    throw new Error("NE");
  }
  get(ref: string, directModificationsOnly: boolean = false): Mutable {
    let current: Mutable = new Nothing();

    this.state.events.forEach((event) => {
      if (event.target[0] == ref) {
        current = current.apply(event.downscope());
      }
    });

    return current;
  }

  snapshot(): Map<string, Mutable> {
    throw new Error("NE");
  }

  listeners: { [key: string]: Function[] } = {};

  on(eventName: "emit", cb: (event: Mutation | Revision) => void): void;
  on(eventName: "recieve", cb: (update: Update) => void): void;
  on(eventName: "snapshot", cb: (snapshot: Map<string, Mutable>) => void): void;
  on(eventName: "watch", cb: (ref: string) => void): void;
  on(eventName: "unwatch", cb: (ref: string) => void): void;
  on(
    eventName: "get",
    cb: (ref: string, directModificationsOnly: boolean) => void
  ): void;
  on(eventName: string, callback: Function): void {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(callback);
  }

  notify(eventName: "emit", event: Mutation | Revision): void;
  notify(eventName: "recieve", update: Update): void;
  notify(eventName: "snapshot", snapshot: Map<string, Mutable>): void;
  notify(eventName: "watch", ref: string): void;
  notify(eventName: "unwatch", ref: string): void;
  notify(eventName: "get", ref: string, directModificationsOnly: boolean): void;
  notify(eventName: string, ...args: any[]): void {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].forEach((listener) => listener(...args));
  }
}
