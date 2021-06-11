import { Mutable } from './Mutable';

// TODO: extends Context
export class Bus {
  constructor(events: Array<Mutation>) {
    this.events = this._events = events;
  }

  private _events: Array<Mutation>
  readonly events: ReadonlyArray<Mutation>


  emit(event: Mutation) {
    this._events.push(event);
    this.notify(event);
  }
  notify(event: Mutation) {
    this._listeners.filter(listener => listener.target == event.target).forEach(({ callback }) => {
      callback(event);
    })
  }

  private _listeners: Array<{target: string, callback: (event: Mutation) => void}> = []
  listen(target: string, callback: (event: Mutation) => void) {
    this._listeners.push({ target, callback });
  }
  removeListener(callback: Function) {
    const index = this._listeners.findIndex(l => l.callback == callback);
    if (index >= 0) this._listeners.splice(index, 1);
  }

  
  // TODO: use a map for faster access with very large numbers of watchers & listeners
  private _watchers: Array<{target: string, callback: (value: Mutable | null) => void}> = []
  watch(target: string, callback: (value: Mutable | null) => void) {
    if (! this._workers.has(target)) {
      this.setupWorker(target);
    }

    this._watchers.push({ target, callback });

    const initialValue = this._workers.get(target);
    if (initialValue) {
      callback(initialValue.value);
    }
  }
  refresh(target: string, newValue: Mutable | null) {
    this._watchers.filter(watcher => watcher.target == target).forEach(({ callback }) => {
      callback(newValue);
    })
  }

  private _workers: Map<string, { value: Mutable | null, callback: (event: Mutation) => void }> = new Map()
  setupWorker(target: string) {
    const callback = (event: any) => {
      const worker = this._workers.get(target);
      if (worker) {
        worker.value = this.apply(value, event);
        this.refresh(target, worker.value);
      }
    }
    const value = this.applyAll(target);
    this._workers.set(target, {
      callback,
      value,
    });
  }

  applyAll(target: string): Mutable | null {
    const events = this.events.filter(e => e.target == target);
    
    let value: Mutable | null = null;

    events.forEach(e => value = this.apply(value, e));

    return value;
  }

  // TODO: inherit from Context
  apply(target: Mutable | null, event: Mutation): Mutable | null {
    if (! target && event.construct) return event.construct();

    if (target) return target.apply(event);

    return null;
  }
}

export class Mutation {
  constructor(
    public action: string,
    public target: string,
  ) {}

  affectedChildren(): { added?: string[], removed?: string[] } { return {}; }

  construct?(): Mutable
  apply?(value: Mutable): Mutable
}
