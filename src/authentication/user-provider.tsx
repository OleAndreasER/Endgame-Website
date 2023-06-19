import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");
    if (id !== null && name !== null) {
      setCurrentUser({ id, name });
    }
  }, []);

  const setUserPersistently = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser: setUserPersistently,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
