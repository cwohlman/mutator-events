import { Ref } from "./Ref"

describe("Ref", () => {
  it("should lookup the refId in the passed context", () => {
    const ref = new Ref("1");
    const context = { getRef() { return "99" }};

    const result = ref.toJS(context);

    expect(result).toEqual("99");
  })
})