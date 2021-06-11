import Mutation from "./Mutation";

export class Bus {
  constructor(
    initialEvents: ReadonlyArray<Mutation>,
    onPublish: (event: Mutation) => void,
  ) {}
  // stores a set of canonical & provisional events

  // emit(event)
  // receive(original: string[], replacements: event[])

  // watchObject(ref: string[], cb(updatedObject) => void, includeChildEvents)
  // watchStream(ref: string[], cb({ syncedEvents, unsyncedEvents } | { localEvent }), includeChildEvents)
  // listen(ref: string[], cb(event), includeChildEvents)
  // onSync(cb(original: string[], replacements: event[]))
}
