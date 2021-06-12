import Mutation from "./Mutation";
import Revision from "./Revision";

export default class Update {
  constructor(
    replacedEvents: string[],
    replacementEvents: (Mutation | Revision)[]
  ) {}
}