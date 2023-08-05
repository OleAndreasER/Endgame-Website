import { post } from "../misc/fetch-methods";

export const login = (email: string, password: string) =>
  post(`users/login`, { email, password });

export const signIn = (username: string, email: string, password: string) =>
  post("users", { username, email, password });
