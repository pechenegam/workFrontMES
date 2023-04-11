import {UserRole} from "./user-role";

export class Jwt {
  token: string;
  refreshToken: string;
  id: number;
  username: string;
  roles: UserRole[]
}
