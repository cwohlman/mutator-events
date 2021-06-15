import { Map } from "immutable";
import { InitKey } from "../Mutations/InitKey";
import { Box } from "./Box";
import { Keyed } from "./Keyed";
import { Ref } from "./Ref";

describe("Hash", () => {
  it("should return an object", () => {
    const hash = new Keyed(Map({ "1": new Box("5") }), Map({ foo: "1" }));

    expect(hash.toJS(null)).toEqual({ foo: "5" });
  });
  it("should pass context to children", () => {
    const hash = new Keyed(Map({ "1": new Ref("5") }), Map({ foo: "1" }));

    expect(
      hash.toJS({
        getRef() {
          return "99";
        },
      })
    ).toEqual({ foo: "99" });
  });
  describe("InitKey", () => {
    it("should set the key", () => {
      const hash = new Keyed(Map({ "1": new Ref("5") }), Map({ foo: "1" }));
      const change = new InitKey("1", [], "99", "foo", new Box("99"));

      const newHash = hash.apply(change);

      expect(newHash.toJS(null)).toEqual({ "foo": "99" });
    });
  });
});
