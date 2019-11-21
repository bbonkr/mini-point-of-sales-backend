import { RoleValue } from "../entities/Role.entity";
import { StoreValue } from "../entities/Store.entity";
import { UserValue } from "../entities/User.entity";

declare global {
  namespace Express {
    export interface User extends UserValue {
      id: string;
      username: string;
    }

    export interface Request {
      user?: User;
      roles?: RoleValue[];
      stores?: StoreValue[];
    }
  }
}
