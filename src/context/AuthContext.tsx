import React, { PropsWithChildren, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

type User = {
  name: string;
  lastname: string;
  birthdate: string;
  course: string;
  address: string;
  email: string;
  username: string;
  avatar?: string;
  id: string;
  role: string;
  interest: {
    id: string;
    name: string;
  }[];
};

type AuthData = {
  isAuth?: "isLoggedIn" | "isLoggedOut";
};

type IContext = {
  authData: AuthData;
  user: User | undefined;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = React.createContext({} as IContext);

const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>();

  const [isAuth, setIsAuth] = useState<AuthData>({
    isAuth: undefined,
  });

  async function checkIfUserIsAuthorized() {
    try {
      const response = await axiosInstance.get("/auth/me");
      setUser(response.data.user);
      setIsAuth({
        isAuth: "isLoggedIn",
      });
    } catch (error) {
      setUser(undefined);
      setIsAuth({
        isAuth: "isLoggedOut",
      });
    }
  }

  useEffect(() => {
    checkIfUserIsAuthorized();
  }, []);

  async function signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const response = await axiosInstance.post("/auth", { email, password });
    setUser(response.data.userReponse);
    setIsAuth({
      isAuth: "isLoggedIn",
    });
    checkIfUserIsAuthorized();
    return response.data;
  }

  async function logOut() {
    await axiosInstance.get("/auth/logout");
    setUser(undefined);
    setIsAuth({
      isAuth: "isLoggedOut",
    });
  }

  return (
    <AuthContext.Provider value={{ authData: isAuth, signIn, user, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
