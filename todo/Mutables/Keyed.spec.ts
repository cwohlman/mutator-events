import { Map } from "immutable"
import { Box } from "./Box"
import { Keyed } from "./Keyed"
import { Ref } from "./Ref"

describe("Hash", () => {
  it("should return an object", () => {
    const hash = new Keyed(Map({ "1": new Box("5") }), Map({"foo": "1"}));

    expect(hash.toJS(null)).toEqual({ foo: "5" });
  })
  it("should pass context to children", () => {
    const hash = new Keyed(Map({ "1": new Ref("5") }), Map({"foo": "1"}));

    expect(hash.toJS({ getRef() { return "99" }})).toEqual({ foo: "99" });
  })
})