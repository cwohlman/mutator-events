import Mutable from "./Mutable";

export default abstract class Mutation {
  constructor(
    public readonly id: string,
    public readonly target: ReadonlyArray<string>
  ) {}

  upscope(): Mutation {
    return Object.assign(
      Object.create(this.constructor.prototype),
      this,
      { target: this.target.slice(1) }
    );
  }
  downscope(): Mutation {
    return Object.assign(
      Object.create(this.constructor.prototype),
      this,
      { target: this.target.slice(1) }
    );
  }
  abstract apply?(subject: Mutable): Mutable;
  abstract construct?(): Mutable;
}
