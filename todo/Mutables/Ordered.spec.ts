import { Map, List } from "immutable"
import { InsertAfter } from "../Mutations/InsertAfter"
import { Box } from "./Box"
import { Ordered } from "./Ordered"
import { Ref } from "./Ref"

describe("ordered", () => {
  it("should return an object", () => {
    const ordered = new Ordered(Map({ "1": new Box("5") }), List(["1"]));

    expect(ordered.toJS(null)).toEqual(["5"]);
  })
  it("should pass context to children", () => {
    const ordered = new Ordered(Map({ "1": new Ref("5") }), List(["1"]));

    expect(ordered.toJS({ getRef() { return "99" }})).toEqual(["99"]);
  })
  describe("InsertAfter", () => {
    it("should set the key", () => {
    const ordered = new Ordered(Map({ "1": new Box("5") }), List(["1"]));
      const change = new InsertAfter("1", [], "99", "1", new Box("99"));

      const newOrdered = ordered.apply(change);

      expect(newOrdered.toJS(null)).toEqual(["5", "99"]);
    });
  });
})