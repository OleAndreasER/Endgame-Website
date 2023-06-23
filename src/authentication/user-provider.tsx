import React, { useEffect, useState } from "react";
import { User } from "./user";
import jwt_decode from "jwt-decode";
import { CredentialResponse, googleLogout } from "@react-oauth/google";

interface Props {
  children: JSX.Element;
}

interface UserContextValue {
  currentUser: User | undefined;
  logIn: (credentalToken: CredentialResponse) => void;
  logOut: () => void;
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
        logIn: (credentialToken) => {
          if (credentialToken.credential) {
            const userInfo: any = jwt_decode(credentialToken.credential);
            setUserPersistently({ name: userInfo.name, id: userInfo.sub });
          }
        },
        logOut: () => {
          googleLogout();
          setCurrentUser(undefined);
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
