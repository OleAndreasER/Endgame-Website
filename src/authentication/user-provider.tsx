import React, { useEffect, useState } from "react";
import { User } from "./user";
import {
  SignInResult,
  getUsername,
  logIn,
  logOut,
  signIn,
} from "./user-access";

interface Props {
  children: JSX.Element;
}

interface UserContextValue {
  currentUser: User | undefined;
  logIn: (email: string, password: string) => Promise<void>;
  signIn: (
    username: string,
    email: string,
    password: string
  ) => Promise<SignInResult | null>;
  logOut: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name !== null) {
      setCurrentUser({ name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserPersistently = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("userName", user.name);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        logIn: async (email, password) => {
          await logIn(email, password);
          let name: string | null = null;
          //Try 3 times getting the username, because it fails sometimes.
          for (let i = 0; i < 3; i++) {
            name = await getUsername();
            if (name !== null) break;
            await new Promise((f) => setTimeout(f, 500));
          }
          if (name === null) return;

          setUserPersistently({ name });
        },
        signIn: async (username, email, password) => {
          const signInResult: SignInResult | null = await signIn(
            username,
            email,
            password
          );
          if (signInResult === null || !signInResult.wasSuccess) {
            return signInResult;
          }

          let name: string | null = null;
          //Try 3 times getting the username, because it fails sometimes.
          for (let i = 0; i < 3; i++) {
            name = await getUsername();
            if (name !== null) break;
            await new Promise((f) => setTimeout(f, 500));
          }
          if (name === null) return null;

          setUserPersistently({ name });
          return signInResult;
        },
        logOut: async () => {
          await logOut();
          setCurrentUser(undefined);
          localStorage.removeItem("userName");
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
