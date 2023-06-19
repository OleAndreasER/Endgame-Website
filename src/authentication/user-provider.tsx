import React, { useState } from "react";
import { User } from "./user";

interface Props {
  children: JSX.Element;
}

interface UserContextValue {
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
}

export const UserContext = React.createContext<UserContextValue>(
  {} as UserContextValue
);

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser: (user) => {
          setCurrentUser(user);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
