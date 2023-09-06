import React, { useEffect, useState } from "react";
import { User } from "./user";
import {
  SignUpResult,
  getUsername,
  logIn,
  logOut,
  signUp,
} from "./user-access";

interface Props {
  children: JSX.Element;
}

interface UserContextValue {
  currentUser: User | undefined;
  logIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<SignUpResult | null>;
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
          const gotLoggedIn: boolean = await logIn(email, password);
          if (!gotLoggedIn) {
            return false;
          }

          let name: string | null = null;
          //Try 3 times getting the username, because it fails sometimes.
          for (let i = 0; i < 3; i++) {
            name = await getUsername();
            if (name !== null) break;
            await new Promise((f) => setTimeout(f, 500));
          }
          if (name === null) return false;

          setUserPersistently({ name });
          return true;
        },
        signUp: async (username, email, password) => {
          const signUpResult: SignUpResult | null = await signUp(
            username,
            email,
            password
          );
          if (signUpResult === null || !signUpResult.wasSuccess) {
            return signUpResult;
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
          return signUpResult;
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
