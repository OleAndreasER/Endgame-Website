import { testUriBase } from "../config/uri";
import { del, get, post } from "../misc/fetch-methods";

export const logIn = async (email: string, password: string): Promise<void> => {
  post(`users/login`, { email, password });
};

export type SignInResult = { wasSuccess: boolean; failureReason?: string };

export const signIn = async (
  username: string,
  email: string,
  password: string
): Promise<SignInResult | null> => {
  //post("users", { username, email, password });

  const requestInit: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  };

  return fetch(testUriBase + "users", requestInit)
    .then(async (response) => {
      if (response.status === 200) {
        return { wasSuccess: true };
      }
      if (response.status === 401) {
        const failureReason = (await response.json()).error.message;
        return { wasSuccess: false, failureReason };
      }
      return Promise.reject(response);
    })
    .catch(() => {
      console.error(`Failed POST users`);
      return null;
    });
};

export const logOut = async (): Promise<void> => {
  del(`users/login`);
};

export const getUsername = (): Promise<string | null> => get(`users/name`);
