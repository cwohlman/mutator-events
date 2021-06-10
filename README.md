# mutator-events

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
