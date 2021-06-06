import { ENEWS_LETTER } from "../component/container/user/enum";

export interface IUser {
  name: string;
  age: number;
  email: string;
  newsletter: ENEWS_LETTER;
}
