import Mutable from "../Mutable";

export class Nothing extends Mutable {
  toJS(): unknown {
    return null;
  }
}