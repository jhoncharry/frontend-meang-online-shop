import { Roles } from '../types/roles.types';

export class User {
  private _name: string;
  private _lastname: string;
  private _email: string;
  private _role: Roles;

  private _id: string;

  constructor(
    _id: string,
    name: string,
    lastname: string,
    email: string,
    role: Roles
  ) {
    this._id = _id;
    this._name = name;
    this._lastname = lastname;
    this._email = email;
    this._role = role;
  }

  public get name(): String {
    return this._name;
  }

  public get lastname(): String {
    return this._lastname;
  }

  public get role(): Roles {
    return this._role;
  }
}
