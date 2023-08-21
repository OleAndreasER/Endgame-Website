import { del, get, post } from "../misc/fetch-methods";

export const logIn = async (email: string, password: string): Promise<void> => {
  post(`users/login`, { email, password });
};

export const signIn = async (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  post("users", { username, email, password });
};

export const logOut = async (): Promise<void> => {
  del(`users/login`);
};

export const getUsername = (): Promise<string | null> => get(`users/name`);
