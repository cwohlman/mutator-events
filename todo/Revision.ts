import State from "./Context";

export default abstract class Revision {
  constructor(
    id: string,
  ) {}

  abstract apply(context: State): State
}