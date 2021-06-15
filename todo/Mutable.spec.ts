import { Box } from "./Mutables/Box"
import { Replace } from "./Mutations/Replace";

describe("Mutable", () => {
  it("should apply changes", () => {
    const mutable = new Box("5");
    const change = new Replace("1", [], new Box("6"));

    const result = mutable.apply(change);

    expect(result.toJS(null)).toEqual("6");
  })
})