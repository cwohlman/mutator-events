# mutator-events

Goals/Constraints (in order):

1. View History
2. Edit History
3. View Edit History, Edit Edit History, etc -> infinity
4. Offline editing
5. Fast & Performent
6. Multiple users editing
7. Real-time editing


Examples:
1. I should be able to undo all actions since some state (e.g. restore that state)
2. I should be able to undo a particular action (e.g. revert that action), all subsequent edits (if still valid) should remain
3. I should be able to recover text & structure from any commit (deleted or not) & re-use it elsewhere
4. I should be able to reference any version & edit
5. If edits arrive that are out of date, those edits should be applied as if they arrived in time
6. I should be able to re-run/re-play an event
7. I should be able to extract & modify an event, and then replay it (e.g. with different parameters)
8. 





















Basic goal of this library is to provide structure & methods for manipulating events that mutate arbitrary objects, conceptually this is event sourcing for an n-dimensional array or object.

```ts

// Represents an event which modifies an arbitrary object
class Mutation {}

// An object which can accept & emit events & maintain a list of events
class Bus {}

class Scope {
  address: string[],
  changes: Set<"keys", "value", "children">, // keys will only trigger if keys were added/removed, value will trigger when the value is entirely replaced, children will trigger when a child of this object is modified in any way
}

function apply(value: unknown, mutation, conflicResolver: (a, b) => unknown): object

function downscope(scope, mutation): mutation // null if the mutation does not mutate the object referenced by scope, otherwise transforms the mutation

function select(scope, value: object): object // returns the object found at scope, or null if no object exists at that scope

function upscope(scope, mutation): mutation // returns a mutation that affects a child of an object

```
