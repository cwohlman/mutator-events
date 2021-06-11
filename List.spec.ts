import { Add, Init, List, Ref, Value } from "./builtins"
import Context from "./Context"

describe("List", () => {
  it("should convert to a list", () => {
    const result = Context.resolve("foo", [
      List.create("foo"),
      Value.create("1", "1"),
      new Add("foo", null, new Ref("1"))
    ])

    expect(result).toEqual(["1"]);
  })
  it("should order items correctly", () => {
    const result = Context.resolve("foo", [
      List.create("foo"),
      Value.create("1", "1"),
      Value.create("2", "2"),
      Value.create("3", "3"),
      Value.create("4", "4"),
      Value.create("5", "5"),
      new Add("foo", null, new Ref("1")),
      new Add("foo", new Ref("1"), new Ref("2")),
      new Add("foo", new Ref("2"), new Ref("3")),
      new Add("foo", new Ref("3"), new Ref("4")),
      new Add("foo", new Ref("4"), new Ref("5")),
    ])

    expect(result).toEqual(["1", "2", "3", "4", "5"]);
  })
})