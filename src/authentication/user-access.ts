import { del, get, post } from "../misc/fetch-methods";

export const logIn = (email: string, password: string) =>
  post(`users/login`, { email, password });

export const signIn = (username: string, email: string, password: string) =>
  post("users", { username, email, password });

export const logOut = () => del(`users/login`);

export const getUsername = (): Promise<string> => get(`users/name`);
