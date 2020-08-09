import {IApplicationException} from "./ApplicationException";

export class InvalidTokenException extends Error implements IApplicationException {
  public encryptedPassword: string;
  public username: string;
  public data: string;

  constructor() {
    super("INVALID_CREDENTIALS");
    this.name = "INVALID_CREDENTIALS";
  }
}
