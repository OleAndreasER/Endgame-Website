import React, { useEffect, useState } from "react";
import { User } from "./user";
import { getUsername, logIn, logOut, signIn } from "./user-access";

interface Props {
  children: JSX.Element;
}

interface UserContextValue {
  currentUser: User | undefined;
  logIn: (email: string, password: string) => Promise<void>;
  signIn: (username: string, email: string, password: string) => Promise<void>;
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
          console.log(await logIn(email, password));
          const name: string = await getUsername();
          setUserPersistently({ name });
        },
        signIn: async (username, email, password) => {
          console.log(await signIn(username, email, password));
          const name: string = await getUsername();
          setUserPersistently({ name });
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
