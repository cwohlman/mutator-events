import { Bus } from "./Bus";
import Context from "./Context";

export default abstract class Revision {
  constructor(
    id: string,
  ) {}

  abstract apply(context: Context): Context
}