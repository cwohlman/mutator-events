import { List, Map } from "immutable";
import { Bus } from "./Bus";
import State from "./Context";
import { Box } from "./Mutables/Box";
import { Nothing } from "./Mutables/Nothing";
import { Replace } from "./Mutations/Replace";

describe("Bus", () => {
  it("should emit events", () => {
    const bus = new Bus(new State(List(), Map()));

    let recievedEvent;
    const listener = (a: any) => (recievedEvent = a);
    bus.on("emit", listener);
    bus.emit(new Replace("1", ["1"], new Nothing()));

    expect(recievedEvent).toBeInstanceOf(Replace);
  });
  it("should notify watchers", () => {
    const bus = new Bus(new State(List(), Map()));

    let recievedValue;
    const listener = (a: any) => (recievedValue = a);
    bus.watch("1", listener);
    bus.emit(new Replace("1", ["1"], new Box("99")));

    expect(recievedValue).toBeInstanceOf(Box);
  });
});
