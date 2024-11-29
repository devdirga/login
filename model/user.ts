import { ObjectId } from "mongodb";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
export interface RawUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}
export function serializeUser(raw: RawUser): User {
  return {
    id: raw._id?.toString() ?? "",
    name: raw.name ?? "",
    email: raw.email ?? "" ,
    password: raw.password ?? ""
  };
}
