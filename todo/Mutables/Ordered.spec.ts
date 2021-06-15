import { Map, List } from "immutable"
import { Box } from "./Box"
import { Ordered } from "./Ordered"
import { Ref } from "./Ref"

describe("Hash", () => {
  it("should return an object", () => {
    const hash = new Ordered(Map({ "1": new Box("5") }), List(["1"]));

    expect(hash.toJS(null)).toEqual(["5"]);
  })
  it("should pass context to children", () => {
    const hash = new Ordered(Map({ "1": new Ref("5") }), List(["1"]));

    expect(hash.toJS({ getRef() { return "99" }})).toEqual(["99"]);
  })
})